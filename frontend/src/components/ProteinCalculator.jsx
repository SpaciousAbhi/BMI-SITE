import React, { useState } from "react";
import { Beef, Info, TrendingUp, Target, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const ProteinCalculator = () => {
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
    bodyFat: "",
    trainingType: "",
    trainingFrequency: "",
    dietaryRestrictions: "",
    kidneyHealth: "",
    proteinTiming: ""
  });

  const activityLevels = [
    { value: "sedentary", label: "Sedentary", proteinMultiplier: 0.8, description: "Little/no exercise" },
    { value: "light", label: "Lightly Active", proteinMultiplier: 1.0, description: "Light exercise 1-3 days/week" },
    { value: "moderate", label: "Moderately Active", proteinMultiplier: 1.2, description: "Moderate exercise 3-5 days/week" },
    { value: "active", label: "Very Active", proteinMultiplier: 1.4, description: "Hard exercise 6-7 days/week" },
    { value: "extreme", label: "Extremely Active", proteinMultiplier: 1.6, description: "Very hard exercise, physical job" }
  ];

  const goals = [
    { value: "maintain", label: "Maintain Weight", proteinAdjustment: 1.0, description: "Keep current weight stable" },
    { value: "lose", label: "Weight Loss", proteinAdjustment: 1.2, description: "Higher protein for muscle preservation" },
    { value: "gain", label: "Muscle Building", proteinAdjustment: 1.4, description: "Optimal protein for muscle growth" },
    { value: "strength", label: "Strength Training", proteinAdjustment: 1.3, description: "Support strength gains" },
    { value: "endurance", label: "Endurance Training", proteinAdjustment: 1.1, description: "Support endurance performance" },
    { value: "recovery", label: "Recovery/Healing", proteinAdjustment: 1.5, description: "Enhanced protein for recovery" }
  ];

  const proteinMethods = [
    {
      name: "RDA Minimum",
      description: "0.8g per kg body weight (general population minimum)",
      recommended: false,
      formula: (weight) => weight * 0.8
    },
    {
      name: "Active Individual",
      description: "1.2-1.6g per kg body weight (moderately active)",
      recommended: true,
      formula: (weight) => weight * 1.4
    },
    {
      name: "Strength Training",
      description: "1.6-2.2g per kg body weight (muscle building)",
      recommended: false,
      formula: (weight) => weight * 1.9
    },
    {
      name: "Elite Athletes",
      description: "2.0-2.5g per kg body weight (professional athletes)",
      recommended: false,
      formula: (weight) => weight * 2.25
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateProtein = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
      
      const selectedActivity = activityLevels.find(a => a.value === formData.activityLevel);
      const selectedGoal = goals.find(g => g.value === formData.goal);

      // Calculate protein using different methods
      const methods = {};
      proteinMethods.forEach(method => {
        methods[method.name.toLowerCase().replace(/\s+/g, '')] = {
          name: method.name,
          description: method.description,
          recommended: method.recommended,
          grams: Math.round(method.formula(weightInKg))
        };
      });

      // Calculate personalized recommendation
      let baseProtein = weightInKg * selectedActivity.proteinMultiplier;
      let adjustedProtein = baseProtein * selectedGoal.proteinAdjustment;

      // Advanced adjustments
      if (mode === "advanced") {
        // Body fat adjustment (leaner individuals need more protein per kg lean mass)
        if (formData.bodyFat) {
          const leanMass = weightInKg * (1 - formData.bodyFat / 100);
          adjustedProtein = leanMass * 2.2; // Higher protein per lean mass
        }

        // Training type adjustments
        if (formData.trainingType === "powerlifting") {
          adjustedProtein *= 1.1;
        } else if (formData.trainingType === "bodybuilding") {
          adjustedProtein *= 1.2;
        } else if (formData.trainingType === "endurance") {
          adjustedProtein *= 0.9;
        }

        // Training frequency adjustment
        const frequency = parseInt(formData.trainingFrequency) || 0;
        if (frequency > 5) {
          adjustedProtein *= 1.1;
        }
      }

      const recommendedProtein = Math.round(adjustedProtein);

      // Calculate protein distribution throughout the day
      const proteinDistribution = {
        breakfast: Math.round(recommendedProtein * 0.25),
        lunch: Math.round(recommendedProtein * 0.30),
        dinner: Math.round(recommendedProtein * 0.30),
        snacks: Math.round(recommendedProtein * 0.15)
      };

      // Calculate pre/post workout protein if relevant
      const workoutProtein = {
        preWorkout: Math.round(recommendedProtein * 0.15), // 15% pre-workout
        postWorkout: Math.round(recommendedProtein * 0.25)  // 25% post-workout
      };

      // Calculate protein sources breakdown
      const proteinSources = generateProteinSources(formData.dietaryRestrictions);

      // Calculate protein per meal target
      const mealsPerDay = 4; // Assuming 3 meals + 1 snack
      const proteinPerMeal = Math.round(recommendedProtein / mealsPerDay);

      setResult({
        recommendedProtein,
        proteinPerKg: (recommendedProtein / weightInKg).toFixed(1),
        proteinCalories: recommendedProtein * 4,
        proteinPercentage: Math.round((recommendedProtein * 4) / 2000 * 100), // Assuming 2000 cal diet
        methods,
        proteinDistribution,
        workoutProtein,
        proteinSources,
        proteinPerMeal,
        selectedActivity,
        selectedGoal,
        recommendations: generateRecommendations(
          recommendedProtein, 
          weightInKg, 
          formData.kidneyHealth, 
          formData.goal,
          formData.age
        )
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const generateProteinSources = (dietaryRestrictions) => {
    const sources = {
      animal: [],
      plant: [],
      supplements: []
    };

    // Animal sources
    if (!["vegetarian", "vegan"].includes(dietaryRestrictions)) {
      sources.animal = [
        { name: "Chicken breast", protein: "31g per 100g", serving: "100g" },
        { name: "Salmon", protein: "25g per 100g", serving: "100g" },
        { name: "Lean beef", protein: "26g per 100g", serving: "100g" },
        { name: "Eggs", protein: "6g per egg", serving: "2 large eggs" },
        { name: "Greek yogurt", protein: "10g per 100g", serving: "200g" },
        { name: "Cottage cheese", protein: "11g per 100g", serving: "100g" }
      ];
    }

    // Plant sources
    if (["vegetarian", "vegan", "plant-based"].includes(dietaryRestrictions) || !dietaryRestrictions) {
      sources.plant = [
        { name: "Lentils", protein: "18g per cup cooked", serving: "1 cup" },
        { name: "Chickpeas", protein: "15g per cup", serving: "1 cup" },
        { name: "Tofu", protein: "20g per 100g", serving: "100g" },
        { name: "Tempeh", protein: "31g per cup", serving: "1 cup" },
        { name: "Quinoa", protein: "8g per cup cooked", serving: "1 cup" },
        { name: "Hemp seeds", protein: "10g per 3 tbsp", serving: "3 tbsp" },
        { name: "Spirulina", protein: "8g per 2 tbsp", serving: "2 tbsp" }
      ];
    }

    // Supplements
    sources.supplements = [
      { name: "Whey protein", protein: "25g per scoop", serving: "1 scoop" },
      { name: "Casein protein", protein: "24g per scoop", serving: "1 scoop" },
      { name: "Plant protein blend", protein: "20g per scoop", serving: "1 scoop" },
      { name: "Collagen peptides", protein: "18g per scoop", serving: "1 scoop" }
    ];

    // Filter out non-vegan supplements if vegan
    if (dietaryRestrictions === "vegan") {
      sources.supplements = sources.supplements.filter(s => 
        ["Plant protein blend"].includes(s.name)
      );
    }

    return sources;
  };

  const generateRecommendations = (proteinGrams, weightInKg, kidneyHealth, goal, age) => {
    const recommendations = [];
    const proteinPerKg = proteinGrams / weightInKg;

    if (kidneyHealth === "poor") {
      recommendations.push({
        type: "warning",
        title: "Kidney Health Consideration",
        message: "Consult your healthcare provider before increasing protein intake. Consider lower protein targets."
      });
    }

    if (proteinPerKg > 2.5) {
      recommendations.push({
        type: "warning",
        title: "Very High Protein Intake",
        message: "This is a very high protein intake. Ensure adequate hydration and consult a sports dietitian."
      });
    }

    if (age > 65) {
      recommendations.push({
        type: "info",
        title: "Age-Related Considerations",
        message: "Older adults may benefit from higher protein intake (1.2-1.6g/kg) to prevent muscle loss."
      });
    }

    if (goal === "lose") {
      recommendations.push({
        type: "success",
        title: "Weight Loss Strategy",
        message: "Higher protein helps preserve muscle during weight loss and increases satiety. Spread intake throughout the day."
      });
    }

    recommendations.push({
      type: "info",
      title: "Protein Quality",
      message: "Include complete proteins (containing all essential amino acids) and vary your protein sources for optimal nutrition."
    });

    recommendations.push({
      type: "success",
      title: "Timing Recommendations",
      message: "Consume 20-30g protein within 2 hours post-workout for optimal muscle protein synthesis. Spread intake evenly throughout the day."
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
      bodyFat: "",
      trainingType: "",
      trainingFrequency: "",
      dietaryRestrictions: "",
      kidneyHealth: "",
      proteinTiming: ""
    });
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-red-500/20 to-rose-500/20 mr-4">
              <Beef className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-white">Protein Calculator</CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Calculate your optimal daily protein intake for muscle building, weight loss, and health
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
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Advanced Protein Planning</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bodyFat" className="text-gray-200">Body Fat % (optional)</Label>
                  <Input
                    id="bodyFat"
                    type="number"
                    placeholder="Enter body fat %"
                    value={formData.bodyFat}
                    onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Training Type</Label>
                  <Select value={formData.trainingType} onValueChange={(value) => handleInputChange("trainingType", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select training type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="general">General Fitness</SelectItem>
                      <SelectItem value="bodybuilding">Bodybuilding</SelectItem>
                      <SelectItem value="powerlifting">Powerlifting</SelectItem>
                      <SelectItem value="endurance">Endurance Sports</SelectItem>
                      <SelectItem value="crossfit">CrossFit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trainingFrequency" className="text-gray-200">Training Frequency (days/week)</Label>
                  <Input
                    id="trainingFrequency"
                    type="number"
                    placeholder="Days per week"
                    min="0"
                    max="7"
                    value={formData.trainingFrequency}
                    onChange={(e) => handleInputChange("trainingFrequency", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Dietary Restrictions</Label>
                  <Select value={formData.dietaryRestrictions} onValueChange={(value) => handleInputChange("dietaryRestrictions", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select restrictions" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="none">No restrictions</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="pescatarian">Pescatarian</SelectItem>
                      <SelectItem value="plant-based">Plant-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Kidney Health</Label>
                  <Select value={formData.kidneyHealth} onValueChange={(value) => handleInputChange("kidneyHealth", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor/Compromised</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              onClick={calculateProtein}
              disabled={!validateForm() || isCalculating}
              className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Beef className="h-5 w-5 mr-2" />
                  Calculate Protein
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
              <Zap className="h-6 w-6 text-red-400 mr-2" />
              Your Daily Protein Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary Protein Recommendation */}
            <div className="text-center bg-gradient-to-r from-red-900/20 to-rose-900/20 p-8 rounded-xl border border-red-800/50">
              <div className="text-5xl font-bold text-red-300 mb-2">{result.recommendedProtein}g</div>
              <div className="text-xl text-red-200 font-semibold mb-2">Daily Protein</div>
              <div className="text-gray-400">
                {result.proteinCalories} calories ({result.proteinPercentage}% of 2000 cal diet)
              </div>
              <div className="text-sm text-red-400 mt-2">
                {result.proteinPerKg}g per kg body weight
              </div>
            </div>

            {/* Method Comparison */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Protein Calculation Methods Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(result.methods).map((method, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      method.recommended
                        ? "border-green-500 bg-green-900/20"
                        : "border-gray-600 bg-gray-700/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white text-sm">{method.name}</h4>
                      {method.recommended && (
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{method.description}</p>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-300">{method.grams}g</div>
                      <div className="text-xs text-gray-400">per day</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Distribution */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Daily Protein Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(result.proteinDistribution).map(([meal, grams]) => (
                  <div key={meal} className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <div className="text-lg font-bold text-red-300">{grams}g</div>
                    <div className="text-sm text-gray-300 capitalize">{meal}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <div className="text-sm text-gray-400 mb-2">Target per meal/snack:</div>
                <div className="text-xl font-bold text-red-300">{result.proteinPerMeal}g</div>
              </div>
            </div>

            {/* Workout Protein Timing */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Workout Protein Timing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <div className="text-2xl font-bold text-blue-300">{result.workoutProtein.preWorkout}g</div>
                  <div className="text-blue-200 font-medium">Pre-Workout</div>
                  <div className="text-xs text-gray-400 mt-2">1-2 hours before training</div>
                </div>

                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                  <div className="text-2xl font-bold text-green-300">{result.workoutProtein.postWorkout}g</div>
                  <div className="text-green-200 font-medium">Post-Workout</div>
                  <div className="text-xs text-gray-400 mt-2">Within 30-60 minutes after</div>
                </div>
              </div>
            </div>

            {/* Protein Sources */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recommended Protein Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.proteinSources.animal.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-300 mb-3">Animal Sources</h4>
                    <div className="space-y-2">
                      {result.proteinSources.animal.map((food, index) => (
                        <div key={index} className="bg-red-900/10 p-3 rounded border border-red-800/30">
                          <div className="font-medium text-white text-sm">{food.name}</div>
                          <div className="text-xs text-gray-400">{food.protein} • {food.serving}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-green-300 mb-3">Plant Sources</h4>
                  <div className="space-y-2">
                    {result.proteinSources.plant.map((food, index) => (
                      <div key={index} className="bg-green-900/10 p-3 rounded border border-green-800/30">
                        <div className="font-medium text-white text-sm">{food.name}</div>
                        <div className="text-xs text-gray-400">{food.protein} • {food.serving}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-300 mb-3">Supplements</h4>
                  <div className="space-y-2">
                    {result.proteinSources.supplements.map((food, index) => (
                      <div key={index} className="bg-blue-900/10 p-3 rounded border border-blue-800/30">
                        <div className="font-medium text-white text-sm">{food.name}</div>
                        <div className="text-xs text-gray-400">{food.protein} • {food.serving}</div>
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

export default ProteinCalculator;