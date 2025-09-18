import React, { useState } from "react";
import { Activity, Info, TrendingUp, Target, Zap, BookOpen, Users, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const TDEECalculator = () => {
  const [mode, setMode] = useState("basic");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    feet: "",
    inches: "",
    age: "",
    gender: "",
    activityLevel: "",
    // Advanced mode fields
    bodyFat: "",
    workoutIntensity: "",
    workoutDuration: "",
    workoutFrequency: "",
    jobActivity: "",
    sportsActivity: ""
  });

  const basicActivityLevels = [
    { value: "1.2", label: "Sedentary", description: "Little/no exercise, desk job" },
    { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    { value: "1.55", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
    { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
    { value: "1.9", label: "Extremely Active", description: "Very hard exercise, physical job" }
  ];

  const detailedActivityLevels = [
    { value: "1.2", label: "Sedentary", description: "Bed rest, no physical activity" },
    { value: "1.3", label: "Very Light Activity", description: "Seated work, some walking" },
    { value: "1.375", label: "Light Activity", description: "Light exercise 1-3 days/week" },
    { value: "1.4", label: "Light-Moderate Activity", description: "Light exercise 3-4 days/week" },
    { value: "1.55", label: "Moderate Activity", description: "Moderate exercise 3-5 days/week" },
    { value: "1.6", label: "Moderate-High Activity", description: "Moderate exercise 5-6 days/week" },
    { value: "1.725", label: "High Activity", description: "Hard exercise 6-7 days/week" },
    { value: "1.8", label: "Very High Activity", description: "Very hard exercise 7+ days/week" },
    { value: "1.9", label: "Extremely High Activity", description: "Physical job + exercise" }
  ];

  const workoutIntensities = [
    { value: "low", label: "Low Intensity", multiplier: 1.0, description: "Walking, yoga, light stretching" },
    { value: "moderate", label: "Moderate Intensity", multiplier: 1.2, description: "Jogging, cycling, dancing" },
    { value: "high", label: "High Intensity", multiplier: 1.4, description: "Running, HIIT, heavy lifting" },
    { value: "extreme", label: "Extreme Intensity", multiplier: 1.6, description: "Professional training, competitions" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMR = (weight, height, age, gender, method = "mifflin") => {
    const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
    const heightInCm = formData.heightUnit === "ft" ? 
      (parseInt(formData.feet) * 30.48) + (parseInt(formData.inches) * 2.54) : height;

    switch (method) {
      case "mifflin":
        return gender === "male" 
          ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5
          : (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
      case "harris":
        return gender === "male"
          ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
          : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
      case "katch":
        if (!formData.bodyFat) return null;
        const leanMass = weightInKg * (1 - formData.bodyFat / 100);
        return 370 + (21.6 * leanMass);
      default:
        return null;
    }
  };

  const calculateAdvancedTDEE = (bmr) => {
    let multiplier = parseFloat(formData.activityLevel) || 1.2;
    
    // Adjust based on workout intensity and frequency
    if (mode === "advanced" && formData.workoutIntensity && formData.workoutFrequency) {
      const intensity = workoutIntensities.find(w => w.value === formData.workoutIntensity);
      const frequency = parseInt(formData.workoutFrequency) || 0;
      
      if (intensity && frequency > 0) {
        // Add additional multiplier for high-intensity frequent workouts
        const intensityBonus = (intensity.multiplier - 1) * (frequency / 7);
        multiplier += intensityBonus;
      }
    }
    
    return bmr * multiplier;
  };

  const calculateTDEE = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);

      // Calculate BMR using different methods
      const bmrMifflin = calculateBMR(weight, height, age, formData.gender, "mifflin");
      const bmrHarris = calculateBMR(weight, height, age, formData.gender, "harris");
      const bmrKatch = formData.bodyFat ? calculateBMR(weight, height, age, formData.gender, "katch") : null;

      // Calculate TDEE using primary BMR (Mifflin-St Jeor)
      const tdee = mode === "advanced" ? 
        calculateAdvancedTDEE(bmrMifflin) : 
        bmrMifflin * parseFloat(formData.activityLevel);

      // Calculate different activity level TDEEs for comparison
      const activityLevels = mode === "advanced" ? detailedActivityLevels : basicActivityLevels;
      const tdeeComparison = activityLevels.map(level => ({
        label: level.label,
        description: level.description,
        tdee: Math.round(bmrMifflin * parseFloat(level.value))
      }));

      // Calculate macronutrient targets (general recommendations)
      const proteinCalories = Math.round(tdee * 0.25); // 25% protein
      const carbCalories = Math.round(tdee * 0.45); // 45% carbs
      const fatCalories = Math.round(tdee * 0.30); // 30% fat

      setResult({
        bmr: {
          mifflin: Math.round(bmrMifflin),
          harris: Math.round(bmrHarris),
          katch: bmrKatch ? Math.round(bmrKatch) : null
        },
        tdee: Math.round(tdee),
        tdeeComparison,
        macros: {
          protein: { calories: proteinCalories, grams: Math.round(proteinCalories / 4) },
          carbs: { calories: carbCalories, grams: Math.round(carbCalories / 4) },
          fat: { calories: fatCalories, grams: Math.round(fatCalories / 9) }
        },
        selectedActivity: activityLevels.find(l => l.value === formData.activityLevel)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const validateForm = () => {
    const requiredFields = ["weight", "age", "gender", "activityLevel"];
    const heightValid = formData.heightUnit === "ft" ? 
      (formData.feet && formData.inches) : formData.height;
    
    return requiredFields.every(field => formData[field]) && heightValid;
  };

  const resetForm = () => {
    setFormData({
      weight: "",
      weightUnit: "kg",
      height: "",
      heightUnit: "cm",
      feet: "",
      inches: "",
      age: "",
      gender: "",
      activityLevel: "",
      bodyFat: "",
      workoutIntensity: "",
      workoutDuration: "",
      workoutFrequency: "",
      jobActivity: "",
      sportsActivity: ""
    });
    setResult(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
      {/* Educational Header Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Accurate TDEE Calculator 2025
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate your Total Daily Energy Expenditure with precision using advanced metabolic science. 
            Get personalized calorie requirements for optimal weight management and fitness goals.
          </p>
        </div>

        {/* Key Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 md:p-6 rounded-xl border border-blue-500/20">
            <Activity className="h-8 w-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Precise Activity Tracking</h3>
            <p className="text-sm text-gray-300">Advanced activity multipliers including detailed workout intensity analysis</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 md:p-6 rounded-xl border border-green-500/20">
            <Zap className="h-8 w-8 text-green-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Complete Energy Analysis</h3>
            <p className="text-sm text-gray-300">Full breakdown of BMR, activity calories, and macro nutrient targets</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 md:p-6 rounded-xl border border-purple-500/20">
            <Award className="h-8 w-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Research-Based</h3>
            <p className="text-sm text-gray-300">Uses validated BMR formulas and evidence-based activity factors</p>
          </div>
        </div>
      </div>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mr-4">
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-white">TDEE Calculator</CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Calculate your Total Daily Energy Expenditure with precision using advanced metabolic science
              </CardDescription>
            </div>
          </div>
          
          <Tabs value={mode} onValueChange={setMode} className="mb-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="basic" className="text-gray-300">Basic Mode</TabsTrigger>
              <TabsTrigger value="advanced" className="text-gray-300">Advanced Mode</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Weight Input */}
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-gray-200">Weight *</Label>
              <div className="flex gap-2">
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white flex-1 h-11 sm:h-10"
                />
                <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange("weightUnit", value)}>
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

            {/* Height Input */}
            <div className="space-y-2">
              <Label htmlFor="height" className="text-gray-200">Height *</Label>
              <div className="flex gap-2">
                {formData.heightUnit === "cm" ? (
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter height"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white flex-1 h-11 sm:h-10"
                  />
                ) : (
                  <div className="flex gap-1 flex-1">
                    <Input
                      type="number"
                      placeholder="ft"
                      value={formData.feet}
                      onChange={(e) => handleInputChange("feet", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
                    />
                    <Input
                      type="number"
                      placeholder="in"
                      value={formData.inches}
                      onChange={(e) => handleInputChange("inches", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
                    />
                  </div>
                )}
                <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange("heightUnit", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-16 sm:w-20 h-11 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="ft">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Age Input */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-200">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
              />
            </div>

            {/* Gender Input */}
            <div className="space-y-2">
              <Label className="text-gray-200">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
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

          {/* Activity Level Selection */}
          <div className="space-y-2">
            <Label className="text-gray-200">Activity Level *</Label>
            <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {(mode === "advanced" ? detailedActivityLevels : basicActivityLevels).map((level) => (
                  <SelectItem key={level.value} value={level.value} className="py-3">
                    <div>
                      <div className="font-medium">{level.label} ({level.value}x)</div>
                      <div className="text-sm text-gray-400">{level.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Mode Fields */}
          {mode === "advanced" && (
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Advanced Activity Analysis</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bodyFat" className="text-gray-200">Body Fat % (for Katch-McArdle)</Label>
                  <Input
                    id="bodyFat"
                    type="number"
                    placeholder="Enter body fat %"
                    value={formData.bodyFat}
                    onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Workout Intensity</Label>
                  <Select value={formData.workoutIntensity} onValueChange={(value) => handleInputChange("workoutIntensity", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {workoutIntensities.map((intensity) => (
                        <SelectItem key={intensity.value} value={intensity.value} className="py-3">
                          <div>
                            <div className="font-medium">{intensity.label}</div>
                            <div className="text-sm text-gray-400">{intensity.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workoutFrequency" className="text-gray-200">Workout Frequency (days/week)</Label>
                  <Input
                    id="workoutFrequency"
                    type="number"
                    placeholder="Days per week"
                    min="0"
                    max="7"
                    value={formData.workoutFrequency}
                    onChange={(e) => handleInputChange("workoutFrequency", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workoutDuration" className="text-gray-200">Workout Duration (minutes)</Label>
                  <Input
                    id="workoutDuration"
                    type="number"
                    placeholder="Minutes per session"
                    value={formData.workoutDuration}
                    onChange={(e) => handleInputChange("workoutDuration", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              onClick={calculateTDEE}
              disabled={!validateForm() || isCalculating}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 h-12 sm:h-11 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Activity className="h-5 w-5 mr-2" />
                  Calculate TDEE
                </>
              )}
            </Button>
            
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 h-12 sm:h-11"
            >
              Reset Form
            </Button>
          </div>

          {!validateForm() && (
            <Alert className="bg-yellow-900/20 border-yellow-800/50">
              <Info className="h-4 w-4 text-yellow-400" />
              <AlertTitle className="text-yellow-300">Missing Information</AlertTitle>
              <AlertDescription className="text-yellow-200">
                Please fill in all required fields marked with *.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="mt-8 bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Zap className="h-6 w-6 text-blue-400 mr-2" />
              Your Total Daily Energy Expenditure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary TDEE Result */}
            <div className="text-center bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 md:p-8 rounded-xl border border-blue-800/50">
              <div className="text-4xl md:text-5xl font-bold text-blue-300 mb-2">{result.tdee}</div>
              <div className="text-xl text-blue-200 font-semibold mb-2">Daily Calories (TDEE)</div>
              <div className="text-gray-400">
                Total energy expenditure including all activities
              </div>
            </div>

            {/* BMR vs TDEE Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-red-900/20 p-4 md:p-6 rounded-xl border border-red-800/50 text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-300 mb-2">{result.bmr.mifflin}</div>
                <div className="text-red-200 font-semibold mb-1">Basal Metabolic Rate</div>
                <div className="text-sm text-gray-400">Calories burned at rest</div>
              </div>

              <div className="bg-green-900/20 p-4 md:p-6 rounded-xl border border-green-800/50 text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-300 mb-2">
                  {Math.round(result.tdee - result.bmr.mifflin)}
                </div>
                <div className="text-green-200 font-semibold mb-1">Activity Calories</div>
                <div className="text-sm text-gray-400">Calories from exercise & movement</div>
              </div>
            </div>

            {/* Activity Level Comparison */}
            <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">TDEE by Activity Level</h3>
              <div className="space-y-3">
                {result.tdeeComparison.map((comparison, index) => (
                  <div 
                    key={index} 
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      comparison.label === result.selectedActivity?.label
                        ? "bg-blue-900/30 border border-blue-700/50"
                        : "bg-gray-700/30 border border-gray-600/30"
                    }`}
                  >
                    <div>
                      <div className={`font-medium ${
                        comparison.label === result.selectedActivity?.label ? "text-blue-200" : "text-white"
                      }`}>
                        {comparison.label}
                        {comparison.label === result.selectedActivity?.label && (
                          <span className="ml-2 text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{comparison.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-300">
                        {comparison.tdee} <span className="text-sm text-gray-400">cal/day</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Macronutrient Breakdown */}
            <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recommended Macronutrient Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                  <div className="text-2xl font-bold text-green-300">{result.macros.protein.grams}g</div>
                  <div className="text-green-200 font-medium">Protein (25%)</div>
                  <div className="text-sm text-gray-400">{result.macros.protein.calories} calories</div>
                </div>

                <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-800/30">
                  <div className="text-2xl font-bold text-orange-300">{result.macros.carbs.grams}g</div>
                  <div className="text-orange-200 font-medium">Carbs (45%)</div>
                  <div className="text-sm text-gray-400">{result.macros.carbs.calories} calories</div>
                </div>

                <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="text-2xl font-bold text-yellow-300">{result.macros.fat.grams}g</div>
                  <div className="text-yellow-200 font-medium">Fat (30%)</div>
                  <div className="text-sm text-gray-400">{result.macros.fat.calories} calories</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <Alert className="bg-blue-900/20 border-blue-800/50">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-blue-300">TDEE Usage Guidelines</AlertTitle>
              <AlertDescription className="text-blue-200">
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Use your TDEE as maintenance calories to maintain current weight</li>
                  <li>Create a 500-calorie deficit (TDEE - 500) for 1 lb/week weight loss</li>
                  <li>Add 300-500 calories (TDEE + 300-500) for lean muscle gain</li>
                  <li>Recalculate every 4-6 weeks as your weight changes</li>
                  <li>Track your results and adjust if needed - individual variation is normal</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Educational Content Section */}
      <div className="mt-12 space-y-8">
        <Card className="bg-gray-900/30 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <BookOpen className="h-6 w-6 text-blue-400 mr-2" />
              Understanding TDEE: Complete Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-gray max-w-none">
              <h3 className="text-xl font-semibold text-white mb-3">What is TDEE?</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a 24-hour period. 
                It includes your Basal Metabolic Rate (BMR) plus all calories burned through physical activity, digestion, 
                and maintaining body temperature. TDEE represents your complete daily caloric needs.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Components of TDEE</h3>
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-red-300 mb-2">1. Basal Metabolic Rate (BMR) - 60-75%</h4>
                  <p className="text-gray-300 text-sm">
                    The calories your body burns at rest for essential functions like breathing, circulation, 
                    cell production, nutrient processing, and brain function. This is the largest component of TDEE.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">2. Thermic Effect of Food (TEF) - 8-10%</h4>
                  <p className="text-gray-300 text-sm">
                    Energy required to digest, absorb, metabolize, and store food. Protein has the highest 
                    thermic effect (20-30%), followed by carbs (5-10%) and fats (0-5%).
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">3. Exercise Activity Thermogenesis (EAT) - 15-30%</h4>
                  <p className="text-gray-300 text-sm">
                    Calories burned during planned exercise and sports activities. This is the most variable 
                    component and the one you have the most control over.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">4. Non-Exercise Activity Thermogenesis (NEAT) - 15-30%</h4>
                  <p className="text-gray-300 text-sm">
                    Energy expended for activities that are not sleeping, eating, or sports-like exercise. 
                    Includes fidgeting, maintaining posture, and other activities of daily living.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">TDEE Activity Multipliers Explained</h3>
              <div className="bg-gray-800/50 p-4 rounded-xl">
                <ul className="space-y-2 text-gray-300">
                  <li><strong>Sedentary (1.2):</strong> Desk job, no regular exercise, minimal daily movement</li>
                  <li><strong>Lightly Active (1.375):</strong> Desk job + light exercise 1-3 times per week</li>
                  <li><strong>Moderately Active (1.55):</strong> Moderate exercise 3-5 times per week</li>
                  <li><strong>Very Active (1.725):</strong> Hard exercise 6-7 times per week or physical job</li>
                  <li><strong>Extremely Active (1.9):</strong> Very hard exercise daily + physical job or 2x/day training</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">How to Use Your TDEE</h3>
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 rounded-xl border border-blue-800/50">
                <ul className="space-y-2 text-gray-300">
                  <li><strong>Weight Maintenance:</strong> Eat calories equal to your TDEE</li>
                  <li><strong>Weight Loss:</strong> Eat 300-500 calories below TDEE (0.5-1 lb/week loss)</li>
                  <li><strong>Weight Gain:</strong> Eat 200-500 calories above TDEE (0.5-1 lb/week gain)</li>
                  <li><strong>Body Recomposition:</strong> Eat at or slightly below TDEE with strength training</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-gray-900/30 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Users className="h-6 w-6 text-green-400 mr-2" />
              TDEE Calculator FAQ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">How accurate is the TDEE calculator?</h3>
                <p className="text-gray-300">
                  TDEE calculators provide estimates with ±15-20% accuracy for most people. Individual factors like 
                  genetics, muscle mass, metabolic health, and activity efficiency can affect your actual TDEE. 
                  Use the calculation as a starting point and adjust based on real-world results over 2-3 weeks.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">Should I choose the basic or advanced mode?</h3>
                <p className="text-gray-300">
                  Use basic mode if you have a consistent activity level. Choose advanced mode if you have varying 
                  workout intensities, know your body fat percentage, or want more detailed activity analysis. 
                  Advanced mode provides more personalized results for serious athletes and fitness enthusiasts.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">What if I'm between activity levels?</h3>
                <p className="text-gray-300">
                  Choose the level that best represents your average weekly activity. If you're between sedentary 
                  and lightly active, start with the lower level and monitor your weight for 2-3 weeks. 
                  It's easier to increase calories than to reduce them if you overshoot initially.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">How often should I recalculate my TDEE?</h3>
                <p className="text-gray-300">
                  Recalculate every 4-6 weeks or when your weight changes by 5+ pounds. Also recalculate if your 
                  activity level significantly changes (new job, different workout routine, injury, etc.). 
                  Your TDEE decreases as you lose weight and increases as you gain weight.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">Can I trust my fitness tracker's calorie burn?</h3>
                <p className="text-gray-300">
                  Fitness trackers can overestimate calorie burn by 15-25%, especially for strength training. 
                  Use your calculated TDEE as the primary guide and treat tracker calories as supplementary data. 
                  Focus on consistent tracking and real-world weight changes rather than exact calorie numbers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TDEECalculator;