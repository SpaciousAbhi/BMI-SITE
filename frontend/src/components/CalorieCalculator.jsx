import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Info, TrendingUp, Target, RotateCcw, CheckCircle, AlertCircle, Zap, Download, Activity, FileText, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useToast } from "@/hooks/use-toast";

const CalorieCalculator = () => {
  const { toast } = useToast();
  const [mode, setMode] = useState("basic");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    feet: "",
    inches: "",
    age: "",
    gender: "",
    activityLevel: "",
    goal: "",
    // Advanced mode fields
    bodyFat: "",
    fitnessGoal: "",
    dietaryPreference: "",
    metabolicRate: ""
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  };

  const activityLevels = [
    { value: "1.2", label: "Sedentary", description: "Minimal physical activity" },
    { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    { value: "1.55", label: "Moderately Active", description: "Regular exercise 3-5 days/week" },
    { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
    { value: "1.9", label: "Extremely Active", description: "Physical job or pro athlete" }
  ];

  const goals = [
    { value: "maintain", label: "Maintain Weight", modifier: 0, description: "Keep stable" },
    { value: "lose0.5", label: "Lose 0.5 kg/week", modifier: -250, description: "Sustainable loss" },
    { value: "lose1", label: "Lose 1 kg/week", modifier: -500, description: "Moderate pace" },
    { value: "gain0.5", label: "Gain 0.5 kg/week", modifier: 250, description: "Lean muscle" },
    { value: "gain1", label: "Gain 1 kg/week", modifier: 500, description: "Aggressive build" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMR = (weight, height, age, gender, formula = "mifflin") => {
    const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
    const heightInCm = formData.heightUnit === "ft" ? 
      ((parseInt(formData.feet) || 0) * 30.48) + ((parseInt(formData.inches) || 0) * 2.54) : height;

    switch (formula) {
      case "mifflin": // Most accurate for general population
        return gender === "male" 
          ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5
          : (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
      case "harris":
        return gender === "male"
          ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
          : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
      case "katch": // Requires body fat percentage
        if (!formData.bodyFat) return null;
        const leanMass = weightInKg * (1 - formData.bodyFat / 100);
        return 370 + (21.6 * leanMass);
      default:
        return null;
    }
  };

  const calculateCalories = () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate your calories.",
        variant: "destructive",
      });
      return;
    }
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      const activityMultiplier = parseFloat(formData.activityLevel);
      const goalModifier = goals.find(g => g.value === formData.goal)?.modifier || 0;

      const bmrMifflin = calculateBMR(weight, height, age, formData.gender, "mifflin");
      const bmrHarris = calculateBMR(weight, height, age, formData.gender, "harris");
      const bmrKatch = formData.bodyFat ? calculateBMR(weight, height, age, formData.gender, "katch") : null;

      const primaryBMR = bmrMifflin;
      const tdee = primaryBMR * activityMultiplier;
      const targetCalories = tdee + goalModifier;

      const selectedGoal = goals.find(g => g.value === formData.goal);

      setResult({
        bmr: {
          mifflin: Math.round(bmrMifflin),
          harris: Math.round(bmrHarris),
          katch: bmrKatch ? Math.round(bmrKatch) : null
        },
        tdee: Math.round(tdee),
        targetCalories: Math.round(targetCalories),
        goal: selectedGoal,
        breakdown: {
          maintenance: Math.round(tdee),
          deficit: goalModifier < 0 ? Math.abs(goalModifier) : 0,
          surplus: goalModifier > 0 ? goalModifier : 0
        }
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const validateForm = () => {
    const requiredFields = ["weight", "age", "gender", "activityLevel", "goal"];
    const heightValid = formData.heightUnit === "ft" ? 
      formData.feet : formData.height;
    
    return requiredFields.every(field => formData[field]) && heightValid;
  };

  const resetForm = () => {
    setFormData({
      weight: "",
      weightUnit: "kg",
      height: "",
      heightUnit: "cm",
      feet: "",
      inches: "",
      age: "",
      gender: "",
      activityLevel: "",
      goal: "",
      bodyFat: "",
      fitnessGoal: "",
      dietaryPreference: "",
      metabolicRate: ""
    });
    setResult(null);
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto p-4 sm:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="glass-panel glow-border border-white/10 overflow-hidden">
        <CardHeader className="text-center pb-8 border-b border-white/5 bg-white/[0.02]">
          <CardTitle className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <motion.div
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20"
            >
              <Zap className="h-10 w-10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-amber-400 via-orange-200 to-amber-400 bg-clip-text text-transparent uppercase tracking-tight">
              Calorie Architect
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Strategic modeling of your metabolic requirements and thermodynamic energy balance.
          </p>
          
          <div className="flex justify-center mt-8">
            <Tabs value={mode} onValueChange={setMode} className="w-full max-w-xs">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 p-1 rounded-xl">
                <TabsTrigger value="basic" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-lime-400 transition-all font-bold">Protocol</TabsTrigger>
                <TabsTrigger value="advanced" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-emerald-400 transition-all font-bold">Deep Scan</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Biometric Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:p-6 lg:p-8">
              <motion.div variants={itemVariants} className="space-y-3">
                <Label className="text-slate-300 font-bold uppercase tracking-wider text-xs">Body Mass</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    className="glass-input text-xl py-6 flex-1 focus:ring-lime-500/50"
                  />
                  <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange("weightUnit", value)}>
                    <SelectTrigger className="glass-input w-24 border-white/10 py-6 text-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <Label className="text-slate-300 font-bold uppercase tracking-wider text-xs">Vertical Axis</Label>
                <div className="flex gap-2">
                  {formData.heightUnit === "cm" ? (
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      className="glass-input text-xl py-6 flex-1 focus:ring-lime-500/50"
                    />
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="ft"
                        value={formData.feet}
                        onChange={(e) => handleInputChange("feet", e.target.value)}
                        className="glass-input text-xl py-6 flex-1 focus:ring-lime-500/50"
                      />
                      <Input
                        type="number"
                        placeholder="in"
                        value={formData.inches}
                        onChange={(e) => handleInputChange("inches", e.target.value)}
                        className="glass-input text-xl py-6 flex-1 focus:ring-lime-500/50"
                      />
                    </div>
                  )}
                  <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange("heightUnit", value)}>
                    <SelectTrigger className="glass-input w-24 border-white/10 py-6 text-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="ft">ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <Label className="text-slate-300 font-bold uppercase tracking-wider text-xs">Biological Chronology</Label>
                <Input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="glass-input text-xl py-6 focus:ring-lime-500/50"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <Label className="text-slate-300 font-bold uppercase tracking-wider text-xs">Biological Phenotype</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="glass-input text-xl border-white/10 py-6 text-slate-300">
                    <SelectValue placeholder="Select Identity" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/10">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Zap className="h-3 w-3" />
              Activity Matrix
            </h3>
            <Label className="text-slate-300 font-bold uppercase tracking-wider text-xs">Anabolic Velocity (Activity)</Label>
            <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
              <SelectTrigger className="glass-input border-white/10 py-10 text-slate-200">
                <SelectValue placeholder="Operational Level?" />
              </SelectTrigger>
              <SelectContent className="glass-panel border-white/10">
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value} className="py-5 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-black text-white text-base">{level.label} <span className="text-amber-400 ml-2 opacity-60">[{level.value}x]</span></span>
                      <span className="text-xs text-slate-500 font-medium mt-0.5">{level.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Target className="h-3 w-3" />
              Strategic Objective
            </h3>
            <Label className="text-slate-300 font-bold uppercase tracking-wider text-xs">Primary Outcome (Goal)</Label>
            <Select value={formData.goal} onValueChange={(value) => handleInputChange("goal", value)}>
              <SelectTrigger className="glass-input border-white/10 py-10 text-slate-200">
                <SelectValue placeholder="Define Outcome" />
              </SelectTrigger>
              <SelectContent className="glass-panel border-white/10">
                {goals.map((goal) => (
                  <SelectItem key={goal.value} value={goal.value} className="py-4 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-black text-white">{goal.label}</span>
                      <span className="text-xs text-slate-500 font-medium">{goal.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <AnimatePresence>
            {mode === "advanced" && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-6 pt-6 mt-2 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Precision Calibration</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Body Fat Composition (%)</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 15"
                        value={formData.bodyFat}
                        onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                        className="glass-input border-emerald-500/20 py-6"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Training Specialization</Label>
                      <Select value={formData.fitnessGoal} onValueChange={(value) => handleInputChange("fitnessGoal", value)}>
                        <SelectTrigger className="glass-input border-emerald-500/20 py-6 text-slate-300">
                          <SelectValue placeholder="Focus?" />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-white/10">
                          <SelectItem value="general">Physiological Maintenance</SelectItem>
                          <SelectItem value="muscle">Hypertrophy (Muscle)</SelectItem>
                          <SelectItem value="endurance">Mitochondrial Density</SelectItem>
                          <SelectItem value="strength">Neuromuscular Force</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateCalories}
              className={`flex-1 btn-category-nutrition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!validateForm() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Calibrating Metabolism...
                </>
              ) : (
                <>
                  <Zap className="mr-3 h-7 w-7" />
                  Execute Analysis
                </>
              )}
            </Button>
            
            <Button
              onClick={resetForm}
              variant="outline"
              className="w-full sm:w-auto border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white flex items-center gap-2 px-8 py-5 sm:py-7 rounded-2xl shadow-lg backdrop-blur-md transition-all duration-300"
            >
              <RotateCcw className="h-5 w-5" />
              Flush System
            </Button>
          </motion.div>

          {!validateForm() && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert className="bg-amber-500/5 border-amber-500/10 rounded-2xl p-4">
                <Info className="h-4 w-4 text-amber-400" />
                <AlertTitle className="text-amber-400 text-xs font-black uppercase tracking-widest mb-1">Incomplete Telemetry</AlertTitle>
                <AlertDescription className="text-slate-400 text-xs font-medium italic">
                  Critical biometric fields are missing. Please provide all data points to proceed.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
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
            <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-amber-500 opacity-[0.03] select-none pointer-events-none uppercase">
              ARCHITECT
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <Zap className="h-8 w-8 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight uppercase">Caloric Resolution</h3>
                  <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Thermodynamic Target Density</p>
                </div>
              </div>
              <Button
                className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-10 py-5 sm:py-8 font-black transition-all uppercase tracking-widest text-sm"
              >
                <Download className="h-5 w-5 mr-3" />
                Export Protocol Dossier
              </Button>
            </div>

            <div className="text-center mb-24 relative z-10">
              <motion.div
                className="text-[11rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none"
                initial={{ filter: "blur(20px)", y: 20 }}
                animate={{ filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1 }}
              >
                {result.targetCalories}<span className="text-4xl text-amber-500/60 font-black tracking-widest ml-4 uppercase">kcal</span>
              </motion.div>
              <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] text-amber-400 bg-white/5 border border-amber-400/20 mt-10 shadow-2xl">
                Target Objective Achieved
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest mt-6 opacity-60">Strategy: {result.goal.label}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-8 lg:p-10 mb-16">
              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <Activity className="h-7 w-7 text-blue-400" />
                  <h4 className="text-xl font-black text-white uppercase tracking-widest">Metabolic Profile</h4>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-6 rounded-[2.5rem] bg-white/5 border border-white/5">
                    <span className="text-slate-400 font-black text-sm uppercase">Basal Met. Rate</span>
                    <span className="text-white font-black text-2xl">{result.bmr.mifflin} <span className="text-xs opacity-40 uppercase ml-1">kcal</span></span>
                  </div>
                  <div className="flex justify-between items-center p-6 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-400/20">
                    <span className="text-emerald-400 font-black text-sm uppercase">Maintenance</span>
                    <span className="text-white font-black text-2xl">{result.tdee} <span className="text-xs opacity-40 uppercase ml-1">kcal</span></span>
                  </div>
                  <div className="flex justify-between items-center p-6 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20">
                    <span className="text-blue-400 font-black text-sm uppercase tracking-widest">Active Flux</span>
                    <span className="text-white font-black text-2xl">+{result.tdee - result.bmr.mifflin} <span className="text-xs opacity-40 uppercase ml-1">kcal</span></span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <TrendingUp className="h-7 w-7 text-amber-400" />
                  <h4 className="text-xl font-black text-white uppercase tracking-widest">Formula Matrix</h4>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-6 rounded-[2.5rem] bg-amber-500/10 border border-amber-400/30">
                    <span className="text-amber-400 font-black text-sm uppercase tracking-widest">Mifflin-St Jeor</span>
                    <span className="text-white font-black text-2xl">{result.bmr.mifflin}</span>
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-[2.5rem] bg-white/5 border border-white/5 opacity-50">
                    <span className="text-slate-400 font-bold text-sm uppercase">Harris-Benedict</span>
                    <span className="text-white font-black text-xl">{result.bmr.harris}</span>
                  </div>
                  {result.bmr.katch && (
                    <div className="flex items-center justify-between p-6 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400 font-black text-sm uppercase tracking-widest">Katch-McArdle</span>
                      <span className="text-white font-black text-2xl">{result.bmr.katch}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-16 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10">
                <Target className="h-8 w-8 text-amber-400" />
                <h4 className="text-3xl font-black text-white tracking-widest uppercase">Strategic Implementation</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:p-6 lg:p-8 relative z-10">
                {[
                  "Maintain high satiety protein intake (1.6-2.2g/kg)",
                  "Prioritize micronutrient-dense physiological refueling",
                  "Synchronize caloric intake with circadian rhythms",
                  "Monitor systemic weight fluctuations over 7-day average"
                ].map((rec, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="h-4 w-4 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:scale-125 transition-transform" />
                    <span className="text-slate-300 font-bold text-base leading-relaxed">{rec}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5">
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Mass</div>
                <div className="text-sm font-black text-white">{formData.weight} {formData.weightUnit}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Age</div>
                <div className="text-sm font-black text-white">{formData.age}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Activity</div>
                <div className="text-sm font-black text-white uppercase">{formData.activityLevel}x</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CalorieCalculator;