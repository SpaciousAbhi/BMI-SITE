import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Activity, AlertCircle, CheckCircle, Target, Download, FileText, Loader2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
      <Card className="glass-panel glow-border backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
            <motion.div
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20"
            >
              <Zap className="h-10 w-10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-200 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tight">
              Surface Area Strategist
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Advanced geometric modeling of physiological surface area for high-precision clinical calibrations.
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
                  <Label htmlFor="weight" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Weight *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300 flex-1"
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
                  <Label htmlFor="height" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Height *</Label>
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
                        className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300 flex-1"
                      />
                    ) : (
                      <div className="flex gap-2 flex-1">
                        <Input
                          type="number"
                          placeholder="Feet"
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
                        />
                        <Input
                          type="number"
                          placeholder="Inches"
                          value={inches}
                          onChange={(e) => setInches(e.target.value)}
                          className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Age (optional)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Gender (optional)</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="glass-panel glow-border border-gray-700 text-white hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10 scale-in">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Algorithmic Geometry</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="formula" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">BSA Formula</Label>
                  <Select value={formula} onValueChange={setFormula}>
                    <SelectTrigger className="glass-panel glow-border border-gray-700 text-white hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300">
                      <SelectValue placeholder="Select BSA formula" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10 scale-in">
                      <SelectItem value="dubois">Du Bois & Du Bois (Gold Standard)</SelectItem>
                      <SelectItem value="mosteller">Mosteller (Simple & Accurate)</SelectItem>
                      <SelectItem value="haycock">Haycock (Pediatric Focused)</SelectItem>
                      <SelectItem value="gehan">Gehan & George (General Use)</SelectItem>
                      <SelectItem value="boyd">Boyd (Complex)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Primary Purpose</Label>
                  <Select value={purpose} onValueChange={setPurpose}>
                    <SelectTrigger className="glass-panel glow-border border-gray-700 text-white hover:border-cyan-500/50 focus:border-cyan-500 transition-all duration-300">
                      <SelectValue placeholder="Select calculation purpose" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10 scale-in">
                      <SelectItem value="medication">Medication Dosing</SelectItem>
                      <SelectItem value="cardiac">Cardiac Assessment</SelectItem>
                      <SelectItem value="metabolic">Metabolic Calculations</SelectItem>
                      <SelectItem value="research">Research/Academic</SelectItem>
                      <SelectItem value="general">General Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-6 p-6 bg-cyan-500/5 rounded-[2rem] border border-cyan-500/10 backdrop-blur-3xl">
                  <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    BSA Applications
                  </h4>
                  <ul className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter space-y-1">
                    <li>• Chemotherapy & medication dosing</li>
                    <li>• Cardiac index calculations</li>
                    <li>• Metabolic rate assessments</li>
                    <li>• Medical research studies</li>
                    <li>• Physiological normalizations</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateBSA}
              className={`flex-1 btn-category-composition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!weight || !(heightUnit === 'ft' ? (feet && inches) : height) ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Analyzing Geometry...
                </>
              ) : (
                <>
                  <Zap className="mr-3 h-7 w-7" />
                  Resolve Surface Area
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
                <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-cyan-500 opacity-[0.03] select-none pointer-events-none uppercase">
                  STRATEGIST
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                      <Zap className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tight uppercase">Surface Integrity</h3>
                      <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Resolution synchronized</p>
                    </div>
                  </div>
                  <Button
                    onClick={exportToPDF}
                    className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-10 py-5 sm:py-8 font-black transition-all uppercase tracking-widest text-sm"
                  >
                    <Download className="h-5 w-5 mr-3" />
                    Export Protocol
                  </Button>
                </div>

                <div className="text-center mb-24 relative z-10">
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none"
                    initial={{ filter: "blur(20px)", y: 20 }}
                    animate={{ filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {result.bsa}<span className="text-4xl text-cyan-400/60 font-black tracking-widest ml-4 uppercase">m²</span>
                  </motion.div>
                  <div className={`inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] ${result.color} bg-white/5 border border-white/20 mt-10 shadow-2xl`}>
                    SCOPE: {result.category}
                  </div>
                  <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] mt-10 uppercase opacity-60">
                    Source Protocol: {result.method} / {result.accuracy}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-8 lg:p-10 mb-16 relative z-10">
                  <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                      <Target className="h-7 w-7 text-cyan-400" />
                      <h4 className="text-xl font-black text-white uppercase tracking-widest">Geometric Ratios</h4>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center p-6 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-400/20">
                        <span className="text-cyan-400 font-black text-sm uppercase">Mass/Surface Ratio</span>
                        <span className="text-white font-black text-2xl">{result.additionalMetrics.weightBSARatio} <span className="text-[10px] opacity-40 uppercase ml-1">kg/m²</span></span>
                      </div>
                      <div className="flex justify-between items-center p-6 rounded-[2.5rem] bg-white/5 border border-white/5">
                        <span className="text-slate-500 font-black text-sm uppercase">Height Correlation</span>
                        <span className="text-white font-black text-2xl">{result.additionalMetrics.heightBSARatio} <span className="text-[10px] opacity-40 uppercase ml-1">m/m²</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 flex flex-col justify-center gap-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-6">
                      <div className="p-5 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 shadow-inner">
                        <Activity className="h-8 w-8 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest tracking-[0.2em]">Clinical Target</div>
                        <div className="text-xl font-black text-white tracking-widest uppercase mt-1">{result.metrics.purpose}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-inner">
                        <AlertCircle className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest tracking-[0.2em]">Stratum Level</div>
                        <div className="text-xl font-black text-white tracking-widest uppercase mt-1">{result.category}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8 p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10">
                  <div className="flex items-center gap-2 mb-5">
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                    <h4 className="text-xl font-bold text-white">Critical Insights</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.healthInsights.map((insight, index) => (
                      <motion.div
                        key={index}
                        className="p-4 rounded-2xl bg-white/5 border border-white/5 group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <span className="text-slate-300 text-sm font-medium leading-relaxed">{insight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mb-16 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-cyan-500/5 border border-cyan-500/10 backdrop-blur-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-30" />
                  <div className="flex items-center gap-4 mb-10 relative z-10">
                    <CheckCircle className="h-8 w-8 text-cyan-400 shadow-glow" />
                    <h4 className="text-2xl font-black text-white uppercase tracking-widest">Medical Protocol</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {result.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 p-6 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-cyan-500/5 transition-all group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,1)] group-hover:scale-150 transition-transform" />
                        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider leading-relaxed">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Button
                    onClick={exportToPDF}
                    disabled={isExporting}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 py-6 rounded-xl transition-all duration-300 font-bold text-lg"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Export BSA Medical Report
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