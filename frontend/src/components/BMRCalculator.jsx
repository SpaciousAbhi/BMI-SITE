import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Info, TrendingUp, Target, Flame, RotateCcw, CheckCircle, AlertCircle, Zap, Download, Activity, FileText, Loader2, Gauge, Microscope } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const BMRCalculator = () => {
  const [mode, setMode] = useState("basic");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedFormula, setSelectedFormula] = useState("mifflin");
  const [formData, setFormData] = useState({
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    feet: "",
    inches: "",
    age: "",
    gender: "",
    bodyFat: "",
    activityLevel: "",
    fitnessGoal: "",
    medicalConditions: ""
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
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.95, y: 30 }
  };

  const bmrFormulas = [
    { 
      value: "mifflin", 
      label: "Mifflin-St Jeor", 
      recommended: true,
      description: "Modern gold standard for accuracy",
      accuracy: "High Sensitivity"
    },
    { 
      value: "harris", 
      label: "Harris-Benedict", 
      recommended: false,
      description: "Classic physiological benchmark",
      accuracy: "General Metric"
    },
    { 
      value: "katch", 
      label: "Katch-McArdle", 
      recommended: false,
      description: "Optimized for lean mass calibration",
      accuracy: "Ultra Precise"
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMR = (weight, height, age, gender, formula) => {
    const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
    const heightInCm = formData.heightUnit === "ft" ? 
      (parseInt(formData.feet) * 30.48) + (parseInt(formData.inches) * 2.54) : height;

    switch (formula) {
      case "mifflin":
        return gender === "male" 
          ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5
          : (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
      case "harris":
        return gender === "male"
          ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
          : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
      case "katch":
        if (!formData.bodyFat || formData.bodyFat <= 0) return null;
        const leanMass = weightInKg * (1 - formData.bodyFat / 100);
        return 370 + (21.6 * leanMass);
      default:
        return null;
    }
  };

  const calculateAllBMR = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);

      const results = {};
      bmrFormulas.forEach(formula => {
        const bmr = calculateBMR(weight, height, age, formData.gender, formula.value);
        results[formula.value] = bmr ? Math.round(bmr) : null;
      });

      const primaryBMR = results[selectedFormula];

      const activityMultipliers = [
        { label: "Sedentary", multiplier: 1.2, description: "Minimal Flux" },
        { label: "Light", multiplier: 1.375, description: "Base Activity" },
        { label: "Moderate", multiplier: 1.55, description: "Active State" },
        { label: "High", multiplier: 1.725, description: "High Intensity" },
        { label: "Peak", multiplier: 1.9, description: "Athletic Threshold" }
      ];

      const tdeeEstimates = activityMultipliers.map(activity => ({
        ...activity,
        calories: primaryBMR ? Math.round(primaryBMR * activity.multiplier) : null
      }));

      const metabolicBreakdown = primaryBMR ? {
        organs: Math.round(primaryBMR * 0.6),
        muscle: Math.round(primaryBMR * 0.25),
        other: Math.round(primaryBMR * 0.15)
      } : null;

      setResult({
        bmrResults: results,
        primaryBMR,
        selectedFormula: bmrFormulas.find(f => f.value === selectedFormula),
        tdeeEstimates,
        metabolicBreakdown
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const validateForm = () => {
    const requiredFields = ["weight", "age", "gender"];
    const heightValid = formData.heightUnit === "ft" ? 
      (formData.feet && formData.inches) : formData.height;
    
    if (selectedFormula === "katch" && !formData.bodyFat) return false;
    
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
      bodyFat: "",
      activityLevel: "",
      fitnessGoal: "",
      medicalConditions: ""
    });
    setResult(null);
    setSelectedFormula("mifflin");
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
              initial={{ rotate: -15, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20"
            >
              <Microscope className="h-10 w-10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-rose-400 via-orange-200 to-rose-400 bg-clip-text text-transparent uppercase tracking-tight">
              BMR Prophet
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Clinical precision mapping of your biological baseline energy expenditure.
          </p>
          
          <div className="flex justify-center mt-8">
            <Tabs value={mode} onValueChange={setMode} className="w-full max-w-xs">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 p-1 rounded-xl">
                <TabsTrigger value="basic" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-rose-400 transition-all font-bold">Standard</TabsTrigger>
                <TabsTrigger value="advanced" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-orange-400 transition-all font-bold">Scientific</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Zap className="h-3 w-3" />
              Metabolic Protocols
            </h3>
            <Label className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] ml-1">Algorithmic Protocol</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bmrFormulas.map((formula) => (
                <motion.div
                  key={formula.value}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    selectedFormula === formula.value
                      ? "border-rose-500/50 bg-rose-500/10 shadow-[0_0_30px_rgba(244,63,94,0.1)]"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedFormula(formula.value)}
                >
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-black uppercase tracking-wider text-xs ${selectedFormula === formula.value ? 'text-rose-400' : 'text-slate-300'}`}>
                        {formula.label}
                      </h4>
                      {formula.recommended && (
                        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase leading-tight">{formula.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Gauge className={`h-3 w-3 ${selectedFormula === formula.value ? 'text-rose-400' : 'text-slate-600'}`} />
                      <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">{formula.accuracy}</span>
                    </div>
                  </div>
                  {selectedFormula === formula.value && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent"
                    />
                  )}
                </motion.div>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:p-6 lg:p-8 sm:gap-6 sm:p-8 md:p-12 pt-4">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <Target className="h-3 w-3" />
                Biometric Baseline
              </h3>
              <Label className="text-slate-500 font-black uppercase tracking-wider text-[10px]">Biometric Mass</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-rose-500/50"
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
              <Label className="text-slate-500 font-black uppercase tracking-wider text-[10px]">Stature Architecture</Label>
              <div className="flex gap-2">
                {formData.heightUnit === "cm" ? (
                  <Input
                    type="number"
                    placeholder="Height"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-rose-500/50"
                  />
                ) : (
                  <div className="flex gap-2 flex-1">
                    <Input
                      type="number"
                      placeholder="ft"
                      value={formData.feet}
                      onChange={(e) => handleInputChange("feet", e.target.value)}
                      className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-rose-500/50"
                    />
                    <Input
                      type="number"
                      placeholder="in"
                      value={formData.inches}
                      onChange={(e) => handleInputChange("inches", e.target.value)}
                      className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-rose-500/50"
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
              <Label className="text-slate-500 font-black uppercase tracking-wider text-[10px]">Chronological Age</Label>
              <Input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="glass-input text-xl py-5 sm:py-7 focus:ring-rose-500/50"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <Label className="text-slate-500 font-black uppercase tracking-wider text-[10px]">Endocrine Gender</Label>
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

          {(selectedFormula === "katch" || mode === "advanced") && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="space-y-4 pt-4 border-t border-white/5"
            >
              <Label className="text-rose-400 font-black uppercase tracking-[0.2em] text-[10px]">Bio-Composition (%)</Label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Body Fat %"
                  value={formData.bodyFat}
                  onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                  className="glass-input text-xl py-5 sm:py-7 flex-1 border-rose-500/20 focus:ring-rose-500/50"
                />
                <div className="flex items-center text-xs text-slate-500 font-bold uppercase italic max-w-[200px]">
                  * Essential for Katch-McArdle precision
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateAllBMR}
              className={`flex-1 btn-category-nutrition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!validateForm() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Analyzing Metabolic Depth...
                </>
              ) : (
                <>
                  <Zap className="mr-3 h-7 w-7" />
                  Analyze BMR
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
              <Alert className="bg-rose-500/5 border-rose-500/10 rounded-2xl p-5">
                <AlertCircle className="h-5 w-5 text-rose-400" />
                <AlertTitle className="text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Telemetry Interrupted</AlertTitle>
                <AlertDescription className="text-slate-400 text-xs font-semibold">
                  Required biometric fields are incomplete. {selectedFormula === "katch" ? "Adipose ratio (%) is mandatory for this algorithm." : "Weight, age, and height parameters required."}
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
            <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-rose-400 opacity-[0.03] select-none pointer-events-none uppercase">
              PROPHET
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                  <Microscope className="h-8 w-8 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight uppercase">Metabolic Core</h3>
                  <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Verified biological Baseline</p>
                </div>
              </div>
              <Button
                className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-10 py-5 sm:py-8 font-black transition-all uppercase tracking-widest text-sm"
              >
                <Download className="h-5 w-5 mr-3" />
                Export Genetic Blueprint
              </Button>
            </div>

            <div className="text-center mb-24 relative z-10">
              <motion.div
                className="text-[11rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none"
                initial={{ filter: "blur(20px)", y: 20 }}
                animate={{ filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1 }}
              >
                {result.primaryBMR}<span className="text-4xl text-rose-500/60 font-black tracking-widest ml-4 uppercase">kcal</span>
              </motion.div>
              <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] text-rose-400 bg-white/5 border border-rose-400/20 mt-10 shadow-2xl">
                BMR Resolved
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest mt-6 opacity-60">Protocol: {result.selectedFormula.label}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-8 lg:p-10 mb-16">
              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <Microscope className="h-7 w-7 text-rose-400" />
                  <h4 className="text-xl font-black text-white uppercase tracking-widest">Formula Matrix</h4>
                </div>
                <div className="space-y-5">
                  {bmrFormulas.map((formula) => (
                    <div 
                      key={formula.value}
                      className={`flex justify-between items-center p-6 rounded-[2.5rem] border transition-all ${formula.value === selectedFormula ? 'bg-rose-500/10 border-rose-500/20' : 'bg-white/5 border-white/5'}`}
                    >
                      <div className="flex flex-col">
                        <span className="text-white font-black text-sm uppercase tracking-wider">{formula.label}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase mt-1">{formula.accuracy}</span>
                      </div>
                      <span className={`text-2xl font-black ${formula.value === selectedFormula ? 'text-rose-400' : 'text-slate-400'}`}>
                        {result.bmrResults[formula.value] || "N/A"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <Flame className="h-7 w-7 text-orange-400" />
                  <h4 className="text-xl font-black text-white uppercase tracking-widest">Biological Outlay</h4>
                </div>
                <div className="space-y-8">
                  {[
                    { label: "Organ Function", value: result.metabolicBreakdown.organs, color: "text-blue-400", sub: "CNS, Liver, Renal" },
                    { label: "Muscle Tissue", value: result.metabolicBreakdown.muscle, color: "text-emerald-400", sub: "Skeletal Maintenance" },
                    { label: "Systemic Other", value: result.metabolicBreakdown.other, color: "text-rose-400", sub: "Bones, Adipose, Surface" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">{item.label}</span>
                        <span className={item.color}>{item.value} kcal</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.value / result.primaryBMR) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${item.color.replace('text', 'from')}-400 to-transparent`}
                        />
                      </div>
                      <p className="text-[9px] text-slate-600 font-bold uppercase">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-16 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10">
                <Activity className="h-8 w-8 text-rose-400" />
                <h4 className="text-2xl font-black text-white uppercase tracking-widest">Expenditure Matrix (TDEE)</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {result.tdeeEstimates.map((estimate, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-5 sm:p-6 lg:p-8 rounded-[2.5rem] bg-white/5 border border-white/5 text-center transition-all hover:bg-rose-500/5 group"
                  >
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 group-hover:text-rose-400 transition-colors">{estimate.label}</div>
                    <div className="text-3xl font-black text-white mb-2 tracking-tighter">{estimate.calories}</div>
                    <div className="text-[8px] font-black text-slate-600 uppercase group-hover:text-slate-400 transition-colors">{estimate.description}</div>
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
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Protocol</div>
                <div className="text-sm font-black text-white uppercase">{selectedFormula}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BMRCalculator;