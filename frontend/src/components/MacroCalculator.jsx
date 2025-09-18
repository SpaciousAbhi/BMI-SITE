import React, { useState } from "react";
import { Target, Info, TrendingUp, PieChart, Utensils } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";

const MacroCalculator = () => {
  const [mode, setMode] = useState("basic");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [macroPreset, setMacroPreset] = useState("balanced");
  const [customMacros, setCustomMacros] = useState({ protein: 25, carbs: 45, fat: 30 });
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
    bodyFat: "",
    fitnessGoal: "",
    dietaryPreference: "",
    workoutType: "",
    bodyType: ""
  });

  const macroPresets = [
    {
      value: "balanced",
      label: "Balanced (General Health)",
      protein: 25,
      carbs: 45,
      fat: 30,
      description: "Well-rounded approach for general health and maintenance",
      recommended: true
    },
    {
      value: "highProtein",
      label: "High Protein (Muscle Building)",
      protein: 35,
      carbs: 35,
      fat: 30,
      description: "Optimal for muscle building and strength training"
    },
    {
      value: "lowCarb",
      label: "Low Carb (Fat Loss)",
      protein: 30,
      carbs: 20,
      fat: 50,
      description: "Effective for fat loss and metabolic health"
    },
    {
      value: "highCarb",
      label: "High Carb (Endurance)",
      protein: 20,
      carbs: 60,
      fat: 20,
      description: "Ideal for endurance athletes and high-intensity training"
    },
    {
      value: "keto",
      label: "Ketogenic",
      protein: 25,
      carbs: 5,
      fat: 70,
      description: "Very low carb for ketosis and rapid fat loss"
    },
    {
      value: "mediterranean",
      label: "Mediterranean",
      protein: 20,
      carbs: 45,
      fat: 35,
      description: "Heart-healthy approach with moderate healthy fats"
    }
  ];

  const activityLevels = [
    { value: "1.2", label: "Sedentary", description: "Little/no exercise" },
    { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    { value: "1.55", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
    { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
    { value: "1.9", label: "Extremely Active", description: "Very hard exercise, physical job" }
  ];

  const goals = [
    { value: "maintain", label: "Maintain Weight", modifier: 0, description: "Keep current weight stable" },
    { value: "lose0.5", label: "Lose 0.5 kg/week", modifier: -250, description: "Gradual weight loss" },
    { value: "lose1", label: "Lose 1 kg/week", modifier: -500, description: "Moderate weight loss" },
    { value: "gain0.5", label: "Gain 0.5 kg/week", modifier: 250, description: "Lean muscle building" },
    { value: "gain1", label: "Gain 1 kg/week", modifier: 500, description: "Aggressive muscle building" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMacroPresetChange = (preset) => {
    setMacroPreset(preset);
    if (preset !== "custom") {
      const selectedPreset = macroPresets.find(p => p.value === preset);
      setCustomMacros({
        protein: selectedPreset.protein,
        carbs: selectedPreset.carbs,
        fat: selectedPreset.fat
      });
    }
  };

  const handleCustomMacroChange = (macro, value) => {
    setCustomMacros(prev => {
      const newMacros = { ...prev, [macro]: value[0] };
      // Ensure total equals 100%
      const total = newMacros.protein + newMacros.carbs + newMacros.fat;
      if (total !== 100) {
        // Adjust other macros proportionally
        const remaining = 100 - value[0];
        const otherMacros = Object.keys(newMacros).filter(key => key !== macro);
        const otherTotal = otherMacros.reduce((sum, key) => sum + prev[key], 0);
        
        otherMacros.forEach(key => {
          newMacros[key] = Math.round((prev[key] / otherTotal) * remaining);
        });
      }
      return newMacros;
    });
    setMacroPreset("custom");
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

  const calculateMacros = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      const activityMultiplier = parseFloat(formData.activityLevel);
      const goalModifier = goals.find(g => g.value === formData.goal)?.modifier || 0;

      // Calculate BMR and TDEE
      const bmr = calculateBMR(weight, height, age, formData.gender);
      const tdee = bmr * activityMultiplier;
      const targetCalories = tdee + goalModifier;

      // Get macro ratios
      const macroRatios = macroPreset === "custom" ? customMacros : 
        macroPresets.find(p => p.value === macroPreset);

      // Calculate macronutrients in grams
      const proteinCalories = Math.round(targetCalories * (macroRatios.protein / 100));
      const carbCalories = Math.round(targetCalories * (macroRatios.carbs / 100));
      const fatCalories = Math.round(targetCalories * (macroRatios.fat / 100));

      const proteinGrams = Math.round(proteinCalories / 4);
      const carbGrams = Math.round(carbCalories / 4);
      const fatGrams = Math.round(fatCalories / 9);

      // Calculate protein per kg body weight
      const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
      const proteinPerKg = (proteinGrams / weightInKg).toFixed(1);

      // Generate meal distribution
      const mealDistribution = {
        breakfast: {
          protein: Math.round(proteinGrams * 0.25),
          carbs: Math.round(carbGrams * 0.25),
          fat: Math.round(fatGrams * 0.25),
          calories: Math.round(targetCalories * 0.25)
        },
        lunch: {
          protein: Math.round(proteinGrams * 0.30),
          carbs: Math.round(carbGrams * 0.35),
          fat: Math.round(fatGrams * 0.30),
          calories: Math.round(targetCalories * 0.30)
        },
        dinner: {
          protein: Math.round(proteinGrams * 0.30),
          carbs: Math.round(carbGrams * 0.25),
          fat: Math.round(fatGrams * 0.30),
          calories: Math.round(targetCalories * 0.30)
        },
        snacks: {
          protein: Math.round(proteinGrams * 0.15),
          carbs: Math.round(carbGrams * 0.15),
          fat: Math.round(fatGrams * 0.15),
          calories: Math.round(targetCalories * 0.15)
        }
      };

      // Generate food recommendations
      const foodRecommendations = generateFoodRecommendations(macroPreset, formData.dietaryPreference);

      setResult({
        targetCalories: Math.round(targetCalories),
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        macros: {
          protein: { grams: proteinGrams, calories: proteinCalories, percentage: macroRatios.protein },
          carbs: { grams: carbGrams, calories: carbCalories, percentage: macroRatios.carbs },
          fat: { grams: fatGrams, calories: fatCalories, percentage: macroRatios.fat }
        },
        proteinPerKg,
        selectedPreset: macroPresets.find(p => p.value === macroPreset) || { label: "Custom", description: "Custom macro distribution" },
        mealDistribution,
        foodRecommendations
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const generateFoodRecommendations = (preset, dietaryPreference) => {
    const recommendations = {
      protein: [],
      carbs: [],
      fat: []
    };

    // Protein sources
    if (dietaryPreference === "vegetarian" || dietaryPreference === "vegan") {
      recommendations.protein = ["Lentils", "Chickpeas", "Tofu", "Tempeh", "Quinoa", "Greek yogurt", "Eggs"];
      if (dietaryPreference === "vegan") {
        recommendations.protein = recommendations.protein.filter(item => !["Greek yogurt", "Eggs"].includes(item));
        recommendations.protein.push("Nutritional yeast", "Hemp seeds", "Spirulina");
      }
    } else {
      recommendations.protein = ["Chicken breast", "Salmon", "Lean beef", "Turkey", "Eggs", "Greek yogurt", "Cottage cheese", "Tuna"];
    }

    // Carbohydrate sources
    if (preset === "keto" || preset === "lowCarb") {
      recommendations.carbs = ["Leafy greens", "Broccoli", "Cauliflower", "Zucchini", "Bell peppers", "Asparagus"];
    } else {
      recommendations.carbs = ["Brown rice", "Quinoa", "Sweet potatoes", "Oats", "Whole wheat bread", "Fruits", "Vegetables"];
    }

    // Fat sources
    if (preset === "keto") {
      recommendations.fat = ["Avocado", "MCT oil", "Olive oil", "Nuts", "Seeds", "Fatty fish", "Coconut oil", "Butter"];
    } else {
      recommendations.fat = ["Avocado", "Olive oil", "Nuts", "Seeds", "Fatty fish", "Nut butters"];
    }

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
      bodyFat: "",
      fitnessGoal: "",
      dietaryPreference: "",
      workoutType: "",
      bodyType: ""
    });
    setResult(null);
    setMacroPreset("balanced");
    setCustomMacros({ protein: 25, carbs: 45, fat: 30 });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 mr-4">
              <PieChart className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-white">Macro Calculator</CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Calculate your optimal macronutrient distribution for your specific goals
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
            <Label className="text-gray-200">Goal *</Label>
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

          {/* Macro Preset Selection */}
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <Label className="text-gray-200">Macronutrient Distribution</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {macroPresets.map((preset) => (
                <div
                  key={preset.value}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    macroPreset === preset.value
                      ? "border-green-500 bg-green-900/20"
                      : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                  }`}
                  onClick={() => handleMacroPresetChange(preset.value)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">{preset.label}</h4>
                    {preset.recommended && (
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{preset.description}</p>
                  <div className="text-xs text-gray-300">
                    P: {preset.protein}% | C: {preset.carbs}% | F: {preset.fat}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Macro Sliders */}
          {macroPreset === "custom" && (
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-green-300">Custom Macro Distribution</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-gray-200">Protein</Label>
                    <span className="text-green-300 font-semibold">{customMacros.protein}%</span>
                  </div>
                  <Slider
                    value={[customMacros.protein]}
                    onValueChange={(value) => handleCustomMacroChange("protein", value)}
                    max={60}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-gray-200">Carbohydrates</Label>
                    <span className="text-orange-300 font-semibold">{customMacros.carbs}%</span>
                  </div>
                  <Slider
                    value={[customMacros.carbs]}
                    onValueChange={(value) => handleCustomMacroChange("carbs", value)}
                    max={70}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-gray-200">Fat</Label>
                    <span className="text-yellow-300 font-semibold">{customMacros.fat}%</span>
                  </div>
                  <Slider
                    value={[customMacros.fat]}
                    onValueChange={(value) => handleCustomMacroChange("fat", value)}
                    max={70}
                    min={15}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="text-center text-sm text-gray-400">
                  Total: {customMacros.protein + customMacros.carbs + customMacros.fat}%
                </div>
              </div>
            </div>
          )}

          {/* Advanced Mode Fields */}
          {mode === "advanced" && (
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Advanced Nutrition Planning</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-200">Dietary Preference</Label>
                  <Select value={formData.dietaryPreference} onValueChange={(value) => handleInputChange("dietaryPreference", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="omnivore">Omnivore</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="pescatarian">Pescatarian</SelectItem>
                      <SelectItem value="paleo">Paleo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Primary Workout Type</Label>
                  <Select value={formData.workoutType} onValueChange={(value) => handleInputChange("workoutType", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select workout type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="strength">Strength Training</SelectItem>
                      <SelectItem value="cardio">Cardio/Endurance</SelectItem>
                      <SelectItem value="mixed">Mixed Training</SelectItem>
                      <SelectItem value="sports">Sports Specific</SelectItem>
                      <SelectItem value="none">Minimal Exercise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              onClick={calculateMacros}
              disabled={!validateForm() || isCalculating}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <PieChart className="h-5 w-5 mr-2" />
                  Calculate Macros
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
              <Target className="h-6 w-6 text-green-400 mr-2" />
              Your Personalized Macro Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Daily Targets */}
            <div className="text-center bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-8 rounded-xl border border-green-800/50">
              <div className="text-5xl font-bold text-green-300 mb-2">{result.targetCalories}</div>
              <div className="text-xl text-green-200 font-semibold mb-2">Daily Calories</div>
              <div className="text-gray-400">
                {result.selectedPreset.label} Distribution
                {result.selectedPreset.recommended && (
                  <span className="ml-2 text-green-400">• Recommended</span>
                )}
              </div>
            </div>

            {/* Macro Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-900/20 p-6 rounded-xl border border-green-800/50 text-center">
                <div className="text-3xl font-bold text-green-300 mb-2">{result.macros.protein.grams}g</div>
                <div className="text-green-200 font-semibold mb-1">Protein</div>
                <div className="text-sm text-gray-400">{result.macros.protein.calories} cal ({result.macros.protein.percentage}%)</div>
                <div className="text-xs text-green-400 mt-2">{result.proteinPerKg}g per kg body weight</div>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-xl border border-orange-800/50 text-center">
                <div className="text-3xl font-bold text-orange-300 mb-2">{result.macros.carbs.grams}g</div>
                <div className="text-orange-200 font-semibold mb-1">Carbohydrates</div>
                <div className="text-sm text-gray-400">{result.macros.carbs.calories} cal ({result.macros.carbs.percentage}%)</div>
                <div className="text-xs text-orange-400 mt-2">Primary energy source</div>
              </div>

              <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-800/50 text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">{result.macros.fat.grams}g</div>
                <div className="text-yellow-200 font-semibold mb-1">Fat</div>
                <div className="text-sm text-gray-400">{result.macros.fat.calories} cal ({result.macros.fat.percentage}%)</div>
                <div className="text-xs text-yellow-400 mt-2">Essential fatty acids</div>
              </div>
            </div>

            {/* Meal Distribution */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Daily Meal Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(result.mealDistribution).map(([meal, macros]) => (
                  <div key={meal} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <h4 className="font-semibold text-white mb-3 capitalize">{meal}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Calories:</span>
                        <span className="text-white font-medium">{macros.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Protein:</span>
                        <span className="text-green-200">{macros.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-300">Carbs:</span>
                        <span className="text-orange-200">{macros.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Fat:</span>
                        <span className="text-yellow-200">{macros.fat}g</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Recommendations */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recommended Food Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-green-300 mb-3 flex items-center">
                    <Utensils className="h-4 w-4 mr-2" />
                    Protein Sources
                  </h4>
                  <div className="space-y-1">
                    {result.foodRecommendations.protein.map((food, index) => (
                      <div key={index} className="text-sm text-gray-300 bg-green-900/10 px-3 py-1 rounded">
                        {food}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-300 mb-3 flex items-center">
                    <Utensils className="h-4 w-4 mr-2" />
                    Carbohydrate Sources
                  </h4>
                  <div className="space-y-1">
                    {result.foodRecommendations.carbs.map((food, index) => (
                      <div key={index} className="text-sm text-gray-300 bg-orange-900/10 px-3 py-1 rounded">
                        {food}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-300 mb-3 flex items-center">
                    <Utensils className="h-4 w-4 mr-2" />
                    Fat Sources
                  </h4>
                  <div className="space-y-1">
                    {result.foodRecommendations.fat.map((food, index) => (
                      <div key={index} className="text-sm text-gray-300 bg-yellow-900/10 px-3 py-1 rounded">
                        {food}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <Alert className="bg-blue-900/20 border-blue-800/50">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-blue-300">Macro Tracking Tips</AlertTitle>
              <AlertDescription className="text-blue-200">
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Use a food tracking app to monitor your daily macro intake</li>
                  <li>Prioritize whole, unprocessed foods over supplements</li>
                  <li>Adjust portions based on hunger, energy levels, and results</li>
                  <li>Stay hydrated and include fiber-rich foods for optimal digestion</li>
                  <li>Allow for 10-15% flexibility in your daily targets</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MacroCalculator;