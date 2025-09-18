import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Target, AlertCircle, CheckCircle, Activity, Download, FileText, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from 'jspdf';

const LeanBodyMassCalculator = () => {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [calculationMethod, setCalculationMethod] = useState("boer");
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

  const calculateLeanBodyMass = async () => {
    // Validation
    const heightValid = heightUnit === "ft" ? (feet && inches) : height;
    if (!weight || !heightValid || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in weight, height, and gender to calculate lean body mass.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert measurements to metric units
    let heightInCm;
    if (heightUnit === "cm") {
      heightInCm = parseFloat(height);
    } else if (heightUnit === "ft") {
      heightInCm = (parseFloat(feet) * 12 + parseFloat(inches)) * 2.54;
    }

    let weightInKg = parseFloat(weight);
    if (weightUnit === "lbs") {
      weightInKg = weightInKg / 2.20462;
    }

    let leanBodyMass, fatMass, method, accuracy, recommendations;

    // Calculate based on method
    if (bodyFat && parseFloat(bodyFat) > 0) {
      // Direct method using body fat percentage
      const bodyFatPercent = parseFloat(bodyFat) / 100;
      fatMass = weightInKg * bodyFatPercent;
      leanBodyMass = weightInKg - fatMass;
      method = "Direct Body Fat Method";
      accuracy = "High (uses actual body fat %)";
      recommendations = ["Most accurate method available", "Monitor body fat changes over time", "Ideal for tracking body composition"];
    } else {
      // Formula-based calculation
      if (calculationMethod === "boer") {
        // Boer Formula
        if (gender === "male") {
          leanBodyMass = 0.407 * weightInKg + 0.267 * heightInCm - 19.2;
        } else {
          leanBodyMass = 0.252 * weightInKg + 0.473 * heightInCm - 48.3;
        }
        method = "Boer Formula";
      } else if (calculationMethod === "james") {
        // James Formula
        if (gender === "male") {
          leanBodyMass = 1.1 * weightInKg - 128 * Math.pow(weightInKg / Math.pow(heightInCm, 2), 2);
        } else {
          leanBodyMass = 1.07 * weightInKg - 148 * Math.pow(weightInKg / Math.pow(heightInCm, 2), 2);
        }
        method = "James Formula";
      } else {
        // Hume Formula
        if (gender === "male") {
          leanBodyMass = 0.32810 * weightInKg + 0.33929 * heightInCm - 29.5336;
        } else {
          leanBodyMass = 0.29569 * weightInKg + 0.41813 * heightInCm - 43.2933;
        }
        method = "Hume Formula";
      }
      
      fatMass = weightInKg - leanBodyMass;
      accuracy = "Moderate (formula-based estimate)";
      recommendations = ["Consider body fat measurement for accuracy", "Use for general body composition tracking", "Supplement with other assessment methods"];
    }

    // Calculate derived metrics
    const leanBodyMassPercent = (leanBodyMass / weightInKg) * 100;
    const fatMassPercent = (fatMass / weightInKg) * 100;
    const ffmi = leanBodyMass / Math.pow(heightInCm / 100, 2); // Fat-Free Mass Index

    // Determine category and health insights
    let category, color, healthInsight, additionalRecs;
    
    // FFMI categories
    if (gender === "male") {
      if (ffmi < 17) {
        category = "Below Average";
        color = "text-blue-400";
        healthInsight = "Lower muscle mass - consider strength training";
        additionalRecs = ["Focus on resistance training", "Ensure adequate protein intake", "Consider working with a trainer"];
      } else if (ffmi < 19) {
        category = "Average";
        color = "text-yellow-400";
        healthInsight = "Normal muscle mass for general population";
        additionalRecs = ["Maintain current activity level", "Consider progressive overload", "Monitor protein intake"];
      } else if (ffmi < 22) {
        category = "Above Average";
        color = "text-green-400";
        healthInsight = "Good muscle development";
        additionalRecs = ["Continue current training", "Focus on muscle maintenance", "Optimize nutrition timing"];
      } else if (ffmi < 25) {
        category = "Excellent";
        color = "text-green-400";
        healthInsight = "Very good muscle mass - athletic level";
        additionalRecs = ["Maintain training consistency", "Focus on performance goals", "Consider periodization"];
      } else {
        category = "Exceptional";
        color = "text-blue-400";
        healthInsight = "Elite level muscle mass";
        additionalRecs = ["Maintain elite training", "Focus on performance optimization", "Consider genetic potential"];
      }
    } else {
      if (ffmi < 14) {
        category = "Below Average";
        color = "text-blue-400";
        healthInsight = "Lower muscle mass - consider strength training";
        additionalRecs = ["Focus on resistance training", "Ensure adequate protein intake", "Consider working with a trainer"];
      } else if (ffmi < 16) {
        category = "Average";
        color = "text-yellow-400";
        healthInsight = "Normal muscle mass for general population";
        additionalRecs = ["Maintain current activity level", "Consider progressive overload", "Monitor protein intake"];
      } else if (ffmi < 18) {
        category = "Above Average";
        color = "text-green-400";
        healthInsight = "Good muscle development";
        additionalRecs = ["Continue current training", "Focus on muscle maintenance", "Optimize nutrition timing"];
      } else if (ffmi < 20) {
        category = "Excellent";
        color = "text-green-400";
        healthInsight = "Very good muscle mass - athletic level";
        additionalRecs = ["Maintain training consistency", "Focus on performance goals", "Consider periodization"];
      } else {
        category = "Exceptional";
        color = "text-blue-400";
        healthInsight = "Elite level muscle mass";
        additionalRecs = ["Maintain elite training", "Focus on performance optimization", "Consider genetic potential"];
      }
    }

    const resultData = {
      leanBodyMass: leanBodyMass.toFixed(1),
      fatMass: fatMass.toFixed(1),
      leanBodyMassPercent: leanBodyMassPercent.toFixed(1),
      fatMassPercent: fatMassPercent.toFixed(1),
      ffmi: ffmi.toFixed(1),
      category,
      color,
      healthInsight,
      method,
      accuracy,
      recommendations: [...recommendations, ...additionalRecs],
      metrics: {
        weight: weightInKg.toFixed(1),
        height: heightInCm.toFixed(1),
        age: age || "Not specified",
        gender,
        bodyFat: bodyFat || "Not specified"
      },
      calculatedOn: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setIsCalculating(false);

    toast({
      title: "Lean Body Mass Calculated!",
      description: `LBM: ${leanBodyMass.toFixed(1)} kg - ${category}`,
    });
  };

  const resetCalculator = () => {
    setHeight("");
    setFeet("");
    setInches("");
    setWeight("");
    setAge("");
    setGender("");
    setBodyFat("");
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
      pdf.text('Lean Body Mass Analysis Report', pageWidth / 2, headerY, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Body Composition Assessment', pageWidth / 2, headerY + 8, { align: 'center' });
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
      pdf.text(`Weight: ${result.metrics.weight} kg`, 25, currentY + 8);
      pdf.text(`Height: ${result.metrics.height} cm`, 25, currentY + 16);
      if (result.metrics.age !== "Not specified") {
        pdf.text(`Age: ${result.metrics.age} years`, 25, currentY + 24);
        currentY += 8;
      }
      if (result.metrics.bodyFat !== "Not specified") {
        pdf.text(`Body Fat: ${result.metrics.bodyFat}%`, 25, currentY + 24);
        currentY += 8;
      }
      currentY += 32;
      
      // Results
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Lean Body Mass Results', 20, currentY);
      currentY += 15;
      
      pdf.setFontSize(36);
      const categoryColor = result.category === 'Excellent' ? [34, 197, 94] : 
                           result.category === 'Above Average' ? [34, 197, 94] :
                           result.category === 'Average' ? [245, 158, 11] : [59, 130, 246];
      pdf.setTextColor(...categoryColor);
      pdf.text(`${result.leanBodyMass} kg`, pageWidth / 2, currentY, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.text(result.category, pageWidth / 2, currentY + 12, { align: 'center' });
      currentY += 30;
      
      // Body Composition Breakdown
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Body Composition Breakdown', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Lean Body Mass: ${result.leanBodyMass} kg (${result.leanBodyMassPercent}%)`, 25, currentY);
      pdf.text(`Fat Mass: ${result.fatMass} kg (${result.fatMassPercent}%)`, 25, currentY + 8);
      pdf.text(`Fat-Free Mass Index (FFMI): ${result.ffmi}`, 25, currentY + 16);
      pdf.text(`Method: ${result.method}`, 25, currentY + 24);
      pdf.text(`Accuracy: ${result.accuracy}`, 25, currentY + 32);
      currentY += 45;
      
      // Health Assessment
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Health Assessment', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      const healthLines = pdf.splitTextToSize(result.healthInsight, pageWidth - 40);
      pdf.text(healthLines, 25, currentY);
      currentY += healthLines.length * 6 + 15;
      
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
      const disclaimer = "Disclaimer: This lean body mass calculation is for informational purposes only. Results may vary based on measurement accuracy and individual factors. Consult healthcare professionals for comprehensive body composition assessment.";
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
      pdf.text(disclaimerLines, 20, currentY);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Lean Body Mass Calculator - Body Composition Analysis', pageWidth / 2, pageHeight - 15, { align: 'center' });
      
      pdf.save(`Lean-Body-Mass-Report-${result.calculatedOn.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF Export Successful!",
        description: "Your lean body mass analysis report has been downloaded.",
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
              <Activity className="h-8 w-8 text-green-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Lean Body Mass Calculator
            </span>
          </CardTitle>
          <p className="text-gray-400 text-lg">
            Calculate your lean body mass using validated medical formulas
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
                <Label htmlFor="age" className="text-gray-300">Age (optional)</Label>
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
                <Label htmlFor="weight" className="text-gray-300">Weight *</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
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
            </motion.div>

            {/* Calculation Options */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Calculation Method</h3>
              
              <div className="space-y-2">
                <Label htmlFor="bodyFat" className="text-gray-300">Body Fat % (optional - for highest accuracy)</Label>
                <Input
                  id="bodyFat"
                  type="number"
                  step="0.1"
                  placeholder="Enter body fat percentage"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                />
                <p className="text-xs text-gray-500">If known, this provides the most accurate calculation</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method" className="text-gray-300">Formula (if body fat % not available)</Label>
                <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-green-500/50 focus:border-green-500 transition-all duration-300">
                    <SelectValue placeholder="Select calculation method" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="boer">Boer Formula (WHO/CDC Referenced)</SelectItem>
                    <SelectItem value="james">James Formula (WHO/CDC Referenced)</SelectItem>
                    <SelectItem value="hume">Hume Formula (WHO/CDC Referenced)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <h4 className="text-sm font-semibold text-green-300 mb-2">About Lean Body Mass</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Includes muscle, bone, organs, and water</li>
                  <li>• Excludes body fat</li>
                  <li>• Important for metabolic health</li>
                  <li>• Used in fitness and medical assessments</li>
                  <li>• FFMI: Fat-Free Mass Index normalizes for height</li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex gap-4 pt-6">
            <Button
              onClick={calculateLeanBodyMass}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Activity className="mr-2 h-4 w-4" />
                  Calculate Lean Body Mass
                </>
              )}
            </Button>

            <Button
              onClick={resetCalculator}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 px-6"
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
                    <span className={result.color}>{result.leanBodyMass} kg</span>
                  </motion.div>
                  <h3 className={`text-2xl font-semibold mb-2 ${result.color}`}>{result.category}</h3>
                  <p className="text-gray-400">FFMI: {result.ffmi}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-green-400" />
                      Body Composition
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lean Mass:</span>
                        <span className="text-white font-medium">{result.leanBodyMass} kg ({result.leanBodyMassPercent}%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fat Mass:</span>
                        <span className="text-white font-medium">{result.fatMass} kg ({result.fatMassPercent}%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Method:</span>
                        <span className="text-white font-medium">{result.method}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
                      Assessment
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{result.healthInsight}</p>
                    <p className="text-gray-400 text-xs">Accuracy: {result.accuracy}</p>
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
                        Export LBM Report
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

export default LeanBodyMassCalculator;