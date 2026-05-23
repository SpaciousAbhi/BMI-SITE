import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Timer, TrendingUp, Target, Zap, Clock, RotateCcw, Activity, Award, MapPin, Gauge, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaceCalculator = () => {
  const { toast } = useToast();
  const [mode, setMode] = useState('pace'); // 'pace', 'time', 'distance'
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' });
  const [pace, setPace] = useState({ minutes: '', seconds: '' });
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

  const calculatePaceResult = () => {
    if (!isFormValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for the selected calculation mode.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        let distanceInKm = parseFloat(distance);
        if (distanceUnit === 'miles') distanceInKm *= 1.609344;
        else if (distanceUnit === 'meters') distanceInKm /= 1000;
        else if (distanceUnit === 'yards') distanceInKm *= 0.0009144;

        const totalSeconds = (parseInt(time.hours) || 0) * 3600 + 
                           (parseInt(time.minutes) || 0) * 60 + 
                           (parseInt(time.seconds) || 0);

        if (mode === 'pace') {
          const pacePerKm = totalSeconds / distanceInKm;
          const pacePerMile = pacePerKm * 1.609344;
          const speedKmh = distanceInKm / (totalSeconds / 3600);
          const speedMph = speedKmh / 1.609344;

          const splits = {
            '1 km': formatTime(pacePerKm),
            '1 mile': formatTime(pacePerMile),
            '5 km': formatTime(pacePerKm * 5),
            '10 km': formatTime(pacePerKm * 10),
            'Half Marathon': formatTime(pacePerKm * 21.0975),
            'Full Marathon': formatTime(pacePerKm * 42.195)
          };

          const vdot = calculateVDOT(distanceInKm, totalSeconds);
          const predictions = generatePacePredictions(vdot);

          setResult({
            type: 'pace',
            primary: formatTime(pacePerKm),
            unit: 'm/km',
            secondary: [
              { label: "Imperial Pace", val: formatTime(pacePerMile), unit: "m/mi" },
              { label: "Velocity Metric", val: speedKmh.toFixed(2), unit: "km/h" },
              { label: "Velocity Imperial", val: speedMph.toFixed(2), unit: "mph" }
            ],
            splits,
            predictions,
            vdot: vdot.toFixed(1)
          });
        } else if (mode === 'time') {
          const paceSeconds = (parseInt(pace.minutes) || 0) * 60 + (parseInt(pace.seconds) || 0);
          const totalTime = paceSeconds * distanceInKm;
          
          setResult({
            type: 'time',
            primary: formatTime(totalTime),
            unit: 'duration',
            context: `Distance: ${distance} ${distanceUnit} @ ${pace.minutes}:${pace.seconds.padStart(2, '0')}/km`
          });
        } else if (mode === 'distance') {
          const paceSeconds = (parseInt(pace.minutes) || 0) * 60 + (parseInt(pace.seconds) || 0);
          const calculatedDistance = totalSeconds / paceSeconds;
          
          setResult({
            type: 'distance',
            primary: calculatedDistance.toFixed(2),
            unit: 'km',
            context: `Time: ${formatTime(totalSeconds)} @ ${pace.minutes}:${pace.seconds.padStart(2, '0')}/km`
          });
        }
      } catch (error) { console.error(error); }
      setLoading(false);
    }, 1500);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateVDOT = (distanceKm, timeSeconds) => {
    const velocity = (distanceKm * 1000) / (timeSeconds / 60); 
    const vo2 = -4.60 + 0.182258 * velocity + 0.000104 * Math.pow(velocity, 2);
    const percentVO2Max = 0.8 + 0.1894393 * Math.exp(-0.012778 * (timeSeconds / 60)) + 0.2989558 * Math.exp(-0.1932605 * (timeSeconds / 60));
    return vo2 / percentVO2Max;
  };

  const generatePacePredictions = (vdot) => {
    const races = [
      { name: '5K', distance: 5, factor: 0.86 },
      { name: '10K', distance: 10, factor: 0.82 },
      { name: 'Half Marathon', distance: 21.0975, factor: 0.78 },
      { name: 'Marathon', distance: 42.195, factor: 0.74 }
    ];
    return races.map(race => {
      const v = (vdot * race.factor);
      const a = 0.000104;
      const b = 0.182258;
      const c = -4.6 - v;
      const velocity = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
      const timeMinutes = (race.distance * 1000) / velocity;
      return {
        distance: race.name,
        predictedTime: formatTime(timeMinutes * 60),
        pace: formatTime((timeMinutes * 60) / race.distance)
      };
    });
  };

  const resetForm = () => {
    setDistance(''); setTime({ hours: '', minutes: '', seconds: '' }); setPace({ minutes: '', seconds: '' }); setResult(null);
  };

  const isFormValid = () => {
    if (mode === 'pace') return distance && (time.minutes || time.seconds || time.hours);
    if (mode === 'time') return distance && (pace.minutes || pace.seconds);
    if (mode === 'distance') return (time.minutes || time.seconds || time.hours) && (pace.minutes || pace.seconds);
    return false;
  };

  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto p-4 sm:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="glass-panel glow-border border-white/10">
        <CardHeader className="text-center pb-8 border-b border-white/5 bg-white/[0.02]">
          <CardTitle className="text-4xl font-black mb-4 flex items-center justify-center gap-4">
            <motion.div
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20"
            >
              <Timer className="h-10 w-10 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-violet-400 via-purple-200 to-violet-400 bg-clip-text text-transparent uppercase tracking-tight">
              Velocity Strategist
            </span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Algorithmic quantification of temporal pace, distance magnitudes, and race predictions.
          </CardDescription>
          
          <div className="flex justify-center mt-10">
            <div className="inline-flex p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              {[
                { id: 'pace', icon: Gauge, label: 'Pace' },
                { id: 'time', icon: Clock, label: 'Time' },
                { id: 'distance', icon: MapPin, label: 'Distance' }
              ].map((m) => (
                <Button
                  key={m.id}
                  onClick={() => { setMode(m.id); setResult(null); }}
                  variant="ghost"
                  className={`px-8 py-2.5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2 ${
                    mode === m.id 
                      ? "bg-violet-500/20 text-violet-400 shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]" 
                      : "text-slate-500 hover:text-white"
                  }`}
                >
                  <m.icon className="h-4 w-4" />
                  {m.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-12 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-8 md:p-12">
            {(mode === 'pace' || mode === 'time') && (
              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Operational Magnitude (Distance)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="glass-input text-xl py-5 sm:py-7 flex-1 focus:ring-violet-500/50"
                  />
                  <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                    <SelectTrigger className="glass-input w-28 border-white/10 py-5 sm:py-7 text-slate-300 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="km">KM</SelectItem>
                      <SelectItem value="miles">MILES</SelectItem>
                      <SelectItem value="meters">METERS</SelectItem>
                      <SelectItem value="yards">YARDS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {(mode === 'pace' || mode === 'distance') && (
              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Temporal Duration (Time)</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="HH"
                      value={time.hours}
                      onChange={(e) => setTime({...time, hours: e.target.value})}
                      className="glass-input text-center py-5 sm:py-7 focus:ring-violet-500/50"
                    />
                    <span className="absolute bottom-1 w-full text-center text-[8px] font-black text-slate-600 uppercase tracking-tighter">Hours</span>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="MM"
                      value={time.minutes}
                      onChange={(e) => setTime({...time, minutes: e.target.value})}
                      className="glass-input text-center py-5 sm:py-7 focus:ring-violet-500/50"
                    />
                    <span className="absolute bottom-1 w-full text-center text-[8px] font-black text-slate-600 uppercase tracking-tighter">Min</span>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="SS"
                      value={time.seconds}
                      onChange={(e) => setTime({...time, seconds: e.target.value})}
                      className="glass-input text-center py-5 sm:py-7 focus:ring-violet-500/50"
                    />
                    <span className="absolute bottom-1 w-full text-center text-[8px] font-black text-slate-600 uppercase tracking-tighter">Sec</span>
                  </div>
                </div>
              </motion.div>
            )}

            {(mode === 'time' || mode === 'distance') && (
              <motion.div variants={itemVariants} className="space-y-4">
                <Label className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Velocity Constant (Pace)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="MM"
                      value={pace.minutes}
                      onChange={(e) => setPace({...pace, minutes: e.target.value})}
                      className="glass-input text-center py-5 sm:py-7 focus:ring-violet-500/50"
                    />
                    <span className="absolute bottom-1 w-full text-center text-[8px] font-black text-slate-600 uppercase tracking-tighter">Minutes</span>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="SS"
                      value={pace.seconds}
                      onChange={(e) => setPace({...pace, seconds: e.target.value})}
                      className="glass-input text-center py-5 sm:py-7 focus:ring-violet-500/50"
                    />
                    <span className="absolute bottom-1 w-full text-center text-[8px] font-black text-slate-600 uppercase tracking-tighter">Seconds</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-6">
            <Button
              onClick={calculatePaceResult}
              className={`flex-1 btn-category-fitness py-5 sm:py-8 rounded-[2rem] text-base sm:text-lg md:text-xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${!isFormValid() ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 animate-spin text-white" />
                  Synchronizing Dynamics...
                </>
              ) : (
                <>
                  <Activity className="mr-3 h-7 w-7" />
                  Execute Velocity Analysis
                </>
              )}
            </Button>
            
            <Button
              onClick={resetForm}
              variant="outline"
              className="w-full sm:w-auto border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white flex items-center gap-3 px-14 py-5 sm:py-8 rounded-[2rem] shadow-lg backdrop-blur-md transition-all font-black text-sm sm:text-base md:text-lg uppercase"
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
            className="mt-16 premium-result-card p-6 sm:p-8 md:p-12 sm:p-24"
          >
            <div className="text-center mb-28 relative">
              <motion.div
                className="text-[14rem] font-black result-value-glow bg-gradient-to-br from-white via-white/80 to-white/20 bg-clip-text text-transparent leading-none flex items-center justify-center gap-4"
                initial={{ filter: "blur(20px)", y: 20 }}
                animate={{ filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1 }}
              >
                {result.primary} 
                <span className="text-4xl text-violet-400 font-black tracking-[0.3em] ml-2 uppercase opacity-60">
                  {result.unit}
                </span>
              </motion.div>
              <div className="inline-flex items-center px-20 py-6 rounded-full text-4xl font-black uppercase tracking-[0.5em] text-violet-400 bg-violet-400/10 border border-violet-400/20 mt-12 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                {result.type === 'pace' ? 'Target Velocity' : result.type === 'time' ? 'Duration Lock' : 'Distance Lock'}
              </div>
              {result.context && (
                <p className="text-slate-500 font-bold text-xl tracking-widest uppercase mt-10 opacity-60 italic">— {result.context} —</p>
              )}
            </div>

            {result.type === 'pace' && (
              <div className="space-y-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:p-8 lg:p-10">
                  {result.secondary.map((stat, i) => (
                    <motion.div 
                      key={i} 
                      className="p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/[0.03] border border-white/5 text-center group relative overflow-hidden"
                      whileHover={{ y: -10 }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-violet-500/20 group-hover:bg-violet-500 transition-all duration-500" />
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{stat.label}</div>
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 group-hover:text-violet-400 transition-colors">{stat.val}</div>
                      <div className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">{stat.unit}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-8 md:p-12">
                  <div className="p-5 sm:p-6 lg:p-8 sm:p-12 md:p-16 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-white/[0.03] border border-white/10 shadow-inner">
                    <h4 className="text-3xl font-black text-white uppercase tracking-widest mb-14 flex items-center gap-4">
                      <Award className="h-10 w-10 text-violet-400" />
                      Distance Benchmarks
                    </h4>
                    <div className="grid grid-cols-2 gap-5 sm:p-6 lg:p-8">
                      {Object.entries(result.splits).map(([dist, split], idx) => (
                        <div key={idx} className="p-5 sm:p-6 lg:p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-violet-500/20 transition-all">
                          <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">{dist}</span>
                          <span className="text-3xl font-black text-white font-mono">{split}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 lg:p-8 sm:p-12 md:p-16 rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem] bg-violet-500/5 border border-violet-500/10">
                    <h4 className="text-3xl font-black text-white uppercase tracking-widest mb-14 flex items-center gap-4">
                      <TrendingUp className="h-10 w-10 text-purple-400" />
                      Race Logic (VDOT: {result.vdot})
                    </h4>
                    <div className="space-y-6">
                      {result.predictions.map((pred, idx) => (
                        <div key={idx} className="group flex items-center justify-between p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-3xl bg-violet-500/20 flex items-center justify-center font-black text-2xl text-violet-400 group-hover:scale-110 transition-transform">
                              {idx + 1}
                            </div>
                            <div>
                                <span className="text-2xl font-black text-white uppercase tracking-tighter block">{pred.distance}</span>
                                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{pred.pace}/km pace</span>
                            </div>
                          </div>
                          <div className="text-4xl font-black text-purple-400 font-mono tracking-tighter">
                            {pred.predictedTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-28 p-5 sm:p-6 lg:p-8 sm:p-12 md:p-16 rounded-[6rem] bg-white/[0.02] border border-white/5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent opacity-50" />
                <Zap className="h-14 w-14 text-violet-500/20 mx-auto mb-10" />
                <h4 className="text-2xl font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Strategic Tactical Advisory</h4>
                <p className="text-slate-500 font-medium text-xl leading-relaxed max-w-3xl mx-auto italic lowercase">
                    "velocity constants are influenced by physiological thresholds, elevation variance, and metabolic flux. maintain consistent cadence to ensure structural efficiency."
                </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PaceCalculator;