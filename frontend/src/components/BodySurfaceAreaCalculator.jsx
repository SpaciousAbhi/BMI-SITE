import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Activity, AlertCircle, CheckCircle, Target, Download, FileText, Loader2, Zap } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from 'jspdf';

const BodySurfaceAreaCalculator = () => {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [formula, setFormula] = useState("dubois");
  const [purpose, setPurpose] = useState("");
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

  const calculateBSA = async () => {
    // Validation
    const heightValid = heightUnit === "ft" ? (feet && inches) : height;
    if (!weight || !heightValid) {
      toast({
        title: "Missing Information",
        description: "Please fill in weight and height to calculate body surface area.",
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

    let bsa, method, accuracy, applications;

    // Calculate BSA based on selected formula
    if (formula === "dubois") {
      // Du Bois and Du Bois formula (1916)
      bsa = 0.007184 * Math.pow(heightInCm, 0.725) * Math.pow(weightInKg, 0.425);
      method = "Du Bois & Du Bois Formula";
      accuracy = "High - Gold standard since 1916";
      applications = [
        "Most widely used in clinical practice",
        "Standard for chemotherapy dosing",
        "Cardiac output calculations",
        "General medical assessments"
      ];
    } else if (formula === "mosteller") {
      // Mosteller formula (1987)
      bsa = Math.sqrt((heightInCm * weightInKg) / 3600);
      method = "Mosteller Formula";
      accuracy = "High - Simple and accurate";
      applications = [
        "Easy calculation method",
        "Pediatric applications",
        "Quick clinical estimates",
        "Emergency medicine"
      ];
    } else if (formula === "haycock") {
      // Haycock formula (1978)
      bsa = 0.024265 * Math.pow(weightInKg, 0.5378) * Math.pow(heightInCm, 0.3964);
      method = "Haycock Formula";
      accuracy = "High - Excellent for pediatrics";
      applications = [
        "Pediatric medicine",
        "Infants and children",
        "Growth assessments",
        "Age-specific calculations"
      ];
    } else if (formula === "gehan") {
      // Gehan and George formula (1970)
      bsa = 0.0235 * Math.pow(weightInKg, 0.51456) * Math.pow(heightInCm, 0.42246);
      method = "Gehan & George Formula";
      accuracy = "High - General population";
      applications = [
        "General population studies",
        "Research applications",
        "Adult populations",
        "Statistical analyses"
      ];
    } else {
      // Boyd formula (1935)
      const weightInGrams = weightInKg * 1000;
      bsa = 0.0003207 * Math.pow(heightInCm, 0.3) * Math.pow(weightInGrams, (0.7285 - 0.0188 * Math.log10(weightInGrams)));
      method = "Boyd Formula";
      accuracy = "Moderate - Complex calculation";
      applications = [
        "Historical reference",
        "Complex medical calculations",
        "Research purposes",
        "Specialized applications"
      ];
    }

    // Determine BSA category and health insights
    let category, color, healthInsights, recommendations;
    const ageNum = age ? parseInt(age) : null;

    // Age-specific BSA ranges (approximate)
    if (ageNum) {
      if (ageNum < 18) {
        if (bsa < 1.0) {
          category = "Child/Adolescent Range";
          color = "text-blue-400";
        } else if (bsa < 1.5) {
          category = "Adolescent Range";
          color = "text-green-400";
        } else {
          category = "Large for Age";
          color = "text-yellow-400";
        }
      } else {
        if (bsa < 1.5) {
          category = "Below Average Adult";
          color = "text-blue-400";
        } else if (bsa < 2.0) {
          category = "Average Adult";
          color = "text-green-400";
        } else if (bsa < 2.5) {
          category = "Above Average Adult";
          color = "text-yellow-400";
        } else {
          category = "Large Adult";
          color = "text-orange-400";
        }
      }
    } else {
      if (bsa < 1.5) {
        category = "Small";
        color = "text-blue-400";
      } else if (bsa < 2.0) {
        category = "Average";
        color = "text-green-400";
      } else if (bsa < 2.5) {
        category = "Large";
        color = "text-yellow-400";
      } else {
        category = "Very Large";
        color = "text-orange-400";
      }
    }

    // Health insights based on BSA
    healthInsights = [
      "BSA is used for medical dosing calculations",
      "Helps normalize physiological parameters",
      "Important for cardiac output assessment",
      "Used in metabolic rate calculations"
    ];

    if (purpose) {
      if (purpose === "medication") {
        healthInsights.push("Critical for chemotherapy and medication dosing");
        recommendations = [
          "Always verify calculations with healthcare provider",
          "BSA-based dosing reduces toxicity risks",
          "Regular monitoring during treatment",
          "Consider body composition changes"
        ];
      } else if (purpose === "cardiac") {
        healthInsights.push("Cardiac index = Cardiac output / BSA");
        recommendations = [
          "Normal cardiac index: 2.5-4.0 L/min/m²",
          "BSA normalization accounts for body size",
          "Used in heart function assessment",
          "Important for cardiovascular diagnostics"
        ];
      } else if (purpose === "metabolic") {
        healthInsights.push("Metabolic rate correlates with BSA");
        recommendations = [
          "BSA affects basal metabolic rate",
          "Larger BSA = higher energy needs",
          "Used in nutrition calculations",
          "Important for weight management"
        ];
      } else {
        recommendations = [
          "BSA has multiple medical applications",
          "Consult healthcare provider for specific uses",
          "Values may vary between formulas",
          "Consider individual health factors"
        ];
      }
    } else {
      recommendations = [
        "BSA has multiple medical applications",
        "Consult healthcare provider for specific uses",
        "Values may vary between formulas",
        "Consider individual health factors"
      ];
    }

    // Calculate additional metrics
    const bmi = weightInKg / Math.pow(heightInCm / 100, 2);
    const heightInM = heightInCm / 100;
    const weightBSARatio = weightInKg / bsa;
    const heightBSARatio = heightInM / bsa;

    const resultData = {
      bsa: bsa.toFixed(2),
      category,
      color,
      method,
      accuracy,
      applications,
      healthInsights,
      recommendations,
      additionalMetrics: {
        bmi: bmi.toFixed(1),
        weightBSARatio: weightBSARatio.toFixed(1),
        heightBSARatio: heightBSARatio.toFixed(2)
      },
      metrics: {
        weight: weightInKg.toFixed(1),
        height: heightInCm.toFixed(1),
        age: age || "Not specified",
        gender: gender || "Not specified",
        purpose: purpose || "General calculation"
      },
      calculatedOn: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setIsCalculating(false);

    toast({
      title: "BSA Calculated Successfully!",
      description: `Body Surface Area: ${bsa.toFixed(2)} m² - ${category}`,
    });
  };

  const resetCalculator = () => {
    setHeight("");
    setFeet("");
    setInches("");
    setWeight("");
    setAge("");
    setGender("");
    setPurpose("");
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
      pdf.text('Body Surface Area Report', pageWidth / 2, headerY, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Medical BSA Calculation', pageWidth / 2, headerY + 8, { align: 'center' });
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
      pdf.text(`Weight: ${result.metrics.weight} kg`, 25, currentY);
      pdf.text(`Height: ${result.metrics.height} cm`, 25, currentY + 8);
      if (result.metrics.age !== "Not specified") {
        pdf.text(`Age: ${result.metrics.age} years`, 25, currentY + 16);
        currentY += 8;
      }
      if (result.metrics.gender !== "Not specified") {
        pdf.text(`Gender: ${result.metrics.gender.charAt(0).toUpperCase() + result.metrics.gender.slice(1)}`, 25, currentY + 16);
        currentY += 8;
      }
      pdf.text(`Purpose: ${result.metrics.purpose}`, 25, currentY + 16);
      currentY += 32;
      
      // BSA Results
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Body Surface Area Results', 20, currentY);
      currentY += 15;
      
      pdf.setFontSize(48);
      const categoryColor = result.category.includes('Average') ? [34, 197, 94] : 
                           result.category.includes('Small') || result.category.includes('Child') ? [59, 130, 246] :
                           result.category.includes('Large') ? [245, 158, 11] : [251, 146, 60];
      pdf.setTextColor(...categoryColor);
      pdf.text(`${result.bsa} m²`, pageWidth / 2, currentY, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.setTextColor(51, 51, 51);
      pdf.text(result.category, pageWidth / 2, currentY + 15, { align: 'center' });
      currentY += 35;
      
      // Method Information
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Calculation Method', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Formula: ${result.method}`, 25, currentY);
      pdf.text(`Accuracy: ${result.accuracy}`, 25, currentY + 8);
      currentY += 25;
      
      // Additional Metrics
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Additional Metrics', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`BMI: ${result.additionalMetrics.bmi}`, 25, currentY);
      pdf.text(`Weight/BSA Ratio: ${result.additionalMetrics.weightBSARatio} kg/m²`, 25, currentY + 8);
      pdf.text(`Height/BSA Ratio: ${result.additionalMetrics.heightBSARatio} m/m²`, 25, currentY + 16);
      currentY += 30;
      
      // Applications
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Clinical Applications', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      result.applications.forEach((app) => {
        const appLines = pdf.splitTextToSize(`• ${app}`, pageWidth - 40);
        pdf.text(appLines, 25, currentY);
        currentY += appLines.length * 6 + 3;
      });
      currentY += 10;
      
      // Health Insights
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
      const disclaimer = "Disclaimer: Body Surface Area calculations are for medical and scientific reference purposes. Always consult qualified healthcare professionals for medical applications, drug dosing, and clinical interpretations.";
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
      pdf.text(disclaimerLines, 20, currentY);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Body Surface Area Calculator - Medical Formula Assessment', pageWidth / 2, pageHeight - 15, { align: 'center' });
      
      pdf.save(`BSA-Report-${result.calculatedOn.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF Export Successful!",
        description: "Your body surface area report has been downloaded.",
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
              className="p-3 rounded-full bg-cyan-500/10"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="h-8 w-8 text-cyan-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Body Surface Area Calculator
            </span>
          </CardTitle>
          <p className="text-gray-400 text-lg">
            Calculate BSA using validated medical formulas for clinical applications
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Basic Information */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-gray-300">Weight *</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300 flex-1"
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
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300 flex-1"
                    />
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="Feet"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
                      />
                      <Input
                        type="number"
                        placeholder="Inches"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
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
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-300">Gender (optional)</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Calculation Options */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Calculation Options</h3>
              
              <div className="space-y-2">
                <Label htmlFor="formula" className="text-gray-300">BSA Formula</Label>
                <Select value={formula} onValueChange={setFormula}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300">
                    <SelectValue placeholder="Select BSA formula" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="dubois">Du Bois & Du Bois (Gold Standard)</SelectItem>
                    <SelectItem value="mosteller">Mosteller (Simple & Accurate)</SelectItem>
                    <SelectItem value="haycock">Haycock (Pediatric Focused)</SelectItem>
                    <SelectItem value="gehan">Gehan & George (General Use)</SelectItem>
                    <SelectItem value="boyd">Boyd (Complex)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-gray-300">Primary Purpose</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300">
                    <SelectValue placeholder="Select calculation purpose" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="medication">Medication Dosing</SelectItem>
                    <SelectItem value="cardiac">Cardiac Assessment</SelectItem>
                    <SelectItem value="metabolic">Metabolic Calculations</SelectItem>
                    <SelectItem value="research">Research/Academic</SelectItem>
                    <SelectItem value="general">General Information</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Helps provide relevant recommendations</p>
              </div>

              <div className="mt-6 p-4 bg-cyan-900/20 rounded-lg border border-cyan-800/50">
                <h4 className="text-sm font-semibold text-cyan-300 mb-2">BSA Applications</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Chemotherapy & medication dosing</li>
                  <li>• Cardiac index calculations</li>
                  <li>• Metabolic rate assessments</li>
                  <li>• Medical research studies</li>
                  <li>• Physiological normalizations</li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex gap-4 pt-6">
            <Button
              onClick={calculateBSA}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Calculate BSA
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
                    <span className={result.color}>{result.bsa} m²</span>
                  </motion.div>
                  <h3 className={`text-2xl font-semibold mb-2 ${result.color}`}>{result.category}</h3>
                  <p className="text-gray-400">{result.method}</p>
                  <p className="text-gray-500 text-sm mt-1">{result.accuracy}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-cyan-400" />
                      Additional Metrics
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">BMI:</span>
                        <span className="text-white font-medium">{result.additionalMetrics.bmi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Weight/BSA:</span>
                        <span className="text-white font-medium">{result.additionalMetrics.weightBSARatio} kg/m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Height/BSA:</span>
                        <span className="text-white font-medium">{result.additionalMetrics.heightBSARatio} m/m²</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-400" />
                      Clinical Applications
                    </h4>
                    <ul className="space-y-1">
                      {result.applications.slice(0, 4).map((app, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <span className="text-blue-400 mr-2">•</span>
                          {app}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

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
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <span className="text-yellow-400 mr-2">•</span>
                        {insight}
                      </motion.li>
                    ))}
                  </ul>
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
                        transition={{ delay: 1.0 + index * 0.1 }}
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
                  transition={{ delay: 1.4 }}
                >
                  <Button
                    onClick={exportToPDF}
                    disabled={isExporting}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white transition-all duration-300"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Export BSA Report
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

export default BodySurfaceAreaCalculator;