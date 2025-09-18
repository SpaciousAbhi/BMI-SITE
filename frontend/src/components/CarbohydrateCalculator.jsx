import React, { useState } from "react";
import { Wheat, Info, TrendingUp, Target, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const CarbohydrateCalculator = () => {
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
    goal: "",
    // Advanced mode fields
    workoutIntensity: "",
    workoutDuration: "",
    workoutFrequency: "",
    diabetic: "",
    insulinSensitivity: "",
    carbTiming: ""
  });

  const activityLevels = [
    { value: "1.2", label: "Sedentary", description: "Little/no exercise, desk job", carbMultiplier: 3 },
    { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week", carbMultiplier: 4 },
    { value: "1.55", label: "Moderately Active", description: "Moderate exercise 3-5 days/week", carbMultiplier: 5 },
    { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week", carbMultiplier: 6 },
    { value: "1.9", label: "Extremely Active", description: "Very hard exercise, physical job", carbMultiplier: 7 }
  ];

  const goals = [
    { value: "maintain", label: "Maintain Weight", carbAdjustment: 0, description: "Keep current weight stable" },
    { value: "lose", label: "Weight Loss", carbAdjustment: -1, description: "Reduce carbs for fat loss" },
    { value: "gain", label: "Weight/Muscle Gain", carbAdjustment: 1, description: "Higher carbs for muscle building" },
    { value: "performance", label: "Athletic Performance", carbAdjustment: 2, description: "Optimal carbs for performance" },
    { value: "keto", label: "Ketogenic Diet", carbAdjustment: -3, description: "Very low carb intake" }
  ];

  const workoutIntensities = [
    { value: "low", label: "Low Intensity", multiplier: 1.0, description: "Walking, light yoga" },
    { value: "moderate", label: "Moderate Intensity", multiplier: 1.3, description: "Jogging, cycling" },
    { value: "high", label: "High Intensity", multiplier: 1.6, description: "HIIT, intense cardio" },
    { value: "extreme", label: "Extreme Intensity", multiplier: 2.0, description: "Professional training" }
  ];

  const carbMethods = [
    {
      name: "General Recommendation",
      description: "45-65% of total calories from carbs (Dietary Guidelines)",
      recommended: true
    },
    {
      name: "Athletic Performance",
      description: "5-12g per kg body weight (Sports Nutrition)",
      recommended: false
    },
    {
      name: "Low Carb Approach",
      description: "20-30% of total calories from carbs",
      recommended: false
    },
    {
      name: "Ketogenic Approach",
      description: "5-10% of total calories from carbs",
      recommended: false
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMR = (weight, height, age, gender) => {
    const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
    const heightInCm = formData.heightUnit === "ft" ? 
      (parseInt(formData.feet) * 30.48) + (parseInt(formData.inches) * 2.54) : height;

    // Using Mifflin-St Jeor (most accurate)
    return gender === "male" 
      ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5
      : (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
  };

  const calculateCarbs = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      const activityMultiplier = parseFloat(formData.activityLevel);
      const selectedActivity = activityLevels.find(a => a.value === formData.activityLevel);
      const selectedGoal = goals.find(g => g.value === formData.goal);

      // Calculate BMR and TDEE
      const bmr = calculateBMR(weight, height, age, formData.gender);
      const tdee = bmr * activityMultiplier;

      const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;

      // Calculate carbs using different methods
      const methods = {};

      // Method 1: General Recommendation (45-65% of calories)
      const generalLow = Math.round((tdee * 0.45) / 4); // 45% of calories / 4 cal per gram
      const generalHigh = Math.round((tdee * 0.65) / 4); // 65% of calories / 4 cal per gram
      methods.general = {
        low: generalLow,
        high: generalHigh,
        average: Math.round((generalLow + generalHigh) / 2)
      };

      // Method 2: Athletic Performance (5-12g per kg)
      const athleticLow = Math.round(weightInKg * 5);
      const athleticHigh = Math.round(weightInKg * 12);
      methods.athletic = {
        low: athleticLow,
        high: athleticHigh,
        average: Math.round((athleticLow + athleticHigh) / 2)
      };

      // Method 3: Low Carb (20-30% of calories)
      const lowCarbLow = Math.round((tdee * 0.20) / 4);
      const lowCarbHigh = Math.round((tdee * 0.30) / 4);
      methods.lowCarb = {
        low: lowCarbLow,
        high: lowCarbHigh,
        average: Math.round((lowCarbLow + lowCarbHigh) / 2)
      };

      // Method 4: Ketogenic (5-10% of calories)
      const ketoLow = Math.round((tdee * 0.05) / 4);
      const ketoHigh = Math.round((tdee * 0.10) / 4);
      methods.keto = {
        low: ketoLow,
        high: ketoHigh,
        average: Math.round((ketoLow + ketoHigh) / 2)
      };

      // Adjust based on goal
      let recommendedCarbs = methods.general.average;
      let recommendedMethod = "general";

      switch (formData.goal) {
        case "lose":
          recommendedCarbs = methods.lowCarb.average;
          recommendedMethod = "lowCarb";
          break;
        case "gain":
        case "performance":
          recommendedCarbs = methods.athletic.low;
          recommendedMethod = "athletic";
          break;
        case "keto":
          recommendedCarbs = methods.keto.average;
          recommendedMethod = "keto";
          break;
        default:
          break;
      }

      // Advanced adjustments
      if (mode === "advanced" && formData.workoutIntensity && formData.workoutFrequency) {
        const intensity = workoutIntensities.find(w => w.value === formData.workoutIntensity);
        const frequency = parseInt(formData.workoutFrequency) || 0;
        
        if (intensity && frequency > 0) {
          const intensityAdjustment = (intensity.multiplier - 1) * (frequency / 7) * 50;
          recommendedCarbs = Math.round(recommendedCarbs + intensityAdjustment);
        }
      }

      // Calculate carb timing recommendations
      const carbTiming = {
        preWorkout: Math.round(recommendedCarbs * 0.25), // 25% pre-workout
        postWorkout: Math.round(recommendedCarbs * 0.35), // 35% post-workout
        breakfast: Math.round(recommendedCarbs * 0.20), // 20% breakfast
        lunch: Math.round(recommendedCarbs * 0.15), // 15% lunch
        dinner: Math.round(recommendedCarbs * 0.05)  // 5% dinner
      };

      // Calculate different carb sources
      const carbSources = {
        complex: Math.round(recommendedCarbs * 0.70), // 70% complex carbs
        simple: Math.round(recommendedCarbs * 0.20),  // 20% simple carbs
        fiber: Math.round(recommendedCarbs * 0.10)    // 10% fiber-rich
      };

      setResult({
        recommendedCarbs,
        recommendedMethod,
        methods,
        carbTiming,
        carbSources,
        tdee: Math.round(tdee),
        bmr: Math.round(bmr),
        carbCalories: recommendedCarbs * 4,
        carbPercentage: Math.round((recommendedCarbs * 4 / tdee) * 100),
        carbPerKg: (recommendedCarbs / weightInKg).toFixed(1),
        selectedGoal,
        selectedActivity,
        recommendations: generateRecommendations(formData.goal, recommendedCarbs, formData.diabetic)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const generateRecommendations = (goal, carbGrams, diabetic) => {
    const recommendations = [];

    if (diabetic === "yes") {
      recommendations.push({
        type: "warning",
        title: "Diabetes Considerations",
        message: "Consult your healthcare provider before making significant carbohydrate changes. Monitor blood glucose closely."
      });
    }

    if (goal === "keto" && carbGrams > 50) {
      recommendations.push({
        type: "info",
        title: "Ketogenic Guidelines",
        message: "For ketosis, aim for under 50g carbs daily. Consider gradually reducing carbs over 2-3 weeks."
      });
    }

    if (goal === "performance" || goal === "gain") {
      recommendations.push({
        type: "success",
        title: "Performance Optimization",
        message: "Time your carbs around workouts: 1-2 hours before and within 30 minutes after training for optimal performance and recovery."
      });
    }

    recommendations.push({
      type: "info",
      title: "Carb Quality Matters",
      message: "Prioritize whole grains, fruits, vegetables, and legumes. Limit refined sugars and processed carbohydrates."
    });

    return recommendations;
  };

  const validateForm = () => {
    const requiredFields = ["weight", "age", "gender", "activityLevel", "goal"];
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
      goal: "",
      workoutIntensity: "",
      workoutDuration: "",
      workoutFrequency: "",
      diabetic: "",
      insulinSensitivity: "",
      carbTiming: ""
    });
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 mr-4">
              <Wheat className="h-8 w-8 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-white">Carbohydrate Calculator</CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Calculate your optimal daily carbohydrate intake based on activity level and goals
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                />
                <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange("weightUnit", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-16 sm:w-20">
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
                    className="bg-gray-800 border-gray-700 text-white flex-1"
                  />
                ) : (
                  <div className="flex gap-1 flex-1">
                    <Input
                      type="number"
                      placeholder="ft"
                      value={formData.feet}
                      onChange={(e) => handleInputChange("feet", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <Input
                      type="number"
                      placeholder="in"
                      value={formData.inches}
                      onChange={(e) => handleInputChange("inches", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                )}
                <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange("heightUnit", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-16 sm:w-20">
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
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Gender Input */}
            <div className="space-y-2">
              <Label className="text-gray-200">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <Label className="text-gray-200">Activity Level *</Label>
            <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value} className="py-3">
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-sm text-gray-400">{level.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Goal Selection */}
          <div className="space-y-2">
            <Label className="text-gray-200">Primary Goal *</Label>
            <Select value={formData.goal} onValueChange={(value) => handleInputChange("goal", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {goals.map((goal) => (
                  <SelectItem key={goal.value} value={goal.value} className="py-3">
                    <div>
                      <div className="font-medium">{goal.label}</div>
                      <div className="text-sm text-gray-400">{goal.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Mode Fields */}
          {mode === "advanced" && (
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Advanced Carbohydrate Planning</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-200">Workout Intensity</Label>
                  <Select value={formData.workoutIntensity} onValueChange={(value) => handleInputChange("workoutIntensity", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
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
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Diabetic Status</Label>
                  <Select value={formData.diabetic} onValueChange={(value) => handleInputChange("diabetic", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="no">No diabetes</SelectItem>
                      <SelectItem value="prediabetic">Pre-diabetic</SelectItem>
                      <SelectItem value="type1">Type 1 diabetic</SelectItem>
                      <SelectItem value="type2">Type 2 diabetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Insulin Sensitivity</Label>
                  <Select value={formData.insulinSensitivity} onValueChange={(value) => handleInputChange("insulinSensitivity", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select sensitivity" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="high">High (handles carbs well)</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low (sensitive to carbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              onClick={calculateCarbs}
              disabled={!validateForm() || isCalculating}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Wheat className="h-5 w-5 mr-2" />
                  Calculate Carbs
                </>
              )}
            </Button>
            
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
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
              <Zap className="h-6 w-6 text-amber-400 mr-2" />
              Your Daily Carbohydrate Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary Carb Recommendation */}
            <div className="text-center bg-gradient-to-r from-amber-900/20 to-orange-900/20 p-8 rounded-xl border border-amber-800/50">
              <div className="text-5xl font-bold text-amber-300 mb-2">{result.recommendedCarbs}g</div>
              <div className="text-xl text-amber-200 font-semibold mb-2">Daily Carbohydrates</div>
              <div className="text-gray-400">
                {result.carbCalories} calories ({result.carbPercentage}% of total calories)
              </div>
              <div className="text-sm text-amber-400 mt-2">
                {result.carbPerKg}g per kg body weight
              </div>
            </div>

            {/* Method Comparison */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Carbohydrate Calculation Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {carbMethods.map((method, index) => {
                  const methodKey = Object.keys(result.methods)[index];
                  const methodData = result.methods[methodKey];
                  const isRecommended = result.recommendedMethod === methodKey;
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        isRecommended
                          ? "border-amber-500 bg-amber-900/20"
                          : "border-gray-600 bg-gray-700/20"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white text-sm">{method.name}</h4>
                        {(method.recommended || isRecommended) && (
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                            {isRecommended ? "Selected" : "Recommended"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{method.description}</p>
                      <div className="text-center">
                        <div className="text-lg font-bold text-amber-300">
                          {methodData.low}-{methodData.high}g
                        </div>
                        <div className="text-xs text-gray-400">Range</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carb Timing */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Optimal Carb Timing</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(result.carbTiming).map(([timing, grams]) => (
                  <div key={timing} className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <div className="text-lg font-bold text-amber-300">{grams}g</div>
                    <div className="text-sm text-gray-300 capitalize">{timing.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-400">
                * Timing recommendations based on training schedule and metabolic optimization
              </div>
            </div>

            {/* Carb Sources */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recommended Carb Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                  <div className="text-2xl font-bold text-green-300">{result.carbSources.complex}g</div>
                  <div className="text-green-200 font-medium">Complex Carbs (70%)</div>
                  <div className="text-xs text-gray-400 mt-2">Whole grains, vegetables, legumes</div>
                </div>

                <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-800/30">
                  <div className="text-2xl font-bold text-orange-300">{result.carbSources.simple}g</div>
                  <div className="text-orange-200 font-medium">Simple Carbs (20%)</div>
                  <div className="text-xs text-gray-400 mt-2">Fruits, pre/post workout</div>
                </div>

                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <div className="text-2xl font-bold text-blue-300">{result.carbSources.fiber}g</div>
                  <div className="text-blue-200 font-medium">High Fiber (10%)</div>
                  <div className="text-xs text-gray-400 mt-2">Vegetables, beans, berries</div>
                </div>
              </div>
            </div>

            {/* Food Examples */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Carb-Rich Food Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-green-300 mb-3">Complex Carbs (25-30g per serving)</h4>
                  <div className="space-y-1">
                    {["1 cup brown rice", "1 large sweet potato", "1 cup oatmeal", "2 slices whole wheat bread", "1 cup quinoa"].map((food, index) => (
                      <div key={index} className="text-sm text-gray-300 bg-green-900/10 px-3 py-1 rounded">
                        {food}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-300 mb-3">Simple Carbs (15-20g per serving)</h4>
                  <div className="space-y-1">
                    {["1 medium banana", "1 cup berries", "1 medium apple", "2 dates", "1 cup grapes"].map((food, index) => (
                      <div key={index} className="text-sm text-gray-300 bg-orange-900/10 px-3 py-1 rounded">
                        {food}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-300 mb-3">High Fiber (5-10g per serving)</h4>
                  <div className="space-y-1">
                    {["1 cup broccoli", "1 cup Brussels sprouts", "1/2 cup black beans", "1 medium artichoke", "1 cup raspberries"].map((food, index) => (
                      <div key={index} className="text-sm text-gray-300 bg-blue-900/10 px-3 py-1 rounded">
                        {food}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <Alert
                  key={index}
                  className={`${
                    rec.type === "warning"
                      ? "bg-yellow-900/20 border-yellow-800/50"
                      : rec.type === "success"
                      ? "bg-green-900/20 border-green-800/50"
                      : "bg-blue-900/20 border-blue-800/50"
                  }`}
                >
                  <TrendingUp className={`h-4 w-4 ${
                    rec.type === "warning"
                      ? "text-yellow-400"
                      : rec.type === "success"
                      ? "text-green-400"
                      : "text-blue-400"
                  }`} />
                  <AlertTitle className={`${
                    rec.type === "warning"
                      ? "text-yellow-300"
                      : rec.type === "success"
                      ? "text-green-300"
                      : "text-blue-300"
                  }`}>
                    {rec.title}
                  </AlertTitle>
                  <AlertDescription className={`${
                    rec.type === "warning"
                      ? "text-yellow-200"
                      : rec.type === "success"
                      ? "text-green-200"
                      : "text-blue-200"
                  }`}>
                    {rec.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarbohydrateCalculator;