import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Target, AlertCircle, CheckCircle, Scale, Download, FileText, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from 'jspdf';

const IdealWeightCalculator = () => {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [formula, setFormula] = useState("devine");
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

  const calculateIdealWeight = async () => {
    // Validation
    const heightValid = heightUnit === "ft" ? (feet && inches) : height;
    if (!heightValid || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in height and gender to calculate ideal weight.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert height to inches for calculations
    let heightInInches;
    if (heightUnit === "cm") {
      heightInInches = parseFloat(height) / 2.54;
    } else if (heightUnit === "ft") {
      heightInInches = parseFloat(feet) * 12 + parseFloat(inches);
    }

    const heightInCm = heightInInches * 2.54;

    let idealWeight, method, formula_name;

    // Calculate based on selected formula
    if (formula === "devine") {
      // Devine Formula (Gold Standard)
      if (gender === "male") {
        idealWeight = 50.0 + 2.3 * Math.max(0, heightInInches - 60);
      } else {
        idealWeight = 45.5 + 2.3 * Math.max(0, heightInInches - 60);
      }
      method = "Devine Formula";
      formula_name = "Medical Gold Standard";
    } else if (formula === "robinson") {
      // Robinson Formula
      if (gender === "male") {
        idealWeight = 52.0 + 1.9 * Math.max(0, heightInInches - 60);
      } else {
        idealWeight = 49.0 + 1.7 * Math.max(0, heightInInches - 60);
      }
      method = "Robinson Formula";
      formula_name = "Modified Devine";
    } else if (formula === "miller") {
      // Miller Formula
      if (gender === "male") {
        idealWeight = 56.2 + 1.41 * Math.max(0, heightInInches - 60);
      } else {
        idealWeight = 53.1 + 1.36 * Math.max(0, heightInInches - 60);
      }
      method = "Miller Formula";
      formula_name = "Alternative Medical";
    } else if (formula === "hamwi") {
      // Hamwi Formula
      if (gender === "male") {
        idealWeight = 48.0 + 2.7 * Math.max(0, heightInInches - 60);
      } else {
        idealWeight = 45.5 + 2.2 * Math.max(0, heightInInches - 60);
      }
      method = "Hamwi Formula";
      formula_name = "Clinical Standard";
    } else if (formula === "broca") {
      // Broca Formula
      if (gender === "male") {
        idealWeight = heightInCm - 100;
      } else {
        idealWeight = (heightInCm - 100) * 0.9;
      }
      method = "Broca Formula";
      formula_name = "Traditional European";
    } else {
      // BMI-based calculation (22 BMI)
      const heightInM = heightInCm / 100;
      idealWeight = 22 * Math.pow(heightInM, 2);
      method = "BMI-Based (BMI 22)";
      formula_name = "WHO Standard";
    }

    // Calculate BMI range (healthy range 18.5-24.9)
    const heightInM = heightInCm / 100;
    const minHealthyWeight = 18.5 * Math.pow(heightInM, 2);
    const maxHealthyWeight = 24.9 * Math.pow(heightInM, 2);

    // Weight comparison if current weight is provided
    let weightComparison = null;
    let weightStatus = null;
    let weightDifference = null;
    let recommendations = [];

    if (currentWeight) {
      const currentWeightKg = weightUnit === "kg" ? parseFloat(currentWeight) : parseFloat(currentWeight) / 2.20462;
      weightDifference = currentWeightKg - idealWeight;
      
      if (Math.abs(weightDifference) <= 2) {
        weightStatus = "At Ideal Weight";
        weightComparison = "Excellent! You're at your ideal weight range.";
        recommendations = ["Maintain current weight", "Continue healthy lifestyle", "Regular monitoring"];
      } else if (weightDifference > 0) {
        if (weightDifference <= 5) {
          weightStatus = "Slightly Above Ideal";
          weightComparison = `${weightDifference.toFixed(1)} kg above ideal weight`;
          recommendations = ["Small caloric deficit", "Increase physical activity", "Focus on portion control"];
        } else if (weightDifference <= 10) {
          weightStatus = "Moderately Above Ideal";
          weightComparison = `${weightDifference.toFixed(1)} kg above ideal weight`;
          recommendations = ["Structured weight loss plan", "Regular exercise routine", "Nutritional guidance"];
        } else {
          weightStatus = "Significantly Above Ideal";
          weightComparison = `${weightDifference.toFixed(1)} kg above ideal weight`;
          recommendations = ["Comprehensive weight management", "Professional guidance", "Medical consultation"];
        }
      } else {
        const deficitAmount = Math.abs(weightDifference);
        if (deficitAmount <= 5) {
          weightStatus = "Slightly Below Ideal";
          weightComparison = `${deficitAmount.toFixed(1)} kg below ideal weight`;
          recommendations = ["Healthy weight gain", "Increase caloric intake", "Strength training"];
        } else {
          weightStatus = "Below Ideal";
          weightComparison = `${deficitAmount.toFixed(1)} kg below ideal weight`;
          recommendations = ["Nutritional support", "Professional guidance", "Monitor health status"];
        }
      }
    } else {
      recommendations = ["Use ideal weight as target", "Combine with healthy BMI range", "Consult healthcare provider"];
    }

    // Determine color based on status
    let color;
    if (weightStatus === "At Ideal Weight") {
      color = "text-green-400";
    } else if (weightStatus?.includes("Slightly")) {
      color = "text-yellow-400";
    } else if (weightStatus?.includes("Moderately") || weightStatus?.includes("Below Ideal")) {
      color = "text-orange-400";
    } else if (weightStatus?.includes("Significantly")) {
      color = "text-red-400";
    } else {
      color = "text-blue-400";
    }

    const resultData = {
      idealWeight: idealWeight.toFixed(1),
      minHealthyWeight: minHealthyWeight.toFixed(1),
      maxHealthyWeight: maxHealthyWeight.toFixed(1),
      method,
      formula_name,
      weightStatus: weightStatus || "Target Weight Calculated",
      weightComparison: weightComparison || "Use this as your target weight",
      weightDifference,
      color,
      recommendations,
      metrics: {
        height: heightUnit === "cm" ? `${height} cm` : `${feet}'${inches}"`,
        gender,
        age: age || "Not specified",
        currentWeight: currentWeight ? `${currentWeight} ${weightUnit}` : "Not specified"
      },
      calculatedOn: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setIsCalculating(false);

    toast({
      title: "Ideal Weight Calculated!",
      description: `Ideal weight: ${idealWeight.toFixed(1)} kg - ${weightStatus || 'Target set'}`,
    });
  };

  const resetCalculator = () => {
    setHeight("");
    setFeet("");
    setInches("");
    setGender("");
    setAge("");
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
      pdf.text('Ideal Weight Analysis Report', pageWidth / 2, headerY, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Medical Formula-Based Assessment', pageWidth / 2, headerY + 8, { align: 'center' });
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
      pdf.text(`Height: ${result.metrics.height}`, 25, currentY + 8);
      if (result.metrics.age !== "Not specified") {
        pdf.text(`Age: ${result.metrics.age} years`, 25, currentY + 16);
        currentY += 8;
      }
      if (result.metrics.currentWeight !== "Not specified") {
        pdf.text(`Current Weight: ${result.metrics.currentWeight}`, 25, currentY + 16);
        currentY += 8;
      }
      currentY += 24;
      
      // Results
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Ideal Weight Results', 20, currentY);
      currentY += 15;
      
      pdf.setFontSize(36);
      const statusColor = result.weightStatus === 'At Ideal Weight' ? [34, 197, 94] : 
                         result.weightStatus?.includes('Slightly') ? [245, 158, 11] :
                         result.weightStatus?.includes('Moderately') ? [251, 146, 60] : [59, 130, 246];
      pdf.setTextColor(...statusColor);
      pdf.text(`${result.idealWeight} kg`, pageWidth / 2, currentY, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.text(result.weightStatus, pageWidth / 2, currentY + 12, { align: 'center' });
      currentY += 30;
      
      // Method Information
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Calculation Method', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Formula: ${result.method}`, 25, currentY);
      pdf.text(`Type: ${result.formula_name}`, 25, currentY + 8);
      currentY += 25;
      
      // Healthy Weight Range
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Healthy Weight Range (BMI 18.5-24.9)', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(14);
      pdf.setTextColor(34, 197, 94);
      pdf.text(`${result.minHealthyWeight} - ${result.maxHealthyWeight} kg`, 25, currentY);
      currentY += 20;
      
      // Weight Comparison
      if (result.weightDifference !== null) {
        pdf.setFontSize(16);
        pdf.setTextColor(51, 51, 51);
        pdf.text('Weight Analysis', 20, currentY);
        currentY += 10;
        
        pdf.setFontSize(12);
        pdf.setTextColor(80, 80, 80);
        pdf.text(result.weightComparison, 25, currentY);
        currentY += 15;
      }
      
      // Recommendations
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Recommendations', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      result.recommendations.forEach((rec, index) => {
        const recLines = pdf.splitTextToSize(`• ${rec}`, pageWidth - 40);
        pdf.text(recLines, 25, currentY);
        currentY += recLines.length * 6 + 3;
      });
      
      // Disclaimer
      currentY += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);
      const disclaimer = "Disclaimer: Ideal weight calculations are estimates based on height and gender. Individual factors like muscle mass, bone density, and overall health should be considered. Consult healthcare professionals for personalized weight management advice.";
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
      pdf.text(disclaimerLines, 20, currentY);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Ideal Weight Calculator - Medical Formula-Based Assessment', pageWidth / 2, pageHeight - 15, { align: 'center' });
      
      pdf.save(`Ideal-Weight-Report-${result.calculatedOn.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF Export Successful!",
        description: "Your ideal weight analysis report has been downloaded.",
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
              className="p-3 rounded-full bg-blue-500/10"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Scale className="h-8 w-8 text-blue-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Ideal Weight Calculator
            </span>
          </CardTitle>
          <p className="text-gray-400 text-lg">
            Calculate your ideal weight using validated medical formulas
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
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
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
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300 flex-1"
                    />
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="Feet"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      />
                      <Input
                        type="number"
                        placeholder="Inches"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-300">Age (optional)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300"
                />
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
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300 flex-1"
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
                <p className="text-xs text-gray-500">For weight comparison and recommendations</p>
              </div>
            </motion.div>

            {/* Calculation Options */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Calculation Method</h3>
              
              <div className="space-y-2">
                <Label htmlFor="formula" className="text-gray-300">Formula</Label>
                <Select value={formula} onValueChange={setFormula}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300">
                    <SelectValue placeholder="Select calculation formula" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="devine">Devine Formula (Gold Standard)</SelectItem>
                    <SelectItem value="robinson">Robinson Formula</SelectItem>
                    <SelectItem value="miller">Miller Formula</SelectItem>
                    <SelectItem value="hamwi">Hamwi Formula</SelectItem>
                    <SelectItem value="broca">Broca Formula</SelectItem>
                    <SelectItem value="bmi">BMI-Based (BMI 22)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <h4 className="text-sm font-semibold text-blue-300 mb-2">Formula Information</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  {formula === "devine" && (
                    <div>
                      <p className="font-medium text-blue-300">Devine Formula:</p>
                      <p>• Medical gold standard</p>
                      <p>• Most widely used in clinical practice</p>
                      <p>• Recommended by healthcare professionals</p>
                    </div>
                  )}
                  {formula === "robinson" && (
                    <div>
                      <p className="font-medium text-blue-300">Robinson Formula:</p>
                      <p>• Modified version of Devine</p>
                      <p>• Slightly different constants</p>
                      <p>• Alternative medical standard</p>
                    </div>
                  )}
                  {formula === "miller" && (
                    <div>
                      <p className="font-medium text-blue-300">Miller Formula:</p>
                      <p>• Another Devine variation</p>
                      <p>• Used in medical dosing</p>
                      <p>• Different weight coefficients</p>
                    </div>
                  )}
                  {formula === "hamwi" && (
                    <div>
                      <p className="font-medium text-blue-300">Hamwi Formula:</p>
                      <p>• Clinical standard</p>
                      <p>• Used in dietetics</p>
                      <p>• Quick estimation method</p>
                    </div>
                  )}
                  {formula === "broca" && (
                    <div>
                      <p className="font-medium text-blue-300">Broca Formula:</p>
                      <p>• Traditional European method</p>
                      <p>• Height-based calculation</p>
                      <p>• Simple but less precise</p>
                    </div>
                  )}
                  {formula === "bmi" && (
                    <div>
                      <p className="font-medium text-blue-300">BMI-Based:</p>
                      <p>• Uses BMI of 22 (optimal)</p>
                      <p>• WHO recommended</p>
                      <p>• Gender-neutral approach</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
            <Button
              onClick={calculateIdealWeight}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Scale className="mr-2 h-4 w-4" />
                  Calculate Ideal Weight
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
                    className="text-6xl font-bold mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                  >
                    <span className={result.color}>{result.idealWeight} kg</span>
                  </motion.div>
                  <h3 className={`text-2xl font-semibold mb-2 ${result.color}`}>{result.weightStatus}</h3>
                  <p className="text-gray-400">{result.method}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-400" />
                      Weight Analysis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ideal Weight:</span>
                        <span className="text-white font-medium">{result.idealWeight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Healthy Range:</span>
                        <span className="text-white font-medium">{result.minHealthyWeight} - {result.maxHealthyWeight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Formula Type:</span>
                        <span className="text-white font-medium">{result.formula_name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
                      Assessment
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{result.weightComparison}</p>
                  </div>
                </div>

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
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white transition-all duration-300"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Export Weight Report
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

export default IdealWeightCalculator;