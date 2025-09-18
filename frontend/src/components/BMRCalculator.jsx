import React, { useState } from "react";
import { Heart, Info, TrendingUp, Target, Flame, BookOpen, Users, Award } from "lucide-react";
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
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
      {/* Educational Header Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            BMR Calculator 2025 - Basal Metabolic Rate
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate your Basal Metabolic Rate using scientifically validated formulas. 
            Discover how many calories your body burns at rest for optimal health and weight management.
          </p>
        </div>

        {/* Key Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 p-4 md:p-6 rounded-xl border border-red-500/20">
            <Heart className="h-8 w-8 text-red-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Multiple BMR Formulas</h3>
            <p className="text-sm text-gray-300">Compare Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 md:p-6 rounded-xl border border-blue-500/20">
            <Flame className="h-8 w-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Metabolic Breakdown</h3>
            <p className="text-sm text-gray-300">Detailed analysis of how your body uses energy at rest</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 md:p-6 rounded-xl border border-green-500/20">
            <Award className="h-8 w-8 text-green-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Clinically Validated</h3>
            <p className="text-sm text-gray-300">Based on peer-reviewed research and clinical nutrition guidelines</p>
          </div>
        </div>
      </div>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 mr-4">
              <Heart className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-white">BMR Calculator</CardTitle>
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
                className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
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
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
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
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
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
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 h-12 sm:h-11 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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
            <div className="text-center bg-gradient-to-r from-red-900/20 to-pink-900/20 p-6 md:p-8 rounded-xl border border-red-800/50">
              <div className="text-4xl md:text-5xl font-bold text-red-300 mb-2">{result.primaryBMR}</div>
              <div className="text-xl text-red-200 font-semibold mb-2">Calories per Day</div>
              <div className="text-gray-400">
                Using {result.selectedFormula.label} formula
                {result.selectedFormula.recommended && (
                  <span className="ml-2 text-green-400">• Recommended</span>
                )}
              </div>
            </div>

            {/* All BMR Results Comparison */}
            <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl">
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
                    <div className="text-xl md:text-2xl font-bold text-red-300 mb-1">
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
              <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">BMR Energy Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="text-xl md:text-2xl font-bold text-blue-300">{result.metabolicBreakdown.organs}</div>
                    <div className="text-blue-200 font-medium">Organs (60%)</div>
                    <div className="text-xs text-gray-400">Brain, liver, kidneys, heart</div>
                  </div>
                  <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="text-xl md:text-2xl font-bold text-green-300">{result.metabolicBreakdown.muscle}</div>
                    <div className="text-green-200 font-medium">Muscle (25%)</div>
                    <div className="text-xs text-gray-400">Skeletal muscle tissue</div>
                  </div>
                  <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-800/30">
                    <div className="text-xl md:text-2xl font-bold text-purple-300">{result.metabolicBreakdown.other}</div>
                    <div className="text-purple-200 font-medium">Other (15%)</div>
                    <div className="text-xs text-gray-400">Fat tissue, bones, organs</div>
                  </div>
                </div>
              </div>
            )}

            {/* TDEE Estimates */}
            <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl">
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

      {/* Educational Content Section */}
      <div className="mt-12 space-y-8">
        <Card className="bg-gray-900/30 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <BookOpen className="h-6 w-6 text-blue-400 mr-2" />
              Understanding BMR: Complete Scientific Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-gray max-w-none">
              <h3 className="text-xl font-semibold text-white mb-3">What is Basal Metabolic Rate (BMR)?</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Basal Metabolic Rate (BMR) represents the minimum amount of energy your body requires to maintain 
                vital physiological functions while at complete rest. This includes breathing, circulation, 
                cell production, brain function, nutrient processing, and protein synthesis. BMR accounts for 
                60-75% of your total daily energy expenditure.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">BMR vs RMR: Understanding the Difference</h3>
              <div className="bg-gray-800/50 p-4 rounded-xl mb-4">
                <ul className="space-y-2 text-gray-300">
                  <li><strong>BMR (Basal Metabolic Rate):</strong> Measured under strict conditions - 12+ hour fast, complete rest, thermoneutral environment</li>
                  <li><strong>RMR (Resting Metabolic Rate):</strong> Measured under less restrictive conditions, typically 10-15% higher than BMR</li>
                  <li><strong>Practical Note:</strong> Most "BMR" calculators actually estimate RMR, which is more applicable to daily life</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">BMR Formula Comparison</h3>
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">Mifflin-St Jeor Equation (1990) - RECOMMENDED</h4>
                  <p className="text-gray-300 mb-2">
                    <strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5<br/>
                    <strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161
                  </p>
                  <p className="text-sm text-green-400">
                    ✓ Most accurate for general population (±10% accuracy)<br/>
                    ✓ Based on larger, more diverse study population<br/>
                    ✓ Preferred by registered dietitians and clinicians
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-orange-300 mb-2">Harris-Benedict Equation (Revised 1984)</h4>
                  <p className="text-gray-300 mb-2">
                    <strong>Men:</strong> BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age)<br/>
                    <strong>Women:</strong> BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age)
                  </p>
                  <p className="text-sm text-orange-400">
                    • Classic formula, revised from 1919 original<br/>
                    • Slightly less accurate than Mifflin-St Jeor<br/>
                    • Still widely used in clinical settings
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">Katch-McArdle Formula</h4>
                  <p className="text-gray-300 mb-2">
                    <strong>BMR = 370 + (21.6 × lean body mass in kg)</strong><br/>
                    Lean Body Mass = Total Weight × (1 - Body Fat Percentage/100)
                  </p>
                  <p className="text-sm text-purple-400">
                    • Most accurate when body fat is precisely measured<br/>
                    • Ideal for lean, muscular individuals<br/>
                    • Requires accurate body composition data (DEXA, BodPod)
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">Factors Affecting BMR</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-red-300 mb-2">Factors that Increase BMR</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Higher muscle mass</li>
                    <li>• Younger age</li>
                    <li>• Male gender</li>
                    <li>• Larger body size</li>
                    <li>• Thyroid disorders (hyperthyroid)</li>
                    <li>• Fever and illness</li>
                    <li>• Pregnancy and lactation</li>
                    <li>• Stimulants (caffeine, nicotine)</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">Factors that Decrease BMR</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Higher body fat percentage</li>
                    <li>• Older age (2-3% per decade after 30)</li>
                    <li>• Female gender</li>
                    <li>• Smaller body size</li>
                    <li>• Thyroid disorders (hypothyroid)</li>
                    <li>• Prolonged calorie restriction</li>
                    <li>• Sleep deprivation</li>
                    <li>• Certain medications</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">How to Use Your BMR</h3>
              <div className="bg-gradient-to-r from-red-900/20 to-pink-900/20 p-6 rounded-xl border border-red-800/50">
                <ul className="space-y-2 text-gray-300">
                  <li><strong>Minimum Calorie Intake:</strong> Never eat below BMR for extended periods - this can damage metabolism</li>
                  <li><strong>Weight Loss:</strong> Create deficit from TDEE (BMR × activity), not from BMR directly</li>
                  <li><strong>Muscle Preservation:</strong> Strength training helps maintain BMR during weight loss</li>
                  <li><strong>Metabolic Health:</strong> Regular exercise, adequate protein, and sufficient sleep support healthy BMR</li>
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
              BMR Calculator FAQ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">Which BMR formula should I use?</h3>
                <p className="text-gray-300">
                  For most people, the Mifflin-St Jeor equation is most accurate. Use Katch-McArdle if you have 
                  an accurate body fat measurement (via DEXA scan or BodPod). The Harris-Benedict formula tends 
                  to overestimate BMR by 5-15% but is still acceptable for estimates.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">How accurate are BMR calculators?</h3>
                <p className="text-gray-300">
                  BMR calculators provide estimates within ±10-15% for most people. Individual variations in 
                  genetics, muscle mass, metabolic efficiency, and health conditions can affect accuracy. 
                  Use calculations as starting points and adjust based on real-world results.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">Is it safe to eat below my BMR?</h3>
                <p className="text-gray-300">
                  Eating below BMR for extended periods can slow metabolism, cause muscle loss, and lead to 
                  nutrient deficiencies. For healthy weight loss, create a calorie deficit from your TDEE 
                  (total daily energy expenditure), not your BMR. Generally, stay above BMR calories.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">Why does BMR decrease with age?</h3>
                <p className="text-gray-300">
                  BMR decreases 2-3% per decade after age 30 due to muscle loss (sarcopenia), hormonal changes, 
                  and reduced physical activity. Regular strength training, adequate protein intake, and 
                  maintaining active lifestyle can help minimize age-related BMR decline.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">Can I increase my BMR naturally?</h3>
                <p className="text-gray-300">
                  Yes! Build muscle through strength training (muscle burns more calories at rest), stay hydrated, 
                  get adequate sleep, eat enough protein, drink green tea, and avoid crash dieting. Small 
                  frequent meals and staying active also support healthy metabolic function.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BMRCalculator;