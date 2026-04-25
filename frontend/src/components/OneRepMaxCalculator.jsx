import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { TrendingUp, Target, Award, Zap, BarChart3, RotateCcw, Loader2, Info, Activity, Scale, Percent, Dumbbell } from "lucide-react";

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [reps, setReps] = useState('');
  const [exercise, setExercise] = useState('squat');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const calculateOneRepMax = () => {
    if (!isFormValid()) return;
    setLoading(true);
    setTimeout(() => {
      try {
        const w = parseFloat(weight);
        const r = parseInt(reps);
        
        // Formulated Multi-Model Matrix
        const formulas = {
          epley: Math.round(w * (1 + r / 30)),
          brzycki: Math.round(w * (36 / (37 - r))),
          lander: Math.round((100 * w) / (101.3 - 2.67123 * r)),
          lombardi: Math.round(w * Math.pow(r, 0.10)),
          mayhew: Math.round((100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r))),
          oconner: Math.round(w * (1 + 0.025 * r)),
          wathan: Math.round((100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r)))
        };

        const values = Object.values(formulas);
        const avgMax = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
        const minMax = Math.min(...values);
        const maxMax = Math.max(...values);

        const trainingZones = [
          { zone: 'Endurance', percentage: '50-65%', weight: Math.round(avgMax * 0.57), reps: '15+', color: 'violet' },
          { zone: 'Hypertrophy', percentage: '65-80%', weight: Math.round(avgMax * 0.72), reps: '8-12', color: 'purple' },
          { zone: 'Strength', percentage: '80-90%', weight: Math.round(avgMax * 0.85), reps: '3-6', color: 'fuchsia' },
          { zone: 'Pure Power', percentage: '90-100%', weight: Math.round(avgMax * 0.95), reps: '1-3', color: 'pink' },
        ];

        const repRanges = [95, 90, 85, 80, 75, 70, 65, 60].map(p => ({
          percentage: `${p}%`,
          weight: Math.round(avgMax * (p / 100)),
          reps: p >= 95 ? '1' : p >= 90 ? '2-3' : p >= 85 ? '3-5' : p >= 80 ? '5-7' : '8-12'
        }));

        setResult({
          oneRepMax: avgMax,
          range: { min: minMax, max: maxMax },
          formulas,
          trainingZones,
          repRanges,
          unit
        });
      } catch (error) { console.error(error); }
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setWeight(''); setReps(''); setResult(null);
  };

  const isFormValid = () => weight && reps && parseInt(reps) > 0 && parseFloat(weight) > 0;

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
              initial={{ rotate: -15, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20"
            >
              <Dumbbell className="h-10 w-10 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-violet-400 via-purple-200 to-violet-400 bg-clip-text text-transparent uppercase tracking-tight">
              Force Capacity Architect
            </span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Algorithmic quantification of relative force production and lifting protocols.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-12 p-6 sm:p-10 lg:p-12">
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Scale className="h-3 w-3" />
              Lifting Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10">
              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Active Load (Intensity)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-violet-500/50"
                  />
                  <Select value={unit} onValueChange={setUnit}>
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

              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Temporal Repetitions</Label>
                <Input
                  type="number"
                  placeholder="Reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="glass-input text-xl py-5 sm:py-7 focus:ring-violet-500/50"
                />
              </motion.div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Target className="h-3 w-3" />
              Exercise Context
            </h3>
            <motion.div variants={itemVariants} className="space-y-4">
              <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Mechanical Protocol</Label>
              <Select value={exercise} onValueChange={setExercise}>
                <SelectTrigger className="glass-input text-xl border-white/10 py-5 sm:py-7 text-slate-200 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-panel border-white/10">
                  <SelectItem value="squat">Back Squat</SelectItem>
                  <SelectItem value="bench">Bench Press</SelectItem>
                  <SelectItem value="deadlift">Conventional Deadlift</SelectItem>
                  <SelectItem value="overhead">Overhead Press</SelectItem>
                  <SelectItem value="row">Barbell Row</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-4">
            <Button
              onClick={calculateOneRepMax}
              className={`flex-1 btn-category-fitness py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!isFormValid() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Generating Curve...
                </>
              ) : (
                <>
                  <Zap className="mr-3 h-7 w-7" />
                  Resolve Force Limit
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
              <motion.div
                className="text-3xl sm:text-4xl md:text-5xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-7xl sm:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-3xl sm:text-4xl md:text-5xl sm:text-7xl lg:text-8xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:text-8xl lg:text-9xl lg:text-[10rem] lg:text-[12rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none flex items-center justify-center gap-2"
                initial={{ filter: "blur(20px)", y: 20 }}
                animate={{ filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1 }}
              >
                {result.oneRepMax} <span className="text-4xl text-violet-400 font-black tracking-widest ml-[-20px] uppercase">{result.unit}</span>
              </motion.div>
              <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-3xl font-black uppercase tracking-[0.4em] text-violet-400 bg-violet-400/10 border border-violet-400/20 mt-10">
                Peak Force Capacity
              </div>
              <p className="text-slate-500 font-black text-2xl tracking-[0.2em] uppercase opacity-60 mt-8">
                Estimated 1RM Magnitude
              </p>
            </div>

            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10">
                <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5">
                  <h4 className="text-xl font-black text-white uppercase tracking-widest mb-10 flex items-center gap-4">
                    <BarChart3 className="h-7 w-7 text-violet-400" />
                    Multi-Model Comparison
                  </h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {Object.entries(result.formulas).map(([name, val], i) => (
                      <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2 group">
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter group-hover:text-violet-400 transition-colors">{name}</span>
                        <span className="text-2xl font-black text-white">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 text-center p-6 rounded-[2rem] bg-violet-500/5 text-violet-400 font-black text-[10px] uppercase tracking-widest border border-violet-500/10">
                    Variance Matrix: {result.range.min} - {result.range.max} {result.unit}
                  </div>
                </div>

                <div className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5">
                  <h4 className="text-xl font-black text-white uppercase tracking-widest mb-10 flex items-center gap-4">
                    <Percent className="h-7 w-7 text-purple-400" />
                    Rep-Max Gradient
                  </h4>
                  <div className="space-y-3">
                    {result.repRanges.map((r, i) => (
                      <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-black text-slate-500 w-10">{r.percentage}</span>
                          <span className="text-xl font-black text-white">{r.weight}{result.unit}</span>
                        </div>
                        <span className="text-[10px] font-black text-purple-400 group-hover:scale-110 transition-transform tracking-widest">{r.reps} REPS</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-violet-500/5 border border-violet-500/10 shadow-inner overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 sm:p-8 lg:p-10 opacity-5">
                  <Award className="h-64 w-64 text-white" />
                </div>
                <h4 className="text-3xl font-black text-white uppercase tracking-widest mb-12 flex items-center gap-4 relative">
                  <Target className="h-8 w-8 text-violet-400" />
                  Strategic Training Zones
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:p-6 lg:p-8 relative">
                  {result.trainingZones.map((z, i) => (
                    <motion.div
                      key={i}
                      className="p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className={`h-1.5 w-12 bg-${z.color}-500/50 rounded-full mb-6 group-hover:w-full transition-all duration-500`} />
                      <h5 className="font-black text-white text-xl uppercase tracking-tighter mb-8">{z.zone}</h5>
                      <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                          <span>Load Target</span>
                          <span className="text-white">{z.weight} {result.unit}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                          <span>Volume</span>
                          <span className="text-white">{z.reps} reps</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                          <span>Intensity</span>
                          <span className="text-white">{z.percentage}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-20 text-center">
                <Alert className="bg-white/[0.03] border-white/10 p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] max-w-2xl mx-auto shadow-2xl">
                  <Info className="h-8 w-8 text-violet-400 mx-auto mb-6" />
                  <AlertTitle className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4 italic">Safety Protocol</AlertTitle>
                  <AlertDescription className="text-slate-500 font-medium text-lg leading-relaxed lowercase tracking-tight max-w-lg mx-auto">
                    "algorithmically derived force values are biological estimations. actual exertion requires technical mastery, psychological readiness, and physiological priming."
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OneRepMaxCalculator;