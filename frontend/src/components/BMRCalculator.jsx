import React, { useState } from "react";
import { Heart, Info, TrendingUp, Target, Flame } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const BMRCalculator = () => {
  const [mode, setMode] = useState("basic");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedFormula, setSelectedFormula] = useState("mifflin");
  const [formData, setFormData] = useState({
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    feet: "",
    inches: "",
    age: "",
    gender: "",
    // Advanced mode fields
    bodyFat: "",
    activityLevel: "",
    fitnessGoal: "",
    medicalConditions: ""
  });

  const bmrFormulas = [
    { 
      value: "mifflin", 
      label: "Mifflin-St Jeor", 
      recommended: true,
      description: "Most accurate for general population (1990)",
      accuracy: "±10% for 95% of population"
    },
    { 
      value: "harris", 
      label: "Harris-Benedict (Revised)", 
      recommended: false,
      description: "Classic formula, revised in 1984",
      accuracy: "±15% for general population"
    },
    { 
      value: "katch", 
      label: "Katch-McArdle", 
      recommended: false,
      description: "Most accurate for lean individuals with known body fat%",
      accuracy: "±5% when body fat is accurately measured"
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMR = (weight, height, age, gender, formula) => {
    const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
    const heightInCm = formData.heightUnit === "ft" ? 
      (parseInt(formData.feet) * 30.48) + (parseInt(formData.inches) * 2.54) : height;

    switch (formula) {
      case "mifflin":
        return gender === "male" 
          ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5
          : (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
      
      case "harris":
        return gender === "male"
          ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
          : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
      
      case "katch":
        if (!formData.bodyFat || formData.bodyFat <= 0) {
          return null;
        }
        const leanMass = weightInKg * (1 - formData.bodyFat / 100);
        return 370 + (21.6 * leanMass);
      
      default:
        return null;
    }
  };

  const calculateAllBMR = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);

      // Calculate BMR using all methods
      const results = {};
      bmrFormulas.forEach(formula => {
        const bmr = calculateBMR(weight, height, age, formData.gender, formula.value);
        results[formula.value] = bmr ? Math.round(bmr) : null;
      });

      // Get the selected formula result as primary
      const primaryBMR = results[selectedFormula];

      // Calculate TDEE estimates for different activity levels
      const activityMultipliers = [
        { label: "Sedentary", multiplier: 1.2, description: "Little/no exercise" },
        { label: "Light Activity", multiplier: 1.375, description: "Light exercise 1-3 days/week" },
        { label: "Moderate Activity", multiplier: 1.55, description: "Moderate exercise 3-5 days/week" },
        { label: "High Activity", multiplier: 1.725, description: "Hard exercise 6-7 days/week" },
        { label: "Extreme Activity", multiplier: 1.9, description: "Very hard exercise, physical job" }
      ];

      const tdeeEstimates = activityMultipliers.map(activity => ({
        ...activity,
        calories: primaryBMR ? Math.round(primaryBMR * activity.multiplier) : null
      }));

      // Calculate metabolic rate breakdown
      const metabolicBreakdown = primaryBMR ? {
        organs: Math.round(primaryBMR * 0.6), // 60% organs (liver, brain, kidneys)
        muscle: Math.round(primaryBMR * 0.25), // 25% muscle tissue
        other: Math.round(primaryBMR * 0.15)   // 15% other tissues
      } : null;

      setResult({
        bmrResults: results,
        primaryBMR,
        selectedFormula: bmrFormulas.find(f => f.value === selectedFormula),
        tdeeEstimates,
        metabolicBreakdown,
        recommendations: generateRecommendations(primaryBMR, formData.gender, age)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const generateRecommendations = (bmr, gender, age) => {
    const recommendations = [];
    
    if (bmr) {
      if (bmr < 1200) {
        recommendations.push({
          type: "warning",
          title: "Low BMR Detected",
          message: "Your BMR is quite low. Consider consulting a healthcare professional to rule out metabolic issues."
        });
      }
      
      if (age > 50) {
        recommendations.push({
          type: "info",
          title: "Age-Related Considerations",
          message: "BMR naturally decreases with age. Focus on maintaining muscle mass through resistance training."
        });
      }
      
      recommendations.push({
        type: "success",
        title: "Metabolic Health Tips",
        message: "To maintain healthy BMR: Stay hydrated, get adequate sleep, include protein in every meal, and engage in regular strength training."
      });
    }
    
    return recommendations;
  };

  const validateForm = () => {
    const requiredFields = ["weight", "age", "gender"];
    const heightValid = formData.heightUnit === "ft" ? 
      (formData.feet && formData.inches) : formData.height;
    
    // For Katch-McArdle, body fat is required
    if (selectedFormula === "katch" && !formData.bodyFat) {
      return false;
    }
    
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
      bodyFat: "",
      activityLevel: "",
      fitnessGoal: "",
      medicalConditions: ""
    });
    setResult(null);
    setSelectedFormula("mifflin");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 mr-4">
              <Heart className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-white">BMR Calculator</CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Calculate your Basal Metabolic Rate using scientifically validated formulas
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
          {/* Formula Selection */}
          <div className="space-y-3">
            <Label className="text-gray-200">BMR Formula *</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {bmrFormulas.map((formula) => (
                <div
                  key={formula.value}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedFormula === formula.value
                      ? "border-blue-500 bg-blue-900/20"
                      : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedFormula(formula.value)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{formula.label}</h4>
                    {formula.recommended && (
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{formula.description}</p>
                  <p className="text-xs text-gray-500">{formula.accuracy}</p>
                </div>
              ))}
            </div>
          </div>

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

          {/* Body Fat Input (required for Katch-McArdle) */}
          {(selectedFormula === "katch" || mode === "advanced") && (
            <div className="space-y-2">
              <Label htmlFor="bodyFat" className="text-gray-200">
                Body Fat Percentage {selectedFormula === "katch" ? "*" : ""}
              </Label>
              <Input
                id="bodyFat"
                type="number"
                placeholder="Enter body fat percentage"
                value={formData.bodyFat}
                onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {selectedFormula === "katch" && (
                <p className="text-sm text-blue-300">
                  Body fat percentage is required for Katch-McArdle formula
                </p>
              )}
            </div>
          )}

          {/* Advanced Mode Fields */}
          {mode === "advanced" && (
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Advanced Analysis</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-200">Primary Activity Level</Label>
                  <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light Activity</SelectItem>
                      <SelectItem value="moderate">Moderate Activity</SelectItem>
                      <SelectItem value="high">High Activity</SelectItem>
                      <SelectItem value="extreme">Extreme Activity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Fitness Goal</Label>
                  <Select value={formData.fitnessGoal} onValueChange={(value) => handleInputChange("fitnessGoal", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="maintenance">Weight Maintenance</SelectItem>
                      <SelectItem value="loss">Weight Loss</SelectItem>
                      <SelectItem value="gain">Weight Gain</SelectItem>
                      <SelectItem value="muscle">Muscle Building</SelectItem>
                      <SelectItem value="performance">Athletic Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              onClick={calculateAllBMR}
              disabled={!validateForm() || isCalculating}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5 mr-2" />
                  Calculate BMR
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
                {selectedFormula === "katch" ? (
                  "Please fill in all required fields including body fat percentage for Katch-McArdle formula."
                ) : (
                  "Please fill in all required fields marked with *."
                )}
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
              <Flame className="h-6 w-6 text-red-400 mr-2" />
              Your Basal Metabolic Rate Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary BMR Result */}
            <div className="text-center bg-gradient-to-r from-red-900/20 to-pink-900/20 p-8 rounded-xl border border-red-800/50">
              <div className="text-5xl font-bold text-red-300 mb-2">{result.primaryBMR}</div>
              <div className="text-xl text-red-200 font-semibold mb-2">Calories per Day</div>
              <div className="text-gray-400">
                Using {result.selectedFormula.label} formula
                {result.selectedFormula.recommended && (
                  <span className="ml-2 text-green-400">• Recommended</span>
                )}
              </div>
            </div>

            {/* All BMR Results Comparison */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">BMR Formula Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bmrFormulas.map((formula) => (
                  <div
                    key={formula.value}
                    className={`text-center p-4 rounded-lg border ${
                      formula.value === selectedFormula
                        ? "border-red-500 bg-red-900/20"
                        : "border-gray-600 bg-gray-700/20"
                    }`}
                  >
                    <div className="text-2xl font-bold text-red-300 mb-1">
                      {result.bmrResults[formula.value] || "N/A"}
                    </div>
                    <div className="text-red-200 font-medium mb-1">{formula.label}</div>
                    <div className="text-xs text-gray-400">
                      {formula.recommended && "✓ Most Accurate"}
                      {formula.value === "katch" && !result.bmrResults[formula.value] && "Requires body fat %"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metabolic Breakdown */}
            {result.metabolicBreakdown && (
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">BMR Energy Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="text-2xl font-bold text-blue-300">{result.metabolicBreakdown.organs}</div>
                    <div className="text-blue-200 font-medium">Organs (60%)</div>
                    <div className="text-xs text-gray-400">Brain, liver, kidneys, heart</div>
                  </div>
                  <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="text-2xl font-bold text-green-300">{result.metabolicBreakdown.muscle}</div>
                    <div className="text-green-200 font-medium">Muscle (25%)</div>
                    <div className="text-xs text-gray-400">Skeletal muscle tissue</div>
                  </div>
                  <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-800/30">
                    <div className="text-2xl font-bold text-purple-300">{result.metabolicBreakdown.other}</div>
                    <div className="text-purple-200 font-medium">Other (15%)</div>
                    <div className="text-xs text-gray-400">Fat tissue, bones, organs</div>
                  </div>
                </div>
              </div>
            )}

            {/* TDEE Estimates */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Total Daily Energy Expenditure (TDEE) Estimates</h3>
              <div className="space-y-3">
                {result.tdeeEstimates.map((estimate, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-700/30 border border-gray-600/30">
                    <div>
                      <div className="text-white font-medium">{estimate.label}</div>
                      <div className="text-sm text-gray-400">{estimate.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-300">
                        {estimate.calories} <span className="text-sm text-gray-400">cal/day</span>
                      </div>
                    </div>
                  </div>
                ))}
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

export default BMRCalculator;