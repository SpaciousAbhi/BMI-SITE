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
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

const CaloriesBurnedCalculatorPage = () => {
  const { theme, getBackgroundGradient } = useTheme();
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'lbs',
    duration: '',
    selectedActivity: ''
  });
  const [result, setResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Simplified popular activities with MET values
  const popularActivities = [
    { name: 'Walking (3 mph)', met: 3.5, intensity: 'Light' },
    { name: 'Walking (4 mph)', met: 5.0, intensity: 'Moderate' },
    { name: 'Jogging (5 mph)', met: 8.0, intensity: 'Moderate' },
    { name: 'Running (6 mph)', met: 10.0, intensity: 'High' },
    { name: 'Running (7 mph)', met: 11.5, intensity: 'High' },
    { name: 'Running (8 mph)', met: 13.5, intensity: 'Very High' },
    { name: 'Cycling (10-12 mph)', met: 6.0, intensity: 'Moderate' },
    { name: 'Cycling (12-14 mph)', met: 8.0, intensity: 'Moderate' },
    { name: 'Cycling (14-16 mph)', met: 10.0, intensity: 'High' },
    { name: 'Swimming (moderate)', met: 6.0, intensity: 'Moderate' },
    { name: 'Swimming (vigorous)', met: 10.0, intensity: 'High' },
    { name: 'Weight Training', met: 6.0, intensity: 'Moderate' },
    { name: 'Basketball', met: 8.0, intensity: 'High' },
    { name: 'Soccer', met: 10.0, intensity: 'High' },
    { name: 'Tennis', met: 8.0, intensity: 'High' },
    { name: 'Dancing', met: 4.5, intensity: 'Moderate' },
    { name: 'Hiking', met: 6.0, intensity: 'Moderate' },
    { name: 'Yoga', met: 3.0, intensity: 'Light' },
    { name: 'Elliptical', met: 7.0, intensity: 'Moderate' },
    { name: 'Rowing Machine', met: 8.5, intensity: 'High' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateCalories = () => {
    if (!formData.weight || !formData.duration || !formData.selectedActivity) return;

    const activity = popularActivities.find(a => a.name === formData.selectedActivity);
    if (!activity) return;

    // Convert weight to kg if needed
    const weightInKg = formData.weightUnit === 'lbs' 
      ? parseFloat(formData.weight) * 0.453592 
      : parseFloat(formData.weight);

    // Calculate calories: MET × weight in kg × time in hours
    const durationInHours = parseFloat(formData.duration) / 60;
    const totalCalories = Math.round(activity.met * weightInKg * durationInHours);
    const caloriesPerMinute = Math.round(totalCalories / parseFloat(formData.duration));

    setResult({
      calories: totalCalories,
      caloriesPerMinute: caloriesPerMinute,
      activity: activity.name,
      intensity: activity.intensity,
      met: activity.met,
      duration: formData.duration,
      weight: formData.weight,
      weightUnit: formData.weightUnit
    });
  };

  const clearForm = () => {
    setFormData({
      weight: '',
      weightUnit: 'lbs',
      duration: '',
      selectedActivity: ''
    });
    setResult(null);
    setShowDetails(false);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Simple Calories Burned Calculator - Quick & Easy Activity Calorie Counter"
        description="Calculate calories burned with our simple, user-friendly calculator. Just enter your weight, time, and activity to get instant results for popular exercises."
        keywords="calories burned calculator, exercise calorie calculator, simple calorie counter, workout calories, activity calories"
        canonical="/calories-burned-calculator"
      />

      <Header />

      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Simplified Hero Section */}
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

          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Simple Calories Burned Calculator
          </h1>

          <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Quick and easy calorie calculator for popular activities. Just enter your details and get instant results!
          </p>
        </div>

        {/* Simplified Calculator */}
        <div className="max-w-2xl mx-auto">
          <Card className={`backdrop-blur-md border-0 shadow-2xl ${
            theme === 'white' 
              ? 'bg-white/95' 
              : theme === 'dark'
              ? 'bg-gray-800/95 border border-red-500/20'
              : 'bg-gray-900/95 border border-red-500/20'
          }`}>
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className={`text-2xl font-bold mb-2 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  Calculate Your Calories
                </h2>
                <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Enter your information to get started
                </p>
              </div>

              {/* Simple Form */}
              <div className="space-y-6">
                {/* Weight Input */}
                <div className="space-y-2">
                  <Label className={`text-sm font-semibold ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Your Weight
                  </Label>
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      placeholder="Enter weight"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className={`flex-1 text-lg font-semibold ${
                        theme === 'white' 
                          ? 'bg-white border-2 border-gray-300 focus:border-orange-500' 
                          : 'bg-gray-700 border-2 border-gray-600 text-white focus:border-orange-400'
                      }`}
                    />
                    <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                      <SelectTrigger className={`w-24 ${
                        theme === 'white' 
                          ? 'bg-white border-2 border-gray-300' 
                          : 'bg-gray-700 border-2 border-gray-600 text-white'
                      }`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={theme === 'white' ? 'bg-white' : 'bg-gray-800 border-gray-600'}>
                        <SelectItem value="lbs">lbs</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Duration Input */}
                <div className="space-y-2">
                  <Label className={`text-sm font-semibold ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Exercise Duration (minutes)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter minutes"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className={`text-lg font-semibold ${
                      theme === 'white' 
                        ? 'bg-white border-2 border-gray-300 focus:border-orange-500' 
                        : 'bg-gray-700 border-2 border-gray-600 text-white focus:border-orange-400'
                    }`}
                  />
                </div>

                {/* Activity Selection */}
                <div className="space-y-2">
                  <Label className={`text-sm font-semibold ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Select Activity
                  </Label>
                  <Select value={formData.selectedActivity} onValueChange={(value) => handleInputChange('selectedActivity', value)}>
                    <SelectTrigger className={`text-lg ${
                      theme === 'white' 
                        ? 'bg-white border-2 border-gray-300' 
                        : 'bg-gray-700 border-2 border-gray-600 text-white'
                    }`}>
                      <SelectValue placeholder="Choose an activity" />
                    </SelectTrigger>
                    <SelectContent className={theme === 'white' ? 'bg-white' : 'bg-gray-800 border-gray-600'}>
                      {popularActivities.map((activity, index) => (
                        <SelectItem key={index} value={activity.name}>
                          <div className="flex items-center justify-between w-full">
                            <span>{activity.name}</span>
                            <Badge className={`ml-2 text-xs ${
                              activity.intensity === 'Very High' || activity.intensity === 'High'
                                ? 'bg-red-100 text-red-800'
                                : activity.intensity === 'Moderate'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {activity.intensity}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={calculateCalories}
                    disabled={!formData.weight || !formData.duration || !formData.selectedActivity}
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 ${
                      !formData.weight || !formData.duration || !formData.selectedActivity
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Calories
                  </Button>
                  
                  <Button
                    onClick={clearForm}
                    variant="outline"
                    className={`px-6 py-3 transition-all duration-300 ${
                      theme === 'white' 
                        ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                        : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    Clear
                  </Button>
                </div>
              </div>

              {/* Results */}
              {result && (
                <div className="mt-8 space-y-4">
                  {/* Main Result */}
                  <div className={`p-6 rounded-xl border-2 text-center ${
                    theme === 'white' 
                      ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' 
                      : 'bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30'
                  }`}>
                    <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                      theme === 'white' ? 'text-orange-600' : 'text-orange-400'
                    }`}>
                      {result.calories}
                    </div>
                    <div className={`text-lg font-semibold mb-1 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Calories Burned
                    </div>
                    <div className={`text-sm ${
                      theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {result.activity} for {result.duration} minutes
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg text-center ${
                      theme === 'white' 
                        ? 'bg-white border border-gray-200' 
                        : 'bg-gray-800 border border-gray-600'
                    }`}>
                      <div className={`text-2xl font-bold ${
                        theme === 'white' ? 'text-red-600' : 'text-red-400'
                      }`}>
                        {result.caloriesPerMinute}
                      </div>
                      <div className={`text-sm ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        Per Minute
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${
                      theme === 'white' 
                        ? 'bg-white border border-gray-200' 
                        : 'bg-gray-800 border border-gray-600'
                    }`}>
                      <div className={`text-2xl font-bold ${
                        theme === 'white' ? 'text-purple-600' : 'text-purple-400'
                      }`}>
                        {result.intensity}
                      </div>
                      <div className={`text-sm ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        Intensity
                      </div>
                    </div>
                  </div>

                  {/* Optional Details */}
                  <div>
                    <Button
                      onClick={() => setShowDetails(!showDetails)}
                      variant="outline"
                      className={`w-full transition-all duration-300 ${
                        theme === 'white' 
                          ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                          : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <Info className="h-4 w-4 mr-2" />
                      {showDetails ? 'Hide Details' : 'Show Details'}
                      {showDetails ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                    </Button>

                    {showDetails && (
                      <div className={`mt-4 p-4 rounded-lg border ${
                        theme === 'white' 
                          ? 'bg-gray-50 border-gray-200' 
                          : 'bg-gray-800 border-gray-600'
                      }`}>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-300'}>Activity:</span>
                            <span className={`font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                              {result.activity}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-300'}>MET Value:</span>
                            <span className={`font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                              {result.met}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-300'}>Your Weight:</span>
                            <span className={`font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                              {result.weight} {result.weightUnit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-300'}>Duration:</span>
                            <span className={`font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                              {result.duration} minutes
                            </span>
                          </div>
                          <div className={`pt-3 border-t text-xs ${
                            theme === 'white' ? 'border-gray-200 text-gray-500' : 'border-gray-600 text-gray-400'
                          }`}>
                            * Calculations based on MET (Metabolic Equivalent) values. Individual results may vary based on fitness level, body composition, and exercise intensity.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Simple Tips Section */}
        <div className="max-w-2xl mx-auto mt-12">
          <Card className={`${
            theme === 'white' 
              ? 'bg-white/95 border border-gray-200' 
              : theme === 'dark'
              ? 'bg-gray-800/95 border border-gray-600'
              : 'bg-gray-900/95 border border-gray-600'
          }`}>
            <CardContent className="p-6">
              <h3 className={`text-xl font-bold mb-4 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                💡 Quick Tips
              </h3>
              <ul className={`space-y-2 text-sm ${
                theme === 'white' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                <li>• Higher intensity activities burn more calories per minute</li>
                <li>• Heavier individuals typically burn more calories during exercise</li>
                <li>• Combine cardio and strength training for best results</li>
                <li>• Stay hydrated and listen to your body during workouts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaloriesBurnedCalculatorPage;