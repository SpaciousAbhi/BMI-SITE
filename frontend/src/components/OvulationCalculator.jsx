import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Heart, AlertCircle, CheckCircle, Calendar, Target, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const OvulationCalculator = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [lutealPhase, setLutealPhase] = useState("14");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: -90,
      transition: { duration: 0.5 }
    }
  };

  const calculateOvulation = async () => {
    if (!lastPeriodDate) {
      toast({
        title: "Missing Information",
        description: "Please enter your last period date.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lastPeriod = new Date(lastPeriodDate);
    const cycleLen = parseInt(cycleLength);
    const periodLen = parseInt(periodLength);
    const lutealLen = parseInt(lutealPhase);
    const today = new Date();

    // Calculate ovulation date (luteal phase days before next period)
    const ovulationDay = cycleLen - lutealLen;
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(lastPeriod.getDate() + ovulationDay);

    // Calculate fertile window (5 days before ovulation + ovulation day)
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(ovulationDate.getDate() - 5);
    
    const fertileWindowEnd = new Date(ovulationDate);

    // Calculate next period date
    const nextPeriodDate = new Date(lastPeriod);
    nextPeriodDate.setDate(lastPeriod.getDate() + cycleLen);

    // Calculate period end date
    const periodEndDate = new Date(lastPeriod);
    periodEndDate.setDate(lastPeriod.getDate() + periodLen - 1);

    // Calculate days until ovulation
    const daysUntilOvulation = Math.ceil((ovulationDate - today) / (1000 * 60 * 60 * 24));
    
    // Calculate days until next period
    const daysUntilPeriod = Math.ceil((nextPeriodDate - today) / (1000 * 60 * 60 * 24));

    // Determine current cycle phase
    let currentPhase, phaseColor, phaseIcon;
    const dayOfCycle = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)) + 1;
    
    if (dayOfCycle <= periodLen) {
      currentPhase = "Menstrual Phase";
      phaseColor = "text-red-400";
      phaseIcon = <Heart className="h-5 w-5" />;
    } else if (dayOfCycle <= ovulationDay - 1) {
      currentPhase = "Follicular Phase";
      phaseColor = "text-blue-400";
      phaseIcon = <Target className="h-5 w-5" />;
    } else if (dayOfCycle === ovulationDay || dayOfCycle === ovulationDay + 1) {
      currentPhase = "Ovulation";
      phaseColor = "text-green-400";
      phaseIcon = <CheckCircle className="h-5 w-5" />;
    } else {
      currentPhase = "Luteal Phase";
      phaseColor = "text-purple-400";
      phaseIcon = <Calendar className="h-5 w-5" />;
    }

    // Check if currently in fertile window
    const isCurrentlyFertile = today >= fertileWindowStart && today <= fertileWindowEnd;
    
    // Calculate fertility probability for each day
    const getFertilityProbability = (date) => {
      const daysFromOvulation = Math.floor((date - ovulationDate) / (1000 * 60 * 60 * 24));
      if (daysFromOvulation === 0) return 33; // Ovulation day
      if (daysFromOvulation === -1) return 30; // Day before ovulation
      if (daysFromOvulation === -2) return 27; // 2 days before
      if (daysFromOvulation === -3) return 15; // 3 days before
      if (daysFromOvulation === -4) return 10; // 4 days before
      if (daysFromOvulation === -5) return 5;  // 5 days before
      return 0;
    };

    // Generate next 3 cycles for planning
    const futureCycles = [];
    for (let i = 1; i <= 3; i++) {
      const futureLastPeriod = new Date(lastPeriod);
      futureLastPeriod.setDate(lastPeriod.getDate() + (cycleLen * i));
      
      const futureOvulation = new Date(futureLastPeriod);
      futureOvulation.setDate(futureLastPeriod.getDate() + ovulationDay);
      
      const futureFertileStart = new Date(futureOvulation);
      futureFertileStart.setDate(futureOvulation.getDate() - 5);
      
      futureCycles.push({
        cycle: i + 1,
        periodDate: futureLastPeriod.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        ovulationDate: futureOvulation.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        fertileWindow: `${futureFertileStart.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })} - ${futureOvulation.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })}`
      });
    }

    setResult({
      ovulationDate: ovulationDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      fertileWindowStart: fertileWindowStart.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      fertileWindowEnd: fertileWindowEnd.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      nextPeriodDate: nextPeriodDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      periodEndDate: periodEndDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      daysUntilOvulation,
      daysUntilPeriod,
      dayOfCycle: Math.max(1, dayOfCycle),
      currentPhase,
      phaseColor,
      phaseIcon,
      isCurrentlyFertile,
      cycleLength: cycleLen,
      futureCycles,
      fertilityProbability: getFertilityProbability(today)
    });

    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setLastPeriodDate("");
    setCycleLength("28");
    setPeriodLength("5");
    setLutealPhase("14");
    setResult(null);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <motion.div variants={itemVariants} className="mx-auto mb-4 p-3 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-full w-fit">
            <Heart className="h-8 w-8 text-rose-400" />
          </motion.div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
            Ovulation Calculator
          </CardTitle>
          <motion.p variants={itemVariants} className="text-gray-400 mt-2">
            Track your fertile window and ovulation dates for optimal conception timing
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="last-period" className="text-sm font-medium text-gray-300">
                  Last Period Date *
                </Label>
                <Input
                  id="last-period"
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-rose-500 focus:ring-rose-500/20 text-white"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Average Cycle Length (days)
                </Label>
                <Select value={cycleLength} onValueChange={setCycleLength}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-rose-500 focus:ring-rose-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Array.from({ length: 15 }, (_, i) => i + 21).map(days => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Period Length (days)
                </Label>
                <Select value={periodLength} onValueChange={setPeriodLength}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-rose-500 focus:ring-rose-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Array.from({ length: 8 }, (_, i) => i + 3).map(days => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Luteal Phase Length (days)
                </Label>
                <Select value={lutealPhase} onValueChange={setLutealPhase}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-rose-500 focus:ring-rose-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Array.from({ length: 8 }, (_, i) => i + 10).map(days => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center space-y-4">
              <Button
                onClick={calculateOvulation}
                disabled={isCalculating}
                className="w-full h-11 sm:h-10 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Ovulation
                  </>
                )}
              </Button>

              <Button
                onClick={resetCalculator}
                variant="outline"
                className="w-full h-11 sm:h-10 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Calculator
              </Button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-8 p-6 bg-gradient-to-br from-rose-900/20 to-pink-900/20 rounded-xl border border-rose-800/30"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Your Fertility Calendar</h3>
                  <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${result.phaseColor}`}>
                    {result.phaseIcon}
                    {result.currentPhase} - Day {result.dayOfCycle}
                  </div>
                  {result.isCurrentlyFertile && (
                    <div className="mt-2 px-4 py-2 bg-green-900/20 rounded-lg border border-green-800/30">
                      <p className="text-green-400 font-medium">You are currently in your fertile window!</p>
                      {result.fertilityProbability > 0 && (
                        <p className="text-green-300 text-sm">Conception probability: {result.fertilityProbability}%</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Cycle */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-rose-400 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Current Cycle
                    </h4>
                    <div className="space-y-3">
                      {result.daysUntilOvulation >= 0 ? (
                        <div className="flex justify-between items-center p-3 bg-rose-900/20 rounded-lg border border-rose-800/30">
                          <span className="text-gray-400">Ovulation Date:</span>
                          <div className="text-right">
                            <div className="text-rose-400 font-semibold">{result.ovulationDate}</div>
                            <div className="text-gray-500 text-xs">
                              {result.daysUntilOvulation === 0 ? "Today!" : `${result.daysUntilOvulation} days`}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-gray-400">Last Ovulation:</span>
                          <span className="text-white font-medium">{result.ovulationDate}</span>
                        </div>
                      )}
                      
                      <div className="p-3 bg-pink-900/20 rounded-lg border border-pink-800/30">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Fertile Window:</span>
                        </div>
                        <div className="text-pink-400 font-medium text-sm">
                          {result.fertileWindowStart} to {result.fertileWindowEnd}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Next Period:</span>
                        <div className="text-right">
                          <div className="text-white font-medium">{result.nextPeriodDate}</div>
                          <div className="text-gray-500 text-xs">
                            {result.daysUntilPeriod > 0 ? `${result.daysUntilPeriod} days` : "Overdue"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Future Cycles */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Future Cycles
                    </h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {result.futureCycles.map((cycle, index) => (
                        <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-white font-medium">Cycle {cycle.cycle}</span>
                            <span className="text-gray-400 text-sm">{cycle.periodDate}</span>
                          </div>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Ovulation:</span>
                              <span className="text-pink-300">{cycle.ovulationDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Fertile Window:</span>
                              <span className="text-pink-300">{cycle.fertileWindow}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fertility Tips */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-lg border border-green-800/30">
                  <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Fertility Tips
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Track cervical mucus changes - fertile mucus is clear and stretchy</li>
                    <li>• Monitor basal body temperature for more accurate ovulation detection</li>
                    <li>• Have intercourse every 1-2 days during your fertile window</li>
                    <li>• Maintain a healthy lifestyle with proper nutrition and exercise</li>
                    <li>• Consider ovulation test strips for more precise timing</li>
                    <li>• Reduce stress and get adequate sleep for optimal fertility</li>
                  </ul>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-200 text-sm">
                      <strong>Medical Disclaimer:</strong> This calculator provides estimates based on average cycle 
                      patterns. Individual cycles can vary. For accurate ovulation tracking, consider using additional 
                      methods like BBT charts, ovulation tests, or consulting a healthcare provider.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OvulationCalculator;