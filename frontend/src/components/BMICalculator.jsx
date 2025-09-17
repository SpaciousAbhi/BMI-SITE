import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Heart, AlertCircle, CheckCircle, Target, Download, FileText, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  const calculateBMI = async () => {
    // Validation - Fixed logic for height units
    const heightValid = heightUnit === "ft" ? (feet && inches) : height;
    
    if (!weight || !heightValid || !age || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate your BMI.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    // Add a small delay for animation effect
    await new Promise(resolve => setTimeout(resolve, 1500));

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

    const resultData = {
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
      },
      calculatedOn: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setIsCalculating(false);

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

  const exportToPDF = async () => {
    if (!result) return;

    setIsExporting(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Set up styling
      pdf.setFontSize(20);
      pdf.setTextColor(51, 51, 51);
      
      // Header
      const headerY = 25;
      pdf.text('BMI Health Report', pageWidth / 2, headerY, { align: 'center' });
      
      // Company branding
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Generated by Advanced BMI Calculator', pageWidth / 2, headerY + 8, { align: 'center' });
      pdf.text(`Date: ${result.calculatedOn}`, pageWidth / 2, headerY + 15, { align: 'center' });
      
      // Divider line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, headerY + 25, pageWidth - 20, headerY + 25);
      
      let currentY = headerY + 40;
      
      // Personal Information Section
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Personal Information', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Age: ${result.metrics.age} years`, 25, currentY);
      pdf.text(`Gender: ${result.metrics.gender.charAt(0).toUpperCase() + result.metrics.gender.slice(1)}`, 25, currentY + 8);
      pdf.text(`Weight: ${result.metrics.weight} kg`, 25, currentY + 16);
      pdf.text(`Height: ${result.metrics.height} cm`, 25, currentY + 24);
      currentY += 40;
      
      // BMI Results Section
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('BMI Results', 20, currentY);
      currentY += 15;
      
      // BMI Score - Large and centered
      pdf.setFontSize(36);
      const bmiColor = result.category === 'Normal Weight' ? [34, 197, 94] : 
                      result.category === 'Underweight' ? [59, 130, 246] :
                      result.category === 'Overweight' ? [245, 158, 11] : [239, 68, 68];
      pdf.setTextColor(...bmiColor);
      pdf.text(result.bmi, pageWidth / 2, currentY, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.text(result.category, pageWidth / 2, currentY + 12, { align: 'center' });
      currentY += 30;
      
      // Health Risk Assessment
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Health Risk Assessment', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      const riskLines = pdf.splitTextToSize(result.healthRisk, pageWidth - 40);
      pdf.text(riskLines, 25, currentY);
      currentY += riskLines.length * 6 + 15;
      
      // Ideal Weight Range
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Ideal Weight Range', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(14);
      pdf.setTextColor(34, 197, 94);
      pdf.text(`${result.idealWeightRange.min} - ${result.idealWeightRange.max} ${result.idealWeightRange.unit}`, 25, currentY);
      currentY += 20;
      
      // Recommendations
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Health Recommendations', 20, currentY);
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
      const disclaimer = "Disclaimer: This BMI calculation is for informational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for personalized health guidance.";
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
      pdf.text(disclaimerLines, 20, currentY);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Advanced BMI Calculator - Your Health Partner', pageWidth / 2, pageHeight - 15, { align: 'center' });
      
      // Save the PDF
      pdf.save(`BMI-Report-${result.calculatedOn.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF Export Successful!",
        description: "Your BMI report has been downloaded.",
      });
      
    } catch (error) {
      console.error('PDF Export Error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF report.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Input */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <motion.div 
                  className="p-2 rounded-full bg-blue-500/10"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Calculator className="h-6 w-6 text-blue-400" />
                </motion.div>
                <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  BMI Calculator
                </span>
              </CardTitle>
              <p className="text-gray-400 text-sm mt-2">Enter your details for accurate BMI calculation</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Weight Input */}
              <motion.div 
                className="space-y-2"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label htmlFor="weight" className="text-white">Weight *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white flex-1 focus:border-blue-500 transition-colors duration-300"
                  />
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger className="w-20 bg-gray-800 border-gray-700 text-white hover:border-gray-600 transition-colors duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Height Input */}
              <motion.div 
                className="space-y-2"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label htmlFor="height" className="text-white">Height *</Label>
                <div className="flex space-x-2">
                  <AnimatePresence mode="wait">
                    {heightUnit === "ft" ? (
                      <motion.div
                        key="feet-inches"
                        className="flex space-x-2 flex-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Input
                          type="number"
                          placeholder="Feet"
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white flex-1 focus:border-blue-500 transition-colors duration-300"
                        />
                        <Input
                          type="number"
                          placeholder="Inches"
                          value={inches}
                          onChange={(e) => setInches(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white flex-1 focus:border-blue-500 transition-colors duration-300"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="single-height"
                        className="flex-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Input
                          id="height"
                          type="number"
                          placeholder="Enter height"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 transition-colors duration-300"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger className="w-16 bg-gray-800 border-gray-700 text-white hover:border-gray-600 transition-colors duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="ft">ft</SelectItem>
                      <SelectItem value="in">in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Age Input */}
              <motion.div 
                className="space-y-2"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label htmlFor="age" className="text-white">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 transition-colors duration-300"
                />
              </motion.div>

              {/* Gender Input */}
              <motion.div 
                className="space-y-2"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label className="text-white">Gender *</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white hover:border-gray-600 transition-colors duration-300">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex space-x-4 pt-4"
                variants={itemVariants}
              >
                <motion.div className="flex-1">
                  <Button 
                    onClick={calculateBMI}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <AnimatePresence mode="wait">
                      {isCalculating ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center space-x-2"
                        >
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Calculating...</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="calculate"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Calculate BMI
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                <motion.div>
                  <Button 
                    onClick={resetCalculator}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    size="icon"
                    whileHover={{ scale: 1.1, rotate: -180 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Display */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-2xl">
                    <div className="flex items-center space-x-2">
                      <motion.div 
                        className="p-2 rounded-full bg-green-500/10"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 360, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        <Heart className="h-6 w-6 text-green-400" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                        Your BMI Results
                      </span>
                    </div>
                    <motion.div>
                      <Button
                        onClick={exportToPDF}
                        disabled={isExporting}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-green-500 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AnimatePresence mode="wait">
                          {isExporting ? (
                            <motion.div
                              key="exporting"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center space-x-2"
                            >
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Exporting...</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="export"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center space-x-2"
                            >
                              <Download className="h-4 w-4" />
                              <span>Export PDF</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* BMI Score */}
                  <motion.div 
                    className="text-center p-6 bg-gray-800/50 rounded-xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  >
                    <motion.div 
                      className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      {result.bmi}
                    </motion.div>
                    <motion.div 
                      className={`text-xl font-semibold ${result.color}`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {result.category}
                    </motion.div>
                  </motion.div>

                  {/* Health Risk */}
                  <motion.div 
                    className="space-y-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <AlertCircle className="h-5 w-5 text-orange-400" />
                      </motion.div>
                      <h4 className="font-semibold text-white">Health Risk Assessment</h4>
                    </div>
                    <p className="text-gray-300 text-sm">{result.healthRisk}</p>
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div 
                    className="space-y-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      </motion.div>
                      <h4 className="font-semibold text-white">Recommendations</h4>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start space-x-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                        >
                          <span className="text-green-400 mt-1 text-xs">●</span>
                          <span>{rec}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Ideal Weight Range */}
                  <motion.div 
                    className="space-y-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <Target className="h-5 w-5 text-blue-400" />
                      </motion.div>
                      <h4 className="font-semibold text-white">Ideal Weight Range</h4>
                    </div>
                    <motion.div 
                      className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-3 rounded-lg border border-green-800/30"
                      whileHover={{ 
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                        borderColor: "rgba(34, 197, 94, 0.5)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-green-400 font-semibold text-lg">
                        {result.idealWeightRange.min} - {result.idealWeightRange.max} {result.idealWeightRange.unit}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Summary Metrics */}
                  <motion.div 
                    className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <motion.div 
                      className="text-center p-3 bg-gray-800/30 rounded-lg"
                      whileHover={{ 
                        backgroundColor: "rgba(55, 65, 81, 0.5)",
                        scale: 1.05
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-sm text-gray-400">Weight</div>
                      <div className="font-semibold text-white">{result.metrics.weight} kg</div>
                    </motion.div>
                    <motion.div 
                      className="text-center p-3 bg-gray-800/30 rounded-lg"
                      whileHover={{ 
                        backgroundColor: "rgba(55, 65, 81, 0.5)",
                        scale: 1.05
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-sm text-gray-400">Height</div>
                      <div className="font-semibold text-white">{result.metrics.height} cm</div>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BMICalculator;