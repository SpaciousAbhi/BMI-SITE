import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Heart, AlertCircle, CheckCircle, Target, Download, FileText, Loader2, Ruler, Activity, Info, Trophy, Gauge } from "lucide-react";

const BodyFatCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const calculateBodyFat = () => {
    if (!isFormValid()) return;
    setLoading(true);
    setTimeout(() => {
      try {
        let hInInches;
        if (heightUnit === "cm") hInInches = parseFloat(height) / 2.54;
        else hInInches = parseFloat(feet) * 12 + parseFloat(inches);

        const neckIn = parseFloat(neck);
        const waistIn = parseFloat(waist);
        const hipIn = gender === "female" ? parseFloat(hip) : 0;

        let bf;
        if (gender === "male") {
          bf = 86.010 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(hInInches) + 36.76;
        } else {
          bf = 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(hInInches) - 78.387;
        }

        const ageNum = parseInt(age);
        let category, color;
        if (gender === "male") {
          if (bf < 6) { category = "Essential"; color = "text-blue-400"; }
          else if (bf < 14) { category = "Athlete"; color = "text-emerald-400"; }
          else if (bf < 18) { category = "Fitness"; color = "text-cyan-400"; }
          else if (bf < 25) { category = "Average"; color = "text-amber-400"; }
          else { category = "Overweight"; color = "text-rose-400"; }
        } else {
          if (bf < 14) { category = "Essential"; color = "text-blue-400"; }
          else if (bf < 21) { category = "Athlete"; color = "text-emerald-400"; }
          else if (bf < 25) { category = "Fitness"; color = "text-cyan-400"; }
          else if (bf < 32) { category = "Average"; color = "text-amber-400"; }
          else { category = "Overweight"; color = "text-rose-400"; }
        }

        const weightKg = weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) * 0.453592;
        const fatMass = weightKg * (bf / 100);
        const leanMass = weightKg - fatMass;

        setResult({
          bf: bf.toFixed(1),
          category,
          color,
          fatMass: fatMass.toFixed(1),
          leanMass: leanMass.toFixed(1),
          unit: weightUnit,
          metrics: { age, gender, weight, height: heightUnit === 'cm' ? height : `${feet}'${inches}"` }
        });
      } catch (err) { console.error(err); }
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setAge(""); setGender(""); setHeight(""); setFeet(""); setInches(""); setWeight(""); setNeck(""); setWaist(""); setHip(""); setResult(null);
  };

  const isFormValid = () => age && gender && weight && (height || (feet && inches)) && neck && waist && (gender === 'male' || hip);

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
              className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20"
            >
              <Gauge className="h-10 w-10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-200 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tight">
              Adipose Analyst
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            High-fidelity lipid mass estimation using synchronized US Navy algorithmic modeling.
          </p>
        </CardHeader>

        <CardContent className="space-y-10 p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Biometric Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:p-6 lg:p-8">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Biological Indicators</h4>
                
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Chronological Age *</Label>
                  <Input type="number" placeholder="Years" value={age} onChange={(e) => setAge(e.target.value)} className="glass-input text-xl py-5 sm:py-7" />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Biological Sex *</Label>
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
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Total Body Mass *</Label>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="glass-input text-xl py-5 sm:py-7 flex-1" />
                    <Select value={weightUnit} onValueChange={setWeightUnit}>
                      <SelectTrigger className="glass-input w-24 py-5 sm:py-7 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10 text-slate-300">
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Stature (Height) *</Label>
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
                      <SelectContent className="glass-panel border-white/10 text-slate-300">
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Dimensional Metrics</h4>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Neck Circumference *</Label>
                    <Input type="number" step="0.1" placeholder="Inches" value={neck} onChange={(e) => setNeck(e.target.value)} className="glass-input text-xl py-5 sm:py-7" />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Waist Circumference *</Label>
                    <Input type="number" step="0.1" placeholder="Inches" value={waist} onChange={(e) => setWaist(e.target.value)} className="glass-input text-xl py-5 sm:py-7" />
                  </div>
                </div>

                <AnimatePresence>
                  {gender === "female" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 mt-4 overflow-hidden"
                    >
                      <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Hip Circumference *</Label>
                      <Input type="number" step="0.1" placeholder="Inches" value={hip} onChange={(e) => setHip(e.target.value)} className="glass-input text-xl py-5 sm:py-7" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-6 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10 mt-8">
                  <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Gauge className="h-3 w-3" />
                    Precision Notice
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium uppercase tracking-tighter">
                    Use a flexible tape. Measure snugly on bare skin. Neck: below larynx. Waist: at navel. Hip: widest point.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateBodyFat}
              className={`flex-1 btn-category-composition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!isFormValid() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Analyzing Bio-Data...
                </>
              ) : (
                <>
                  <Activity className="mr-3 h-7 w-7" />
                  Resolve Composition
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
            className="mt-16 premium-result-card p-6 sm:p-12 md:p-16 lg:p-20 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] text-cyan-500 opacity-[0.03] select-none pointer-events-none uppercase">
              ANALYST
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                  <Gauge className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight uppercase">Lipid Resolution</h3>
                  <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Synchronization complete</p>
                </div>
              </div>
              <Button
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
                {result.bf}<span className="text-4xl text-cyan-400/60 font-black tracking-widest ml-4 uppercase">%</span>
              </motion.div>
              <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-2xl font-black uppercase tracking-[0.5em] text-cyan-400 bg-white/5 border border-cyan-400/20 mt-10 shadow-2xl">
                LIPID INDEX: {result.category}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-8 lg:p-10">
              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <Target className="h-7 w-7 text-cyan-400" />
                  <h4 className="text-xl font-black text-white uppercase tracking-widest">Mass Breakdown</h4>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-6 rounded-[2.5rem] bg-white/5 border border-white/5">
                    <span className="text-slate-400 font-black text-sm uppercase">Adipose Mass</span>
                    <span className="text-white font-black text-2xl">{result.fatMass} <span className="text-xs opacity-40 uppercase ml-1">{result.unit}</span></span>
                  </div>
                  <div className="flex justify-between items-center p-6 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-400/20">
                    <span className="text-cyan-400 font-black text-sm uppercase">Lean Body Mass</span>
                    <span className="text-white font-black text-2xl">{result.leanMass} <span className="text-xs opacity-40 uppercase ml-1">{result.unit}</span></span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 flex flex-col justify-center gap-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-6">
                  <div className="p-5 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 shadow-inner">
                    <Trophy className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Optimization Rank</div>
                    <div className="text-xl font-black text-white tracking-widest uppercase mt-1">{result.category} STATUS</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-inner">
                    <Activity className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Physiological Risk</div>
                    <div className="text-xl font-black text-white tracking-widest uppercase mt-1">NOMINAL</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-cyan-500/5 border border-cyan-500/10 backdrop-blur-3xl">
              <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-10 flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
                Adaptive Protocols
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Maintain progressive load training.",
                  "Optimize protein assimilation (2.0g/kg).",
                  "Ensure micronutrient density.",
                  "Monitor sleep-induction cycles."
                ].map((rec, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/5">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-tight leading-none">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-24 text-center">
              <Alert className="bg-red-500/5 border-red-500/10 p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] max-w-2xl mx-auto">
                <AlertCircle className="h-10 w-10 text-red-500 mb-6 mx-auto" />
                <AlertTitle className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4">Advisory Threshold</AlertTitle>
                <AlertDescription className="text-slate-500 font-medium text-lg leading-relaxed lowercase tracking-tight">
                  "US Navy formulas are high-fidelity estimations. actual adipose distribution is subject to biological variance and measurement precision."
                </AlertDescription>
              </Alert>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BodyFatCalculator;