import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Shield, AlertCircle, CheckCircle, Target, Download, FileText, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from 'jspdf';

const ArmyBodyFatCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
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

  const calculateArmyBodyFat = async () => {
    // Validation
    const heightValid = heightUnit === "ft" ? (feet && inches) : height;
    const requiredFields = [weight, heightValid, age, gender, neck, waist];
    const femaleRequiredHip = gender === "female" ? hip : true;
    
    if (!requiredFields.every(field => field) || !femaleRequiredHip) {
      toast({
        title: "Missing Information",
        description: `Please fill in all required fields${gender === "female" ? " including hip measurement" : ""}.`,
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert measurements to inches (Army standard)
    let heightInInches;
    if (heightUnit === "cm") {
      heightInInches = parseFloat(height) / 2.54;
    } else if (heightUnit === "ft") {
      heightInInches = parseFloat(feet) * 12 + parseFloat(inches);
    }

    let weightInLbs = parseFloat(weight);
    if (weightUnit === "kg") {
      weightInLbs = weightInLbs * 2.20462;
    }

    const neckInches = parseFloat(neck);
    const waistInches = parseFloat(waist);
    const hipInches = gender === "female" ? parseFloat(hip) : 0;

    // Army Body Fat Calculation (AR 600-9)
    let bodyFatPercentage;
    if (gender === "male") {
      bodyFatPercentage = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInInches) + 36.76;
    } else {
      bodyFatPercentage = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInInches) - 78.387;
    }

    // Army Body Fat Standards (AR 600-9)
    const ageNum = parseInt(age);
    let maxAllowed, category, color, armyStatus, recommendations;

    // Army Maximum Body Fat Standards
    let maxBodyFat;
    if (gender === "male") {
      if (ageNum <= 20) maxBodyFat = 20;
      else if (ageNum <= 27) maxBodyFat = 22;
      else if (ageNum <= 39) maxBodyFat = 24;
      else maxBodyFat = 26;
    } else {
      if (ageNum <= 20) maxBodyFat = 30;
      else if (ageNum <= 27) maxBodyFat = 32;
      else if (ageNum <= 39) maxBodyFat = 34;
      else maxBodyFat = 36;
    }

    // Determine Army compliance status
    if (bodyFatPercentage <= maxBodyFat * 0.7) {
      category = "Excellent";
      color = "text-green-400";
      armyStatus = "PASS - Well within Army standards";
      recommendations = ["Maintain current fitness level", "Continue regular PT", "Monitor body composition"];
    } else if (bodyFatPercentage <= maxBodyFat * 0.85) {
      category = "Good";
      color = "text-blue-400";
      armyStatus = "PASS - Within Army standards";
      recommendations = ["Maintain current fitness routine", "Monitor body fat levels", "Consider additional cardio"];
    } else if (bodyFatPercentage <= maxBodyFat) {
      category = "Acceptable";
      color = "text-yellow-400";
      armyStatus = "PASS - At Army standard limit";
      recommendations = ["Focus on body fat reduction", "Increase cardio training", "Monitor diet closely"];
    } else if (bodyFatPercentage <= maxBodyFat * 1.1) {
      category = "Over Standard";
      color = "text-orange-400";
      armyStatus = "FAIL - Exceeds Army standards";
      recommendations = ["Immediate body composition program", "Consult with nutritionist", "Intensive fitness plan required"];
    } else {
      category = "Significantly Over";
      color = "text-red-400";
      armyStatus = "FAIL - Significantly exceeds standards";
      recommendations = ["Urgent body composition program", "Medical evaluation recommended", "Risk of administrative action"];
    }

    // Calculate fat mass and lean mass
    const weightInKg = weightUnit === "kg" ? parseFloat(weight) : weightInLbs / 2.20462;
    const fatMass = weightInKg * (bodyFatPercentage / 100);
    const leanMass = weightInKg - fatMass;

    const resultData = {
      bodyFatPercentage: bodyFatPercentage.toFixed(1),
      maxAllowed: maxBodyFat,
      category,
      color,
      armyStatus,
      recommendations,
      fatMass: fatMass.toFixed(1),
      leanMass: leanMass.toFixed(1),
      metrics: {
        weight: weightInKg.toFixed(1),
        height: heightUnit === "cm" ? height : `${feet}'${inches}"`,
        age: ageNum,
        gender,
        neck: neckInches.toFixed(1),
        waist: waistInches.toFixed(1),
        hip: gender === "female" ? hipInches.toFixed(1) : "N/A"
      },
      method: "US Army AR 600-9 Tape Test",
      calculatedOn: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setIsCalculating(false);

    toast({
      title: "Army Body Fat Calculated!",
      description: `${bodyFatPercentage.toFixed(1)}% - ${armyStatus.includes('PASS') ? 'PASS' : 'FAIL'}`,
      variant: armyStatus.includes('PASS') ? "default" : "destructive"
    });
  };

  const resetCalculator = () => {
    setAge("");
    setGender("");
    setHeight("");
    setFeet("");
    setInches("");
    setWeight("");
    setNeck("");
    setWaist("");
    setHip("");
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
      pdf.text('Army Body Fat Assessment Report', pageWidth / 2, headerY, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('US Army AR 600-9 Standards', pageWidth / 2, headerY + 8, { align: 'center' });
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
      pdf.text(`Age: ${result.metrics.age} years`, 25, currentY);
      pdf.text(`Gender: ${result.metrics.gender.charAt(0).toUpperCase() + result.metrics.gender.slice(1)}`, 25, currentY + 8);
      pdf.text(`Weight: ${result.metrics.weight} kg`, 25, currentY + 16);
      pdf.text(`Height: ${result.metrics.height}`, 25, currentY + 24);
      currentY += 40;
      
      // Army Assessment Results
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Army Body Fat Assessment', 20, currentY);
      currentY += 15;
      
      pdf.setFontSize(36);
      const statusColor = result.armyStatus.includes('PASS') ? [34, 197, 94] : [239, 68, 68];
      pdf.setTextColor(...statusColor);
      pdf.text(`${result.bodyFatPercentage}%`, pageWidth / 2, currentY, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.text(result.category, pageWidth / 2, currentY + 12, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setTextColor(51, 51, 51);
      pdf.text(`Maximum Allowed: ${result.maxAllowed}%`, pageWidth / 2, currentY + 24, { align: 'center' });
      currentY += 40;
      
      // Army Status
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Army Compliance Status', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(14);
      pdf.setTextColor(...statusColor);
      pdf.text(result.armyStatus, 25, currentY);
      currentY += 20;
      
      // Body Measurements
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Tape Test Measurements', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Neck: ${result.metrics.neck} inches`, 25, currentY);
      pdf.text(`Waist: ${result.metrics.waist} inches`, 25, currentY + 8);
      if (result.metrics.hip !== "N/A") {
        pdf.text(`Hip: ${result.metrics.hip} inches`, 25, currentY + 16);
        currentY += 8;
      }
      pdf.text(`Method: ${result.method}`, 25, currentY + 16);
      currentY += 30;
      
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
      const disclaimer = "Disclaimer: This calculation is based on AR 600-9 standards and is for informational purposes only. Official Army body composition assessments must be conducted by qualified personnel using proper procedures.";
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
      pdf.text(disclaimerLines, 20, currentY);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Army Body Fat Calculator - AR 600-9 Standards', pageWidth / 2, pageHeight - 15, { align: 'center' });
      
      pdf.save(`Army-Body-Fat-Report-${result.calculatedOn.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF Export Successful!",
        description: "Your Army body fat assessment report has been downloaded.",
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
      className="w-full max-w-4xl mx-auto p-6"
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
              <Shield className="h-8 w-8 text-green-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Army Body Fat Calculator
            </span>
          </CardTitle>
          <p className="text-gray-400 text-lg">
            Calculate body fat percentage using US Army AR 600-9 standards
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-300">Age (years)</Label>
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
                <Label htmlFor="gender" className="text-gray-300">Gender</Label>
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
                <Label htmlFor="weight" className="text-gray-300">Weight</Label>
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
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white w-20">
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
                <Label htmlFor="height" className="text-gray-300">Height</Label>
                <div className="flex gap-2">
                  <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white w-20">
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

            {/* Army Tape Test Measurements */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Army Tape Test Measurements (inches)</h3>
              
              <div className="space-y-2">
                <Label htmlFor="neck" className="text-gray-300">Neck Circumference</Label>
                <Input
                  id="neck"
                  type="number"
                  step="0.1"
                  placeholder="Neck measurement (inches)"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                />
                <p className="text-xs text-gray-500">Measure around the neck, just below the Adam's apple</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waist" className="text-gray-300">Waist Circumference</Label>
                <Input
                  id="waist"
                  type="number"
                  step="0.1"
                  placeholder="Waist measurement (inches)"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                />
                <p className="text-xs text-gray-500">Measure at the navel level, horizontally around the abdomen</p>
              </div>

              {gender === "female" && (
                <div className="space-y-2">
                  <Label htmlFor="hip" className="text-gray-300">Hip Circumference</Label>
                  <Input
                    id="hip"
                    type="number"
                    step="0.1"
                    placeholder="Hip measurement (inches)"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                  />
                  <p className="text-xs text-gray-500">Measure at the widest point of the hips</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <h4 className="text-sm font-semibold text-green-300 mb-2">Army AR 600-9 Standards</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <p className="font-medium">Maximum Body Fat by Age:</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="text-green-300">Male:</p>
                      <p>17-20: 20%</p>
                      <p>21-27: 22%</p>
                      <p>28-39: 24%</p>
                      <p>40+: 26%</p>
                    </div>
                    <div>
                      <p className="text-green-300">Female:</p>
                      <p>17-20: 30%</p>
                      <p>21-27: 32%</p>
                      <p>28-39: 34%</p>
                      <p>40+: 36%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex gap-4 pt-6">
            <Button
              onClick={calculateArmyBodyFat}
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
                  <Shield className="mr-2 h-4 w-4" />
                  Calculate Army Body Fat
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
                    <span className={result.color}>{result.bodyFatPercentage}%</span>
                  </motion.div>
                  <h3 className={`text-2xl font-semibold mb-2 ${result.color}`}>{result.category}</h3>
                  <p className="text-gray-400">Maximum Allowed: {result.maxAllowed}%</p>
                  <div className={`text-lg font-semibold mt-2 px-4 py-2 rounded-lg inline-block ${result.armyStatus.includes('PASS') ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                    {result.armyStatus}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-green-400" />
                      Body Composition
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fat Mass:</span>
                        <span className="text-white font-medium">{result.fatMass} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lean Mass:</span>
                        <span className="text-white font-medium">{result.leanMass} kg</span>
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
                      Army Assessment
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Age Group:</span>
                        <span className="text-white font-medium">{result.metrics.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Standard:</span>
                        <span className="text-white font-medium">≤ {result.maxAllowed}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`font-medium ${result.armyStatus.includes('PASS') ? 'text-green-400' : 'text-red-400'}`}>
                          {result.armyStatus.includes('PASS') ? 'PASS' : 'FAIL'}
                        </span>
                      </div>
                    </div>
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
                        Export Army Report
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

export default ArmyBodyFatCalculator;