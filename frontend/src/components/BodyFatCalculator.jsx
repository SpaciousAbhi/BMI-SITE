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

const BodyFatCalculator = () => {
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

  const calculateBodyFat = async () => {
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

    // Convert measurements to appropriate units
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

    // US Navy Method calculation
    let bodyFatPercentage;
    if (gender === "male") {
      bodyFatPercentage = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInInches) + 36.76;
    } else {
      bodyFatPercentage = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInInches) - 78.387;
    }

    // Determine category and health insights
    let category, color, healthRisk, recommendations;
    const ageNum = parseInt(age);
    
    // Body fat categories by age and gender (WHO/CDC standards)
    let ranges;
    if (gender === "male") {
      if (ageNum < 30) {
        ranges = { essential: 2, athlete: 6, fitness: 14, average: 18, obese: 25 };
      } else if (ageNum < 50) {
        ranges = { essential: 2, athlete: 7, fitness: 17, average: 21, obese: 25 };
      } else {
        ranges = { essential: 2, athlete: 9, fitness: 19, average: 23, obese: 25 };
      }
    } else {
      if (ageNum < 30) {
        ranges = { essential: 10, athlete: 16, fitness: 21, average: 25, obese: 32 };
      } else if (ageNum < 50) {
        ranges = { essential: 10, athlete: 18, fitness: 23, average: 27, obese: 32 };
      } else {
        ranges = { essential: 10, athlete: 20, fitness: 25, average: 29, obese: 32 };
      }
    }

    if (bodyFatPercentage <= ranges.essential) {
      category = "Essential Fat";
      color = "text-red-400";
      healthRisk = "Dangerously low - essential fat needed for basic physiological functions";
      recommendations = ["Consult healthcare provider immediately", "Increase healthy fat intake", "Consider professional nutrition counseling"];
    } else if (bodyFatPercentage <= ranges.athlete) {
      category = "Athlete";
      color = "text-blue-400";
      healthRisk = "Very low body fat typical of elite athletes";
      recommendations = ["Monitor energy levels closely", "Ensure adequate nutrition", "Regular health checkups recommended"];
    } else if (bodyFatPercentage <= ranges.fitness) {
      category = "Fitness";
      color = "text-green-400";
      healthRisk = "Excellent body fat level associated with good health";
      recommendations = ["Maintain current lifestyle", "Continue regular exercise", "Keep balanced nutrition"];
    } else if (bodyFatPercentage <= ranges.average) {
      category = "Average";
      color = "text-yellow-400";
      healthRisk = "Acceptable body fat level for general health";
      recommendations = ["Consider increasing physical activity", "Focus on strength training", "Monitor diet quality"];
    } else if (bodyFatPercentage <= ranges.obese) {
      category = "Above Average";
      color = "text-orange-400";
      healthRisk = "Elevated body fat may increase health risks";
      recommendations = ["Increase cardiovascular exercise", "Consider caloric deficit", "Consult fitness professional"];
    } else {
      category = "Obese";
      color = "text-red-400";
      healthRisk = "High body fat significantly increases health risks";
      recommendations = ["Consult healthcare provider", "Develop comprehensive weight loss plan", "Consider professional support"];
    }

    // Calculate fat mass and lean mass
    const weightInKg = weightUnit === "kg" ? parseFloat(weight) : weightInLbs / 2.20462;
    const fatMass = weightInKg * (bodyFatPercentage / 100);
    const leanMass = weightInKg - fatMass;

    const resultData = {
      bodyFatPercentage: bodyFatPercentage.toFixed(1),
      category,
      color,
      healthRisk,
      recommendations,
      fatMass: fatMass.toFixed(1),
      leanMass: leanMass.toFixed(1),
      ranges,
      metrics: {
        weight: weightInKg.toFixed(1),
        height: heightUnit === "cm" ? height : `${feet}'${inches}"`,
        age: ageNum,
        gender,
        neck: neckInches.toFixed(1),
        waist: waistInches.toFixed(1),
        hip: gender === "female" ? hipInches.toFixed(1) : "N/A"
      },
      method: "US Navy Circumference Method",
      calculatedOn: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setIsCalculating(false);

    toast({
      title: "Body Fat Calculated Successfully!",
      description: `Your body fat is ${bodyFatPercentage.toFixed(1)}% - ${category}`,
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
      pdf.text('Body Fat Analysis Report', pageWidth / 2, headerY, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Generated by Advanced Body Fat Calculator', pageWidth / 2, headerY + 8, { align: 'center' });
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
      
      // Measurements
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Body Measurements', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Neck: ${result.metrics.neck} inches`, 25, currentY);
      pdf.text(`Waist: ${result.metrics.waist} inches`, 25, currentY + 8);
      if (result.metrics.hip !== "N/A") {
        pdf.text(`Hip: ${result.metrics.hip} inches`, 25, currentY + 16);
        currentY += 8;
      }
      currentY += 25;
      
      // Results
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Body Fat Analysis Results', 20, currentY);
      currentY += 15;
      
      pdf.setFontSize(36);
      const categoryColor = result.category === 'Fitness' ? [34, 197, 94] : 
                           result.category === 'Athlete' ? [59, 130, 246] :
                           result.category === 'Average' ? [245, 158, 11] : [239, 68, 68];
      pdf.setTextColor(...categoryColor);
      pdf.text(`${result.bodyFatPercentage}%`, pageWidth / 2, currentY, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.text(result.category, pageWidth / 2, currentY + 12, { align: 'center' });
      currentY += 30;
      
      // Body Composition
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Body Composition Breakdown', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Fat Mass: ${result.fatMass} kg`, 25, currentY);
      pdf.text(`Lean Mass: ${result.leanMass} kg`, 25, currentY + 8);
      pdf.text(`Method: ${result.method}`, 25, currentY + 16);
      currentY += 30;
      
      // Health Assessment
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Health Risk Assessment', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      const riskLines = pdf.splitTextToSize(result.healthRisk, pageWidth - 40);
      pdf.text(riskLines, 25, currentY);
      currentY += riskLines.length * 6 + 15;
      
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
      const disclaimer = "Disclaimer: This body fat calculation is for informational purposes only and should not replace professional medical advice. Body fat measurements can vary based on hydration, measurement technique, and other factors.";
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
      pdf.text(disclaimerLines, 20, currentY);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Advanced Body Fat Calculator - Professional Health Tools', pageWidth / 2, pageHeight - 15, { align: 'center' });
      
      pdf.save(`Body-Fat-Report-${result.calculatedOn.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF Export Successful!",
        description: "Your body fat analysis report has been downloaded.",
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
              className="p-3 rounded-full bg-blue-500/10"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Calculator className="h-8 w-8 text-blue-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Body Fat Calculator
            </span>
          </CardTitle>
          <p className="text-gray-400 text-lg">
            Calculate your body fat percentage using the US Navy circumference method
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
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-300">Gender</Label>
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
                <Label htmlFor="weight" className="text-gray-300">Weight</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300 flex-1"
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
            </motion.div>

            {/* Body Measurements */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Body Measurements (inches)</h3>
              
              <div className="space-y-2">
                <Label htmlFor="neck" className="text-gray-300">Neck Circumference</Label>
                <Input
                  id="neck"
                  type="number"
                  step="0.1"
                  placeholder="Neck measurement (inches)"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300"
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
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300"
                />
                <p className="text-xs text-gray-500">Measure at the narrowest point, usually at navel level</p>
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
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  />
                  <p className="text-xs text-gray-500">Measure at the widest point of the hips</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <h4 className="text-sm font-semibold text-blue-300 mb-2">Measurement Tips</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Use a flexible measuring tape</li>
                  <li>• Keep tape level and snug but not tight</li>
                  <li>• Measure on bare skin when possible</li>
                  <li>• Take measurements at the same time of day</li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex gap-4 pt-6">
            <Button
              onClick={calculateBodyFat}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Body Fat
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
                  <p className="text-gray-400">{result.method}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-400" />
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
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
                      Health Assessment
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{result.healthRisk}</p>
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
                        Export PDF Report
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

export default BodyFatCalculator;