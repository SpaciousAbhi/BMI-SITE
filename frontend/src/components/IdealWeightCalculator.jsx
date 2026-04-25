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
      <Card className="glass-panel glow-border backdrop-blur-sm">
        <CardHeader className="text-center pb-8 border-b border-white/5 bg-white/[0.02]">
          <CardTitle className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <motion.div
              className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20"
              whileHover={{ scale: 1.1, rotate: -10 }}
            >
              <Scale className="h-10 w-10 text-blue-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 bg-clip-text text-transparent uppercase tracking-tight">
              Ideal Weight Architect
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Clinical precision modeling using globally validated medical weight formulas.
          </p>
        </CardHeader>

        <CardContent className="space-y-10 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:p-6 lg:p-8 sm:gap-6 sm:p-8 md:p-12">
            {/* Personal Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <Target className="h-3 w-3" />
                Biological Parameters
              </h3>
              
              <div className="space-y-3">
                <Label htmlFor="gender" className="text-[10px] font-black uppercase text-slate-500 ml-1">Biological Gender *</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="glass-input text-xl py-5 sm:py-7 font-bold text-slate-200">
                    <SelectValue placeholder="Identify" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/10 scale-in">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="height" className="text-[10px] font-black uppercase text-slate-500 ml-1">Stature (Height) *</Label>
                <div className="flex gap-2">
                  <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger className="glass-input w-24 py-5 sm:py-7 font-bold">
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
                      placeholder="CM"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="glass-input text-xl py-5 sm:py-7 flex-1"
                    />
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="FT"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="glass-input text-xl py-5 sm:py-7 flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="IN"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="glass-input text-xl py-5 sm:py-7 flex-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="age" className="text-[10px] font-black uppercase text-slate-500 ml-1">Chronological Age (Optional)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Years"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="glass-input text-xl py-5 sm:py-7"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="currentWeight" className="text-[10px] font-black uppercase text-slate-500 ml-1">Current Mass (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="currentWeight"
                    type="number"
                    placeholder="Weight"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    className="glass-input text-xl py-5 sm:py-7 flex-1"
                  />
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger className="glass-input w-24 py-5 sm:py-7 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10 scale-in">
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Calculation Options */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <Calculator className="h-3 w-3" />
                Formula Matrix
              </h3>
              
              <div className="space-y-3">
                <Label htmlFor="formula" className="text-[10px] font-black uppercase text-slate-500 ml-1">Assessment Logic</Label>
                <Select value={formula} onValueChange={setFormula}>
                  <SelectTrigger className="glass-input text-xl py-5 sm:py-7 font-bold text-slate-200">
                    <SelectValue placeholder="Select Logic" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/10 scale-in">
                    <SelectItem value="devine">Devine Formula (Gold Standard)</SelectItem>
                    <SelectItem value="robinson">Robinson Formula</SelectItem>
                    <SelectItem value="miller">Miller Formula</SelectItem>
                    <SelectItem value="hamwi">Hamwi Formula</SelectItem>
                    <SelectItem value="broca">Broca Formula</SelectItem>
                    <SelectItem value="bmi">BMI-Based (BMI 22)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-8 p-6 bg-blue-500/5 rounded-[2rem] border border-blue-500/10 backdrop-blur-md">
                <h4 className="text-xs font-black text-blue-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Logic metadata
                </h4>
                <div className="text-xs text-slate-500 space-y-2 font-medium">
                  {formula === "devine" && <p>• Globally recognized clinical gold standard</p>}
                  {formula === "robinson" && <p>• Enhanced precision for specific demographics</p>}
                  {formula === "miller" && <p>• Alternative medical dosing standard</p>}
                  {formula === "hamwi" && <p>• Rapid clinical estimation used in dietetics</p>}
                  {formula === "broca" && <p>• Traditional height-centric European model</p>}
                  {formula === "bmi" && <p>• WHO optimized morphological approach</p>}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateIdealWeight}
              className={`flex-1 btn-category-composition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${(!gender || !(heightUnit === "ft" ? (feet && inches) : height)) ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Architecting...
                </>
              ) : (
                <>
                  <Scale className="mr-3 h-7 w-7" />
                  Calculate Ideal mass
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

          <AnimatePresence>
            {result && (
              <motion.div
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-16 premium-result-card p-6 sm:p-12 md:p-16 lg:p-20 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-blue-400 opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter">
                  Ideal
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <Scale className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tight uppercase">Target Architecture</h3>
                      <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Formula: {result.method}</p>
                    </div>
                  </div>
                  <Button
                    onClick={exportToPDF}
                    disabled={isExporting}
                    className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-10 py-5 sm:py-8 font-black transition-all uppercase tracking-widest text-sm"
                  >
                    {isExporting ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : <Download className="h-5 w-5 mr-3" />}
                    {isExporting ? "Architecting PDF..." : "Export report"}
                  </Button>
                </div>

                <div className="text-center mb-24 relative z-10">
                  <motion.div
                    className="text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    {result.idealWeight}<span className="text-3xl sm:text-4xl md:text-5xl ml-[-10px] opacity-40">kg</span>
                  </motion.div>
                  <div className={`inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] ${result.color} bg-white/5 border border-white/10 mt-10 shadow-2xl`}>
                    {result.weightStatus}
                  </div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest mt-6 opacity-60 italic">{result.weightComparison}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10 mb-16">
                  <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                    <Target className="h-7 w-7 text-cyan-400" />
                    <h4 className="text-xl font-black text-white uppercase tracking-widest">Morphometry Stats</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-4 border-b border-white/5">
                        <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Formula Target</span>
                        <span className="text-white font-black text-xl">{result.idealWeight} <span className="text-xs text-slate-500 uppercase">KG</span></span>
                      </div>
                      <div className="flex justify-between items-center py-4">
                        <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Healthy Range</span>
                        <span className="text-emerald-400 font-black text-xl">{result.minHealthyWeight}-{result.maxHealthyWeight} <span className="text-xs text-slate-500 uppercase">KG</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                    <AlertCircle className="h-7 w-7 text-amber-400" />
                    <h4 className="text-xl font-black text-white uppercase tracking-widest">Audit Logic</h4>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="p-5 rounded-[2rem] bg-white/5 border border-white/5 flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-cyan-400" />
                        <span className="text-xs text-slate-400 font-black uppercase tracking-wider">{result.method} Applied</span>
                      </div>
                      <div className="p-5 rounded-[2rem] bg-white/5 border border-white/5 flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-blue-400" />
                        <span className="text-xs text-slate-400 font-black uppercase tracking-wider">Type: {result.formula_name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-16 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-cyan-500/5 border border-cyan-500/10 backdrop-blur-3xl relative overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                  <div className="flex items-center gap-4 mb-10">
                    <CheckCircle className="h-8 w-8 text-emerald-400 shadow-glow" />
                    <h4 className="text-2xl font-black text-white uppercase tracking-widest">Strategic Roadmap</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {result.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-5 p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-cyan-500/5 transition-all group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
                        <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/5">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Stature</div>
                    <div className="text-sm font-black text-white">{result.metrics.height}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Gender</div>
                    <div className="text-sm font-black text-white uppercase">{result.metrics.gender}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Age</div>
                    <div className="text-sm font-black text-white">{result.metrics.age}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Mass</div>
                    <div className="text-sm font-black text-white">{result.metrics.currentWeight}</div>
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

export default IdealWeightCalculator;