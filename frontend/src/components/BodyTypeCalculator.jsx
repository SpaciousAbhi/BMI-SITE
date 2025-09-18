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
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="p-3 rounded-full bg-purple-500/10"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Users className="h-8 w-8 text-purple-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Body Type Calculator
            </span>
          </CardTitle>
          <p className="text-gray-400 text-lg">
            Discover your somatotype and get personalized fitness recommendations
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Basic Information */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-300">Gender *</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
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
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300 flex-1"
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
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300 flex-1"
                    />
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="Feet"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                      />
                      <Input
                        type="number"
                        placeholder="Inches"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
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
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Body Measurements */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Body Measurements (cm) - Optional</h3>
              
              <div className="space-y-2">
                <Label htmlFor="wrist" className="text-gray-300">Wrist Circumference</Label>
                <Input
                  id="wrist"
                  type="number"
                  step="0.1"
                  placeholder="Wrist measurement (cm)"
                  value={wrist}
                  onChange={(e) => setWrist(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                />
                <p className="text-xs text-gray-500">Measure around the smallest part of your wrist</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shoulder" className="text-gray-300">Shoulder Width</Label>
                <Input
                  id="shoulder"
                  type="number"
                  step="0.1"
                  placeholder="Shoulder measurement (cm)"
                  value={shoulder}
                  onChange={(e) => setShoulder(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                />
                <p className="text-xs text-gray-500">Measure across the widest part of shoulders</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waist" className="text-gray-300">Waist Circumference</Label>
                <Input
                  id="waist"
                  type="number"
                  step="0.1"
                  placeholder="Waist measurement (cm)"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                />
                <p className="text-xs text-gray-500">Measure at the narrowest point of your waist</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hip" className="text-gray-300">Hip Circumference</Label>
                <Input
                  id="hip"
                  type="number"
                  step="0.1"
                  placeholder="Hip measurement (cm)"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 hover:border-purple-500/50 focus:border-purple-500 transition-all duration-300"
                />
                <p className="text-xs text-gray-500">Measure at the widest part of your hips</p>
              </div>

              <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Body Type Categories</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <p><span className="text-blue-300">Ectomorph:</span> Lean, narrow, fast metabolism</p>
                  <p><span className="text-green-300">Mesomorph:</span> Muscular, athletic, balanced</p>
                  <p><span className="text-orange-300">Endomorph:</span> Rounder, higher body fat, slower metabolism</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex gap-4 pt-6">
            <Button
              onClick={calculateBodyType}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Users className="mr-2 h-4 w-4" />
                  Analyze Body Type
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
                    <span className={result.color}>{result.primaryType}</span>
                  </motion.div>
                  {result.secondaryType && (
                    <h3 className="text-xl font-semibold mb-2 text-gray-300">
                      with {result.secondaryType} traits
                    </h3>
                  )}
                  <p className="text-gray-400">{result.typeDescription}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">{result.percentages.endomorph}%</div>
                    <div className="text-sm text-gray-400">Endomorph</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{result.percentages.mesomorph}%</div>
                    <div className="text-sm text-gray-400">Mesomorph</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{result.percentages.ectomorph}%</div>
                    <div className="text-sm text-gray-400">Ectomorph</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-purple-400" />
                      Characteristics
                    </h4>
                    <ul className="space-y-1">
                      {result.characteristics.slice(0, 4).map((char, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <span className="text-purple-400 mr-2">•</span>
                          {char}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-400" />
                      Training Focus
                    </h4>
                    <ul className="space-y-1">
                      {result.trainingInsights.slice(0, 4).map((insight, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <span className="text-blue-400 mr-2">•</span>
                          {insight}
                        </motion.li>
                      ))}
                    </ul>
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
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Export Body Type Report
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