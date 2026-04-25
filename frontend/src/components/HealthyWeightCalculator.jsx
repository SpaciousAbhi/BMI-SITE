import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Heart, AlertCircle, CheckCircle, Target, Download, FileText, Loader2, TrendingUp } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from 'jspdf';

const HealthyWeightCalculator = () => {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [bodyFrame, setBodyFrame] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
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

  const calculateHealthyWeight = async () => {
    // Validation
    const heightValid = heightUnit === "ft" ? (feet && inches) : height;
    if (!heightValid || !age || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in height, age, and gender to calculate healthy weight range.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert height to centimeters
    let heightInCm;
    if (heightUnit === "cm") {
      heightInCm = parseFloat(height);
    } else if (heightUnit === "ft") {
      heightInCm = (parseFloat(feet) * 12 + parseFloat(inches)) * 2.54;
    }

    const heightInM = heightInCm / 100;
    const ageNum = parseInt(age);

    // Base BMI ranges (WHO standards)
    let minBMI = 18.5;
    let maxBMI = 24.9;

    // Age adjustments (older adults can have slightly higher healthy BMI)
    if (ageNum >= 65) {
      minBMI = 22.0;
      maxBMI = 27.0;
    } else if (ageNum >= 50) {
      minBMI = 20.0;
      maxBMI = 26.0;
    }

    // Activity level adjustments
    let activityAdjustment = 0;
    if (activityLevel === "high") {
      // Athletes can have higher BMI due to muscle mass
      maxBMI += 2.0;
      activityAdjustment = 2.0;
    } else if (activityLevel === "moderate") {
      maxBMI += 1.0;
      activityAdjustment = 1.0;
    }

    // Body frame adjustments
    let frameAdjustment = 0;
    if (bodyFrame === "large") {
      minBMI += 1.0;
      maxBMI += 1.0;
      frameAdjustment = 1.0;
    } else if (bodyFrame === "small") {
      minBMI -= 1.0;
      maxBMI -= 1.0;
      frameAdjustment = -1.0;
    }

    // Ensure reasonable bounds
    minBMI = Math.max(17.0, minBMI);
    maxBMI = Math.min(30.0, maxBMI);

    // Calculate weight ranges
    const minHealthyWeight = minBMI * Math.pow(heightInM, 2);
    const maxHealthyWeight = maxBMI * Math.pow(heightInM, 2);
    const idealWeight = ((minBMI + maxBMI) / 2) * Math.pow(heightInM, 2);

    // Weight targets for different goals
    const weightLossTarget = minBMI * Math.pow(heightInM, 2);
    const muscleGainTarget = (maxBMI - 1.0) * Math.pow(heightInM, 2);
    const maintenanceTarget = idealWeight;

    // Current weight analysis if provided
    let currentStatus = null;
    let currentBMI = null;
    let weightDifference = null;
    let recommendations = [];

    if (currentWeight) {
      const currentWeightKg = weightUnit === "kg" ? parseFloat(currentWeight) : parseFloat(currentWeight) / 2.20462;
      currentBMI = currentWeightKg / Math.pow(heightInM, 2);
      weightDifference = currentWeightKg - idealWeight;

      if (currentBMI < minBMI) {
        currentStatus = "Below Healthy Range";
        recommendations = [
          "Focus on gradual, healthy weight gain",
          "Increase caloric intake with nutrient-dense foods",
          "Include strength training to build muscle mass",
          "Consult healthcare provider if underweight persists"
        ];
      } else if (currentBMI <= maxBMI) {
        currentStatus = "Within Healthy Range";
        recommendations = [
          "Maintain current healthy weight",
          "Continue balanced diet and regular exercise",
          "Monitor weight changes regularly",
          "Focus on overall health rather than just weight"
        ];
      } else if (currentBMI <= 27.0) {
        currentStatus = "Slightly Above Healthy Range";
        recommendations = [
          "Small caloric deficit for gradual weight loss",
          "Increase physical activity levels",
          "Focus on portion control and mindful eating",
          "Set realistic weight loss goals"
        ];
      } else if (currentBMI <= 30.0) {
        currentStatus = "Above Healthy Range";
        recommendations = [
          "Structured weight loss plan recommended",
          "Combine cardio and strength training",
          "Consider working with a nutritionist",
          "Set gradual weight loss targets"
        ];
      } else {
        currentStatus = "Significantly Above Healthy Range";
        recommendations = [
          "Comprehensive weight management approach needed",
          "Consult healthcare provider for medical evaluation",
          "Consider professional weight loss support",
          "Focus on sustainable lifestyle changes"
        ];
      }
    } else {
      recommendations = [
        "Use this range as your target weight guide",
        "Aim for the middle of your healthy range",
        "Combine with regular physical activity",
        "Monitor progress with healthcare provider"
      ];
    }

    // Determine color based on status
    let color;
    if (currentStatus === "Within Healthy Range") {
      color = "text-green-400";
    } else if (currentStatus?.includes("Slightly")) {
      color = "text-yellow-400";
    } else if (currentStatus?.includes("Above") && !currentStatus.includes("Significantly")) {
      color = "text-orange-400";
    } else if (currentStatus?.includes("Significantly") || currentStatus?.includes("Below")) {
      color = "text-red-400";
    } else {
      color = "text-blue-400";
    }

    // Health insights based on age and activity
    let healthInsights = [];
    
    if (ageNum >= 65) {
      healthInsights.push("Slightly higher BMI ranges are acceptable for older adults");
      healthInsights.push("Focus on maintaining muscle mass and bone health");
    } else if (ageNum >= 50) {
      healthInsights.push("Metabolic changes may affect weight management");
      healthInsights.push("Regular exercise becomes increasingly important");
    } else if (ageNum < 25) {
      healthInsights.push("Young adults may have faster metabolisms");
      healthInsights.push("Establish healthy habits early for long-term benefits");
    }

    if (activityLevel === "high") {
      healthInsights.push("Athletes may have higher BMI due to muscle mass");
      healthInsights.push("Focus on body composition rather than just weight");
    } else if (activityLevel === "low") {
      healthInsights.push("Sedentary lifestyle may require lower weight targets");
      healthInsights.push("Increasing activity level is highly recommended");
    }

    const resultData = {
      minHealthyWeight: minHealthyWeight.toFixed(1),
      maxHealthyWeight: maxHealthyWeight.toFixed(1),
      idealWeight: idealWeight.toFixed(1),
      weightLossTarget: weightLossTarget.toFixed(1),
      muscleGainTarget: muscleGainTarget.toFixed(1),
      maintenanceTarget: maintenanceTarget.toFixed(1),
      minBMI: minBMI.toFixed(1),
      maxBMI: maxBMI.toFixed(1),
      currentBMI: currentBMI ? currentBMI.toFixed(1) : null,
      currentStatus: currentStatus || "Healthy Range Calculated",
      color,
      recommendations,
      healthInsights,
      adjustments: {
        age: ageNum >= 50 ? `Age adjustment applied (${ageNum}+ years)` : null,
        activity: activityAdjustment !== 0 ? `Activity level adjustment: +${activityAdjustment} BMI points` : null,
        frame: frameAdjustment !== 0 ? `Body frame adjustment: ${frameAdjustment > 0 ? '+' : ''}${frameAdjustment} BMI points` : null
      },
      metrics: {
        height: heightUnit === "cm" ? `${height} cm` : `${feet}'${inches}"`,
        age: ageNum,
        gender,
        activityLevel: activityLevel || "Not specified",
        bodyFrame: bodyFrame || "Average",
        currentWeight: currentWeight ? `${currentWeight} ${weightUnit}` : "Not provided"
      },
      calculatedOn: new Date().toLocaleDateString()
    };

    setResult(resultData);
    setIsCalculating(false);

    toast({
      title: "Healthy Weight Range Calculated!",
      description: `Range: ${minHealthyWeight.toFixed(1)} - ${maxHealthyWeight.toFixed(1)} kg`,
    });
  };

  const resetCalculator = () => {
    setHeight("");
    setFeet("");
    setInches("");
    setAge("");
    setGender("");
    setActivityLevel("");
    setBodyFrame("");
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
      pdf.text('Healthy Weight Range Report', pageWidth / 2, headerY, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Personalized Weight Assessment', pageWidth / 2, headerY + 8, { align: 'center' });
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
      pdf.text(`Age: ${result.metrics.age} years`, 25, currentY + 8);
      pdf.text(`Height: ${result.metrics.height}`, 25, currentY + 16);
      pdf.text(`Activity Level: ${result.metrics.activityLevel}`, 25, currentY + 24);
      pdf.text(`Body Frame: ${result.metrics.bodyFrame}`, 25, currentY + 32);
      if (result.metrics.currentWeight !== "Not provided") {
        pdf.text(`Current Weight: ${result.metrics.currentWeight}`, 25, currentY + 40);
        currentY += 8;
      }
      currentY += 48;
      
      // Healthy Weight Range
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Your Healthy Weight Range', 20, currentY);
      currentY += 15;
      
      pdf.setFontSize(36);
      pdf.setTextColor(34, 197, 94);
      pdf.text(`${result.minHealthyWeight} - ${result.maxHealthyWeight} kg`, pageWidth / 2, currentY, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.setTextColor(51, 51, 51);
      pdf.text(`Ideal Weight: ${result.idealWeight} kg`, pageWidth / 2, currentY + 12, { align: 'center' });
      currentY += 30;
      
      // BMI Range
      pdf.setFontSize(14);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`BMI Range: ${result.minBMI} - ${result.maxBMI}`, pageWidth / 2, currentY, { align: 'center' });
      currentY += 20;
      
      // Current Status
      if (result.currentBMI) {
        pdf.setFontSize(16);
        pdf.setTextColor(51, 51, 51);
        pdf.text('Current Weight Status', 20, currentY);
        currentY += 10;
        
        const statusColor = result.currentStatus === 'Within Healthy Range' ? [34, 197, 94] : 
                           result.currentStatus.includes('Slightly') ? [245, 158, 11] : [239, 68, 68];
        pdf.setFontSize(14);
        pdf.setTextColor(...statusColor);
        pdf.text(`${result.currentStatus} (BMI: ${result.currentBMI})`, 25, currentY);
        currentY += 20;
      }
      
      // Weight Targets
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Weight Targets by Goal', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Weight Loss Target: ${result.weightLossTarget} kg`, 25, currentY);
      pdf.text(`Maintenance Target: ${result.maintenanceTarget} kg`, 25, currentY + 8);
      pdf.text(`Muscle Gain Target: ${result.muscleGainTarget} kg`, 25, currentY + 16);
      currentY += 30;
      
      // Adjustments Applied
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Personalization Adjustments', 20, currentY);
      currentY += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      Object.entries(result.adjustments).forEach(([key, value]) => {
        if (value) {
          pdf.text(`• ${value}`, 25, currentY);
          currentY += 6;
        }
      });
      currentY += 10;
      
      // Health Insights
      if (result.healthInsights.length > 0) {
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
      }
      
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
      const disclaimer = "Disclaimer: This healthy weight range is calculated based on BMI and personal factors. Individual health needs may vary. Consult healthcare professionals for personalized medical advice and weight management guidance.";
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
      pdf.text(disclaimerLines, 20, currentY);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Healthy Weight Calculator - Personalized Assessment', pageWidth / 2, pageHeight - 15, { align: 'center' });
      
      pdf.save(`Healthy-Weight-Report-${result.calculatedOn.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF Export Successful!",
        description: "Your healthy weight range report has been downloaded.",
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
              className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <Heart className="h-10 w-10 text-cyan-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-200 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tight">
              Healthy Weight Oracle
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Personalized clinical weight range assessment based on metabolic and physiological factors.
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
                <Label htmlFor="age" className="text-[10px] font-black uppercase text-slate-500 ml-1">Chronological Age *</Label>
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
                <Label htmlFor="currentWeight" className="text-[10px] font-black uppercase text-slate-500 ml-1">Current Weight (Optional)</Label>
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

            {/* Additional Factors */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Lifestyle Matrix
              </h3>
              
              <div className="space-y-3">
                <Label htmlFor="activityLevel" className="text-[10px] font-black uppercase text-slate-500 ml-1">Activity Index</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className="glass-input text-xl py-5 sm:py-7 font-bold text-slate-200">
                    <SelectValue placeholder="Select Index" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/10 scale-in">
                    <SelectItem value="low">Low (Sedentary)</SelectItem>
                    <SelectItem value="moderate">Moderate (Active)</SelectItem>
                    <SelectItem value="high">High (Athletic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="bodyFrame" className="text-[10px] font-black uppercase text-slate-500 ml-1">Structural Frame</Label>
                <Select value={bodyFrame} onValueChange={setBodyFrame}>
                  <SelectTrigger className="glass-input text-xl py-5 sm:py-7 font-bold text-slate-200">
                    <SelectValue placeholder="Select Frame" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/10 scale-in">
                    <SelectItem value="small">Small Structure</SelectItem>
                    <SelectItem value="medium">Medium Structure</SelectItem>
                    <SelectItem value="large">Large Structure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-8 p-6 bg-cyan-500/5 rounded-[2rem] border border-cyan-500/10 backdrop-blur-md">
                <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Audit Engine Specs
                </h4>
                <ul className="text-xs text-slate-500 space-y-2 font-medium">
                  <li className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full w-fit">Age-adjusted BMI ranges</li>
                  <li className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full w-fit">Metabolic Activity considerations</li>
                  <li className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full w-fit">Bone Structure adjustment</li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateHealthyWeight}
              className={`flex-1 btn-category-composition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${(!age || !gender || !(heightUnit === "ft" ? (feet && inches) : height)) ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Synthesizing Range...
                </>
              ) : (
                <>
                  <Target className="mr-3 h-7 w-7" />
                  Audit Healthy Range
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
                <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-cyan-400 opacity-[0.03] select-none pointer-events-none uppercase">
                  Healthy
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                      <Target className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tight uppercase">Range Architecture</h3>
                      <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Personalized clinical Assessment</p>
                    </div>
                  </div>
                  <Button
                    onClick={exportToPDF}
                    disabled={isExporting}
                    className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-10 py-5 sm:py-8 font-black transition-all uppercase tracking-widest text-sm"
                  >
                    {isExporting ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : <Download className="h-5 w-5 mr-3" />}
                    {isExporting ? "Architecting PDF..." : "Export clinical Report"}
                  </Button>
                </div>

                <div className="text-center mb-24 relative z-10">
                  <motion.div
                    className="text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none"
                    initial={{ filter: "blur(20px)", y: 20 }}
                    animate={{ filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {result.minHealthyWeight}<span className="text-3xl sm:text-4xl md:text-5xl mx-4 opacity-40 select-none">-</span>{result.maxHealthyWeight}
                  </motion.div>
                  <div className={`inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] ${result.color} bg-white/5 border border-white/10 mt-10 shadow-2xl`}>
                    {result.currentStatus}
                  </div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest mt-6 opacity-60">Personalized BMI Threshold: {result.minBMI} - {result.maxBMI}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10 mb-16">
                  <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                    <TrendingUp className="h-7 w-7 text-emerald-400" />
                    <h4 className="text-xl font-black text-white uppercase tracking-widest">Metabolic Targets</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-4 border-b border-white/5">
                        <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Maintenance</span>
                        <span className="text-white font-black text-xl">{result.maintenanceTarget} <span className="text-xs text-slate-500 uppercase">KG</span></span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-white/5">
                        <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Weight Loss</span>
                        <span className="text-amber-400 font-black text-xl">{result.weightLossTarget} <span className="text-xs text-slate-500 uppercase">KG</span></span>
                      </div>
                      <div className="flex justify-between items-center py-4">
                        <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Muscle Gain</span>
                        <span className="text-cyan-400 font-black text-xl">{result.muscleGainTarget} <span className="text-xs text-slate-500 uppercase">KG</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                    <AlertCircle className="h-7 w-7 text-blue-400" />
                    <h4 className="text-xl font-black text-white uppercase tracking-widest">Logic Profile</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(result.adjustments).map(([key, value]) => 
                        value && (
                          <div key={key} className="flex items-center gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/5">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-xs text-slate-400 font-black uppercase tracking-wider">{value}</span>
                          </div>
                        )
                      )}
                      {Object.values(result.adjustments).every(v => !v) && (
                        <p className="text-xs text-slate-500 font-bold italic uppercase px-4">• Standard clinical baseline applied</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-16 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-blue-500/5 border border-blue-500/10 backdrop-blur-3xl relative overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  <div className="flex items-center gap-4 mb-10">
                    <AlertCircle className="h-8 w-8 text-blue-400 shadow-glow" />
                    <h4 className="text-2xl font-black text-white uppercase tracking-widest">Physicality Insights</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {result.healthInsights.map((insight, index) => (
                      <motion.div
                        key={index}
                        className="p-5 sm:p-6 lg:p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-blue-500/5 transition-all text-slate-400 font-bold text-sm uppercase tracking-wider leading-loose"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {insight}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mb-16 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-3xl relative overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <div className="flex items-center gap-4 mb-10">
                    <CheckCircle className="h-8 w-8 text-emerald-400 shadow-glow" />
                    <h4 className="text-2xl font-black text-white uppercase tracking-widest">Evolutionary Recommendations</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {result.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-5 p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-emerald-500/5 transition-all group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
                        <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 sm:p-6 lg:p-8 pt-12 border-t border-white/5">
                  <div className="text-center p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-3">Audited Stature</div>
                    <div className="text-xl font-black text-white tracking-tighter">{result.metrics.height}</div>
                  </div>
                  <div className="text-center p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-3">Audited Structural frame</div>
                    <div className="text-xl font-black text-white tracking-tighter uppercase">{result.metrics.bodyFrame}</div>
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

export default HealthyWeightCalculator;