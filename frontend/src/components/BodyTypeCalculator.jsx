import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Users, AlertCircle, CheckCircle, Target, Download, FileText, Loader2, Activity } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from 'jspdf';

const BodyTypeCalculator = () => {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [wrist, setWrist] = useState("");
  const [shoulder, setShoulder] = useState("");
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

  const calculateBodyType = async () => {
    // Validation
    const heightValid = heightUnit === "ft" ? (feet && inches) : height;
    if (!weight || !heightValid || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in weight, height, and gender to calculate body type.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert measurements
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

    // Calculate BMI
    const heightInM = heightInCm / 100;
    const bmi = weightInKg / Math.pow(heightInM, 2);

    // Basic body type classification based on BMI and proportions
    let primaryType, secondaryType, typeDescription, characteristics, recommendations;
    let endomorphScore = 0, mesomorphScore = 0, ectomorphScore = 0;

    // BMI-based initial classification
    if (bmi < 18.5) {
      ectomorphScore += 3;
    } else if (bmi < 22) {
      ectomorphScore += 2;
      mesomorphScore += 1;
    } else if (bmi < 25) {
      mesomorphScore += 2;
      ectomorphScore += 1;
    } else if (bmi < 28) {
      mesomorphScore += 2;
      endomorphScore += 1;
    } else {
      endomorphScore += 3;
    }

    // Additional scoring based on body measurements if provided
    if (wrist && shoulder && waist) {
      const wristCm = parseFloat(wrist);
      const shoulderCm = parseFloat(shoulder);
      const waistCm = parseFloat(waist);

      // Wrist size (frame size indicator)
      const heightInInches = heightInCm / 2.54;
      if (gender === "male") {
        if (wristCm < 16.5) ectomorphScore += 1;
        else if (wristCm > 19) endomorphScore += 1;
        else mesomorphScore += 1;
      } else {
        if (wristCm < 14) ectomorphScore += 1;
        else if (wristCm > 16.5) endomorphScore += 1;
        else mesomorphScore += 1;
      }

      // Shoulder to waist ratio
      const shoulderWaistRatio = shoulderCm / waistCm;
      if (gender === "male") {
        if (shoulderWaistRatio > 1.45) mesomorphScore += 2;
        else if (shoulderWaistRatio < 1.3) endomorphScore += 1;
        else mesomorphScore += 1;
      } else {
        if (shoulderWaistRatio > 1.25) mesomorphScore += 2;
        else if (shoulderWaistRatio < 1.1) endomorphScore += 1;
        else mesomorphScore += 1;
      }
    }

    // Hip to waist ratio for additional classification (if hip measurement provided)
    if (waist && hip) {
      const waistCm = parseFloat(waist);
      const hipCm = parseFloat(hip);
      const waistHipRatio = waistCm / hipCm;

      if (gender === "female") {
        if (waistHipRatio < 0.7) mesomorphScore += 1;
        else if (waistHipRatio > 0.8) endomorphScore += 1;
      } else {
        if (waistHipRatio < 0.85) mesomorphScore += 1;
        else if (waistHipRatio > 0.95) endomorphScore += 1;
      }
    }

    // Determine primary body type
    const maxScore = Math.max(endomorphScore, mesomorphScore, ectomorphScore);
    
    if (endomorphScore === maxScore) {
      primaryType = "Endomorph";
      typeDescription = "Naturally higher body fat, round/soft physique, slower metabolism";
      characteristics = [
        "Higher tendency to store fat",
        "Rounder, softer physique",
        "Wider bone structure",
        "Slower metabolism",
        "Gains weight easily",
        "More challenging to lose weight"
      ];
      recommendations = [
        "Focus on cardio and high-intensity training",
        "Maintain a caloric deficit for fat loss",
        "Include strength training to build muscle",
        "Monitor portion sizes carefully",
        "Choose complex carbohydrates",
        "Stay consistent with exercise routine"
      ];
    } else if (mesomorphScore === maxScore) {
      primaryType = "Mesomorph";
      typeDescription = "Naturally muscular, athletic build, moderate metabolism";
      characteristics = [
        "Naturally muscular physique",
        "Medium bone structure",
        "Athletic appearance",
        "Moderate metabolism",
        "Gains muscle relatively easily",
        "Can lose or gain weight with effort"
      ];
      recommendations = [
        "Combine strength training with cardio",
        "Moderate caloric intake for maintenance",
        "Focus on progressive overload",
        "Balanced macronutrient distribution",
        "Regular exercise for best results",
        "Can handle higher training volume"
      ];
    } else {
      primaryType = "Ectomorph";
      typeDescription = "Naturally lean, narrow frame, fast metabolism";
      characteristics = [
        "Naturally lean physique",
        "Narrow bone structure",
        "Fast metabolism",
        "Difficulty gaining weight",
        "Lower body fat naturally",
        "May struggle to build muscle"
      ];
      recommendations = [
        "Focus on strength training over cardio",
        "Maintain a caloric surplus for muscle gain",
        "Limit excessive cardio",
        "Emphasize compound movements",
        "Increase meal frequency",
        "Allow adequate recovery time"
      ];
    }

    // Determine secondary type if scores are close
    const sortedScores = [
      { type: "Endomorph", score: endomorphScore },
      { type: "Mesomorph", score: mesomorphScore },
      { type: "Ectomorph", score: ectomorphScore }
    ].sort((a, b) => b.score - a.score);

    if (sortedScores[1].score >= sortedScores[0].score - 1) {
      secondaryType = sortedScores[1].type;
    }

    // Calculate body type ratios
    const totalScore = endomorphScore + mesomorphScore + ectomorphScore;
    const endomorphPercent = Math.round((endomorphScore / totalScore) * 100);
    const mesomorphPercent = Math.round((mesomorphScore / totalScore) * 100);
    const ectomorphPercent = Math.round((ectomorphScore / totalScore) * 100);

    // Determine color based on primary type
    let color;
    if (primaryType === "Endomorph") {
      color = "text-orange-400";
    } else if (primaryType === "Mesomorph") {
      color = "text-green-400";
    } else {
      color = "text-blue-400";
    }

    // Training and nutrition insights
    let trainingInsights = [];
    let nutritionInsights = [];

    if (primaryType === "Endomorph") {
      trainingInsights = [
        "Higher training frequency (5-6 days/week)",
        "Emphasis on cardio and circuit training",
        "Shorter rest periods between sets",
        "Include HIIT training"
      ];
      nutritionInsights = [
        "Lower carbohydrate intake",
        "Higher protein and moderate fat",
        "Focus on nutrient timing",
        "Avoid processed foods"
      ];
    } else if (primaryType === "Mesomorph") {
      trainingInsights = [
        "Balanced training approach (4-5 days/week)",
        "Mix of strength and cardio training",
        "Periodize training programs",
        "Can handle variety in exercises"
      ];
      nutritionInsights = [
        "Balanced macronutrient distribution",
        "Moderate carbohydrate intake",
        "Adequate protein for muscle maintenance",
        "Flexible approach to meal timing"
      ];
    } else {
      trainingInsights = [
        "Focus on strength training (3-4 days/week)",
        "Limit cardio to preserve calories",
        "Longer rest periods for recovery",
        "Progressive overload emphasis"
      ];
      nutritionInsights = [
        "Higher caloric intake needed",
        "Increase carbohydrate consumption",
        "Frequent meals throughout day",
        "Don't fear healthy fats"
      ];
    }

    const resultData = {
      primaryType,
      secondaryType,
      typeDescription,
      characteristics,
      recommendations,
      trainingInsights,
      nutritionInsights,
      scores: {
        endomorph: endomorphScore,
        mesomorph: mesomorphScore,
        ectomorph: ectomorphScore
      },
      percentages: {
        endomorph: endomorphPercent,
        mesomorph: mesomorphPercent,
        ectomorph: ectomorphPercent
      },
      color,
      bmi: bmi.toFixed(1),
      metrics: {
        weight: weightInKg.toFixed(1),
        height: heightInCm.toFixed(1),
        age: age || "Not specified",
        gender,
        wrist: wrist || "Not provided",
        shoulder: shoulder || "Not provided",
        waist: waist || "Not provided",
        hip: hip || "Not provided"
      },
      calculatedOn: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setIsCalculating(false);

    toast({
      title: "Body Type Calculated!",
      description: `Primary type: ${primaryType}${secondaryType ? ` with ${secondaryType} traits` : ''}`,
    });
  };

  const resetCalculator = () => {
    setHeight("");
    setFeet("");
    setInches("");
    setWeight("");
    setAge("");
    setGender("");
    setWrist("");
    setShoulder("");
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
      pdf.text('Body Type Analysis Report', pageWidth / 2, headerY, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Somatotype Assessment', pageWidth / 2, headerY + 8, { align: 'center' });
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
      pdf.text(`BMI: ${result.bmi}`, 25, currentY + 24);
      if (result.metrics.age !== "Not specified") {
        pdf.text(`Age: ${result.metrics.age} years`, 25, currentY + 32);
        currentY += 8;
      }
      currentY += 40;
      
      // Body Type Results
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Body Type Analysis', 20, currentY);
      currentY += 15;
      
      pdf.setFontSize(36);
      const typeColor = result.primaryType === 'Mesomorph' ? [34, 197, 94] : 
                       result.primaryType === 'Ectomorph' ? [59, 130, 246] : [251, 146, 60];
      pdf.setTextColor(...typeColor);
      pdf.text(result.primaryType, pageWidth / 2, currentY, { align: 'center' });
      
      if (result.secondaryType) {
        pdf.setFontSize(16);
        pdf.setTextColor(80, 80, 80);
        pdf.text(`with ${result.secondaryType} traits`, pageWidth / 2, currentY + 12, { align: 'center' });
      }
      currentY += 30;
      
      // Type Description
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      const descLines = pdf.splitTextToSize(result.typeDescription, pageWidth - 40);
      pdf.text(descLines, pageWidth / 2, currentY, { align: 'center' });
      currentY += descLines.length * 6 + 15;
      
      // Body Type Percentages
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Body Type Composition', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Endomorph: ${result.percentages.endomorph}%`, 25, currentY);
      pdf.text(`Mesomorph: ${result.percentages.mesomorph}%`, 25, currentY + 8);
      pdf.text(`Ectomorph: ${result.percentages.ectomorph}%`, 25, currentY + 16);
      currentY += 30;
      
      // Characteristics
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Characteristics', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      result.characteristics.forEach((char) => {
        const charLines = pdf.splitTextToSize(`• ${char}`, pageWidth - 40);
        pdf.text(charLines, 25, currentY);
        currentY += charLines.length * 6 + 3;
      });
      currentY += 10;
      
      // Training Insights
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Training Recommendations', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      result.trainingInsights.forEach((insight) => {
        const insightLines = pdf.splitTextToSize(`• ${insight}`, pageWidth - 40);
        pdf.text(insightLines, 25, currentY);
        currentY += insightLines.length * 6 + 3;
      });
      currentY += 10;
      
      // Nutrition Insights
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Nutrition Recommendations', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      result.nutritionInsights.forEach((insight) => {
        const insightLines = pdf.splitTextToSize(`• ${insight}`, pageWidth - 40);
        pdf.text(insightLines, 25, currentY);
        currentY += insightLines.length * 6 + 3;
      });
      
      // Disclaimer
      currentY += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);
      const disclaimer = "Disclaimer: Body type analysis is based on general somatotype principles and measurements provided. Individual responses to training and nutrition may vary. Consult fitness and nutrition professionals for personalized programs.";
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
      pdf.text(disclaimerLines, 20, currentY);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Body Type Calculator - Somatotype Analysis', pageWidth / 2, pageHeight - 15, { align: 'center' });
      
      pdf.save(`Body-Type-Report-${result.calculatedOn.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF Export Successful!",
        description: "Your body type analysis report has been downloaded.",
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
              className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20"
            >
              <Users className="h-10 w-10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-purple-400 via-blue-200 to-purple-400 bg-clip-text text-transparent uppercase tracking-tight">
              Somatic Architect
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Advanced somatotype classification and architectural mapping of anatomical profiles.
          </p>
        </CardHeader>
        <CardContent className="space-y-10 p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Dimensional Biometrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:p-6 lg:p-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Primary Indicators</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="gender" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Gender *</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="glass-panel glow-border border-gray-700 text-white hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10 scale-in shadow-2xl">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Weight *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300 flex-1"
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
                        className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300 flex-1"
                      />
                    ) : (
                      <div className="flex gap-2 flex-1">
                        <Input
                          type="number"
                          placeholder="Feet"
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                        />
                        <Input
                          type="number"
                          placeholder="Inches"
                          value={inches}
                          onChange={(e) => setInches(e.target.value)}
                          className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
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
                    className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Anatomical Ratios</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="wrist" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Wrist Circumference</Label>
                  <Input
                    id="wrist"
                    type="number"
                    step="0.1"
                    placeholder="Wrist measurement (cm)"
                    value={wrist}
                    onChange={(e) => setWrist(e.target.value)}
                    className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                  />
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-1">Measure the smallest part of the wrist nexus</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shoulder" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Shoulder Width</Label>
                  <Input
                    id="shoulder"
                    type="number"
                    step="0.1"
                    placeholder="Shoulder measurement (cm)"
                    value={shoulder}
                    onChange={(e) => setShoulder(e.target.value)}
                    className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                  />
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-1">Wide spanning measurement across the acromion</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waist" className="glass-text opacity-90 text-[10px] font-black uppercase tracking-widest">Waist & Hip Metrics</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="waist"
                      type="number"
                      step="0.1"
                      placeholder="Waist (cm)"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                    />
                    <Input
                      id="hip"
                      type="number"
                      step="0.1"
                      placeholder="Hip (cm)"
                      value={hip}
                      onChange={(e) => setHip(e.target.value)}
                      className="glass-panel glow-border border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="mt-6 p-6 bg-purple-500/5 rounded-[2rem] border border-purple-500/10 backdrop-blur-3xl">
                  <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    Somatotype Context
                  </h4>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter space-y-1">
                    <p><span className="text-blue-400/60 font-black">Ectomorph:</span> Lean structure, high metabolic rate</p>
                    <p><span className="text-green-400/60 font-black">Mesomorph:</span> Skeletal muscularity, athletic build</p>
                    <p><span className="text-orange-400/60 font-black">Endomorph:</span> Lipid storage priority, round frame</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateBodyType}
              className={`flex-1 btn-category-composition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!weight || !(heightUnit === 'ft' ? (feet && inches) : height) || !gender ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Analyzing Bio-Structure...
                </>
              ) : (
                <>
                  <Users className="mr-3 h-7 w-7" />
                  Resolve Somatotype
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
                <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-purple-500 opacity-[0.03] select-none pointer-events-none uppercase">
                  ARCHITECT
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                      <Users className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tight uppercase">Somatic Profile</h3>
                      <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Classification synchronized</p>
                    </div>
                  </div>
                  <Button
                    onClick={exportToPDF}
                    className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-10 py-5 sm:py-8 font-black transition-all uppercase tracking-widest text-sm"
                  >
                    <Download className="h-5 w-5 mr-3" />
                    Export Dossier
                  </Button>
                </div>

                <div className="text-center mb-24 relative z-10">
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none"
                    initial={{ filter: "blur(20px)", y: 20 }}
                    animate={{ filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {result.primaryType}
                  </motion.div>
                  {result.secondaryType && (
                    <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] text-slate-400 bg-white/5 border border-white/20 mt-10 shadow-2xl">
                      Hybrid: {result.secondaryType} Traits
                    </div>
                  )}
                  <p className="text-slate-500 text-xs font-bold tracking-[0.3em] mt-10 uppercase max-w-lg mx-auto leading-relaxed">
                    {result.typeDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5 shadow-inner text-center group hover:bg-white/10 transition-all">
                    <div className="text-3xl font-black text-orange-400 mb-1 drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]">{result.percentages.endomorph}%</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Endomorph</div>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5 shadow-inner text-center group hover:bg-white/10 transition-all border-b-2 border-b-green-500/30">
                    <div className="text-3xl font-black text-green-400 mb-1 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">{result.percentages.mesomorph}%</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Mesomorph</div>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5 shadow-inner text-center group hover:bg-white/10 transition-all">
                    <div className="text-3xl font-black text-blue-400 mb-1 drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]">{result.percentages.ectomorph}%</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ectomorph</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4 p-6 rounded-3xl bg-white/5 border border-white/5 shadow-inner">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-purple-400" />
                      <h4 className="font-bold text-white uppercase tracking-tight">Key Characteristics</h4>
                    </div>
                    <div className="space-y-2">
                      {result.characteristics.slice(0, 5).map((char, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
                          <CheckCircle className="h-3 w-3 text-emerald-500" />
                          <span className="text-xs text-slate-300 font-medium">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 p-6 rounded-3xl bg-white/5 border border-white/5 shadow-inner">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-blue-400" />
                      <h4 className="font-bold text-white uppercase tracking-tight">Metabolic Status</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-slate-400 text-sm">Calculated BMI</span>
                        <span className="text-white font-black">{result.bmi}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-400 text-sm">Bone Structure</span>
                        <span className="text-white font-bold">{result.metrics.wrist !== "Not provided" ? "Measured" : "Assumed"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-blue-400" />
                      <h4 className="font-bold text-white uppercase tracking-tight">Training Protocol</h4>
                    </div>
                    <div className="space-y-2">
                      {result.trainingInsights.map((insight, index) => (
                        <div key={index} className="text-sm text-slate-300 leading-relaxed">• {insight}</div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <h4 className="font-bold text-white uppercase tracking-tight">Nutritional Strategy</h4>
                    </div>
                    <div className="space-y-2">
                      {result.nutritionInsights.map((insight, index) => (
                        <div key={index} className="text-sm text-slate-300 leading-relaxed">• {insight}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 mb-5">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <h4 className="text-xl font-bold text-white">Actionable Recommendations</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:scale-150 transition-transform" />
                        <span className="text-slate-300 text-sm font-medium">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    onClick={exportToPDF}
                    disabled={isExporting}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 py-6 rounded-xl transition-all duration-300 font-bold text-lg"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Dossier...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Download Analysis Report
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

export default BodyTypeCalculator;