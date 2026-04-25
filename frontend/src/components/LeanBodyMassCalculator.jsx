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
      <Card className="glass-panel glow-border backdrop-blur-sm">
        <CardHeader className="text-center pb-8 border-b border-white/5 bg-white/[0.02]">
          <CardTitle className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <motion.div
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20"
            >
              <Activity className="h-10 w-10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-green-400 via-blue-200 to-green-400 bg-clip-text text-transparent uppercase tracking-tight">
              Musculo-Skeletal Oracle
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Advanced partitioning of anatomical mass using high-fidelity musculoskeletal modeling.
          </p>
        </CardHeader>

        <CardContent className="space-y-10 p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Biometric Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:p-6 lg:p-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Primary Indicators</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="gender" className="glass-text opacity-90 text-[10px] font-black uppercase">Gender *</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="glass-panel glow-border border-gray-700 text-white hover:border-green-500/50 focus:border-green-500 transition-all duration-300">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10 scale-in">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="glass-text opacity-90 text-[10px] font-black uppercase">Age (optional)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="glass-text opacity-90 text-[10px] font-black uppercase">Weight *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300 flex-1"
                    />
                    <Select value={weightUnit} onValueChange={setWeightUnit}>
                      <SelectTrigger className="glass-panel glow-border border-gray-700 text-white w-16 sm:w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10 scale-in">
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="glass-text opacity-90 text-[10px] font-black uppercase">Height *</Label>
                  <div className="flex gap-2">
                    <Select value={heightUnit} onValueChange={setHeightUnit}>
                      <SelectTrigger className="glass-panel glow-border border-gray-700 text-white w-16 sm:w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10 scale-in">
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
                        className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300 flex-1"
                      />
                    ) : (
                      <div className="flex gap-2 flex-1">
                        <Input
                          type="number"
                          placeholder="Feet"
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                        />
                        <Input
                          type="number"
                          placeholder="Inches"
                          value={inches}
                          onChange={(e) => setInches(e.target.value)}
                          className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Partitioning Parameters</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="bodyFat" className="glass-text opacity-90 text-[10px] font-black uppercase">Body Fat % (optional)</Label>
                  <Input
                    id="bodyFat"
                    type="number"
                    step="0.1"
                    placeholder="Enter body fat percentage"
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
                    className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50 focus:border-green-500 transition-all duration-300"
                  />
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mt-1">Direct measurement provides maximum fidelity</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method" className="glass-text opacity-90 text-[10px] font-black uppercase">Algorithmic Base</Label>
                  <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                    <SelectTrigger className="glass-panel glow-border border-gray-700 text-white hover:border-green-500/50 focus:border-green-500 transition-all duration-300">
                      <SelectValue placeholder="Select calculation method" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10 scale-in">
                      <SelectItem value="boer">Boer Formula (Standard)</SelectItem>
                      <SelectItem value="james">James Formula (Standard)</SelectItem>
                      <SelectItem value="hume">Hume Formula (Standard)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-6 p-6 bg-green-500/5 rounded-[2rem] border border-green-500/10">
                  <h4 className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Activity className="h-3 w-3" />
                    Composition Context
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium uppercase tracking-tighter">
                    Partitioning accounts for muscle, skeletal structure, vital organs, and cellular hydration. Lipid mass is excluded from the final resolution.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateLeanBodyMass}
              className={`flex-1 btn-category-composition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!weight || !(heightUnit === 'ft' ? (feet && inches) : height) || !gender ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Analyzing Bio-Data...
                </>
              ) : (
                <>
                  <Activity className="mr-3 h-7 w-7" />
                  Resolve Composition
                </>
              )}
            </Button>
            
            <Button
              onClick={resetCalculator}
              variant="outline"
              className="w-full sm:w-auto border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white flex items-center gap-3 px-6 py-4 md:px-10 md:py-6 lg:px-12 lg:py-5 sm:py-8 rounded-[2rem] shadow-lg backdrop-blur-md transition-all font-black text-sm sm:text-base md:text-lg uppercase"
            >
              <RotateCcw className="h-6 w-6" />
              Reset
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      <AnimatePresence>
            {result && (
              <motion.div
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-16 premium-result-card p-6 sm:p-12 md:p-16 lg:p-20 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-green-500 opacity-[0.03] select-none pointer-events-none uppercase">
                  ORACLE
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <Activity className="h-8 w-8 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tight uppercase">Mass Integrity</h3>
                      <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Synchronization complete</p>
                    </div>
                  </div>
                  <Button
                    onClick={exportToPDF}
                    className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-10 py-5 sm:py-8 font-black transition-all uppercase tracking-widest text-sm"
                  >
                    <Download className="h-5 w-5 mr-3" />
                    Export Assessment
                  </Button>
                </div>

                <div className="text-center mb-24 relative z-10">
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none"
                    initial={{ filter: "blur(20px)", y: 20 }}
                    animate={{ filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {result.leanBodyMass}<span className="text-4xl text-green-400/60 font-black tracking-widest ml-4 uppercase">kg</span>
                  </motion.div>
                  <div className={`inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] ${result.color} bg-white/5 border border-white/20 mt-10 shadow-2xl`}>
                    STRATUM: {result.category}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-8 lg:p-10 mb-16 relative z-10">
                  <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                      <Target className="h-7 w-7 text-green-400" />
                      <h4 className="text-xl font-black text-white uppercase tracking-widest">Anatomical Partition</h4>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center p-6 rounded-[2.5rem] bg-green-500/10 border border-green-400/20">
                        <span className="text-green-400 font-black text-sm uppercase">Lean Partition</span>
                        <span className="text-white font-black text-2xl">{result.leanBodyMass} <span className="text-xs opacity-40 uppercase ml-1">kg</span></span>
                      </div>
                      <div className="flex justify-between items-center p-6 rounded-[2.5rem] bg-white/5 border border-white/5">
                        <span className="text-late-400 font-black text-sm uppercase">Adipose Partition</span>
                        <span className="text-white font-black text-2xl">{result.fatMass} <span className="text-xs opacity-40 uppercase ml-1">kg</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 flex flex-col justify-center gap-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-6">
                      <div className="p-5 rounded-3xl bg-green-500/10 border border-green-500/20 shadow-inner">
                        <Activity className="h-8 w-8 text-green-400" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">FFMI Analysis</div>
                        <div className="text-xl font-black text-white tracking-widest uppercase mt-1">{result.ffmi} INDEX</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-inner">
                        <AlertCircle className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Assessment Rank</div>
                        <div className="text-xl font-black text-white tracking-widest uppercase mt-1">{result.category} STATUS</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-16 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-green-500/5 border border-green-500/10 backdrop-blur-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-30" />
                  <div className="flex items-center gap-4 mb-10 relative z-10">
                    <CheckCircle className="h-8 w-8 text-green-400 shadow-glow" />
                    <h4 className="text-2xl font-black text-white uppercase tracking-widest">Optimization Strategy</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {result.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 p-6 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-green-500/5 transition-all group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,1)] group-hover:scale-150 transition-transform" />
                        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider leading-relaxed">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
    </motion.div>
  );
};

export default LeanBodyMassCalculator;