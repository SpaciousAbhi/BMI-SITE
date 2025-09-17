import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RefreshCw } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateBMI = () => {
    // Validation
    if (!weight || !height || (heightUnit === "ft" && (!feet || !inches)) || !age || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate your BMI.",
        variant: "destructive",
      });
      return;
    }

    // Convert weight to kg
    let weightInKg = parseFloat(weight);
    if (weightUnit === "lbs") {
      weightInKg = weightInKg * 0.453592;
    }

    // Convert height to meters
    let heightInM;
    if (heightUnit === "cm") {
      heightInM = parseFloat(height) / 100;
    } else if (heightUnit === "ft") {
      const totalInches = parseFloat(feet) * 12 + parseFloat(inches);
      heightInM = totalInches * 0.0254;
    } else {
      heightInM = parseFloat(height) * 0.0254; // inches
    }

    // Calculate BMI
    const bmi = weightInKg / (heightInM * heightInM);
    
    // Determine category and color
    let category, color, healthRisk, recommendations;
    
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-400";
      healthRisk = "Increased risk of nutritional deficiency and osteoporosis";
      recommendations = ["Consult with a healthcare provider", "Consider a balanced diet to gain healthy weight", "Include strength training exercises"];
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal Weight";
      color = "text-green-400";
      healthRisk = "Lower risk of weight-related health problems";
      recommendations = ["Maintain current lifestyle", "Continue regular physical activity", "Keep eating a balanced diet"];
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      color = "text-yellow-400";
      healthRisk = "Increased risk of cardiovascular disease and diabetes";
      recommendations = ["Consider gradual weight loss", "Increase physical activity", "Focus on portion control and healthy eating"];
    } else {
      category = "Obese";
      color = "text-red-400";
      healthRisk = "High risk of serious health conditions";
      recommendations = ["Consult healthcare provider immediately", "Consider professional weight management program", "Focus on lifestyle changes with medical supervision"];
    }

    // Calculate ideal weight range (BMI 18.5-24.9)
    const idealWeightMin = 18.5 * (heightInM * heightInM);
    const idealWeightMax = 24.9 * (heightInM * heightInM);

    setResult({
      bmi: bmi.toFixed(1),
      category,
      color,
      healthRisk,
      recommendations,
      idealWeightRange: {
        min: idealWeightMin.toFixed(1),
        max: idealWeightMax.toFixed(1),
        unit: weightUnit
      },
      metrics: {
        weight: weightInKg.toFixed(1),
        height: (heightInM * 100).toFixed(1),
        age: parseInt(age),
        gender
      }
    });

    toast({
      title: "BMI Calculated Successfully!",
      description: `Your BMI is ${bmi.toFixed(1)} - ${category}`,
    });
  };

  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setFeet("");
    setInches("");
    setAge("");
    setGender("");
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Input */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Calculator className="h-6 w-6 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                BMI Calculator
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Weight Input */}
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-white">Weight *</Label>
              <div className="flex space-x-2">
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                />
                <Select value={weightUnit} onValueChange={setWeightUnit}>
                  <SelectTrigger className="w-20 bg-gray-800 border-gray-700 text-white">
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
              <Label htmlFor="height" className="text-white">Height *</Label>
              <div className="flex space-x-2">
                {heightUnit === "ft" ? (
                  <>
                    <Input
                      type="number"
                      placeholder="Feet"
                      value={feet}
                      onChange={(e) => setFeet(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Inches"
                      value={inches}
                      onChange={(e) => setInches(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white flex-1"
                    />
                  </>
                ) : (
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white flex-1"
                  />
                )}
                <Select value={heightUnit} onValueChange={setHeightUnit}>
                  <SelectTrigger className="w-16 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="ft">ft</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Age Input */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-white">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Gender Input */}
            <div className="space-y-2">
              <Label className="text-white">Gender *</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button 
                onClick={calculateBMI}
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold"
              >
                Calculate BMI
              </Button>
              <Button 
                onClick={resetCalculator}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Display */}
        {result && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Your BMI Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* BMI Score */}
              <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  {result.bmi}
                </div>
                <div className={`text-xl font-semibold ${result.color}`}>
                  {result.category}
                </div>
              </div>

              {/* Health Risk */}
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Health Risk Assessment</h4>
                <p className="text-gray-300 text-sm">{result.healthRisk}</p>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Recommendations</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal Weight Range */}
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Ideal Weight Range</h4>
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <span className="text-green-400 font-medium">
                    {result.idealWeightRange.min} - {result.idealWeightRange.max} {result.idealWeightRange.unit}
                  </span>
                </div>
              </div>

              {/* Summary Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Weight</div>
                  <div className="font-semibold text-white">{result.metrics.weight} kg</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Height</div>
                  <div className="font-semibold text-white">{result.metrics.height} cm</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;