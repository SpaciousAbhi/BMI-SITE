import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Calendar, AlertCircle, CheckCircle, Heart, TrendingUp, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const PeriodCalculator = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [cyclesToPredict, setCyclesToPredict] = useState("6");
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

  const calculatePeriods = async () => {
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
    const cyclesToPred = parseInt(cyclesToPredict);
    const today = new Date();

    // Calculate current cycle information
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    const currentDayOfCycle = (daysSinceLastPeriod % cycleLen) + 1;
    
    // Calculate next period date
    let nextPeriodDate = new Date(lastPeriod);
    nextPeriodDate.setDate(lastPeriod.getDate() + cycleLen);
    
    // If the calculated next period is in the past, calculate the actual next one
    while (nextPeriodDate <= today) {
      nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLen);
    }
    
    const daysUntilNextPeriod = Math.ceil((nextPeriodDate - today) / (1000 * 60 * 60 * 24));

    // Calculate ovulation date (typically 14 days before next period)
    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(nextPeriodDate.getDate() - 14);
    
    const daysUntilOvulation = Math.ceil((ovulationDate - today) / (1000 * 60 * 60 * 24));

    // Calculate fertile window (5 days before ovulation + ovulation day)
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(ovulationDate.getDate() - 5);
    
    const fertileWindowEnd = ovulationDate;

    // Determine current cycle phase
    let currentPhase, phaseColor, phaseDescription;
    
    if (currentDayOfCycle <= periodLen) {
      currentPhase = "Menstrual Phase";
      phaseColor = "text-red-400";
      phaseDescription = "Menstruation is occurring. Hormone levels are low.";
    } else if (currentDayOfCycle <= Math.floor(cycleLen / 2) - 2) {
      currentPhase = "Follicular Phase";
      phaseColor = "text-blue-400";
      phaseDescription = "Follicles are developing. Estrogen levels are rising.";
    } else if (currentDayOfCycle >= Math.floor(cycleLen / 2) - 1 && currentDayOfCycle <= Math.floor(cycleLen / 2) + 1) {
      currentPhase = "Ovulation";
      phaseColor = "text-green-400";
      phaseDescription = "Egg is being released. Peak fertility window.";
    } else {
      currentPhase = "Luteal Phase";
      phaseColor = "text-purple-400";
      phaseDescription = "Post-ovulation. Progesterone levels are high.";
    }

    // Check if currently in fertile window
    const isCurrentlyFertile = today >= fertileWindowStart && today <= fertileWindowEnd;

    // Generate future period predictions
    const futurePeriods = [];
    let predictedDate = new Date(nextPeriodDate);
    
    for (let i = 0; i < cyclesToPred; i++) {
      const periodEndDate = new Date(predictedDate);
      periodEndDate.setDate(predictedDate.getDate() + periodLen - 1);
      
      // Calculate ovulation for this cycle
      const cycleOvulation = new Date(predictedDate);
      cycleOvulation.setDate(predictedDate.getDate() - 14);
      
      // Calculate fertile window for this cycle
      const cycleFertileStart = new Date(cycleOvulation);
      cycleFertileStart.setDate(cycleOvulation.getDate() - 5);
      
      futurePeriods.push({
        cycle: i + 1,
        periodStart: predictedDate.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        }),
        periodEnd: periodEndDate.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric'
        }),
        ovulation: cycleOvulation.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric'
        }),
        fertileWindow: `${cycleFertileStart.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })} - ${cycleOvulation.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })}`,
        daysAway: Math.ceil((predictedDate - today) / (1000 * 60 * 60 * 24))
      });
      
      // Move to next cycle
      predictedDate = new Date(predictedDate);
      predictedDate.setDate(predictedDate.getDate() + cycleLen);
    }

    // Calculate period end date for current/next period
    const nextPeriodEnd = new Date(nextPeriodDate);
    nextPeriodEnd.setDate(nextPeriodDate.getDate() + periodLen - 1);

    // Calculate average cycle statistics
    const averageCycleStats = {
      cycleLength: cycleLen,
      periodLength: periodLen,
      ovulationDay: cycleLen - 14,
      lutealPhaseLength: 14,
      follicularPhaseLength: cycleLen - 14
    };

    setResult({
      nextPeriodDate: nextPeriodDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      nextPeriodEnd: nextPeriodEnd.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      daysUntilNextPeriod,
      ovulationDate: ovulationDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      daysUntilOvulation,
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
      currentDayOfCycle,
      currentPhase,
      phaseColor,
      phaseDescription,
      isCurrentlyFertile,
      futurePeriods,
      averageCycleStats,
      lastPeriodDate: lastPeriod.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });

    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setLastPeriodDate("");
    setCycleLength("28");
    setPeriodLength("5");
    setCyclesToPredict("6");
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
          <motion.div variants={itemVariants} className="mx-auto mb-4 p-3 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full w-fit">
            <Calendar className="h-8 w-8 text-red-400" />
          </motion.div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Period Calculator
          </CardTitle>
          <motion.p variants={itemVariants} className="text-gray-400 mt-2">
            Track and predict your menstrual cycle with comprehensive period and fertility insights
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="last-period" className="text-sm font-medium text-gray-300">
                  Last Period Start Date *
                </Label>
                <Input
                  id="last-period"
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-red-500 focus:ring-red-500/20 text-white"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Average Cycle Length (days)
                </Label>
                <Select value={cycleLength} onValueChange={setCycleLength}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-red-500 focus:ring-red-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Array.from({ length: 15 }, (_, i) => i + 21).map(days => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days {days === 28 ? "(Average)" : ""}
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
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-red-500 focus:ring-red-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Array.from({ length: 8 }, (_, i) => i + 3).map(days => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days {days === 5 ? "(Average)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Cycles to Predict
                </Label>
                <Select value={cyclesToPredict} onValueChange={setCyclesToPredict}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-red-500 focus:ring-red-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Array.from({ length: 9 }, (_, i) => i + 3).map(cycles => (
                      <SelectItem key={cycles} value={cycles.toString()}>
                        {cycles} cycles
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center space-y-4">
              <Button
                onClick={calculatePeriods}
                disabled={isCalculating}
                className="w-full h-11 sm:h-10 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Periods
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
                className="mt-8 p-6 bg-gradient-to-br from-red-900/20 to-pink-900/20 rounded-xl border border-red-800/30"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Your Period Calendar</h3>
                  <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${result.phaseColor}`}>
                    <Heart className="h-5 w-5" />
                    {result.currentPhase} - Day {result.currentDayOfCycle}
                  </div>
                  <p className="text-gray-400 mt-2">{result.phaseDescription}</p>
                  
                  {result.isCurrentlyFertile && (
                    <div className="mt-2 px-4 py-2 bg-green-900/20 rounded-lg border border-green-800/30">
                      <p className="text-green-400 font-medium">You are currently in your fertile window!</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Cycle Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-red-400 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Current Cycle
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Last Period:</span>
                        <span className="text-white font-medium">{result.lastPeriodDate}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                        <span className="text-gray-400">Next Period:</span>
                        <div className="text-right">
                          <div className="text-red-400 font-semibold">{result.nextPeriodDate}</div>
                          <div className="text-gray-500 text-xs">
                            {result.daysUntilNextPeriod > 0 ? `${result.daysUntilNextPeriod} days` : "Due now"}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Period Duration:</span>
                        <span className="text-white font-medium">
                          {result.nextPeriodDate} - {result.nextPeriodEnd}
                        </span>
                      </div>

                      <div className="p-3 bg-pink-900/20 rounded-lg border border-pink-800/30">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Fertile Window:</span>
                        </div>
                        <div className="text-pink-400 font-medium text-sm">
                          {result.fertileWindowStart} to {result.fertileWindowEnd}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          Ovulation: {result.ovulationDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cycle Statistics */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Cycle Statistics
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Cycle Length:</span>
                        <span className="text-white font-medium">{result.averageCycleStats.cycleLength} days</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Period Length:</span>
                        <span className="text-white font-medium">{result.averageCycleStats.periodLength} days</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Ovulation Day:</span>
                        <span className="text-white font-medium">Day {result.averageCycleStats.ovulationDay}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Luteal Phase:</span>
                        <span className="text-white font-medium">{result.averageCycleStats.lutealPhaseLength} days</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Follicular Phase:</span>
                        <span className="text-white font-medium">{result.averageCycleStats.follicularPhaseLength} days</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Future Period Predictions */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Future Period Predictions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                    {result.futurePeriods.map((period, index) => (
                      <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-white font-medium">Period {period.cycle}</span>
                          <span className="text-gray-400 text-xs">{period.daysAway} days</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="text-red-300">{period.periodStart} - {period.periodEnd}</div>
                          <div className="text-pink-300">Ovulation: {period.ovulation}</div>
                          <div className="text-purple-300 text-xs">Fertile: {period.fertileWindow}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Period Health Tips */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-lg border border-green-800/30">
                  <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Period Health Tips
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Track your cycle regularly to identify patterns and irregularities</li>
                    <li>• Stay hydrated and maintain a balanced diet rich in iron and calcium</li>
                    <li>• Exercise regularly to reduce cramps and improve mood</li>
                    <li>• Get adequate sleep and manage stress levels</li>
                    <li>• Use heat therapy for cramp relief and consider pain relief if needed</li>
                    <li>• Consult a healthcare provider if cycles are irregular or painful</li>
                  </ul>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-200 text-sm">
                      <strong>Medical Disclaimer:</strong> Period predictions are estimates based on your cycle pattern. 
                      Individual cycles can vary due to stress, illness, lifestyle changes, or medical conditions. 
                      Consult a healthcare provider for irregular periods or reproductive health concerns.
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

export default PeriodCalculator;