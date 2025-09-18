import React, { useState } from "react";
import { Calculator, Info, TrendingUp, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const CalorieCalculator = () => {
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
    fitnessGoal: "",
    dietaryPreference: "",
    metabolicRate: ""
  });

  const activityLevels = [
    { value: "1.2", label: "Sedentary (little/no exercise)", description: "Desk job, minimal physical activity" },
    { value: "1.375", label: "Lightly Active (light exercise 1-3 days/week)", description: "Light exercise or sports" },
    { value: "1.55", label: "Moderately Active (moderate exercise 3-5 days/week)", description: "Regular exercise routine" },
    { value: "1.725", label: "Very Active (hard exercise 6-7 days/week)", description: "Intensive exercise program" },
    { value: "1.9", label: "Extremely Active (very hard exercise, physical job)", description: "Professional athlete level" }
  ];

  const goals = [
    { value: "maintain", label: "Maintain Weight", modifier: 0, description: "Keep current weight stable" },
    { value: "lose0.5", label: "Lose 0.5 kg/week", modifier: -250, description: "Gradual, sustainable weight loss" },
    { value: "lose1", label: "Lose 1 kg/week", modifier: -500, description: "Moderate weight loss pace" },
    { value: "gain0.5", label: "Gain 0.5 kg/week", modifier: 250, description: "Lean muscle building" },
    { value: "gain1", label: "Gain 1 kg/week", modifier: 500, description: "Aggressive muscle building" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMR = (weight, height, age, gender, formula = "mifflin") => {
    const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
    const heightInCm = formData.heightUnit === "ft" ? 
      (parseInt(formData.feet) * 30.48) + (parseInt(formData.inches) * 2.54) : height;

    switch (formula) {
      case "mifflin": // Most accurate for general population
        return gender === "male" 
          ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5
          : (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
      case "harris":
        return gender === "male"
          ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
          : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
      case "katch": // Requires body fat percentage
        if (!formData.bodyFat) return null;
        const leanMass = weightInKg * (1 - formData.bodyFat / 100);
        return 370 + (21.6 * leanMass);
      default:
        return null;
    }
  };

  const calculateCalories = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      const activityMultiplier = parseFloat(formData.activityLevel);
      const goalModifier = goals.find(g => g.value === formData.goal)?.modifier || 0;

      // Calculate BMR using different methods
      const bmrMifflin = calculateBMR(weight, height, age, formData.gender, "mifflin");
      const bmrHarris = calculateBMR(weight, height, age, formData.gender, "harris");
      const bmrKatch = formData.bodyFat ? calculateBMR(weight, height, age, formData.gender, "katch") : null;

      // Use Mifflin-St Jeor as primary (most accurate)
      const primaryBMR = bmrMifflin;
      const tdee = primaryBMR * activityMultiplier;
      const targetCalories = tdee + goalModifier;

      const selectedGoal = goals.find(g => g.value === formData.goal);

      setResult({
        bmr: {
          mifflin: Math.round(bmrMifflin),
          harris: Math.round(bmrHarris),
          katch: bmrKatch ? Math.round(bmrKatch) : null
        },
        tdee: Math.round(tdee),
        targetCalories: Math.round(targetCalories),
        goal: selectedGoal,
        breakdown: {
          maintenance: Math.round(tdee),
          deficit: goalModifier < 0 ? Math.abs(goalModifier) : 0,
          surplus: goalModifier > 0 ? goalModifier : 0
        }
      });
      
      setIsCalculating(false);
    }, 1500);
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
      metabolicRate: ""
    });
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 mr-4">
              <Calculator className="h-8 w-8 text-orange-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-white">Daily Calorie Calculator</CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Calculate your daily caloric needs with precision using advanced metabolic formulas
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

          {/* Advanced Mode Fields */}
          {mode === "advanced" && (
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Advanced Options</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bodyFat" className="text-gray-200">Body Fat % (for Katch-McArdle)</Label>
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
                  <Label className="text-gray-200">Fitness Goal</Label>
                  <Select value={formData.fitnessGoal} onValueChange={(value) => handleInputChange("fitnessGoal", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select fitness goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="general">General Health</SelectItem>
                      <SelectItem value="muscle">Muscle Building</SelectItem>
                      <SelectItem value="endurance">Endurance Training</SelectItem>
                      <SelectItem value="strength">Strength Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              onClick={calculateCalories}
              disabled={!validateForm() || isCalculating}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Daily Calories
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
              <Target className="h-6 w-6 text-orange-400 mr-2" />
              Your Daily Calorie Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-800/50 text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">{result.bmr.mifflin}</div>
                <div className="text-blue-200 font-semibold mb-1">Basal Metabolic Rate</div>
                <div className="text-sm text-gray-400">Calories at rest (Recommended: Mifflin-St Jeor)</div>
              </div>

              <div className="bg-green-900/20 p-6 rounded-xl border border-green-800/50 text-center">
                <div className="text-3xl font-bold text-green-300 mb-2">{result.tdee}</div>
                <div className="text-green-200 font-semibold mb-1">Maintenance Calories</div>
                <div className="text-sm text-gray-400">Total Daily Energy Expenditure</div>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-xl border border-orange-800/50 text-center">
                <div className="text-3xl font-bold text-orange-300 mb-2">{result.targetCalories}</div>
                <div className="text-orange-200 font-semibold mb-1">Target Calories</div>
                <div className="text-sm text-gray-400">For {result.goal.label.toLowerCase()}</div>
              </div>
            </div>

            {/* BMR Comparison */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">BMR Formula Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-300">{result.bmr.mifflin}</div>
                  <div className="text-blue-200 font-medium">Mifflin-St Jeor</div>
                  <div className="text-xs text-green-400 mt-1">✓ Recommended</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-300">{result.bmr.harris}</div>
                  <div className="text-gray-200 font-medium">Harris-Benedict</div>
                  <div className="text-xs text-gray-400 mt-1">Classic formula</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-300">
                    {result.bmr.katch || "N/A"}
                  </div>
                  <div className="text-purple-200 font-medium">Katch-McArdle</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {result.bmr.katch ? "Body fat based" : "Requires body fat %"}
                  </div>
                </div>
              </div>
            </div>

            {/* Goal Information */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Goal Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Maintenance Calories:</span>
                  <span className="text-white font-semibold">{result.breakdown.maintenance} cal/day</span>
                </div>
                {result.breakdown.deficit > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Daily Deficit:</span>
                    <span className="text-red-300 font-semibold">-{result.breakdown.deficit} cal/day</span>
                  </div>
                )}
                {result.breakdown.surplus > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Daily Surplus:</span>
                    <span className="text-green-300 font-semibold">+{result.breakdown.surplus} cal/day</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                  <span className="text-gray-200 font-medium">Target Calories:</span>
                  <span className="text-orange-300 font-bold text-lg">{result.targetCalories} cal/day</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <Alert className="bg-blue-900/20 border-blue-800/50">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-blue-300">Professional Recommendations</AlertTitle>
              <AlertDescription className="text-blue-200">
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Monitor your progress weekly and adjust calories as needed</li>
                  <li>Combine proper nutrition with regular exercise for best results</li>
                  <li>Consult a healthcare professional for personalized advice</li>
                  <li>Stay hydrated and prioritize whole, nutrient-dense foods</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CalorieCalculator;