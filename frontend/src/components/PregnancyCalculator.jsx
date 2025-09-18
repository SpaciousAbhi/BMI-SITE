import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Heart, AlertCircle, CheckCircle, Target, Baby, Calendar, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const PregnancyCalculator = () => {
  const [lastMenstrualPeriod, setLastMenstrualPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
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

  const calculatePregnancy = async () => {
    if (!lastMenstrualPeriod) {
      toast({
        title: "Missing Information",
        description: "Please enter your last menstrual period date.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    // Add delay for animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lmpDate = new Date(lastMenstrualPeriod);
    const today = new Date();
    const cycleLen = parseInt(cycleLength);

    // Calculate conception date (ovulation typically 14 days before next period)
    const ovulationDaysFromLMP = cycleLen - 14;
    const conceptionDate = new Date(lmpDate);
    conceptionDate.setDate(lmpDate.getDate() + ovulationDaysFromLMP);

    // Calculate due date using Naegele's rule (280 days from LMP)
    const dueDate = new Date(lmpDate);
    dueDate.setDate(lmpDate.getDate() + 280);

    // Calculate gestational age in days and weeks
    const gestationalAgeDays = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
    const gestationalWeeks = Math.floor(gestationalAgeDays / 7);
    const remainingDays = gestationalAgeDays % 7;

    // Determine trimester
    let trimester, trimesterWeek;
    if (gestationalWeeks <= 13) {
      trimester = "First";
      trimesterWeek = gestationalWeeks;
    } else if (gestationalWeeks <= 26) {
      trimester = "Second";
      trimesterWeek = gestationalWeeks - 13;
    } else {
      trimester = "Third";
      trimesterWeek = gestationalWeeks - 26;
    }

    // Calculate days until due date
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    // Pregnancy progress percentage
    const progressPercentage = Math.min(100, (gestationalAgeDays / 280) * 100);

    // Development milestones
    const getMilestone = (weeks) => {
      if (weeks < 4) return "Implantation occurring";
      if (weeks < 6) return "Heart begins to beat";
      if (weeks < 8) return "Major organs forming";
      if (weeks < 12) return "All organs present";
      if (weeks < 16) return "Gender can be determined";
      if (weeks < 20) return "Movements can be felt";
      if (weeks < 24) return "Rapid brain development";
      if (weeks < 28) return "Eyes open and close";
      if (weeks < 32) return "Bones hardening";
      if (weeks < 36) return "Lungs maturing";
      if (weeks < 40) return "Full-term development";
      return "Post-term pregnancy";
    };

    const currentMilestone = getMilestone(gestationalWeeks);

    setResult({
      gestationalWeeks,
      remainingDays,
      gestationalAgeDays,
      dueDate: dueDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      conceptionDate: conceptionDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      trimester,
      trimesterWeek,
      daysUntilDue,
      progressPercentage,
      currentMilestone,
      lmpDate: lmpDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });

    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setLastMenstrualPeriod("");
    setCycleLength("28");
    setResult(null);
  };

  const getStatusColor = (weeks) => {
    if (weeks < 12) return "text-blue-400";
    if (weeks < 28) return "text-green-400"; 
    return "text-purple-400";
  };

  const getStatusIcon = (weeks) => {
    if (weeks < 12) return <Heart className="h-5 w-5" />;
    if (weeks < 28) return <Baby className="h-5 w-5" />;
    return <Target className="h-5 w-5" />;
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
          <motion.div variants={itemVariants} className="mx-auto mb-4 p-3 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full w-fit">
            <Baby className="h-8 w-8 text-pink-400" />
          </motion.div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Advanced Pregnancy Calculator
          </CardTitle>
          <motion.p variants={itemVariants} className="text-gray-400 mt-2">
            Track your pregnancy journey with precise gestational age, due date, and developmental milestones
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lmp" className="text-sm font-medium text-gray-300">
                  Last Menstrual Period (LMP) *
                </Label>
                <Input
                  id="lmp"
                  type="date"
                  value={lastMenstrualPeriod}
                  onChange={(e) => setLastMenstrualPeriod(e.target.value)}
                  className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-pink-500 focus:ring-pink-500/20 text-white"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cycle-length" className="text-sm font-medium text-gray-300">
                  Average Cycle Length (days)
                </Label>
                <Select value={cycleLength} onValueChange={setCycleLength}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-pink-500 focus:ring-pink-500/20 text-white w-full">
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
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center space-y-4">
              <Button
                onClick={calculatePregnancy}
                disabled={isCalculating}
                className="w-full h-11 sm:h-10 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Pregnancy
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
                className="mt-8 p-6 bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-xl border border-pink-800/30"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Your Pregnancy Status</h3>
                  <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${getStatusColor(result.gestationalWeeks)}`}>
                    {getStatusIcon(result.gestationalWeeks)}
                    {result.gestationalWeeks} weeks, {result.remainingDays} days
                  </div>
                  <p className="text-gray-400 mt-2">{result.trimester} Trimester - Week {result.trimesterWeek}</p>
                </div>

                {/* Pregnancy Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Pregnancy Progress</span>
                    <span>{result.progressPercentage.toFixed(1)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${result.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Dates */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Important Dates
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Last Period:</span>
                        <span className="text-white font-medium">{result.lmpDate}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Conception Date:</span>
                        <span className="text-white font-medium">{result.conceptionDate}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-pink-900/20 rounded-lg border border-pink-800/30">
                        <span className="text-gray-400">Due Date:</span>
                        <span className="text-pink-400 font-semibold">{result.dueDate}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Days Until Due:</span>
                        <span className="text-white font-medium">{result.daysUntilDue} days</span>
                      </div>
                    </div>
                  </div>

                  {/* Development Info */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                      <Baby className="h-5 w-5" />
                      Baby Development
                    </h4>
                    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/30">
                      <p className="text-white font-medium mb-2">Current Milestone:</p>
                      <p className="text-purple-300">{result.currentMilestone}</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-white font-medium mb-2">Trimester Info:</p>
                      <p className="text-gray-300 text-sm">
                        You are in the {result.trimester.toLowerCase()} trimester, which is week {result.trimesterWeek} of this phase.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Health Recommendations */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-800/30">
                  <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Health Recommendations
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Take prenatal vitamins with folic acid daily</li>
                    <li>• Attend regular prenatal checkups</li>
                    <li>• Maintain a healthy, balanced diet</li>
                    <li>• Stay hydrated and get adequate rest</li>
                    <li>• Avoid alcohol, smoking, and harmful substances</li>
                    <li>• Exercise moderately as approved by your healthcare provider</li>
                  </ul>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-200 text-sm">
                      <strong>Medical Disclaimer:</strong> This calculator provides estimates based on standard formulas. 
                      Due dates can vary ±2 weeks. Always consult your healthcare provider for personalized medical advice 
                      and accurate pregnancy dating via ultrasound.
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

export default PregnancyCalculator;