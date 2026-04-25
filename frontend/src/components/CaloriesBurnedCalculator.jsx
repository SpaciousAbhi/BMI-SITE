import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Flame, Activity, Clock, Zap, TrendingUp, User, RotateCcw, Loader2, Target, Heart, Scale, Footprints, Dumbbell, Gauge, Droplets } from "lucide-react";

const CaloriesBurnedCalculator = () => {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState({ hours: '', minutes: '' });
  const [intensity, setIntensity] = useState('moderate');
  const [bodyFat, setBodyFat] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
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

  const exercises = {
    'running': { name: 'Running', icon: Footprints, metValues: { light: { value: 6.0, description: '5 mph (12 min/mile)' }, moderate: { value: 8.3, description: '6 mph (10 min/mile)' }, vigorous: { value: 11.0, description: '7 mph (8.5 min/mile)' }, intense: { value: 14.5, description: '8+ mph' } } },
    'cycling': { name: 'Cycling', icon: Activity, metValues: { light: { value: 4.0, description: 'Leisurely, <10 mph' }, moderate: { value: 8.0, description: '12-14 mph' }, vigorous: { value: 12.0, description: '16-19 mph' }, intense: { value: 16.0, description: '20+ mph' } } },
    'swimming': { name: 'Swimming', icon: Activity, metValues: { light: { value: 6.0, description: 'Recreational' }, moderate: { value: 8.3, description: 'Moderate pace' }, vigorous: { value: 10.0, description: 'Fast pace' }, intense: { value: 13.8, description: 'Competitive' } } },
    'weightlifting': { name: 'Weight Lifting', icon: Dumbbell, metValues: { light: { value: 3.0, description: 'Light effort' }, moderate: { value: 5.0, description: 'Moderate effort' }, vigorous: { value: 6.0, description: 'Vigorous effort' }, intense: { value: 8.0, description: 'Heavy lifting' } } },
    'basketball': { name: 'Basketball', icon: Activity, metValues: { light: { value: 4.5, description: 'Shooting' }, moderate: { value: 6.5, description: 'General' }, vigorous: { value: 8.0, description: 'Game play' }, intense: { value: 10.0, description: 'Competitive' } } },
    'tennis': { name: 'Tennis', icon: Activity, metValues: { light: { value: 5.0, description: 'Doubles' }, moderate: { value: 7.3, description: 'Singles, recreational' }, vigorous: { value: 8.0, description: 'Singles, competitive' }, intense: { value: 10.0, description: 'Tournament' } } },
    'yoga': { name: 'Yoga', icon: Activity, metValues: { light: { value: 2.5, description: 'Hatha' }, moderate: { value: 3.0, description: 'Vinyasa' }, vigorous: { value: 4.0, description: 'Power' }, intense: { value: 5.0, description: 'Hot Yoga' } } }
  };

  const calculateCalories = () => {
    if (!isFormValid()) return;
    setLoading(true);
    setTimeout(() => {
      try {
        let weightInKg = parseFloat(weight);
        if (weightUnit === 'lbs') weightInKg *= 0.453592;
        const totalMinutes = (parseInt(duration.hours) || 0) * 60 + (parseInt(duration.minutes) || 0);
        const selectedExercise = exercises[activity];
        if (!selectedExercise) return;
        const metValue = selectedExercise.metValues[intensity].value;
        let caloriesBurned = (metValue * weightInKg * totalMinutes) / 60;

        if (bodyFat && age && gender) {
          const bodyFatPercent = parseFloat(bodyFat);
          const ageNum = parseInt(age);
          const leanBodyMass = weightInKg * (1 - bodyFatPercent / 100);
          let ageAdjustment = 1 - ((ageNum - 25) * 0.002);
          ageAdjustment = Math.max(0.8, Math.min(1.1, ageAdjustment));
          const genderAdjustment = gender === 'male' ? 1.0 : 0.9;
          caloriesBurned = (metValue * leanBodyMass * 1.2 * totalMinutes * ageAdjustment * genderAdjustment) / 60;
        }

        setResult({
          totalCalories: Math.round(caloriesBurned),
          caloriesPerHour: Math.round((caloriesBurned / totalMinutes) * 60),
          fatGrams: (caloriesBurned * (intensity === 'light' ? 0.5 : 0.4) / 9).toFixed(1),
          metValue,
          exercise: selectedExercise.name,
          duration: totalMinutes,
          intensityDescription: selectedExercise.metValues[intensity].description
        });
      } catch (error) { console.error(error); }
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setWeight(''); setActivity(''); setDuration({ hours: '', minutes: '' }); setIntensity('moderate'); setBodyFat(''); setAge(''); setGender(''); setResult(null);
  };

  const isFormValid = () => weight && activity && (duration.hours || duration.minutes);

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
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20"
            >
              <Flame className="h-10 w-10 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-violet-400 via-purple-200 to-violet-400 bg-clip-text text-transparent uppercase tracking-tight">
              Metabolic Burn Analyst
            </span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Systematic metabolic expenditure quantification and fat-oxidation benchmarking.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-12 p-6 sm:p-10 lg:p-12">
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Biometric Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10">
              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Biological Mass</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-violet-500/50"
                  />
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
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
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Operational Age</Label>
                <Input 
                  type="number" 
                  placeholder="Enter Age" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  className="glass-input text-xl py-5 sm:py-7 focus:ring-violet-500/50" 
                />
              </motion.div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Clock className="h-3 w-3" />
              Activity Protocol
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 lg:p-10">
              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Exercise Modality</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger className="glass-input text-xl border-white/10 py-5 sm:py-7 text-slate-200 font-bold">
                    <SelectValue placeholder="Select Activity" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/10">
                    {Object.entries(exercises).map(([key, ex]) => (
                      <SelectItem key={key} value={key} className="py-3">
                        <div className="flex items-center gap-3">
                          <ex.icon className="h-4 w-4 text-violet-400" />
                          <span className="font-bold uppercase text-[10px] tracking-widest">{ex.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Duration Window</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="HH"
                      value={duration.hours}
                      onChange={(e) => setDuration({...duration, hours: e.target.value})}
                      className="glass-input text-center py-5 sm:py-7 focus:ring-violet-500/50"
                    />
                    <span className="absolute bottom-1 w-full text-center text-[8px] font-black text-slate-600 uppercase">Hours</span>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="MM"
                      value={duration.minutes}
                      onChange={(e) => setDuration({...duration, minutes: e.target.value})}
                      className="glass-input text-center py-5 sm:py-7 focus:ring-violet-500/50"
                    />
                    <span className="absolute bottom-1 w-full text-center text-[8px] font-black text-slate-600 uppercase">Min</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Metabolic Intensity</Label>
                <Select value={intensity} onValueChange={setIntensity}>
                  <SelectTrigger className="glass-input text-xl border-white/10 py-5 sm:py-7 text-slate-200 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/10">
                    <SelectItem value="light">Low Intensity</SelectItem>
                    <SelectItem value="moderate">Moderate State</SelectItem>
                    <SelectItem value="vigorous">High Threshold</SelectItem>
                    <SelectItem value="intense">Anaerobic Peak</SelectItem>
                  </SelectContent>
                </Select>
                {activity && <p className="text-[10px] font-black text-violet-400 uppercase tracking-tighter px-1 opacity-70 italic">{exercises[activity].metValues[intensity].description}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Physiological Variance (Sex)</Label>
                <Select value={gender} onValueChange={setGender}>
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

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-4">
            <Button
              onClick={calculateCalories}
              className={`flex-1 btn-category-fitness py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!isFormValid() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Quantifying Flux...
                </>
              ) : (
                <>
                  <Zap className="mr-3 h-7 w-7" />
                  Resolve Energy Outlay
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
                {result.totalCalories} <span className="text-4xl text-violet-400 font-black tracking-widest ml-[-20px] uppercase">kcal</span>
              </motion.div>
              <div className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5 rounded-full text-3xl font-black uppercase tracking-[0.4em] text-violet-400 bg-violet-400/10 border border-violet-400/20 mt-10">
                Expenditure Quantified
              </div>
              <p className="text-slate-500 font-black text-2xl tracking-[0.2em] uppercase opacity-60 mt-8">
                {result.exercise} Protocol • {result.duration} Resolution Units
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:p-6 lg:p-8">
              {[
                { label: "burn velocity", val: result.caloriesPerHour, unit: "kcal/h", color: "text-violet-400", icon: Gauge },
                { label: "lipid oxidation", val: result.fatGrams, unit: "grams", color: "text-purple-400", icon: Droplets },
                { label: "metabolic constant", val: result.metValue, unit: "METS", color: "text-fuchsia-400", icon: Activity }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 text-center relative overflow-hidden group"
                  whileHover={{ y: -10 }}
                >
                  <stat.icon className={`h-8 w-8 ${stat.color} absolute top-5 sm:p-6 lg:p-8 right-8 opacity-20 group-hover:opacity-100 transition-opacity`} />
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{stat.label}</div>
                  <div className={`text-4xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black ${stat.color} mb-4`}>{stat.val}</div>
                  <div className="text-white font-black text-base opacity-40 uppercase tracking-widest">{stat.unit}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-violet-500/5 border border-violet-500/10 backdrop-blur-3xl flex flex-col md:flex-row items-center gap-6 sm:p-8 lg:p-10">
              <div className="p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-violet-500/10 border border-violet-500/20 shadow-inner">
                <Target className="h-12 w-12 text-violet-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Strategic Insight</h4>
                <p className="text-slate-400 font-medium text-xl leading-relaxed">
                  The <span className="text-violet-400 font-black uppercase">{intensity}</span> intensity threshold was maintained. For optimal cardiovascular adaptation and metabolic efficiency, sustain this operational load within your biological recovery window.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CaloriesBurnedCalculator;