import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Shield, AlertCircle, CheckCircle, Target, Download, FileText, Loader2, Ruler, Activity, Info, Trophy, Gauge, Medal, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArmyBodyFatCalculator = () => {
  const { toast } = useToast();
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

  const calculateArmyBodyFat = () => {
    if (!isFormValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate Army body fat.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        let hInInches;
        if (heightUnit === "cm") {
          hInInches = parseFloat(height) / 2.54;
        } else {
          const ftVal = parseFloat(feet) || 0;
          const inVal = parseFloat(inches) || 0;
          hInInches = ftVal * 12 + inVal;
        }

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
        let maxAllowed;
        if (gender === "male") {
          if (ageNum <= 20) maxAllowed = 20;
          else if (ageNum <= 27) maxAllowed = 22;
          else if (ageNum <= 39) maxAllowed = 24;
          else maxAllowed = 26;
        } else {
          if (ageNum <= 20) maxAllowed = 30;
          else if (ageNum <= 27) maxAllowed = 32;
          else if (ageNum <= 39) maxAllowed = 34;
          else maxAllowed = 36;
        }

        const status = bf <= maxAllowed ? "PASS" : "FAIL";
        const color = status === "PASS" ? "text-emerald-400" : "text-rose-400";
        
        const weightKg = weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) * 0.453592;
        const fatMass = weightKg * (bf / 100);
        const leanMass = weightKg - fatMass;

        setResult({
          bf: bf.toFixed(1),
          maxAllowed,
          status,
          color,
          fatMass: fatMass.toFixed(1),
          leanMass: leanMass.toFixed(1),
          unit: weightUnit,
          metrics: { age, gender, hInInches: hInInches.toFixed(1) }
        });
      } catch (err) { console.error(err); }
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setAge(""); setGender(""); setHeight(""); setFeet(""); setInches(""); setWeight(""); setNeck(""); setWaist(""); setHip(""); setResult(null);
  };

  const isFormValid = () => {
    const heightValid = heightUnit === "ft" ? feet : height;
    return age && gender && weight && heightValid && neck && waist && (gender === 'male' || hip);
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
              className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <Medal className="h-10 w-10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-400 bg-clip-text text-transparent uppercase tracking-tight">
              Tactical Adipose Analyst
            </span>
          </CardTitle>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Official AR 600-9 compliance assessment algorithmic modeling for operational readiness.
          </p>
        </CardHeader>

        <CardContent className="space-y-10 p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Medal className="h-3 w-3" />
              Service Member Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:p-6 lg:p-8">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Biological Indicators</h4>
                
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Rank/Age Tier *</Label>
                  <Input type="number" placeholder="Years" value={age} onChange={(e) => setAge(e.target.value)} className="glass-input text-xl py-5 sm:py-7" />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Biological Category *</Label>
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
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Assigned Load (Weight) *</Label>
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
                  <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Vertical Stature *</Label>
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
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Metric Intelligence</h4>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Neck Circumference *</Label>
                    <Input type="number" step="0.1" placeholder="Inches" value={neck} onChange={(e) => setNeck(e.target.value)} className="glass-input text-xl py-5 sm:py-7" />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase text-slate-500 ml-1">Abdominal Scope (Waist) *</Label>
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

                <div className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 mt-8">
                  <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    Army Protocol Notice
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium uppercase tracking-tighter">
                    AR 600-9 requires height accuracy to 0.25 inch. Tape must be parallel to ground. Neck: below larynx. Waist: at belly button.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              onClick={calculateArmyBodyFat}
              className={`flex-1 btn-category-composition py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!isFormValid() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Conducting Assessment...
                </>
              ) : (
                <>
                  <Activity className="mr-3 h-7 w-7" />
                  Run Tactical Audit
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
            <div className={`absolute top-0 right-0 p-6 sm:p-8 lg:p-10 font-black text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] opacity-[0.03] select-none pointer-events-none uppercase ${result.status === 'PASS' ? 'text-emerald-500' : 'text-rose-400'}`}>
              {result.status}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:p-6 lg:p-8 mb-16 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <Medal className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight uppercase">Readiness Calibration</h3>
                  <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">AR 600-9 COMPLIANCE RESOLVED</p>
                </div>
              </div>
              <Button
                className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-10 py-5 sm:py-8 font-black transition-all uppercase tracking-widest text-sm"
              >
                <Download className="h-5 w-5 mr-3" />
                Export Assessment
              </Button>
            </div>

            <div className="text-center mb-24 relative z-10">
              <motion.div
                className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none flex items-center justify-center gap-2"
                initial={{ filter: "blur(20px)", y: 20 }}
                animate={{ filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1 }}
              >
                {result.bf} <span className="text-4xl text-emerald-400 font-black tracking-widest ml-[-20px] uppercase">%</span>
              </motion.div>
              <div className={`inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-4xl font-black uppercase tracking-[0.5em] mt-10 shadow-2xl ${result.status === 'PASS' ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 shadow-emerald-500/20' : 'text-rose-400 bg-rose-400/10 border border-rose-400/20 shadow-rose-500/20'}`}>
                {result.status} STATUS
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10">
              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 space-y-8">
                <h4 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                  <Target className="h-6 w-6 text-emerald-400" />
                  Tactical Composition
                </h4>
                <div className="space-y-6">
                  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lipid Mass</span>
                    <span className="text-2xl font-black text-white tracking-tighter">{result.fatMass} {result.unit}</span>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Combat/Lean Mass</span>
                    <span className="text-2xl font-black text-white tracking-tighter">{result.leanMass} {result.unit}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 flex flex-col justify-center gap-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-6">
                  <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
                    <Medal className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AR 600-9 Limit</div>
                    <div className="text-xl font-black text-white tracking-widest uppercase mt-1">MAX {result.maxAllowed}% ALLOWED</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-inner">
                    <Scale className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Differential</div>
                    <div className="text-xl font-black text-white tracking-widest uppercase mt-1">{(result.maxAllowed - result.bf).toFixed(1)}% FROM LIMIT</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-30" />
              <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-10 flex items-center gap-4 relative z-10">
                <Shield className="h-8 w-8 text-emerald-400 shadow-glow" />
                Operational Readiness Protocol
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {[
                  "Maintain hydration discipline.",
                  "Optimize macro-nutrient timing.",
                  "Focus on compound power movements.",
                  "Integrate active recovery cycles."
                ].map((rec, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-emerald-500/5 transition-all">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider leading-none">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-24 text-center">
              <div className="bg-red-500/5 border border-white/5 p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] max-w-2xl mx-auto backdrop-blur-sm">
                <AlertCircle className="h-10 w-10 text-red-500 mb-6 mx-auto" />
                <h5 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4">Tactical Disclaimer</h5>
                <p className="text-slate-500 font-medium text-lg leading-relaxed lowercase tracking-tight">
                  "AR 600-9 tape tests are proxy estimations. personnel facing administrative action should request professional medical validation."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArmyBodyFatCalculator;