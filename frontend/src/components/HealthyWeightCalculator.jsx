import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Heart, AlertCircle, CheckCircle, Target, Download, FileText, Loader2, TrendingUp } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from 'jspdf';

const HealthyWeightCalculator = () => {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [bodyFrame, setBodyFrame] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
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

  const calculateHealthyWeight = async () => {
    // Validation
    const heightValid = heightUnit === "ft" ? (feet && inches) : height;
    if (!heightValid || !age || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in height, age, and gender to calculate healthy weight range.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert height to centimeters
    let heightInCm;
    if (heightUnit === "cm") {
      heightInCm = parseFloat(height);
    } else if (heightUnit === "ft") {
      heightInCm = (parseFloat(feet) * 12 + parseFloat(inches)) * 2.54;
    }

    const heightInM = heightInCm / 100;
    const ageNum = parseInt(age);

    // Base BMI ranges (WHO standards)
    let minBMI = 18.5;
    let maxBMI = 24.9;

    // Age adjustments (older adults can have slightly higher healthy BMI)
    if (ageNum >= 65) {
      minBMI = 22.0;
      maxBMI = 27.0;
    } else if (ageNum >= 50) {
      minBMI = 20.0;
      maxBMI = 26.0;
    }

    // Activity level adjustments
    let activityAdjustment = 0;
    if (activityLevel === "high") {
      // Athletes can have higher BMI due to muscle mass
      maxBMI += 2.0;
      activityAdjustment = 2.0;
    } else if (activityLevel === "moderate") {
      maxBMI += 1.0;
      activityAdjustment = 1.0;
    }

    // Body frame adjustments
    let frameAdjustment = 0;
    if (bodyFrame === "large") {
      minBMI += 1.0;
      maxBMI += 1.0;
      frameAdjustment = 1.0;
    } else if (bodyFrame === "small") {
      minBMI -= 1.0;
      maxBMI -= 1.0;
      frameAdjustment = -1.0;
    }

    // Ensure reasonable bounds
    minBMI = Math.max(17.0, minBMI);
    maxBMI = Math.min(30.0, maxBMI);

    // Calculate weight ranges
    const minHealthyWeight = minBMI * Math.pow(heightInM, 2);
    const maxHealthyWeight = maxBMI * Math.pow(heightInM, 2);
    const idealWeight = ((minBMI + maxBMI) / 2) * Math.pow(heightInM, 2);

    // Weight targets for different goals
    const weightLossTarget = minBMI * Math.pow(heightInM, 2);
    const muscleGainTarget = (maxBMI - 1.0) * Math.pow(heightInM, 2);
    const maintenanceTarget = idealWeight;

    // Current weight analysis if provided
    let currentStatus = null;
    let currentBMI = null;
    let weightDifference = null;
    let recommendations = [];

    if (currentWeight) {
      const currentWeightKg = weightUnit === "kg" ? parseFloat(currentWeight) : parseFloat(currentWeight) / 2.20462;
      currentBMI = currentWeightKg / Math.pow(heightInM, 2);
      weightDifference = currentWeightKg - idealWeight;

      if (currentBMI < minBMI) {
        currentStatus = "Below Healthy Range";
        recommendations = [
          "Focus on gradual, healthy weight gain",
          "Increase caloric intake with nutrient-dense foods",
          "Include strength training to build muscle mass",
          "Consult healthcare provider if underweight persists"
        ];
      } else if (currentBMI <= maxBMI) {
        currentStatus = "Within Healthy Range";
        recommendations = [
          "Maintain current healthy weight",
          "Continue balanced diet and regular exercise",
          "Monitor weight changes regularly",
          "Focus on overall health rather than just weight"
        ];
      } else if (currentBMI <= 27.0) {
        currentStatus = "Slightly Above Healthy Range";
        recommendations = [
          "Small caloric deficit for gradual weight loss",
          "Increase physical activity levels",
          "Focus on portion control and mindful eating",
          "Set realistic weight loss goals"
        ];
      } else if (currentBMI <= 30.0) {
        currentStatus = "Above Healthy Range";
        recommendations = [
          "Structured weight loss plan recommended",
          "Combine cardio and strength training",
          "Consider working with a nutritionist",
          "Set gradual weight loss targets"
        ];
      } else {
        currentStatus = "Significantly Above Healthy Range";
        recommendations = [
          "Comprehensive weight management approach needed",
          "Consult healthcare provider for medical evaluation",
          "Consider professional weight loss support",
          "Focus on sustainable lifestyle changes"
        ];
      }
    } else {
      recommendations = [
        "Use this range as your target weight guide",
        "Aim for the middle of your healthy range",
        "Combine with regular physical activity",
        "Monitor progress with healthcare provider"
      ];
    }

    // Determine color based on status
    let color;
    if (currentStatus === "Within Healthy Range") {
      color = "text-green-400";
    } else if (currentStatus?.includes("Slightly")) {
      color = "text-yellow-400";
    } else if (currentStatus?.includes("Above") && !currentStatus.includes("Significantly")) {
      color = "text-orange-400";
    } else if (currentStatus?.includes("Significantly") || currentStatus?.includes("Below")) {
      color = "text-red-400";
    } else {
      color = "text-blue-400";
    }

    // Health insights based on age and activity
    let healthInsights = [];
    
    if (ageNum >= 65) {
      healthInsights.push("Slightly higher BMI ranges are acceptable for older adults");
      healthInsights.push("Focus on maintaining muscle mass and bone health");
    } else if (ageNum >= 50) {
      healthInsights.push("Metabolic changes may affect weight management");
      healthInsights.push("Regular exercise becomes increasingly important");
    } else if (ageNum < 25) {
      healthInsights.push("Young adults may have faster metabolisms");
      healthInsights.push("Establish healthy habits early for long-term benefits");
    }

    if (activityLevel === "high") {
      healthInsights.push("Athletes may have higher BMI due to muscle mass");
      healthInsights.push("Focus on body composition rather than just weight");
    } else if (activityLevel === "low") {
      healthInsights.push("Sedentary lifestyle may require lower weight targets");
      healthInsights.push("Increasing activity level is highly recommended");
    }

    const resultData = {
      minHealthyWeight: minHealthyWeight.toFixed(1),
      maxHealthyWeight: maxHealthyWeight.toFixed(1),
      idealWeight: idealWeight.toFixed(1),
      weightLossTarget: weightLossTarget.toFixed(1),
      muscleGainTarget: muscleGainTarget.toFixed(1),
      maintenanceTarget: maintenanceTarget.toFixed(1),
      minBMI: minBMI.toFixed(1),
      maxBMI: maxBMI.toFixed(1),
      currentBMI: currentBMI ? currentBMI.toFixed(1) : null,
      currentStatus: currentStatus || "Healthy Range Calculated",
      color,
      recommendations,
      healthInsights,
      adjustments: {
        age: ageNum >= 50 ? `Age adjustment applied (${ageNum}+ years)` : null,
        activity: activityAdjustment !== 0 ? `Activity level adjustment: +${activityAdjustment} BMI points` : null,
        frame: frameAdjustment !== 0 ? `Body frame adjustment: ${frameAdjustment > 0 ? '+' : ''}${frameAdjustment} BMI points` : null
      },
      metrics: {
        height: heightUnit === "cm" ? `${height} cm` : `${feet}'${inches}"`,
        age: ageNum,
        gender,
        activityLevel: activityLevel || "Not specified",
        bodyFrame: bodyFrame || "Average",
        currentWeight: currentWeight ? `${currentWeight} ${weightUnit}` : "Not provided"
      },
      calculatedOn: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setIsCalculating(false);

    toast({
      title: "Healthy Weight Range Calculated!",
      description: `Range: ${minHealthyWeight.toFixed(1)} - ${maxHealthyWeight.toFixed(1)} kg`,
    });
  };

  const resetCalculator = () => {
    setHeight("");
    setFeet("");
    setInches("");
    setAge("");
    setGender("");
    setActivityLevel("");
    setBodyFrame("");
    setCurrentWeight("");
    setResult(null);
  };

  const exportToPDF = async () => {
    if (!result) return;

    setIsExporting(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(51, 51, 51);
      const headerY = 25;
      pdf.text('Healthy Weight Range Report', pageWidth / 2, headerY, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Personalized Weight Assessment', pageWidth / 2, headerY + 8, { align: 'center' });
      pdf.text(`Date: ${result.calculatedOn}`, pageWidth / 2, headerY + 15, { align: 'center' });
      
      // Divider
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, headerY + 25, pageWidth - 20, headerY + 25);
      
      let currentY = headerY + 40;
      
      // Personal Information
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Personal Information', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Gender: ${result.metrics.gender.charAt(0).toUpperCase() + result.metrics.gender.slice(1)}`, 25, currentY);
      pdf.text(`Age: ${result.metrics.age} years`, 25, currentY + 8);
      pdf.text(`Height: ${result.metrics.height}`, 25, currentY + 16);
      pdf.text(`Activity Level: ${result.metrics.activityLevel}`, 25, currentY + 24);
      pdf.text(`Body Frame: ${result.metrics.bodyFrame}`, 25, currentY + 32);
      if (result.metrics.currentWeight !== "Not provided") {
        pdf.text(`Current Weight: ${result.metrics.currentWeight}`, 25, currentY + 40);
        currentY += 8;
      }
      currentY += 48;
      
      // Healthy Weight Range
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Your Healthy Weight Range', 20, currentY);
      currentY += 15;
      
      pdf.setFontSize(36);
      pdf.setTextColor(34, 197, 94);
      pdf.text(`${result.minHealthyWeight} - ${result.maxHealthyWeight} kg`, pageWidth / 2, currentY, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.setTextColor(51, 51, 51);
      pdf.text(`Ideal Weight: ${result.idealWeight} kg`, pageWidth / 2, currentY + 12, { align: 'center' });
      currentY += 30;
      
      // BMI Range
      pdf.setFontSize(14);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`BMI Range: ${result.minBMI} - ${result.maxBMI}`, pageWidth / 2, currentY, { align: 'center' });
      currentY += 20;
      
      // Current Status
      if (result.currentBMI) {
        pdf.setFontSize(16);
        pdf.setTextColor(51, 51, 51);
        pdf.text('Current Weight Status', 20, currentY);
        currentY += 10;
        
        const statusColor = result.currentStatus === 'Within Healthy Range' ? [34, 197, 94] : 
                           result.currentStatus.includes('Slightly') ? [245, 158, 11] : [239, 68, 68];
        pdf.setFontSize(14);
        pdf.setTextColor(...statusColor);
        pdf.text(`${result.currentStatus} (BMI: ${result.currentBMI})`, 25, currentY);
        currentY += 20;
      }
      
      // Weight Targets
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Weight Targets by Goal', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Weight Loss Target: ${result.weightLossTarget} kg`, 25, currentY);
      pdf.text(`Maintenance Target: ${result.maintenanceTarget} kg`, 25, currentY + 8);
      pdf.text(`Muscle Gain Target: ${result.muscleGainTarget} kg`, 25, currentY + 16);
      currentY += 30;
      
      // Adjustments Applied
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Personalization Adjustments', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      Object.entries(result.adjustments).forEach(([key, value]) => {
        if (value) {
          pdf.text(`• ${value}`, 25, currentY);
          currentY += 6;
        }
      });
      currentY += 10;
      
      // Health Insights
      if (result.healthInsights.length > 0) {
        pdf.setFontSize(16);
        pdf.setTextColor(51, 51, 51);
        pdf.text('Health Insights', 20, currentY);
        currentY += 10;
        
        pdf.setFontSize(12);
        pdf.setTextColor(80, 80, 80);
        result.healthInsights.forEach((insight) => {
          const insightLines = pdf.splitTextToSize(`• ${insight}`, pageWidth - 40);
          pdf.text(insightLines, 25, currentY);
          currentY += insightLines.length * 6 + 3;
        });
        currentY += 10;
      }
      
      // Recommendations
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Recommendations', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      result.recommendations.forEach((rec) => {
        const recLines = pdf.splitTextToSize(`• ${rec}`, pageWidth - 40);
        pdf.text(recLines, 25, currentY);
        currentY += recLines.length * 6 + 3;
      });
      
      // Disclaimer
      currentY += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);
      const disclaimer = "Disclaimer: This healthy weight range is calculated based on BMI and personal factors. Individual health needs may vary. Consult healthcare professionals for personalized medical advice and weight management guidance.";
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
      pdf.text(disclaimerLines, 20, currentY);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Healthy Weight Calculator - Personalized Assessment', pageWidth / 2, pageHeight - 15, { align: 'center' });
      
      pdf.save(`Healthy-Weight-Report-${result.calculatedOn.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF Export Successful!",
        description: "Your healthy weight range report has been downloaded.",
      });
      
    } catch (error) {
      console.error('PDF Export Error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF report.",
        variant: "destructive",
      });
    }

    setIsExporting(false);
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-4 sm:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="p-3 rounded-full bg-green-500/10"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="h-8 w-8 text-green-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Healthy Weight Calculator
            </span>
          </CardTitle>
          <p className="text-gray-400 text-lg">
            Calculate your personalized healthy weight range based on multiple factors
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Personal Information */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-300">Gender *</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-green-500/50 focus:border-green-500 transition-all duration-300">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-300">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-gray-300">Height *</Label>
                <div className="flex gap-2">
                  <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white w-16 sm:w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="ft">ft</SelectItem>
                    </SelectContent>
                  </Select>
                  {heightUnit === "cm" ? (
                    <Input
                      type="number"
                      placeholder="Height in cm"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300 flex-1"
                    />
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="Feet"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                      />
                      <Input
                        type="number"
                        placeholder="Inches"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentWeight" className="text-gray-300">Current Weight (optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="currentWeight"
                    type="number"
                    placeholder="Current weight"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300 flex-1"
                  />
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white w-16 sm:w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-gray-500">For personalized assessment and recommendations</p>
              </div>
            </motion.div>

            {/* Additional Factors */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Factors</h3>
              
              <div className="space-y-2">
                <Label htmlFor="activityLevel" className="text-gray-300">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-green-500/50 focus:border-green-500 transition-all duration-300">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="low">Low (Sedentary)</SelectItem>
                    <SelectItem value="moderate">Moderate (Regular Exercise)</SelectItem>
                    <SelectItem value="high">High (Athletic/Very Active)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Affects weight range recommendations</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyFrame" className="text-gray-300">Body Frame</Label>
                <Select value={bodyFrame} onValueChange={setBodyFrame}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-green-500/50 focus:border-green-500 transition-all duration-300">
                    <SelectValue placeholder="Select body frame" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="small">Small Frame</SelectItem>
                    <SelectItem value="medium">Medium Frame</SelectItem>
                    <SelectItem value="large">Large Frame</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Based on wrist/elbow measurements and bone structure</p>
              </div>

              <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <h4 className="text-sm font-semibold text-green-300 mb-2">Personalized Assessment</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Age-adjusted BMI ranges</li>
                  <li>• Activity level considerations</li>
                  <li>• Body frame adjustments</li>
                  <li>• Multiple weight targets</li>
                  <li>• Health-focused recommendations</li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
            <Button
              onClick={calculateHealthyWeight}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4" />
                  Calculate Healthy Weight Range
                </>
              )}
            </Button>

            <Button
              onClick={resetCalculator}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 px-4 sm:px-6 sm:flex-none"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </motion.div>

          <AnimatePresence>
            {result && (
              <motion.div
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-8 p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl border border-gray-700 backdrop-blur-sm"
              >
                <div className="text-center mb-6">
                  <motion.div
                    className="text-5xl font-bold mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                  >
                    <span className="text-green-400">{result.minHealthyWeight} - {result.maxHealthyWeight} kg</span>
                  </motion.div>
                  <h3 className={`text-2xl font-semibold mb-2 ${result.color}`}>{result.currentStatus}</h3>
                  <p className="text-gray-400">BMI Range: {result.minBMI} - {result.maxBMI}</p>
                  {result.currentBMI && (
                    <p className="text-gray-300 mt-2">Current BMI: {result.currentBMI}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-green-400" />
                      Weight Targets
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Weight Loss:</span>
                        <span className="text-white font-medium">{result.weightLossTarget} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Maintenance:</span>
                        <span className="text-white font-medium">{result.maintenanceTarget} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Muscle Gain:</span>
                        <span className="text-white font-medium">{result.muscleGainTarget} kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                      Personalizations
                    </h4>
                    <div className="space-y-1 text-xs text-gray-400">
                      {Object.entries(result.adjustments).map(([key, value]) => 
                        value && (
                          <p key={key}>• {value}</p>
                        )
                      )}
                      {Object.values(result.adjustments).every(v => !v) && (
                        <p>• Standard BMI ranges applied</p>
                      )}
                    </div>
                  </div>
                </div>

                {result.healthInsights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
                      Health Insights
                    </h4>
                    <ul className="space-y-2">
                      {result.healthInsights.map((insight, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <span className="text-yellow-400 mr-2">•</span>
                          {insight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start text-gray-300 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <span className="text-green-400 mr-2">•</span>
                        {rec}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Button
                    onClick={exportToPDF}
                    disabled={isExporting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white transition-all duration-300"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Export Healthy Weight Report
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HealthyWeightCalculator;