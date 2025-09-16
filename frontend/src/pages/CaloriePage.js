import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Weight, User, Zap, ArrowLeft, Download, X, Target, ChevronDown, ChevronRight, Info, Heart, Brain, Activity, TrendingUp } from 'lucide-react';
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
  calculateBMR, 
  calculateTDEE, 
  calculateCalorieGoals,
  getActivityLevels,
  getCalorieGoalOptions,
  getCalorieRecommendations,
  formatCalorieData
} from '../utils/calorieCalculations';

const CaloriePage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: '',
    goal: 'maintain',
    units: 'metric' // metric or imperial
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      weight: '',
      height: '',
      age: '',
      gender: '',
      activityLevel: '',
      goal: 'maintain',
      units: formData.units,
    });
    setResult(null);
  };

  const calculateCalories = async () => {
    // Validation
    const { weight, height, age, gender, activityLevel } = formData;
    
    if (!weight || !height || !age || !gender || !activityLevel) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your calorie needs.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      try {
        const bmr = calculateBMR(
          parseFloat(weight),
          parseFloat(height),
          parseInt(age),
          gender,
          formData.units
        );
        
        const tdee = calculateTDEE(bmr, activityLevel);
        const goalCalories = calculateCalorieGoals(tdee, formData.goal);
        const recommendations = getCalorieRecommendations(bmr, tdee, formData.goal, parseInt(age), gender);
        const formatted = formatCalorieData(bmr, tdee, goalCalories.calories, formData.goal);
        
        const resultData = {
          bmr,
          tdee,
          goalCalories,
          recommendations,
          formatted,
          activityLevel,
          goal: formData.goal,
          weight: parseFloat(weight),
          height: parseFloat(height),
          age: parseInt(age),
          gender,
          units: formData.units
        };
        
        setResult(resultData);
        setLoading(false);
        
        toast({
          title: "Calories Calculated!",
          description: `Your daily calorie target is ${goalCalories.calories} calories`,
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

  const getActivityLevelInfo = (level) => {
    const levels = getActivityLevels();
    return levels.find(l => l.level === level);
  };

  const getGoalInfo = (goal) => {
    const goals = getCalorieGoalOptions();
    return goals.find(g => g.value === goal);
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

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Free Calorie Calculator | TDEE & BMR Calculator - Daily Calorie Needs"
        description="Free calorie calculator to determine your daily calorie needs. Calculate TDEE, BMR, and calories for weight loss, maintenance, or muscle gain. Accurate calorie calculator with activity levels."
        keywords="calorie calculator, TDEE calculator, BMR calculator, daily calorie needs, calories for weight loss, calorie needs calculator, free calorie calculator, metabolism calculator"
        canonical="/calories"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Calorie Calculator - TDEE & BMR Calculator", 
          "description": "Calculate your daily calorie needs with our free TDEE and BMR calculator. Determine calories for weight loss, maintenance, or muscle gain.",
          "url": "https://bmicalculator.com/calories",
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
            Calorie Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
            'bg-gradient-to-r from-green-400 to-emerald-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your daily calorie needs (TDEE) and get personalized recommendations for weight loss, maintenance, or gain.
          </p>
          
          {/* Method Badge */}
          <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
            theme === 'white' ? 'bg-teal-100 text-teal-800' :
            theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
            'bg-green-900/50 text-green-200'
          }`}>
            Mifflin-St Jeor Equation + Activity Level
          </Badge>
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
                <Zap className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                TDEE Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Units Selection */}
              <div className="space-y-3">
                <Label className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Units
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    onClick={() => handleInputChange('units', 'metric')}
                    className={`transition-all duration-300 hover:scale-105 ${
                      formData.units === 'metric'
                        ? theme === 'white' 
                          ? 'bg-teal-600 text-white border-teal-600' 
                          : theme === 'dark'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-green-600 text-white border-green-600'
                        : theme === 'white' 
                        ? 'bg-white text-teal-600 border-teal-300 hover:bg-teal-50' 
                        : theme === 'dark'
                        ? 'bg-gray-700 text-purple-300 border-purple-500/50 hover:bg-purple-900/20'
                        : 'bg-gray-800 text-green-300 border-green-500/50 hover:bg-green-900/20'
                    }`}
                  >
                    Metric (kg/cm)
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleInputChange('units', 'imperial')}
                    className={`transition-all duration-300 hover:scale-105 ${
                      formData.units === 'imperial'
                        ? theme === 'white' 
                          ? 'bg-teal-600 text-white border-teal-600' 
                          : theme === 'dark'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-green-600 text-white border-green-600'
                        : theme === 'white' 
                        ? 'bg-white text-teal-600 border-teal-300 hover:bg-teal-50' 
                        : theme === 'dark'
                        ? 'bg-gray-700 text-purple-300 border-purple-500/50 hover:bg-purple-900/20'
                        : 'bg-gray-800 text-green-300 border-green-500/50 hover:bg-green-900/20'
                    }`}
                  >
                    Imperial (lbs/in)
                  </Button>
                </div>
              </div>

              {/* Gender Select */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <User className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age Input */}
              <div className="space-y-3">
                <Label htmlFor="age" className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Weight Input */}
              <div className="space-y-3">
                <Label htmlFor="weight" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Weight className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Weight
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder={formData.units === 'metric' ? 'e.g., 70 kg' : 'e.g., 154 lbs'}
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Height Input */}
              <div className="space-y-3">
                <Label htmlFor="height" className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Height
                </Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  placeholder={formData.units === 'metric' ? 'e.g., 175 cm' : 'e.g., 70 inches'}
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Activity Level Select */}
              <div className="space-y-3">
                <Label className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Activity Level
                </Label>
                <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {getActivityLevels().map((level) => (
                      <SelectItem key={level.level} value={level.level}>
                        <div>
                          <div className="font-medium">{level.title}</div>
                          <div className="text-xs text-gray-500">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Goal Select */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Target className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Goal
                </Label>
                <Select value={formData.goal} onValueChange={(value) => handleInputChange('goal', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCalorieGoalOptions().map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        <div className="flex items-center gap-2">
                          <span>{goal.emoji}</span>
                          <div>
                            <div className="font-medium">{goal.label}</div>
                            <div className="text-xs text-gray-500">{goal.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={calculateCalories}
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
                    Your Calorie Needs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Calorie Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {result.bmr}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        BMR (Basal Metabolic Rate)
                      </div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {result.tdee}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        TDEE (Total Daily Energy)
                      </div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-teal-50' : theme === 'dark' ? 'bg-purple-900/30' : 'bg-green-900/30'
                    }`}>
                      <div className={`text-3xl font-bold mb-1 ${
                        theme === 'white' ? 'text-teal-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'
                      }`}>
                        {result.goalCalories.calories}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-teal-700' : theme === 'dark' ? 'text-purple-300' : 'text-green-300'}`}>
                        Daily Goal Calories
                      </div>
                    </div>
                  </div>

                  {/* Goal Information */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                  }`}>
                    <div className={`font-medium mb-2 ${theme === 'white' ? 'text-blue-900' : 'text-blue-300'}`}>
                      Your Goal: {getGoalInfo(result.goal)?.label} {getGoalInfo(result.goal)?.emoji}
                    </div>
                    <div className={`text-sm ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
                      {result.goalCalories.description}
                    </div>
                    {result.formatted.difference !== 0 && (
                      <div className={`text-sm mt-2 ${theme === 'white' ? 'text-blue-600' : 'text-blue-300'}`}>
                        {result.formatted.isDeficit ? 'Daily deficit: ' : 'Daily surplus: '}
                        {Math.abs(result.formatted.difference)} calories 
                        ({result.formatted.poundsPerWeek} lbs/week)
                      </div>
                    )}
                  </div>

                  {/* Activity Level Info */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                  }`}>
                    <div className={`font-medium mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Activity Level: {getActivityLevelInfo(result.activityLevel)?.title}
                    </div>
                    <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {getActivityLevelInfo(result.activityLevel)?.description}
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
                    onClick={() => toast({ title: "PDF Generation", description: "Calorie PDF report feature coming soon!" })}
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

export default CaloriePage;