import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Heart, TrendingUp, Target, Zap, Activity, RotateCcw, Award, Info, Scale, ShieldCheck, Loader2 } from "lucide-react";

const TargetHeartRateCalculator = () => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [intensity, setIntensity] = useState('60'); // Default 60%
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
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)", 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    },
    exit: { opacity: 0, scale: 0.95, filter: "blur(10px)" }
  };

  const calculateTHR = () => {
    if (!isFormValid()) return;
    setLoading(true);
    setTimeout(() => {
      try {
        const ageNum = parseInt(age);
        const rhrNum = parseInt(restingHR) || 70; // Fallback to 70 if empty
        
        // Formulas
        const maxHR = 220 - ageNum;
        const hrReserve = maxHR - rhrNum;
        
        // Karvonen Training Zones
        const zones = [
          { name: 'Recovery Flux', range: '50-60%', description: 'Metabolic waste clearance and active restoration.', color: 'emerald' },
          { name: 'Aerobic Base', range: '60-70%', description: 'Lipid oxidation and endurance stabilization.', color: 'sky' },
          { name: 'Threshold Core', range: '70-80%', description: 'Glycogen utilization and VO2 enhancement.', color: 'violet' },
          { name: 'Anaerobic Peak', range: '80-90%', description: 'Lactate threshold escalation.', color: 'orange' },
          { name: 'Maximum Effort', range: '90-100%', description: 'Neuromuscular peak capacity.', color: 'rose' }
        ];

        const zoneValues = zones.map(zone => {
          const [min, max] = zone.range.replace('%', '').split('-').map(Number);
          const minTHR = Math.round((hrReserve * (min / 100)) + rhrNum);
          const maxTHR = Math.round((hrReserve * (max / 100)) + rhrNum);
          return { ...zone, val: `${minTHR}-${maxTHR} BPM` };
        });

        const targetPaceHR = Math.round((hrReserve * (parseInt(intensity) / 100)) + rhrNum);

        setResult({
          maxHR,
          hrReserve,
          targetTHR: targetPaceHR,
          zones: zoneValues,
          intensity: intensity
        });
      } catch (error) { console.error(error); }
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setAge(''); setRestingHR(''); setIntensity('60'); setResult(null);
  };

  const isFormValid = () => age && parseInt(age) > 0 && parseInt(age) < 120;

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto p-4 sm:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="glass-panel glow-border border-white/10">
        <CardHeader className="text-center pb-8 border-b border-white/5 bg-white/[0.02]">
          <CardTitle className="text-4xl font-black mb-4 flex items-center justify-center gap-4">
            <motion.div
              initial={{ rotate: -15, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20"
            >
              <Heart className="h-10 w-10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-rose-400 via-purple-200 to-rose-400 bg-clip-text text-transparent uppercase tracking-tight">
              Cardiovascular Auditor
            </span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Algorithmic quantification of myocardial output and metabolic training zones.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-12 p-6 sm:p-10 lg:p-12">
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Scale className="h-3 w-3" />
              Biometric Calibration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10">
              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Biological Age</Label>
                <Input
                  type="number"
                  placeholder="Years"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="glass-input text-xl py-5 sm:py-7 focus:ring-rose-500/50"
                  max="120"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Resting Pulse (Optional)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="BPM"
                    value={restingHR}
                    onChange={(e) => setRestingHR(e.target.value)}
                    className="glass-input text-xl py-5 sm:py-7 focus:ring-rose-500/50"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-600 uppercase">Avg. 70</div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <TrendingUp className="h-3 w-3" />
              Operational Intensity
            </h3>
            <motion.div variants={itemVariants} className="space-y-4">
              <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Target HR Threshold</Label>
              <Select value={intensity} onValueChange={setIntensity}>
                <SelectTrigger className="glass-input text-xl border-white/10 py-5 sm:py-7 text-slate-200 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-panel border-white/10">
                  <SelectItem value="50">50% — Light Activity</SelectItem>
                  <SelectItem value="60">60% — Aerobic Base</SelectItem>
                  <SelectItem value="70">70% — Steady State</SelectItem>
                  <SelectItem value="80">80% — Anaerobic Threshold</SelectItem>
                  <SelectItem value="90">90% — V02 Max Peak</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-4">
            <Button
              onClick={calculateTHR}
              className={`flex-1 btn-category-fitness py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!isFormValid() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Calibrating Heart Lock...
                </>
              ) : (
                <>
                  <Zap className="mr-3 h-7 w-7" />
                  Resolve Cardiovascular Profile
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
            <div className="text-center mb-24 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] -z-10" />
              <motion.div
                className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none flex items-center justify-center gap-2"
                initial={{ filter: "blur(20px)", y: 20 }}
                animate={{ filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1 }}
              >
                {result.targetTHR} <span className="text-4xl text-rose-400 font-black tracking-widest ml-[-20px] uppercase">bpm</span>
              </motion.div>
              <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-3xl font-black uppercase tracking-[0.4em] text-rose-400 bg-rose-400/10 border border-rose-400/20 mt-10">
                Target Intensity Locked
              </div>
              <p className="text-slate-500 font-black text-2xl tracking-[0.2em] uppercase opacity-60 mt-8">
                {result.intensity}% Metabolic Threshold
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10">
                <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 text-center group relative overflow-hidden">
                    <Activity className="h-10 w-10 text-rose-400 absolute top-6 sm:p-8 lg:p-10 right-10 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Theoretical Maximum (MHR)</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl font-black text-white mb-4 lowercase tracking-tight">{result.maxHR} <span className="text-base text-slate-600 uppercase">bpm</span></div>
                    <p className="text-slate-500 font-bold text-sm leading-relaxed lowercase">
                        Derived from age-calibrated biological thresholds.
                    </p>
                </div>

                <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 text-center group relative overflow-hidden">
                    <ShieldCheck className="h-10 w-10 text-emerald-400 absolute top-6 sm:p-8 lg:p-10 right-10 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Heart Rate Reserve (HRR)</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl font-black text-white mb-4 lowercase tracking-tight">{result.hrReserve} <span className="text-base text-slate-600 uppercase">bpm</span></div>
                    <p className="text-slate-500 font-bold text-sm leading-relaxed lowercase">
                        The physiological window between rest and exertion peak.
                    </p>
                </div>
            </div>

            <div className="mt-16 space-y-8">
                <h4 className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-10 flex items-center justify-center gap-4">
                    <Target className="h-7 w-7 text-rose-400" />
                    Karvonen Training Matrix
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {result.zones.map((zone, i) => (
                        <motion.div
                            key={i}
                            className="p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-white/[0.03] border border-white/5 flex flex-col items-center group relative cursor-help"
                            whileHover={{ y: -8 }}
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 bg-${zone.color}-500/30 group-hover:bg-${zone.color}-500 transition-all`} />
                            {/* Force tailwind to include these colors */}
                            <div className="hidden bg-emerald-500 bg-sky-500 bg-violet-500 bg-orange-500 bg-rose-500" />
                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 opacity-100">{zone.range}</div>
                            <div className="text-2xl font-black text-white mb-2">{zone.val}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter text-center leading-tight">{zone.name}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-20 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-rose-500/5 border border-rose-500/10 backdrop-blur-3xl flex flex-col md:flex-row items-center gap-6 sm:p-8 lg:p-10">
                <div className="p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-rose-500/10 border border-rose-500/20 shadow-inner">
                    <Info className="h-12 w-12 text-rose-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h4 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Physiological Insight</h4>
                    <p className="text-slate-400 font-medium text-xl leading-relaxed lowercase">
                        The <span className="text-rose-400 font-black uppercase">{result.targetTHR} BPM</span> threshold represents your quantified target. Transitioning through these zones optimizes myocardial efficiency and prevents central nervous system overreach.
                    </p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TargetHeartRateCalculator;