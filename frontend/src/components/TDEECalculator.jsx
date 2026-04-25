import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Info, TrendingUp, Target, Zap, RotateCcw, CheckCircle, AlertCircle, Download, FileText, Loader2, Gauge } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const TDEECalculator = () => {
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
    // Advanced mode fields
    bodyFat: "",
    workoutIntensity: "",
    workoutDuration: "",
    workoutFrequency: "",
    jobActivity: "",
    sportsActivity: ""
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
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
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.9, y: 30 }
  };

  const basicActivityLevels = [
    { value: "1.2", label: "Sedentary", description: "Minimal activity, desk bound" },
    { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    { value: "1.55", label: "Moderately Active", description: "Exercise 3-5 days/week" },
    { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
    { value: "1.9", label: "Extremely Active", description: "Pro athlete or physical labor" }
  ];

  const detailedActivityLevels = [
    { value: "1.2", label: "Sedentary", description: "Bed rest, no training" },
    { value: "1.3", label: "Very Light", description: "Seated work, minimal walking" },
    { value: "1.375", label: "Lightly Active", description: "Walking, light sports" },
    { value: "1.4", label: "Light-Moderate", description: "Consistent movement" },
    { value: "1.55", label: "Moderate", description: "Active lifestyle" },
    { value: "1.6", label: "Moderate-High", description: "High frequency training" },
    { value: "1.725", label: "Very High", description: "Intense daily training" },
    { value: "1.8", label: "Extreme", description: "Competitive level" },
    { value: "1.9", label: "Physiological Peak", description: "Pro performance" }
  ];

  const workoutIntensities = [
    { value: "low", label: "Low Intensity", multiplier: 1.0, description: "Yoga, light walking" },
    { value: "moderate", label: "Moderate Intensity", multiplier: 1.2, description: "Cycling, jogging" },
    { value: "high", label: "High Intensity", multiplier: 1.4, description: "HIIT, heavy lifting" },
    { value: "extreme", label: "Extreme Intensity", multiplier: 1.6, description: "Elite training" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMR = (weight, height, age, gender, method = "mifflin") => {
    const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
    const heightInCm = formData.heightUnit === "ft" ? 
      (parseInt(formData.feet) * 30.48) + (parseInt(formData.inches) * 2.54) : height;

    switch (method) {
      case "mifflin":
        return gender === "male" 
          ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5
          : (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
      case "harris":
        return gender === "male"
          ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
          : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
      case "katch":
        if (!formData.bodyFat) return null;
        const leanMass = weightInKg * (1 - formData.bodyFat / 100);
        return 370 + (21.6 * leanMass);
      default:
        return null;
    }
  };

  const calculateAdvancedTDEE = (bmr) => {
    let multiplier = parseFloat(formData.activityLevel) || 1.2;
    
    if (mode === "advanced" && formData.workoutIntensity && formData.workoutFrequency) {
      const intensity = workoutIntensities.find(w => w.value === formData.workoutIntensity);
      const frequency = parseInt(formData.workoutFrequency) || 0;
      
      if (intensity && frequency > 0) {
        const intensityBonus = (intensity.multiplier - 1) * (frequency / 7);
        multiplier += intensityBonus;
      }
    }
    
    return bmr * multiplier;
  };

  const calculateTDEE = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);

      const bmrMifflin = calculateBMR(weight, height, age, formData.gender, "mifflin");
      const bmrHarris = calculateBMR(weight, height, age, formData.gender, "harris");
      const bmrKatch = formData.bodyFat ? calculateBMR(weight, height, age, formData.gender, "katch") : null;

      const tdee = mode === "advanced" ? 
        calculateAdvancedTDEE(bmrMifflin) : 
        bmrMifflin * parseFloat(formData.activityLevel);

      const activityLevels = mode === "advanced" ? detailedActivityLevels : basicActivityLevels;
      const tdeeComparison = activityLevels.map(level => ({
        label: level.label,
        description: level.description,
        tdee: Math.round(bmrMifflin * parseFloat(level.value))
      }));

      const proteinCalories = Math.round(tdee * 0.25);
      const carbCalories = Math.round(tdee * 0.45);
      const fatCalories = Math.round(tdee * 0.30);

      setResult({
        bmr: {
          mifflin: Math.round(bmrMifflin),
          harris: Math.round(bmrHarris),
          katch: bmrKatch ? Math.round(bmrKatch) : null
        },
        tdee: Math.round(tdee),
        tdeeComparison,
        macros: {
          protein: { calories: proteinCalories, grams: Math.round(proteinCalories / 4) },
          carbs: { calories: carbCalories, grams: Math.round(carbCalories / 4) },
          fat: { calories: fatCalories, grams: Math.round(fatCalories / 9) }
        },
        selectedActivity: activityLevels.find(l => l.value === formData.activityLevel)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const validateForm = () => {
    const requiredFields = ["weight", "age", "gender", "activityLevel"];
    const heightValid = formData.heightUnit === "ft" ? 
      (formData.feet && formData.inches) : formData.height;
    
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
      bodyFat: "",
      workoutIntensity: "",
      workoutDuration: "",
      workoutFrequency: "",
      jobActivity: "",
      sportsActivity: ""
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
              initial={{ scale: 0.8, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
              className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <Activity className="h-10 w-10 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-200 to-emerald-400 bg-clip-text text-transparent uppercase tracking-tight">
              TDEE Strategist
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            High-fidelity modeling of your total daily energy throughput and metabolic flux.
          </p>
          
          <div className="flex justify-center mt-8">
            <Tabs value={mode} onValueChange={setMode} className="w-full max-w-sm">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 p-1 rounded-xl">
                <TabsTrigger value="basic" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-emerald-400 transition-all font-bold">Standard Analysis</TabsTrigger>
                <TabsTrigger value="advanced" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-cyan-400 transition-all font-bold">High Fidelity</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Target className="h-3 w-3" />
              Biometric Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:p-6 lg:p-8">
              <motion.div variants={itemVariants} className="space-y-3">
                <Label className="text-slate-400 font-black uppercase tracking-[0.15em] text-[10px]">Mass Configuration</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-emerald-500/50"
                  />
                  <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange("weightUnit", value)}>
                    <SelectTrigger className="glass-input w-24 border-white/10 py-5 sm:py-7 text-slate-300 font-bold">
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
                <Label className="text-slate-400 font-black uppercase tracking-[0.15em] text-[10px]">Dimensional Height</Label>
                <div className="flex gap-2">
                  {formData.heightUnit === "cm" ? (
                    <Input
                      type="number"
                      placeholder="Height"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-emerald-500/50"
                    />
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="ft"
                        value={formData.feet}
                        onChange={(e) => handleInputChange("feet", e.target.value)}
                        className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-emerald-500/50"
                      />
                      <Input
                        type="number"
                        placeholder="in"
                        value={formData.inches}
                        onChange={(e) => handleInputChange("inches", e.target.value)}
                        className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-emerald-500/50"
                      />
                    </div>
                  )}
                  <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange("heightUnit", value)}>
                    <SelectTrigger className="glass-input w-24 border-white/10 py-5 sm:py-7 text-slate-300 font-bold">
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
                <Label className="text-slate-400 font-black uppercase tracking-[0.15em] text-[10px]">Temporal Age</Label>
                <Input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="glass-input text-xl py-5 sm:py-7 focus:ring-emerald-500/50"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <Label className="text-slate-400 font-black uppercase tracking-[0.15em] text-[10px]">Biological Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="glass-input text-xl border-white/10 py-5 sm:py-7 text-slate-200 font-bold">
                    <SelectValue placeholder="Identify" />
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
            <Label className="text-slate-400 font-black uppercase tracking-[0.15em] text-[10px]">Activity Coefficient</Label>
            <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
              <SelectTrigger className="glass-input border-white/10 py-10 text-slate-100">
                <SelectValue placeholder="Current Flux Level?" />
              </SelectTrigger>
              <SelectContent className="glass-panel border-white/10">
                {(mode === "advanced" ? detailedActivityLevels : basicActivityLevels).map((level) => (
                  <SelectItem key={level.value} value={level.value} className="py-5 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-base">{level.label} <span className="text-emerald-400 ml-2 opacity-60">[{level.value}x]</span></span>
                      <span className="text-xs text-slate-500 font-medium mt-0.5">{level.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {mode === "advanced" && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-8 pt-8 mt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Bio-Mechanical Fidelity</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:p-6 lg:p-8">
                  <div className="space-y-3">
                    <Label className="text-slate-500 font-black uppercase tracking-wider text-[10px]">Adipose Ratio (%)</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 15"
                      value={formData.bodyFat}
                      onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                      className="glass-input border-cyan-500/20 py-5 sm:py-7"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-500 font-black uppercase tracking-wider text-[10px]">Training Intensity</Label>
                    <Select value={formData.workoutIntensity} onValueChange={(value) => handleInputChange("workoutIntensity", value)}>
                      <SelectTrigger className="glass-input border-cyan-500/20 py-5 sm:py-7 text-slate-200">
                        <SelectValue placeholder="Energy Outlay" />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10">
                        {workoutIntensities.map((intensity) => (
                          <SelectItem key={intensity.value} value={intensity.value} className="py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-white">{intensity.label}</span>
                              <span className="text-[10px] text-slate-500">{intensity.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-500 font-black uppercase tracking-wider text-[10px]">Frequencies (Days/Week)</Label>
                    <Input
                      type="number"
                      placeholder="Frequency"
                      value={formData.workoutFrequency}
                      onChange={(e) => handleInputChange("workoutFrequency", e.target.value)}
                      className="glass-input border-cyan-500/20 py-5 sm:py-7"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-500 font-black uppercase tracking-wider text-[10px]">Duration (Mins/Session)</Label>
                    <Input
                      type="number"
                      placeholder="Minutes"
                      value={formData.workoutDuration}
                      onChange={(e) => handleInputChange("workoutDuration", e.target.value)}
                      className="glass-input border-cyan-500/20 py-5 sm:py-7"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateTDEE}
              className={`flex-1 btn-category-nutrition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!validateForm() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Synchronizing Flux...
                </>
              ) : (
                <>
                  <Zap className="mr-3 h-7 w-7" />
                  Compute TDEE
                </>
              )}
            </Button>
            
            <Button
              onClick={resetForm}
              variant="outline"
              className="w-full sm:w-auto border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white flex items-center gap-3 px-10 py-5 sm:py-8 rounded-2xl shadow-lg backdrop-blur-md transition-all duration-300 font-bold"
            >
              <RotateCcw className="h-6 w-6" />
              Reset
            </Button>
          </motion.div>

          {!validateForm() && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert className="bg-emerald-500/5 border-emerald-500/10 rounded-2xl p-5">
                <Info className="h-5 w-5 text-emerald-400" />
                <AlertTitle className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Incomplete Telemetry</AlertTitle>
                <AlertDescription className="text-slate-400 text-xs font-semibold">
                  Required biological parameters are missing. Input weight, age, height, and gender for energy expenditure mapping.
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
            <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-emerald-400 opacity-[0.03] select-none pointer-events-none uppercase">
              STRATEGIST
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <Activity className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight uppercase">Energy Resolution</h3>
                  <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Verified biological throughput</p>
                </div>
              </div>
              <Button
                className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-10 py-5 sm:py-8 font-black transition-all uppercase tracking-widest text-sm"
              >
                <Download className="h-5 w-5 mr-3" />
                Export Expenditure Dossier
              </Button>
            </div>

            <div className="text-center mb-24 relative z-10">
              <motion.div
                className="text-[11rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none"
                initial={{ filter: "blur(20px)", y: 20 }}
                animate={{ filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1 }}
              >
                {result.tdee}<span className="text-4xl text-emerald-500/60 font-black tracking-widest ml-4 uppercase">kcal</span>
              </motion.div>
              <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] text-emerald-400 bg-white/5 border border-emerald-400/20 mt-10 shadow-2xl">
                TDEE Resolved
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest mt-6 opacity-60">Threshold: {result.selectedActivity?.label}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-8 lg:p-10 mb-16">
              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <Gauge className="h-7 w-7 text-cyan-400" />
                  <h4 className="text-xl font-black text-white uppercase tracking-widest">Formula Matrix</h4>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-6 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-400/20">
                    <span className="text-emerald-400 font-black text-sm uppercase tracking-widest">Mifflin-St Jeor</span>
                    <span className="text-white font-black text-2xl">{result.bmr.mifflin}</span>
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-[2.5rem] bg-white/5 border border-white/5 opacity-50">
                    <span className="text-slate-400 font-bold text-sm uppercase">Harris-Benedict</span>
                    <span className="text-white font-black text-xl">{result.bmr.harris}</span>
                  </div>
                  {result.bmr.katch && (
                    <div className="flex items-center justify-between p-6 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20">
                      <span className="text-blue-400 font-black text-sm uppercase tracking-widest">Katch-McArdle</span>
                      <span className="text-white font-black text-2xl">{result.bmr.katch}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <TrendingUp className="h-7 w-7 text-amber-400" />
                  <h4 className="text-xl font-black text-white uppercase tracking-widest">Activity Gradient</h4>
                </div>
                <div className="space-y-4 max-h-[350px] pr-4 custom-scrollbar overflow-y-auto">
                  {result.tdeeComparison.map((level, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-5 rounded-[2rem] border transition-all ${level.label === result.selectedActivity?.label ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/5'}`}
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-white font-black text-sm uppercase tracking-wider">{level.label}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase mt-1">{level.description}</span>
                      </div>
                      <span className={`text-xl font-black ${level.label === result.selectedActivity?.label ? 'text-emerald-400' : 'text-slate-300'}`}>{level.tdee}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-16 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10">
                <Target className="h-8 w-8 text-emerald-400" />
                <h4 className="text-3xl font-black text-white tracking-widest uppercase">Target Macros</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:p-6 lg:p-8">
                {[
                  { label: "Protein", data: result.macros.protein, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { label: "Carbs", data: result.macros.carbs, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                  { label: "Fat", data: result.macros.fat, color: "text-amber-400", bg: "bg-amber-500/10" }
                ].map((macro, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] ${macro.bg} border border-white/5 text-center group`}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">{macro.label} Target</div>
                    <div className={`text-3xl sm:text-4xl md:text-5xl font-black ${macro.color} mb-2 tracking-tighter`}>{macro.data.grams}g</div>
                    <div className="text-white font-bold opacity-40 uppercase text-[10px] tracking-widest">{macro.data.calories} kcal</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/5">
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Mass</div>
                <div className="text-sm font-black text-white">{formData.weight} {formData.weightUnit}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Stature</div>
                <div className="text-sm font-black text-white uppercase">{formData.height || `${formData.feet}'${formData.inches}"`}</div>
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

export default TDEECalculator;