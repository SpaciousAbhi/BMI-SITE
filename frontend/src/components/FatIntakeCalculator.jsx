import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Droplets, Calculator, RotateCcw, Heart, AlertCircle, CheckCircle, Target, Download, FileText, Loader2, Info, Activity, Zap, TrendingUp, Sparkles, Utensils, ShieldCheck, Flame } from "lucide-react";

const FatIntakeCalculator = () => {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { opacity: 0, scale: 0.95, filter: "blur(10px)" }
  };

  const calculateFat = () => {
    if (!isFormValid()) {
      // Small vibration or shake effect could be added here
      return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        const wKg = weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) * 0.453592;
        let hCm;
        if (heightUnit === "cm") {
          hCm = parseFloat(height);
        } else {
          const ftVal = parseFloat(feet) || 0;
          const inVal = parseFloat(inches) || 0;
          hCm = (ftVal * 30.48) + (inVal * 2.54);
        }

        // Mifflin-St Jeor
        let bmr = (10 * wKg) + (6.25 * hCm) - (5 * parseInt(age));
        bmr = gender === "male" ? bmr + 5 : bmr - 161;

        const tdee = bmr * parseFloat(activityLevel);
        
        // Fat percentage based on goal
        let fatPct;
        if (goal === "keto") fatPct = 0.70;
        else if (goal === "lose") fatPct = 0.25;
        else if (goal === "gain") fatPct = 0.30;
        else fatPct = 0.30; // maintain

        const fatCal = tdee * fatPct;
        const fatGrams = fatCal / 9;

        setResult({
          grams: Math.round(fatGrams),
          calories: Math.round(fatCal),
          percentage: Math.round(fatPct * 100),
          breakdown: {
            saturated: Math.round(fatGrams * 0.10),
            monounsaturated: Math.round(fatGrams * 0.60),
            polyunsaturated: Math.round(fatGrams * 0.30)
          },
          sources: [
            { name: "Extra Virgin Olive Oil", fat: "14g/tbsp", type: "Monounsaturated" },
            { name: "Avocado", fat: "21g/medium", type: "Monounsaturated" },
            { name: "Walnuts", fat: "18g/30g", type: "Polyunsaturated" },
            { name: "Wild Salmon", fat: "13g/100g", type: "Omega-3" }
          ]
        });
      } catch (err) { console.error(err); }
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setWeight(""); setHeight(""); setFeet(""); setInches(""); setAge(""); setGender(""); setActivityLevel(""); setGoal(""); setResult(null);
  };

  const isFormValid = () => {
    const heightValid = heightUnit === "ft" ? feet : height;
    return weight && heightValid && age && gender && activityLevel && goal;
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
              className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <Droplets className="h-10 w-10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-emerald-400 via-blue-200 to-emerald-400 bg-clip-text text-transparent uppercase tracking-tight">
              Lipid Analyst
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Calibrate your essential fatty-acid profile for hormonal balance and cellular integrity.
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
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Biological Parameters</h4>
                
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Chronological Age *</Label>
                  <Input type="number" placeholder="Years" value={age} onChange={(e) => setAge(e.target.value)} className="glass-input text-xl py-5 sm:py-7" />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Biological Identity *</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="glass-input text-xl py-5 sm:py-7 font-bold text-slate-200">
                      <SelectValue placeholder="Identify" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Measured Mass (Weight) *</Label>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Value" value={weight} onChange={(e) => setWeight(e.target.value)} className="glass-input text-xl py-5 sm:py-7 flex-1" />
                    <Select value={weightUnit} onValueChange={setWeightUnit}>
                      <SelectTrigger className="glass-input w-24 py-5 sm:py-7 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10">
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Operational Objectives</h4>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Lifestyle Intensity *</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger className="glass-input text-xl py-5 sm:py-7 font-bold text-slate-200">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="1.2">Sedentary (Low Burn)</SelectItem>
                      <SelectItem value="1.375">Lightly Active (Base)</SelectItem>
                      <SelectItem value="1.55">Moderately Active (Active)</SelectItem>
                      <SelectItem value="1.725">Very Active (Intense)</SelectItem>
                      <SelectItem value="1.9">Extreme Athlete (Elite)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Composition Goal *</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger className="glass-input text-xl py-5 sm:py-7 font-bold text-slate-200">
                      <SelectValue placeholder="Select Goal" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="lose">Fat Oxidation (Loss)</SelectItem>
                      <SelectItem value="maintain">TDEE Equilibrium</SelectItem>
                      <SelectItem value="gain">Hyper-Caloric (Gain)</SelectItem>
                      <SelectItem value="keto">Ketogenic Adaptation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Stature (Height) *</Label>
                  <div className="flex gap-2">
                    {heightUnit === "cm" ? (
                      <Input type="number" placeholder="cm" value={height} onChange={(e) => setHeight(e.target.value)} className="glass-input text-xl py-5 sm:py-7 flex-1" />
                    ) : (
                      <div className="flex gap-2 flex-1">
                        <Input type="number" placeholder="ft" value={feet} onChange={(e) => setFeet(e.target.value)} className="glass-input text-xl py-5 sm:py-7 flex-1" />
                        <Input type="number" placeholder="in" value={inches} onChange={(e) => setInches(e.target.value)} className="glass-input text-xl py-5 sm:py-7 flex-1" />
                      </div>
                    )}
                    <Select value={heightUnit} onValueChange={setHeightUnit}>
                      <SelectTrigger className="glass-input w-24 py-5 sm:py-7 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10">
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateFat}
              className={`flex-1 btn-category-nutrition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!isFormValid() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Analyzing Lipid Needs...
                </>
              ) : (
                <>
                  <Activity className="mr-3 h-7 w-7" />
                  Calculate Lipid Floor
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
            className="mt-16 premium-result-card p-6 sm:p-12 md:p-16 lg:p-20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-emerald-400 opacity-[0.03] select-none pointer-events-none">
              LIPID
            </div>

            <div className="text-center mb-24 relative z-10">
              <motion.div
                className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none flex items-center justify-center gap-2"
                initial={{ filter: "blur(20px)", y: 20 }}
                animate={{ filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1 }}
              >
                {result.grams} <span className="text-4xl text-emerald-400 font-black tracking-widest ml-[-20px] uppercase">G/DAY</span>
              </motion.div>
              <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 mt-10 shadow-2xl shadow-emerald-500/10">
                DAILY FAT BUFFER
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10">
              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <h4 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                  <Target className="h-6 w-6 text-emerald-400" />
                  Lipid Breakdown
                </h4>
                <div className="space-y-6">
                  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all shadow-inner">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Energy Density</span>
                    <span className="text-2xl font-black text-white tracking-tighter">{result.calories} KCAL</span>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all shadow-inner">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Calorie Pct</span>
                    <span className="text-2xl font-black text-white tracking-tighter">{result.percentage}%</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <h4 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                  <Utensils className="h-6 w-6 text-emerald-400" />
                  Recommended Lipid Sources
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {result.sources.map((item, i) => (
                    <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-emerald-500/5 transition-all">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.type}</span>
                        <span className="text-lg font-black text-white tracking-tight">{item.name}</span>
                      </div>
                      <span className="text-xl font-black text-emerald-400">{item.fat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-3xl relative overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-10 flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-emerald-400 shadow-glow" />
                Hormonal Integrity Protocols
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {[
                  "Prioritize Monounsaturated fats.",
                  "Balance Omega-3 to Omega-6 ratio.",
                  "Avoid all Hydrogenated trans-fats.",
                  "Maintain min 0.3g/lb for hormone support."
                ].map((rec, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-emerald-500/5 transition-all">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider leading-none">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-24 text-center">
              <div className="bg-emerald-500/5 border border-white/5 p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] max-w-2xl mx-auto backdrop-blur-sm">
                <Info className="h-10 w-10 text-emerald-500 mb-6 mx-auto" />
                <h5 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4">Lipid Advisory</h5>
                <p className="text-slate-500 font-medium text-lg leading-relaxed lowercase tracking-tight">
                  "Lipid requirements are essential for fat-soluble vitamin (A, D, E, K) absorption. Chronic low-fat intake may disrupt endocrine function."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FatIntakeCalculator;