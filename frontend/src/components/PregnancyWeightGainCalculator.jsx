import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Scale, AlertCircle, CheckCircle, Target, TrendingUp, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const PregnancyWeightGainCalculator = () => {
  const [prePregnancyWeight, setPrePregnancyWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("inches");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [gestationalWeeks, setGestationalWeeks] = useState("");
  const [pregnancyType, setPregnancyType] = useState("single");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: -90,
      transition: { duration: 0.5 }
    }
  };

  const calculateWeightGain = async () => {
    const heightValue = heightUnit === "feet" ? (feet && inches) : height;
    
    if (!prePregnancyWeight || !heightValue || !currentWeight || !gestationalWeeks) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert weight to pounds
    let preWeightLbs = parseFloat(prePregnancyWeight);
    let currentWeightLbs = parseFloat(currentWeight);
    if (weightUnit === "kg") {
      preWeightLbs = preWeightLbs * 2.20462;
      currentWeightLbs = currentWeightLbs * 2.20462;
    }

    // Convert height to inches
    let heightInches;
    if (heightUnit === "inches") {
      heightInches = parseFloat(height);
    } else if (heightUnit === "feet") {
      heightInches = parseFloat(feet) * 12 + parseFloat(inches);
    } else {
      heightInches = parseFloat(height) * 0.393701; // cm to inches
    }

    // Calculate pre-pregnancy BMI
    const heightFeet = heightInches / 12;
    const preBMI = preWeightLbs / (heightFeet * heightFeet);

    // Determine BMI category and IOM weight gain recommendations
    let category, minGain, maxGain, weeklyGainSecondThird;
    
    if (pregnancyType === "single") {
      if (preBMI < 18.5) {
        category = "Underweight";
        minGain = 28;
        maxGain = 40;
        weeklyGainSecondThird = "1.0-1.3";
      } else if (preBMI >= 18.5 && preBMI <= 24.9) {
        category = "Normal Weight";
        minGain = 25;
        maxGain = 35;
        weeklyGainSecondThird = "0.8-1.0";
      } else if (preBMI >= 25 && preBMI <= 29.9) {
        category = "Overweight";
        minGain = 15;
        maxGain = 25;
        weeklyGainSecondThird = "0.5-0.7";
      } else {
        category = "Obese";
        minGain = 11;
        maxGain = 20;
        weeklyGainSecondThird = "0.4-0.6";
      }
    } else {
      // Twin pregnancy recommendations
      if (preBMI < 18.5) {
        category = "Underweight (Twins)";
        minGain = 50;
        maxGain = 62;
        weeklyGainSecondThird = "1.25-1.75";
      } else if (preBMI >= 18.5 && preBMI <= 24.9) {
        category = "Normal Weight (Twins)";
        minGain = 37;
        maxGain = 54;
        weeklyGainSecondThird = "1.0-1.25";
      } else if (preBMI >= 25 && preBMI <= 29.9) {
        category = "Overweight (Twins)";
        minGain = 31;
        maxGain = 50;
        weeklyGainSecondThird = "0.75-1.0";
      } else {
        category = "Obese (Twins)";
        minGain = 25;
        maxGain = 42;
        weeklyGainSecondThird = "0.5-0.75";
      }
    }

    // Calculate current weight gain
    const currentGain = currentWeightLbs - preWeightLbs;
    const weeks = parseInt(gestationalWeeks);

    // Calculate expected weight gain at current week
    let targetMinGain = 0, targetMaxGain = 0;
    if (weeks <= 13) {
      // First trimester: 1-4.4 lbs total
      targetMinGain = 1;
      targetMaxGain = 4.4;
    } else {
      // Add first trimester gain plus weekly gain for remaining weeks
      const remainingWeeks = weeks - 13;
      const [minWeekly, maxWeekly] = weeklyGainSecondThird.split('-').map(parseFloat);
      targetMinGain = 1 + (remainingWeeks * minWeekly);
      targetMaxGain = 4.4 + (remainingWeeks * maxWeekly);
    }

    // Calculate remaining weeks and recommended gain
    const remainingWeeks = 40 - weeks;
    const remainingMinGain = Math.max(0, minGain - currentGain);
    const remainingMaxGain = Math.max(0, maxGain - currentGain);

    // Determine status
    let status, statusColor, statusIcon;
    if (currentGain < targetMinGain - 2) {
      status = "Below Recommended Range";
      statusColor = "text-blue-400";
      statusIcon = <Target className="h-5 w-5" />;
    } else if (currentGain > targetMaxGain + 2) {
      status = "Above Recommended Range";
      statusColor = "text-orange-400";
      statusIcon = <AlertCircle className="h-5 w-5" />;
    } else {
      status = "Within Recommended Range";
      statusColor = "text-green-400";
      statusIcon = <CheckCircle className="h-5 w-5" />;
    }

    // Calculate weekly gain needed for remaining pregnancy
    const weeklyGainNeeded = remainingWeeks > 0 ? 
      ((minGain + maxGain) / 2 - currentGain) / remainingWeeks : 0;

    setResult({
      preBMI: preBMI.toFixed(1),
      category,
      currentGain: currentGain.toFixed(1),
      targetMinGain: targetMinGain.toFixed(1),
      targetMaxGain: targetMaxGain.toFixed(1),
      totalMinGain: minGain,
      totalMaxGain: maxGain,
      remainingMinGain: remainingMinGain.toFixed(1),
      remainingMaxGain: remainingMaxGain.toFixed(1),
      remainingWeeks,
      weeklyGainNeeded: weeklyGainNeeded.toFixed(2),
      weeklyGainSecondThird,
      status,
      statusColor,
      statusIcon,
      weeks,
      weightUnit
    });

    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setPrePregnancyWeight("");
    setHeight("");
    setFeet("");
    setInches("");
    setCurrentWeight("");
    setGestationalWeeks("");
    setPregnancyType("single");
    setResult(null);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <motion.div variants={itemVariants} className="mx-auto mb-4 p-3 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full w-fit">
            <Scale className="h-8 w-8 text-green-400" />
          </motion.div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Pregnancy Weight Gain Calculator
          </CardTitle>
          <motion.p variants={itemVariants} className="text-gray-400 mt-2">
            Track healthy weight gain based on IOM guidelines and your pre-pregnancy BMI
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pre-weight" className="text-sm font-medium text-gray-300">
                    Pre-Pregnancy Weight *
                  </Label>
                  <Input
                    id="pre-weight"
                    type="number"
                    value={prePregnancyWeight}
                    onChange={(e) => setPrePregnancyWeight(e.target.value)}
                    className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white"
                    placeholder="Enter weight"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">Weight Unit</Label>
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">Height Unit</Label>
                <Select value={heightUnit} onValueChange={setHeightUnit}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="inches">Inches</SelectItem>
                    <SelectItem value="feet">Feet & Inches</SelectItem>
                    <SelectItem value="cm">Centimeters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {heightUnit === "feet" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Feet</Label>
                    <Input
                      type="number"
                      value={feet}
                      onChange={(e) => setFeet(e.target.value)}
                      className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white"
                      placeholder="5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Inches</Label>
                    <Input
                      type="number"
                      value={inches}
                      onChange={(e) => setInches(e.target.value)}
                      className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white"
                      placeholder="6"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">Height *</Label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white"
                    placeholder={heightUnit === "cm" ? "170" : "66"}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="current-weight" className="text-sm font-medium text-gray-300">
                  Current Weight *
                </Label>
                <Input
                  id="current-weight"
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white"
                  placeholder="Enter current weight"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeks" className="text-sm font-medium text-gray-300">
                  Gestational Weeks *
                </Label>
                <Input
                  id="weeks"
                  type="number"
                  value={gestationalWeeks}
                  onChange={(e) => setGestationalWeeks(e.target.value)}
                  className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white"
                  placeholder="Enter weeks"
                  min="1"
                  max="42"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">Pregnancy Type</Label>
                <Select value={pregnancyType} onValueChange={setPregnancyType}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="single">Single Baby</SelectItem>
                    <SelectItem value="twins">Twins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center space-y-4">
              <Button
                onClick={calculateWeightGain}
                disabled={isCalculating}
                className="w-full h-11 sm:h-10 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Weight Gain
                  </>
                )}
              </Button>

              <Button
                onClick={resetCalculator}
                variant="outline"
                className="w-full h-11 sm:h-10 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Calculator
              </Button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-8 p-6 bg-gradient-to-br from-green-900/20 to-teal-900/20 rounded-xl border border-green-800/30"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Weight Gain Assessment</h3>
                  <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${result.statusColor}`}>
                    {result.statusIcon}
                    {result.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Status */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Current Status
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Pre-Pregnancy BMI:</span>
                        <span className="text-white font-medium">{result.preBMI}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">BMI Category:</span>
                        <span className="text-white font-medium">{result.category}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                        <span className="text-gray-400">Weight Gained:</span>
                        <span className="text-green-400 font-semibold">
                          {result.currentGain} {result.weightUnit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Week {result.weeks} Target:</span>
                        <span className="text-white font-medium">
                          {result.targetMinGain}-{result.targetMaxGain} {result.weightUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-teal-400 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Recommendations
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-teal-900/20 rounded-lg border border-teal-800/30">
                        <p className="text-white font-medium mb-1">Total Goal:</p>
                        <p className="text-teal-300">
                          {result.totalMinGain}-{result.totalMaxGain} {result.weightUnit}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-white font-medium mb-1">Remaining to Gain:</p>
                        <p className="text-gray-300">
                          {result.remainingMinGain}-{result.remainingMaxGain} {result.weightUnit}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-white font-medium mb-1">Weekly Goal (2nd & 3rd):</p>
                        <p className="text-gray-300">
                          {result.weeklyGainSecondThird} {result.weightUnit}/week
                        </p>
                      </div>
                      {result.remainingWeeks > 0 && (
                        <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                          <p className="text-white font-medium mb-1">Suggested Weekly Gain:</p>
                          <p className="text-blue-300">
                            {result.weeklyGainNeeded} {result.weightUnit}/week
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Health Tips */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-800/30">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Healthy Weight Gain Tips
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Eat nutrient-dense foods: fruits, vegetables, whole grains, lean proteins</li>
                    <li>• Stay hydrated with plenty of water throughout the day</li>
                    <li>• Exercise regularly as approved by your healthcare provider</li>
                    <li>• Monitor weight gain gradually, not daily fluctuations</li>
                    <li>• Take prenatal vitamins as recommended</li>
                    <li>• Avoid empty calories from sugary drinks and processed foods</li>
                  </ul>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-200 text-sm">
                      <strong>Medical Disclaimer:</strong> These recommendations are based on IOM guidelines. 
                      Individual needs may vary. Always consult your healthcare provider for personalized 
                      weight gain goals and nutritional advice during pregnancy.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PregnancyWeightGainCalculator;