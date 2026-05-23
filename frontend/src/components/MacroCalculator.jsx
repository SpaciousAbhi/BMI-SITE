import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Info, TrendingUp, PieChart, Utensils, RotateCcw, Zap, CheckCircle, AlertCircle, Download, Activity, FileText, Loader2, Wheat, Beef, Droplets, Apple } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";

const MacroCalculator = () => {
  const [mode, setMode] = useState("basic");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [macroPreset, setMacroPreset] = useState("balanced");
  const [customMacros, setCustomMacros] = useState({ protein: 25, carbs: 45, fat: 30 });
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
    bodyFat: "",
    fitnessGoal: "",
    dietaryPreference: "",
    workoutType: "",
    bodyType: ""
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.95, filter: "blur(10px)" }
  };

  const macroPresets = [
    { value: "balanced", label: "Equilibrium", protein: 25, carbs: 45, fat: 30, description: "Homeostasis focused" },
    { value: "highProtein", label: "Anabolic", protein: 35, carbs: 35, fat: 30, description: "Muscle synthesis" },
    { value: "lowCarb", label: "Ketogenic Lean", protein: 30, carbs: 20, fat: 50, description: "Lipid oxidation" },
    { value: "highCarb", label: "Glyco-Load", protein: 20, carbs: 60, fat: 20, description: "Performance fuel" },
    { value: "keto", label: "Strict Keto", protein: 25, carbs: 5, fat: 70, description: "Deep ketosis" },
    { value: "mediterranean", label: "Longevity", protein: 20, carbs: 45, fat: 35, description: "Heart health" }
  ];

  const activityLevels = [
    { value: "1.2", label: "Sedentary", description: "Minimal Flux" },
    { value: "1.375", label: "Light", description: "Base Activity" },
    { value: "1.55", label: "Moderate", description: "Active State" },
    { value: "1.725", label: "High", description: "Intense Outlay" },
    { value: "1.9", label: "Extreme", description: "Pro Athlete" }
  ];

  const goals = [
    { value: "maintain", label: "Maintenance", modifier: 0, description: "Stable weight" },
    { value: "lose0.5", label: "Cut (0.5kg/wk)", modifier: -250, description: "Lean definition" },
    { value: "lose1", label: "Cut (1kg/wk)", modifier: -500, description: "Rapid oxidation" },
    { value: "gain0.5", label: "Bulk (0.5kg/wk)", modifier: 250, description: "Hypertrophy focus" },
    { value: "gain1", label: "Bulk (1kg/wk)", modifier: 500, description: "Aggressive mass" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMacroPresetChange = (preset) => {
    setMacroPreset(preset);
    if (preset !== "custom") {
      const selectedPreset = macroPresets.find(p => p.value === preset);
      setCustomMacros({
        protein: selectedPreset.protein,
        carbs: selectedPreset.carbs,
        fat: selectedPreset.fat
      });
    }
  };

  const handleCustomMacroChange = (macro, value) => {
    setCustomMacros(prev => {
      const newMacros = { ...prev, [macro]: value[0] };
      const remaining = 100 - value[0];
      const otherMacros = Object.keys(newMacros).filter(key => key !== macro);
      const otherTotal = otherMacros.reduce((sum, key) => sum + prev[key], 0);
      
      otherMacros.forEach(key => {
        newMacros[key] = Math.round((prev[key] / (otherTotal || 1)) * remaining);
      });
      return newMacros;
    });
    setMacroPreset("custom");
  };

  const calculateBMR = (weight, height, age, gender) => {
    const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
    const heightInCm = formData.heightUnit === "ft" ? 
      ((parseInt(formData.feet) || 0) * 30.48) + ((parseInt(formData.inches) || 0) * 2.54) : height;

    return gender === "male" 
      ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5
      : (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
  };

  const calculateMacros = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      const activityMultiplier = parseFloat(formData.activityLevel);
      const goalModifier = goals.find(g => g.value === formData.goal)?.modifier || 0;

      const bmr = calculateBMR(weight, height, age, formData.gender);
      const tdee = bmr * activityMultiplier;
      const targetCalories = tdee + goalModifier;

      const macroRatios = macroPreset === "custom" ? customMacros : 
        macroPresets.find(p => p.value === macroPreset);

      const proteinCalories = Math.round(targetCalories * (macroRatios.protein / 100));
      const carbCalories = Math.round(targetCalories * (macroRatios.carbs / 100));
      const fatCalories = Math.round(targetCalories * (macroRatios.fat / 100));

      const proteinGrams = Math.round(proteinCalories / 4);
      const carbGrams = Math.round(carbCalories / 4);
      const fatGrams = Math.round(fatCalories / 9);

      const weightInKg = formData.weightUnit === "lbs" ? weight * 0.453592 : weight;
      const proteinPerKg = (proteinGrams / weightInKg).toFixed(1);

      const mealDistribution = {
        breakfast: { protein: Math.round(proteinGrams * 0.25), carbs: Math.round(carbGrams * 0.25), fat: Math.round(fatGrams * 0.25), calories: Math.round(targetCalories * 0.25) },
        lunch: { protein: Math.round(proteinGrams * 0.35), carbs: Math.round(carbGrams * 0.35), fat: Math.round(fatGrams * 0.30), calories: Math.round(targetCalories * 0.35) },
        dinner: { protein: Math.round(proteinGrams * 0.30), carbs: Math.round(carbGrams * 0.30), fat: Math.round(fatGrams * 0.30), calories: Math.round(targetCalories * 0.30) },
        snacks: { protein: Math.round(proteinGrams * 0.10), carbs: Math.round(carbGrams * 0.10), fat: Math.round(fatGrams * 0.15), calories: Math.round(targetCalories * 0.10) }
      };

      setResult({
        targetCalories: Math.round(targetCalories),
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        macros: {
          protein: { grams: proteinGrams, calories: proteinCalories, percentage: macroRatios.protein },
          carbs: { grams: carbGrams, calories: carbCalories, percentage: macroRatios.carbs },
          fat: { grams: fatGrams, calories: fatCalories, percentage: macroRatios.fat }
        },
        proteinPerKg,
        selectedPreset: macroPresets.find(p => p.value === macroPreset) || { label: "Sovereign (Custom)", description: "User defined allocation" },
        mealDistribution
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const validateForm = () => {
    const requiredFields = ["weight", "age", "gender", "activityLevel", "goal"];
    const heightValid = formData.heightUnit === "ft" ? formData.feet : formData.height;
    return requiredFields.every(field => formData[field]) && heightValid;
  };

  const resetForm = () => {
    setFormData({
      weight: "", weightUnit: "kg", height: "", heightUnit: "cm", feet: "", inches: "", age: "", gender: "", activityLevel: "", goal: "",
      bodyFat: "", fitnessGoal: "", dietaryPreference: "", workoutType: "", bodyType: ""
    });
    setResult(null);
    setMacroPreset("balanced");
    setCustomMacros({ protein: 25, carbs: 45, fat: 30 });
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto p-4 sm:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="glass-panel glow-border border-white/10">
        <CardHeader className="text-center pb-8 border-b border-white/5 bg-white/[0.02]">
          <CardTitle className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <motion.div
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl bg-lime-500/10 border border-lime-500/20"
            >
              <PieChart className="h-10 w-10 text-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-lime-400 via-blue-200 to-lime-400 bg-clip-text text-transparent uppercase tracking-tight">
              Macronutrient Architect
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Systematic macronutrient allocation for physiological optimization and metabolic dominance.
          </p>
          
          <div className="flex justify-center mt-8">
            <Tabs value={mode} onValueChange={setMode} className="w-full max-w-sm">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 p-1 rounded-xl">
                <TabsTrigger value="basic" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-lime-400 transition-all font-bold">Standard</TabsTrigger>
                <TabsTrigger value="advanced" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-emerald-400 transition-all font-bold">Elite</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Nutritional Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:p-6 lg:p-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Biological Mass</h4>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-lime-500/50"
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

                <div className="space-y-3">
                  <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Vertical Scale</Label>
                  <div className="flex gap-2">
                    {formData.heightUnit === "cm" ? (
                      <Input
                        type="number"
                        placeholder="Height"
                        value={formData.height}
                        onChange={(e) => handleInputChange("height", e.target.value)}
                        className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-lime-500/50"
                      />
                    ) : (
                      <div className="flex gap-2 flex-1">
                        <Input
                          type="number"
                          placeholder="ft"
                          value={formData.feet}
                          onChange={(e) => handleInputChange("feet", e.target.value)}
                          className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-lime-500/50"
                        />
                        <Input
                          type="number"
                          placeholder="in"
                          value={formData.inches}
                          onChange={(e) => handleInputChange("inches", e.target.value)}
                          className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-lime-500/50"
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px]">Operational Age</Label>
                    <Input
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="glass-input text-xl py-5 sm:py-7 focus:ring-lime-500/50"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px]">Physiological Sex</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="glass-input text-xl border-white/10 py-5 sm:py-7 text-slate-200 font-bold">
                        <SelectValue placeholder="Identify" />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Dietary Objectives</h4>
                <div className="space-y-3">
                  <Label className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px]">Energy Load (Activity)</Label>
                  <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
                    <SelectTrigger className="glass-input border-white/10 py-5 sm:py-8 text-slate-200">
                      <SelectValue placeholder="Current Velocity?" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      {activityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value} className="py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white uppercase text-xs">{level.label}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{level.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-500 font-black uppercase tracking-[0.15em] text-[10px]">Strategic Target (Goal)</Label>
                  <Select value={formData.goal} onValueChange={(value) => handleInputChange("goal", value)}>
                    <SelectTrigger className="glass-input border-white/10 py-5 sm:py-8 text-slate-200">
                      <SelectValue placeholder="Define Outcome" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      {goals.map((goal) => (
                        <SelectItem key={goal.value} value={goal.value} className="py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white uppercase text-xs">{goal.label}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{goal.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-6 p-6 bg-lime-500/5 rounded-[2rem] border border-lime-500/10 backdrop-blur-3xl">
                  <h4 className="text-[10px] font-black text-lime-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <PieChart className="h-3 w-3" />
                    Allocation Framework
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter leading-relaxed">
                    Macronutrient distribution is calibrated against TDEE variance and metabolic specificity.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <Label className="text-lime-400 font-black uppercase tracking-[0.2em] text-[10px] ml-1">Macro Nutrient Protocol</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {macroPresets.map((preset) => (
                <motion.div
                  key={preset.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMacroPresetChange(preset.value)}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                    macroPreset === preset.value
                      ? "bg-lime-500/10 border-lime-500/30 ring-1 ring-lime-500/20"
                      : "bg-white/5 border-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="text-[10px] font-black text-white uppercase tracking-tighter text-center mb-1">{preset.label}</div>
                  <div className="text-[8px] text-slate-500 font-black uppercase text-center">{preset.protein}/{preset.carbs}/{preset.fat}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-white/[0.03] border border-white/5 shadow-inner">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <Activity className="h-4 w-4 text-lime-400" />
              Dynamic Distribution Tuning
            </h3>
            
            <div className="space-y-10 px-4">
              {[
                { id: "protein", label: "Proteins (Amino Profile)", color: "lime", value: customMacros.protein, icon: Beef },
                { id: "carbs", label: "Carbohydrates (Glycogen)", color: "emerald", value: customMacros.carbs, icon: Wheat },
                { id: "fat", label: "Lipids (Essential Fats)", color: "cyan", value: customMacros.fat, icon: Droplets }
              ].map((macro) => (
                <div key={macro.id} className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest leading-none">
                    <span className="text-slate-400 flex items-center gap-2">
                      <macro.icon className="h-4 w-4" />
                      {macro.label}
                    </span>
                    <span className={`text-${macro.color}-400 text-lg`}>{macro.value}%</span>
                  </div>
                  <Slider
                    value={[macro.value]}
                    onValueChange={(val) => handleCustomMacroChange(macro.id, val)}
                    max={80}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            <div className="text-center font-black text-[10px] text-slate-600 uppercase tracking-widest">
              Aggregate Distribution: {customMacros.protein + customMacros.carbs + customMacros.fat}%
            </div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateMacros}
              className={`flex-1 btn-category-nutrition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!validateForm() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Synthesizing Plan...
                </>
              ) : (
                <>
                  <Target className="mr-3 h-7 w-7" />
                  Resolve Macro Map
                </>
              )}
            </Button>
            
            <Button
              onClick={resetForm}
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
            className="mt-16 premium-result-card p-6 sm:p-12 md:p-16 lg:p-20"
          >
            <div className="text-center mb-20 relative">
              <motion.div
                className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] font-black result-value-glow bg-gradient-to-br from-white via-white to-white/20 bg-clip-text text-transparent leading-none flex items-center justify-center gap-2"
                initial={{ filter: "blur(20px)", y: 20 }}
                animate={{ filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1 }}
              >
                {result.targetCalories} <span className="text-4xl text-lime-400/50 font-black tracking-widest ml-[-20px] uppercase">kcal</span>
              </motion.div>
              <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-3xl font-black uppercase tracking-[0.4em] text-lime-400 bg-lime-400/10 border border-lime-400/20 shadow-[0_0_80px_rgba(163,230,53,0.2)] mt-10 mb-6">
                Architecture Standardized
              </div>
              <p className="text-slate-500 font-black text-2xl tracking-tighter uppercase opacity-80">Selected Protocol: {result.selectedPreset.label}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:p-8 lg:p-10 mb-20">
              {[
                { label: "Proteins", data: result.macros.protein, color: "text-lime-400", bg: "bg-lime-500/10", border: "border-lime-500/20", icon: Beef, info: `${result.proteinPerKg}g/kg` },
                { label: "Carbohydrates", data: result.macros.carbs, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: Wheat, info: "Glycogen Fuel" },
                { label: "Lipids", data: result.macros.fat, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: Droplets, info: "Endocrine Support" }
              ].map((macro, index) => (
                <motion.div
                  key={index}
                  className={`p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] ${macro.bg} ${macro.border} border text-center relative overflow-hidden group`}
                  whileHover={{ y: -10 }}
                >
                  <macro.icon className={`h-8 w-8 ${macro.color} absolute top-5 sm:p-6 lg:p-8 right-8 opacity-20 group-hover:opacity-100 transition-opacity`} />
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-6">{macro.label}</div>
                  <div className={`text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl font-black ${macro.color} mb-4`}>{macro.data.grams}g</div>
                  <div className="text-white font-black text-base opacity-40 uppercase tracking-widest">{macro.data.calories} kcal</div>
                  <div className={`mt-8 inline-block px-4 py-1.5 rounded-full ${macro.color} bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest`}>
                    {macro.info}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-white/[0.03] border border-white/5 shadow-inner mb-20">
              <div className="flex items-center gap-4 mb-12">
                <Utensils className="h-10 w-10 text-lime-400" />
                <h4 className="text-4xl font-black text-white tracking-widest uppercase">Temporal Distribution</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:p-6 lg:p-8">
                {Object.entries(result.mealDistribution).map(([meal, data], index) => (
                  <motion.div
                    key={meal}
                    className="p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <div className="h-1 w-12 bg-lime-500/50 rounded-full mb-6 group-hover:w-24 transition-all" />
                    <h5 className="font-black text-white text-xl uppercase tracking-tighter mb-8">{meal}</h5>
                    <div className="space-y-5">
                      <div className="flex justify-between text-xs font-black uppercase text-slate-500">
                        <span>Energy</span>
                        <span className="text-white">{data.calories} kcal</span>
                      </div>
                      <div className="flex justify-between text-xs font-black uppercase text-lime-400/70 border-b border-white/5 pb-2">
                        <span>Protein</span>
                        <span className="text-lime-400">{data.protein}g</span>
                      </div>
                      <div className="flex justify-between text-xs font-black uppercase text-emerald-400/70 border-b border-white/5 pb-2">
                        <span>Carbs</span>
                        <span className="text-emerald-400">{data.carbs}g</span>
                      </div>
                      <div className="flex justify-between text-xs font-black uppercase text-cyan-400/70 pb-2">
                        <span>Fat</span>
                        <span className="text-cyan-400">{data.fat}g</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-5 sm:p-6 lg:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <Button
                className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 py-10 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] transition-all duration-300 font-black text-2xl group shadow-2xl"
              >
                <Download className="mr-4 h-8 w-8 group-hover:scale-125 transition-transform" />
                Export Operational Protocol
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MacroCalculator;