import React, { useState } from "react";
import { Droplets, Info, TrendingUp, Target, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const FatIntakeCalculator = () => {
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
    cholesterolLevel: "",
    heartHealth: "",
    fatPreference: "",
    cookingoil: "",
    supplementation: ""
  });

  const activityLevels = [
    { value: "1.2", label: "Sedentary", description: "Little/no exercise" },
    { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    { value: "1.55", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
    { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
    { value: "1.9", label: "Extremely Active", description: "Very hard exercise, physical job" }
  ];

  const goals = [
    { value: "maintain", label: "Maintain Weight", fatAdjustment: 0, description: "Balanced fat intake" },
    { value: "lose", label: "Weight Loss", fatAdjustment: -5, description: "Moderate fat reduction" },
    { value: "gain", label: "Weight/Muscle Gain", fatAdjustment: 5, description: "Higher fat for calories" },
    { value: "keto", label: "Ketogenic Diet", fatAdjustment: 35, description: "Very high fat intake" },
    { value: "heart", label: "Heart Health", fatAdjustment: -3, description: "Heart-healthy fat levels" },
    { value: "performance", label: "Athletic Performance", fatAdjustment: 2, description: "Optimal fat for performance" }
  ];

  const fatMethods = [
    {
      name: "AMDR Guidelines",
      description: "20-35% of total calories from fat (Dietary Guidelines)",
      low: 20,
      high: 35,
      recommended: true
    },
    {
      name: "Low Fat Approach",
      description: "15-25% of total calories from fat",
      low: 15,
      high: 25,
      recommended: false
    },
    {
      name: "Moderate Fat",
      description: "25-35% of total calories from fat",
      low: 25,
      high: 35,
      recommended: false
    },
    {
      name: "High Fat/Keto",
      description: "60-80% of total calories from fat",
      low: 60,
      high: 80,
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

  const calculateFat = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      const activityMultiplier = parseFloat(formData.activityLevel);
      const selectedGoal = goals.find(g => g.value === formData.goal);

      // Calculate BMR and TDEE
      const bmr = calculateBMR(weight, height, age, formData.gender);
      const tdee = bmr * activityMultiplier;

      // Calculate fat using different methods
      const methods = {};
      fatMethods.forEach(method => {
        const lowFatCalories = Math.round(tdee * (method.low / 100));
        const highFatCalories = Math.round(tdee * (method.high / 100));
        const avgFatCalories = Math.round((lowFatCalories + highFatCalories) / 2);
        
        methods[method.name.toLowerCase().replace(/\s+/g, '')] = {
          name: method.name,
          description: method.description,
          recommended: method.recommended,
          lowGrams: Math.round(lowFatCalories / 9),
          highGrams: Math.round(highFatCalories / 9),
          avgGrams: Math.round(avgFatCalories / 9),
          lowCalories: lowFatCalories,
          highCalories: highFatCalories,
          avgCalories: avgFatCalories
        };
      });

      // Calculate personalized recommendation
      let basePercentage = 30; // Start with middle of AMDR range
      
      // Adjust based on goal
      basePercentage += selectedGoal.fatAdjustment;
      
      // Ensure within reasonable bounds
      basePercentage = Math.max(10, Math.min(80, basePercentage));

      // Advanced adjustments
      if (mode === "advanced") {
        if (formData.cholesterolLevel === "high") {
          basePercentage -= 5; // Reduce saturated fat
        }
        if (formData.heartHealth === "poor") {
          basePercentage -= 3; // Heart-healthy approach
        }
        if (formData.fatPreference === "high") {
          basePercentage += 5;
        }
      }

      const recommendedFatCalories = Math.round(tdee * (basePercentage / 100));
      const recommendedFatGrams = Math.round(recommendedFatCalories / 9);

      // Calculate fat type distribution
      const fatTypes = {
        saturated: Math.round(recommendedFatGrams * 0.10), // <10% of total calories
        monounsaturated: Math.round(recommendedFatGrams * 0.50), // 50% of fat intake
        polyunsaturated: Math.round(recommendedFatGrams * 0.30), // 30% of fat intake
        omega3: Math.round(recommendedFatGrams * 0.10) // 10% of fat intake (essential)
      };

      // Calculate daily fat distribution
      const fatDistribution = {
        breakfast: Math.round(recommendedFatGrams * 0.20),
        lunch: Math.round(recommendedFatGrams * 0.30),
        dinner: Math.round(recommendedFatGrams * 0.35),
        snacks: Math.round(recommendedFatGrams * 0.15)
      };

      // Generate fat sources
      const fatSources = generateFatSources(formData.fatPreference, formData.heartHealth);

      setResult({
        recommendedFatGrams,
        recommendedFatCalories,
        fatPercentage: basePercentage,
        methods,
        fatTypes,
        fatDistribution,
        fatSources,
        tdee: Math.round(tdee),
        bmr: Math.round(bmr),
        selectedGoal,
        recommendations: generateRecommendations(
          basePercentage, 
          formData.cholesterolLevel, 
          formData.heartHealth,
          formData.goal
        )
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const generateFatSources = (preference, heartHealth) => {
    const sources = {
      healthy: [],
      cooking: [],
      nuts: [],
      supplements: []
    };

    // Healthy fat sources (prioritize for heart health)
    sources.healthy = [
      { name: "Avocado", fat: "21g per medium", serving: "1 medium", type: "Monounsaturated" },
      { name: "Olive Oil (Extra Virgin)", fat: "14g per tbsp", serving: "1 tbsp", type: "Monounsaturated" },
      { name: "Salmon", fat: "13g per 100g", serving: "100g", type: "Omega-3" },
      { name: "Nuts (Almonds)", fat: "14g per 30g", serving: "30g (24 nuts)", type: "Mixed" },
      { name: "Seeds (Chia)", fat: "9g per 30g", serving: "2 tbsp", type: "Omega-3" }
    ];

    // Cooking oils
    if (heartHealth === "poor") {
      sources.cooking = [
        { name: "Olive Oil", fat: "14g per tbsp", serving: "1 tbsp", type: "Heart-healthy" },
        { name: "Avocado Oil", fat: "14g per tbsp", serving: "1 tbsp", type: "High smoke point" }
      ];
    } else {
      sources.cooking = [
        { name: "Olive Oil", fat: "14g per tbsp", serving: "1 tbsp", type: "Versatile" },
        { name: "Coconut Oil", fat: "14g per tbsp", serving: "1 tbsp", type: "Saturated" },
        { name: "Avocado Oil", fat: "14g per tbsp", serving: "1 tbsp", type: "High heat" },
        { name: "Butter (Grass-fed)", fat: "11g per tbsp", serving: "1 tbsp", type: "Saturated" }
      ];
    }

    // Nuts and seeds
    sources.nuts = [
      { name: "Walnuts", fat: "18g per 30g", serving: "30g (14 halves)", type: "Omega-3 rich" },
      { name: "Almonds", fat: "14g per 30g", serving: "30g (24 nuts)", type: "Vitamin E" },
      { name: "Flaxseeds", fat: "12g per 30g", serving: "2 tbsp ground", type: "Omega-3" },
      { name: "Hemp Seeds", fat: "14g per 30g", serving: "3 tbsp", type: "Complete protein" }
    ];

    // Supplements
    sources.supplements = [
      { name: "Fish Oil", fat: "1g per capsule", serving: "2-3 capsules", type: "EPA/DHA" },
      { name: "Flax Oil", fat: "14g per tbsp", serving: "1 tbsp", type: "ALA Omega-3" },
      { name: "MCT Oil", fat: "14g per tbsp", serving: "1 tbsp", type: "Medium-chain" }
    ];

    return sources;
  };

  const generateRecommendations = (fatPercentage, cholesterol, heartHealth, goal) => {
    const recommendations = [];

    if (cholesterol === "high") {
      recommendations.push({
        type: "warning",
        title: "High Cholesterol Considerations",
        message: "Limit saturated fat to <7% of calories and avoid trans fats. Focus on omega-3 fatty acids and monounsaturated fats."
      });
    }

    if (heartHealth === "poor") {
      recommendations.push({
        type: "warning",
        title: "Heart Health Priority",
        message: "Emphasize heart-healthy fats: olive oil, nuts, seeds, and fatty fish. Limit saturated fats and avoid trans fats completely."
      });
    }

    if (goal === "keto" && fatPercentage > 60) {
      recommendations.push({
        type: "info",
        title: "Ketogenic Diet Guidelines",
        message: "For ketosis, maintain 70-80% calories from fat. Focus on quality fats and monitor ketone levels."
      });
    }

    if (fatPercentage < 20) {
      recommendations.push({
        type: "warning",
        title: "Very Low Fat Intake",
        message: "Extremely low fat diets may affect hormone production and fat-soluble vitamin absorption. Consult a healthcare provider."
      });
    }

    recommendations.push({
      type: "success",
      title: "Fat Quality Matters",
      message: "Prioritize unsaturated fats (olive oil, nuts, fish) over saturated fats. Include omega-3 fatty acids for optimal health."
    });

    recommendations.push({
      type: "info",
      title: "Essential Fatty Acids",
      message: "Ensure adequate omega-3 (fish, walnuts, flax) and omega-6 (nuts, seeds) fatty acids. Aim for a 1:4 omega-3 to omega-6 ratio."
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
      cholesterolLevel: "",
      heartHealth: "",
      fatPreference: "",
      cookingoil: "",
      supplementation: ""
    });
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 mr-4">
              <Droplets className="h-8 w-8 text-yellow-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-white">Fat Intake Calculator</CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Calculate your optimal daily fat intake for health, performance, and body composition goals
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
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Advanced Fat Intake Planning</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-200">Cholesterol Level</Label>
                  <Select value={formData.cholesterolLevel} onValueChange={(value) => handleInputChange("cholesterolLevel", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="optimal">Optimal (&lt;200 mg/dL)</SelectItem>
                      <SelectItem value="borderline">Borderline (200-239 mg/dL)</SelectItem>
                      <SelectItem value="high">High (≥240 mg/dL)</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Heart Health Status</Label>
                  <Select value={formData.heartHealth} onValueChange={(value) => handleInputChange("heartHealth", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor/Conditions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Fat Preference</Label>
                  <Select value={formData.fatPreference} onValueChange={(value) => handleInputChange("fatPreference", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="low">Low Fat Approach</SelectItem>
                      <SelectItem value="moderate">Moderate Fat</SelectItem>
                      <SelectItem value="high">High Fat/Keto</SelectItem>
                      <SelectItem value="balanced">Balanced Approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Primary Cooking Oil</Label>
                  <Select value={formData.cookingoil} onValueChange={(value) => handleInputChange("cookingoil", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select oil" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="olive">Olive Oil</SelectItem>
                      <SelectItem value="avocado">Avocado Oil</SelectItem>
                      <SelectItem value="coconut">Coconut Oil</SelectItem>
                      <SelectItem value="butter">Butter</SelectItem>
                      <SelectItem value="mixed">Mixed/Various</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              onClick={calculateFat}
              disabled={!validateForm() || isCalculating}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Droplets className="h-5 w-5 mr-2" />
                  Calculate Fat Intake
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
              <Heart className="h-6 w-6 text-yellow-400 mr-2" />
              Your Daily Fat Intake Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary Fat Recommendation */}
            <div className="text-center bg-gradient-to-r from-yellow-900/20 to-amber-900/20 p-8 rounded-xl border border-yellow-800/50">
              <div className="text-5xl font-bold text-yellow-300 mb-2">{result.recommendedFatGrams}g</div>
              <div className="text-xl text-yellow-200 font-semibold mb-2">Daily Fat Intake</div>
              <div className="text-gray-400">
                {result.recommendedFatCalories} calories ({result.fatPercentage}% of total calories)
              </div>
            </div>

            {/* Method Comparison */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Fat Intake Calculation Methods</h3>
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
                      <div className="text-lg font-bold text-yellow-300">
                        {method.lowGrams}-{method.highGrams}g
                      </div>
                      <div className="text-xs text-gray-400">per day</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fat Types Distribution */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Optimal Fat Types Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-800/30">
                  <div className="text-2xl font-bold text-red-300">{result.fatTypes.saturated}g</div>
                  <div className="text-red-200 font-medium">Saturated</div>
                  <div className="text-xs text-gray-400 mt-2">&lt;10% of total calories</div>
                </div>

                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                  <div className="text-2xl font-bold text-green-300">{result.fatTypes.monounsaturated}g</div>
                  <div className="text-green-200 font-medium">Monounsaturated</div>
                  <div className="text-xs text-gray-400 mt-2">Olive oil, avocados, nuts</div>
                </div>

                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <div className="text-2xl font-bold text-blue-300">{result.fatTypes.polyunsaturated}g</div>
                  <div className="text-blue-200 font-medium">Polyunsaturated</div>
                  <div className="text-xs text-gray-400 mt-2">Nuts, seeds, fish</div>
                </div>

                <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-800/30">
                  <div className="text-2xl font-bold text-purple-300">{result.fatTypes.omega3}g</div>
                  <div className="text-purple-200 font-medium">Omega-3</div>
                  <div className="text-xs text-gray-400 mt-2">Essential fatty acids</div>
                </div>
              </div>
            </div>

            {/* Daily Distribution */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Daily Fat Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(result.fatDistribution).map(([meal, grams]) => (
                  <div key={meal} className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <div className="text-lg font-bold text-yellow-300">{grams}g</div>
                    <div className="text-sm text-gray-300 capitalize">{meal}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fat Sources */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recommended Fat Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-semibold text-green-300 mb-3">Healthy Fats</h4>
                  <div className="space-y-2">
                    {result.fatSources.healthy.map((food, index) => (
                      <div key={index} className="bg-green-900/10 p-3 rounded border border-green-800/30">
                        <div className="font-medium text-white text-sm">{food.name}</div>
                        <div className="text-xs text-gray-400">{food.fat} • {food.serving}</div>
                        <div className="text-xs text-green-400">{food.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-300 mb-3">Cooking Oils</h4>
                  <div className="space-y-2">
                    {result.fatSources.cooking.map((food, index) => (
                      <div key={index} className="bg-orange-900/10 p-3 rounded border border-orange-800/30">
                        <div className="font-medium text-white text-sm">{food.name}</div>
                        <div className="text-xs text-gray-400">{food.fat} • {food.serving}</div>
                        <div className="text-xs text-orange-400">{food.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-300 mb-3">Nuts & Seeds</h4>
                  <div className="space-y-2">
                    {result.fatSources.nuts.map((food, index) => (
                      <div key={index} className="bg-blue-900/10 p-3 rounded border border-blue-800/30">
                        <div className="font-medium text-white text-sm">{food.name}</div>
                        <div className="text-xs text-gray-400">{food.fat} • {food.serving}</div>
                        <div className="text-xs text-blue-400">{food.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-300 mb-3">Supplements</h4>
                  <div className="space-y-2">
                    {result.fatSources.supplements.map((food, index) => (
                      <div key={index} className="bg-purple-900/10 p-3 rounded border border-purple-800/30">
                        <div className="font-medium text-white text-sm">{food.name}</div>
                        <div className="text-xs text-gray-400">{food.fat} • {food.serving}</div>
                        <div className="text-xs text-purple-400">{food.type}</div>
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

export default FatIntakeCalculator;