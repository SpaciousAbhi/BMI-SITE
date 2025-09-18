import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Flame, Activity, Clock, Zap, TrendingUp, User } from "lucide-react";

const CaloriesBurnedCalculator = () => {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState({ hours: '', minutes: '' });
  const [intensity, setIntensity] = useState('moderate');
  const [bodyFat, setBodyFat] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Comprehensive exercise database with MET values
  const exercises = {
    'running': {
      name: 'Running',
      metValues: {
        light: { value: 6.0, description: '5 mph (12 min/mile)' },
        moderate: { value: 8.3, description: '6 mph (10 min/mile)' },
        vigorous: { value: 11.0, description: '7 mph (8.5 min/mile)' },
        intense: { value: 14.5, description: '8+ mph (7.5 min/mile or faster)' }
      }
    },
    'cycling': {
      name: 'Cycling',
      metValues: {
        light: { value: 4.0, description: 'Leisurely, <10 mph' },
        moderate: { value: 8.0, description: '12-14 mph' },
        vigorous: { value: 12.0, description: '16-19 mph' },
        intense: { value: 16.0, description: '20+ mph' }
      }
    },
    'swimming': {
      name: 'Swimming',
      metValues: {
        light: { value: 6.0, description: 'Recreational' },
        moderate: { value: 8.3, description: 'Moderate pace' },
        vigorous: { value: 10.0, description: 'Fast pace' },
        intense: { value: 13.8, description: 'Competitive' }
      }
    },
    'walking': {
      name: 'Walking',
      metValues: {
        light: { value: 2.5, description: '2 mph, slow pace' },
        moderate: { value: 3.8, description: '3.5 mph, brisk pace' },
        vigorous: { value: 5.0, description: '4.5 mph, very brisk' },
        intense: { value: 6.8, description: '5+ mph, race walking' }
      }
    },
    'weightlifting': {
      name: 'Weight Lifting',
      metValues: {
        light: { value: 3.0, description: 'Light effort, general' },
        moderate: { value: 5.0, description: 'Moderate effort' },
        vigorous: { value: 6.0, description: 'Vigorous effort' },
        intense: { value: 8.0, description: 'Heavy lifting, circuit' }
      }
    },
    'basketball': {
      name: 'Basketball',
      metValues: {
        light: { value: 4.5, description: 'Shooting baskets' },
        moderate: { value: 6.5, description: 'Non-game, general' },
        vigorous: { value: 8.0, description: 'Game play' },
        intense: { value: 10.0, description: 'Competitive game' }
      }
    },
    'tennis': {
      name: 'Tennis',
      metValues: {
        light: { value: 5.0, description: 'Doubles' },
        moderate: { value: 7.3, description: 'Singles, recreational' },
        vigorous: { value: 8.0, description: 'Singles, competitive' },
        intense: { value: 10.0, description: 'Tournament play' }
      }
    },
    'yoga': {
      name: 'Yoga',
      metValues: {
        light: { value: 2.5, description: 'Hatha, gentle' },
        moderate: { value: 3.0, description: 'Vinyasa, moderate' },
        vigorous: { value: 4.0, description: 'Power yoga' },
        intense: { value: 5.0, description: 'Hot yoga, advanced' }
      }
    },
    'dancing': {
      name: 'Dancing',
      metValues: {
        light: { value: 3.0, description: 'Slow, waltz' },
        moderate: { value: 4.8, description: 'General, moderate' },
        vigorous: { value: 7.3, description: 'Fast, vigorous' },
        intense: { value: 8.8, description: 'High energy, aerobic' }
      }
    },
    'rowing': {
      name: 'Rowing',
      metValues: {
        light: { value: 3.5, description: 'Light effort' },
        moderate: { value: 7.0, description: 'Moderate effort' },
        vigorous: { value: 8.5, description: 'Vigorous effort' },
        intense: { value: 12.0, description: 'Competition pace' }
      }
    },
    'hiking': {
      name: 'Hiking',
      metValues: {
        light: { value: 4.3, description: 'Cross country, easy' },
        moderate: { value: 6.0, description: 'General, moderate' },
        vigorous: { value: 7.3, description: 'Uphill, vigorous' },
        intense: { value: 9.0, description: 'Mountain climbing' }
      }
    },
    'soccer': {
      name: 'Soccer',
      metValues: {
        light: { value: 5.0, description: 'Casual, general' },
        moderate: { value: 7.0, description: 'Recreational' },
        vigorous: { value: 10.0, description: 'Competitive' },
        intense: { value: 12.0, description: 'Tournament play' }
      }
    }
  };

  const calculateCalories = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        let weightInKg = parseFloat(weight);
        if (weightUnit === 'lbs') {
          weightInKg = weightInKg * 0.453592;
        }

        const totalMinutes = (parseInt(duration.hours) || 0) * 60 + (parseInt(duration.minutes) || 0);
        const selectedExercise = exercises[activity];
        
        if (!selectedExercise) return;

        const metValue = selectedExercise.metValues[intensity].value;
        
        // Base calorie calculation using MET formula
        let caloriesBurned = (metValue * weightInKg * totalMinutes) / 60;

        // Apply body composition correction if available
        if (bodyFat && age && gender) {
          const bodyFatPercent = parseFloat(bodyFat);
          const ageNum = parseInt(age);
          
          // Lean body mass calculation
          const leanBodyMass = weightInKg * (1 - bodyFatPercent / 100);
          
          // Age and gender adjustments
          let ageAdjustment = 1 - ((ageNum - 25) * 0.002); // 0.2% decrease per year after 25
          ageAdjustment = Math.max(0.8, Math.min(1.1, ageAdjustment));
          
          const genderAdjustment = gender === 'male' ? 1.0 : 0.9;
          
          // Enhanced calculation incorporating lean body mass
          const enhancedCalories = (metValue * leanBodyMass * 1.2 * totalMinutes * ageAdjustment * genderAdjustment) / 60;
          caloriesBurned = enhancedCalories;
        }

        // Calculate calories burned per hour
        const caloriesPerHour = (caloriesBurned / totalMinutes) * 60;
        
        // Calculate fat burned (approximate 30-50% from fat depending on intensity)
        const fatPercentage = intensity === 'light' ? 0.5 : intensity === 'moderate' ? 0.4 : intensity === 'vigorous' ? 0.3 : 0.2;
        const fatCaloriesBurned = caloriesBurned * fatPercentage;
        const fatGramsBurned = fatCaloriesBurned / 9; // 9 calories per gram of fat

        // Generate intensity recommendations
        const recommendations = generateRecommendations(activity, intensity, caloriesBurned, totalMinutes);

        setResult({
          totalCalories: Math.round(caloriesBurned),
          caloriesPerHour: Math.round(caloriesPerHour),
          fatCalories: Math.round(fatCaloriesBurned),
          fatGrams: fatGramsBurned.toFixed(1),
          metValue: metValue,
          exercise: selectedExercise.name,
          intensityDescription: selectedExercise.metValues[intensity].description,
          duration: totalMinutes,
          weight: weight,
          weightUnit: weightUnit,
          recommendations: recommendations
        });
      } catch (error) {
        console.error('Calculation error:', error);
      }
      setLoading(false);
    }, 800);
  };

  const generateRecommendations = (activity, intensity, calories, duration) => {
    const recommendations = [];
    
    // Duration recommendations
    if (duration < 30) {
      recommendations.push({
        type: 'Duration',
        message: 'Consider exercising for at least 30 minutes for optimal health benefits.',
        icon: '⏰'
      });
    }
    
    // Intensity recommendations
    if (intensity === 'light') {
      recommendations.push({
        type: 'Intensity',
        message: 'Try increasing intensity gradually to burn more calories and improve fitness.',
        icon: '🔥'
      });
    }
    
    // Activity-specific tips
    const activityTips = {
      'running': 'Add intervals or hill training to increase calorie burn by 15-25%.',
      'cycling': 'Incorporate hill climbs or interval training for better results.',
      'swimming': 'Try different strokes to engage different muscle groups.',
      'weightlifting': 'Reduce rest time between sets to increase calorie burn.',
      'walking': 'Add incline or increase pace to boost calorie expenditure.'
    };
    
    if (activityTips[activity]) {
      recommendations.push({
        type: 'Activity Tip',
        message: activityTips[activity],
        icon: '💡'
      });
    }
    
    // Calorie burn recommendations
    if (calories < 200) {
      recommendations.push({
        type: 'Goal',
        message: 'Aim for 200-300 calories per session for effective weight management.',
        icon: '🎯'
      });
    }
    
    return recommendations;
  };

  const resetForm = () => {
    setWeight('');
    setActivity('');
    setDuration({ hours: '', minutes: '' });
    setIntensity('moderate');
    setBodyFat('');
    setAge('');
    setGender('');
    setResult(null);
  };

  const isFormValid = () => {
    return weight && activity && (duration.hours || duration.minutes);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center pb-6 sm:pb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-orange-500/10 mr-4">
              <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Advanced Calories Burned Calculator
            </CardTitle>
          </div>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Calculate precise calorie expenditure with advanced MET values, body composition factors, and personalized recommendations.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8">
          {/* Basic Information - Enhanced responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-white font-semibold text-sm sm:text-base">Body Weight *</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white flex-1 h-11 sm:h-10"
                  step="0.1"
                />
                <Select value={weightUnit} onValueChange={setWeightUnit}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-16 sm:w-20 h-11 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label className="text-white font-semibold text-sm sm:text-base">Exercise Activity *</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {Object.entries(exercises).map(([key, exercise]) => (
                    <SelectItem key={key} value={key}>{exercise.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration and Intensity - Mobile optimized */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-white font-semibold text-sm sm:text-base">Duration *</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    type="number"
                    placeholder="Hours"
                    value={duration.hours}
                    onChange={(e) => setDuration({...duration, hours: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white text-center h-11 sm:h-10"
                    min="0"
                  />
                  <Label className="text-xs text-gray-400 block text-center mt-1">Hours</Label>
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Minutes"
                    value={duration.minutes}
                    onChange={(e) => setDuration({...duration, minutes: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white text-center h-11 sm:h-10"
                    min="0"
                    max="59"
                  />
                  <Label className="text-xs text-gray-400 block text-center mt-1">Minutes</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label className="text-white font-semibold text-sm sm:text-base">Intensity Level</Label>
              <Select value={intensity} onValueChange={setIntensity}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="light">Light Intensity</SelectItem>
                  <SelectItem value="moderate">Moderate Intensity</SelectItem>
                  <SelectItem value="vigorous">Vigorous Intensity</SelectItem>
                  <SelectItem value="intense">High Intensity</SelectItem>
                </SelectContent>
              </Select>
              {activity && exercises[activity] && (
                <p className="text-xs text-gray-400">
                  {exercises[activity].metValues[intensity].description}
                </p>
              )}
            </div>
          </div>

          {/* Advanced Options - Enhanced mobile layout */}
          <div className="border-t border-gray-700 pt-4 sm:pt-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
              <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Advanced Factors (Optional for Enhanced Accuracy)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label className="text-white text-sm">Body Fat %</Label>
                <Input
                  type="number"
                  placeholder="e.g., 15"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
                  min="5"
                  max="50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white text-sm">Age</Label>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
                  min="15"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white text-sm">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons - Enhanced mobile design */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <Button
              onClick={calculateCalories}
              disabled={!isFormValid() || loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 h-12 sm:h-auto rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Calculating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Flame className="h-5 w-5" />
                  <span>Calculate Calories Burned</span>
                </div>
              )}
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              className="px-6 border-gray-600 text-gray-300 hover:bg-gray-800 h-12 sm:h-auto sm:px-8"
            >
              Reset
            </Button>
          </div>

          {/* Results - Enhanced mobile responsiveness */}
          {result && (
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-xl border border-orange-800/30">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-orange-400" />
                Your Calorie Burn Results
              </h3>

              {/* Main Results - Responsive grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-center p-3 sm:p-4 bg-orange-900/20 rounded-lg border border-orange-800/30">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-300">{result.totalCalories}</div>
                  <div className="text-xs sm:text-sm text-orange-200 font-medium">Total Calories</div>
                  <div className="text-xs text-gray-400 mt-1">{result.duration} minutes</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-red-900/20 rounded-lg border border-red-800/30">
                  <div className="text-2xl sm:text-3xl font-bold text-red-300">{result.caloriesPerHour}</div>
                  <div className="text-xs sm:text-sm text-red-200 font-medium">Calories/Hour</div>
                  <div className="text-xs text-gray-400 mt-1">Rate</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-300">{result.fatCalories}</div>
                  <div className="text-xs sm:text-sm text-yellow-200 font-medium">Fat Calories</div>
                  <div className="text-xs text-gray-400 mt-1">{result.fatGrams}g fat</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-300">{result.metValue}</div>
                  <div className="text-xs sm:text-sm text-blue-200 font-medium">MET Value</div>
                  <div className="text-xs text-gray-400 mt-1">Intensity</div>
                </div>
              </div>

              {/* Exercise Details - Mobile optimized */}
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Exercise Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm">
                  <div><span className="text-gray-400">Activity:</span> <span className="text-white">{result.exercise}</span></div>
                  <div><span className="text-gray-400">Intensity:</span> <span className="text-white">{result.intensityDescription}</span></div>
                  <div><span className="text-gray-400">Weight:</span> <span className="text-white">{result.weight} {result.weightUnit}</span></div>
                </div>
              </div>

              {/* Recommendations - Mobile optimized */}
              {result.recommendations.length > 0 && (
                <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Personalized Recommendations
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-2 sm:p-3 bg-gray-700/30 rounded-lg">
                        <div className="text-lg sm:text-2xl">{rec.icon}</div>
                        <div>
                          <div className="font-semibold text-white text-sm sm:text-base">{rec.type}</div>
                          <div className="text-gray-300 text-xs sm:text-sm">{rec.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CaloriesBurnedCalculator;