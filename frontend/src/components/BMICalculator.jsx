import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Heart, AlertCircle, CheckCircle, Target, Download, FileText, Loader2, Info } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from 'jspdf';
import BMIGauge from "./BMIGauge";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);
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

  const calculateBMI = () => {
    if (!weight || (heightUnit === "ft" ? (feet === "" || inches === "") : !height) || !age || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields (Age, Gender, Weight, and Height) to calculate your BMI.",
        variant: "destructive",
      });
      setResult(null);
      return;
    }

    try {
      let weightInKg = parseFloat(weight);
      if (weightUnit === "lbs") weightInKg = weightInKg * 0.453592;

      let heightInM;
      if (heightUnit === "cm") heightInM = parseFloat(height) / 100;
      else if (heightUnit === "ft") heightInM = (parseFloat(feet) * 30.48 + parseFloat(inches) * 2.54) / 100;
      else heightInM = parseFloat(height) * 0.0254;

      if (!heightInM || heightInM === 0) return;

      const bmi = weightInKg / (heightInM * heightInM);
      
      let category, color, healthRisk, recommendations;
      if (bmi < 18.5) {
        category = "Underweight";
        color = "text-blue-400";
        healthRisk = "Increased risk of nutritional deficiency and osteoporosis.";
        recommendations = ["Consult with a healthcare provider", "Consider a balanced diet to gain healthy weight", "Include strength training exercises"];
      } else if (bmi >= 18.5 && bmi < 25) {
        category = "Normal Weight";
        color = "text-emerald-400";
        healthRisk = "Lower risk of weight-related health problems.";
        recommendations = ["Maintain current lifestyle", "Continue regular physical activity", "Keep eating a balanced diet"];
      } else if (bmi >= 25 && bmi < 30) {
        category = "Overweight";
        color = "text-amber-400";
        healthRisk = "Increased risk of cardiovascular disease and diabetes.";
        recommendations = ["Consider gradual weight loss", "Increase physical activity", "Focus on portion control and healthy eating"];
      } else {
        category = "Obese";
        color = "text-rose-400";
        healthRisk = "High risk of serious health conditions.";
        recommendations = ["Consult healthcare provider immediately", "Consider professional weight management", "Focus on lifestyle changes with medical supervision"];
      }

      const idealWeightMin = 18.5 * (heightInM * heightInM);
      const idealWeightMax = 24.9 * (heightInM * heightInM);

      setResult({
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
      });

      // Scroll to result after a short delay to allow animation to start
      setTimeout(() => {
        const resultElement = document.getElementById('bmi-result-card');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.scrollBy({ top: 400, behavior: 'smooth' });
        }
      }, 150);
    } catch (err) {
      console.error(err);
    }
  };

  // Reverted to manual calculation via button

  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setFeet("");
    setInches("");
    setAge("");
    setGender("male");
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
      className="max-w-4xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-10 items-stretch">
        {/* Calculator Input */}
        <motion.div variants={itemVariants} className="w-full">
          <Card className="glass-panel glow-border border-white/5 bg-white/[0.01] overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Calculator className="h-6 w-6 text-cyan-400" />
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Parameters</h2>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Medical Assessment</p>
            </div>
            
            <CardContent className="p-8 space-y-8">
              {/* Biological Section */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2.5">
                    <Label htmlFor="age" className="text-[10px] font-black uppercase text-slate-500 ml-1">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Years"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="glass-input text-lg py-6 focus:ring-1 focus:ring-cyan-500/30"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="glass-input text-lg py-6 font-bold text-slate-200">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10 bg-[#030712]">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Dimensions Section */}
              <div className="space-y-6 pt-4 border-t border-white/5">
                <div className="space-y-2.5">
                  <Label htmlFor="weight" className="text-[10px] font-black uppercase text-slate-500 ml-1">Current Weight</Label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="glass-input text-lg py-6 flex-1"
                    />
                    <Select value={weightUnit} onValueChange={setWeightUnit}>
                      <SelectTrigger className="glass-input w-24 py-6 font-black uppercase text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10 bg-[#030712]">
                        <SelectItem value="kg">KG</SelectItem>
                        <SelectItem value="lbs">LBS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Stature / Height</Label>
                  <div className="flex gap-2">
                    {heightUnit === "ft" ? (
                      <div className="flex gap-2 flex-1">
                        <Input type="number" placeholder="ft" value={feet} onChange={(e) => setFeet(e.target.value)} className="glass-input text-lg py-6 flex-1" />
                        <Input type="number" placeholder="in" value={inches} onChange={(e) => setInches(e.target.value)} className="glass-input text-lg py-6 flex-1" />
                      </div>
                    ) : (
                      <Input type="number" placeholder={heightUnit} value={height} onChange={(e) => setHeight(e.target.value)} className="glass-input text-lg py-6 flex-1" />
                    )}
                    <Select value={heightUnit} onValueChange={setHeightUnit}>
                      <SelectTrigger className="glass-input w-24 py-6 font-black uppercase text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10 bg-[#030712]">
                        <SelectItem value="cm">CM</SelectItem>
                        <SelectItem value="ft">FT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <Button 
                  onClick={calculateBMI}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3 py-7 rounded-2xl transition-all font-black text-sm uppercase tracking-[0.15em] border-none"
                >
                  <Calculator className="h-5 w-5" />
                  Calculate BMI
                </Button>
                <Button 
                  onClick={resetCalculator}
                  variant="outline"
                  className="w-full border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/5 hover:text-white flex items-center justify-center gap-2 py-7 rounded-2xl transition-all font-black text-sm uppercase tracking-widest"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Placeholder / Results Display */}
        <AnimatePresence mode="wait">
          {!result && (
            <motion.div
              key="placeholder"
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 text-center rounded-2xl sm:rounded-3xl lg:rounded-[3rem] border border-white/5 bg-white/[0.02] relative overflow-hidden h-full min-h-[400px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 pointer-events-none" />
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"
              />
              <div className="p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-white/[0.02] border border-white/5 mb-8 shadow-2xl backdrop-blur-sm z-10">
                <Calculator className="h-20 w-20 text-cyan-500/50" />
              </div>
              <h3 className="text-3xl font-black text-white/70 tracking-tight mb-4 z-10">Awaiting Data</h3>
              <p className="text-slate-500 max-w-sm text-lg leading-relaxed z-10 font-medium">
                Enter your physical parameters to generate a highly precise, personal body mass assessment.
              </p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              id="bmi-result-card"
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="premium-result-card p-8 sm:p-12 lg:p-16 relative h-full flex flex-col"
            >
              {/* Background Accents */}
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] select-none pointer-events-none">
                <FileText className="h-64 w-64 text-white" />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                    <Heart className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none mb-2">Health Report</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase">Clinical Assessment Validated</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button
                    onClick={exportToPDF}
                    disabled={isExporting}
                    className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-6 py-6 font-black transition-all uppercase tracking-widest text-[10px]"
                  >
                    {isExporting ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Download className="h-3 w-3 mr-2" />}
                    Download Report
                  </Button>
                </div>
              </div>

              {/* Main Score & Gauge Area */}
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-12 items-center mb-16 relative z-10">
                <div className="text-center xl:text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                    <Info className="h-3 w-3" /> Result Calculation
                  </div>
                  <motion.div 
                    className="text-8xl sm:text-9xl font-black tracking-tighter bg-gradient-to-br from-white via-white to-white/30 bg-clip-text text-transparent leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    {result.bmi}
                  </motion.div>
                  <div className={`text-2xl font-black uppercase tracking-[0.3em] ${result.color} drop-shadow-md`}>
                    {result.category}
                  </div>
                </div>
                
                <div className="flex justify-center xl:justify-end">
                  <BMIGauge bmi={parseFloat(result.bmi)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    </div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest">Risk Profile</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {result.healthRisk}
                  </p>
                </div>

                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                      <Target className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest">Ideal Target</h4>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white tracking-tighter">
                      {result.idealWeightRange.min}-{result.idealWeightRange.max}
                    </span>
                    <span className="text-xs font-black text-slate-500 uppercase">{result.idealWeightRange.unit}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-2 tracking-wider">Recommended Range</p>
                </div>
              </div>

              <div className="mt-auto p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/[0.03] to-cyan-500/[0.03] border border-emerald-500/10 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">Actionable Protocol</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.recommendations.map((rec, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] flex-shrink-0" />
                      <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wide leading-tight group-hover:text-slate-200 transition-colors">{rec}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BMICalculator;