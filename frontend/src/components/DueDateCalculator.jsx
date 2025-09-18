import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Calendar, AlertCircle, CheckCircle, Baby, Clock, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const DueDateCalculator = () => {
  const [calculationMethod, setCalculationMethod] = useState("lmp");
  const [lastMenstrualPeriod, setLastMenstrualPeriod] = useState("");
  const [conceptionDate, setConceptionDate] = useState("");
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

  const calculateDueDate = async () => {
    if (calculationMethod === "lmp" && !lastMenstrualPeriod) {
      toast({
        title: "Missing Information",
        description: "Please enter your last menstrual period date.",
        variant: "destructive",
      });
      return;
    }

    if (calculationMethod === "conception" && !conceptionDate) {
      toast({
        title: "Missing Information", 
        description: "Please enter your conception date.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    let dueDate, lmpDate, estimatedConceptionDate;
    const today = new Date();
    const cycleLen = parseInt(cycleLength);

    if (calculationMethod === "lmp") {
      lmpDate = new Date(lastMenstrualPeriod);
      // Naegele's Rule: LMP + 280 days
      dueDate = new Date(lmpDate);
      dueDate.setDate(lmpDate.getDate() + 280);
      
      // Estimate conception date (typically 14 days before next expected period)
      const ovulationDaysFromLMP = cycleLen - 14;
      estimatedConceptionDate = new Date(lmpDate);
      estimatedConceptionDate.setDate(lmpDate.getDate() + ovulationDaysFromLMP);
    } else {
      estimatedConceptionDate = new Date(conceptionDate);
      // Due date = conception date + 266 days
      dueDate = new Date(estimatedConceptionDate);
      dueDate.setDate(estimatedConceptionDate.getDate() + 266);
      
      // Calculate LMP (conception date - ovulation day)
      const ovulationDaysFromLMP = cycleLen - 14;
      lmpDate = new Date(estimatedConceptionDate);
      lmpDate.setDate(estimatedConceptionDate.getDate() - ovulationDaysFromLMP);
    }

    // Calculate gestational age
    const gestationalAgeDays = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
    const gestationalWeeks = Math.floor(gestationalAgeDays / 7);
    const remainingDays = gestationalAgeDays % 7;

    // Calculate days until due date
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    // Calculate pregnancy percentage
    const progressPercentage = Math.min(100, Math.max(0, (gestationalAgeDays / 280) * 100));

    // Determine trimester
    let trimester;
    if (gestationalWeeks <= 13) {
      trimester = "First Trimester (Weeks 1-13)";
    } else if (gestationalWeeks <= 26) {
      trimester = "Second Trimester (Weeks 14-26)";
    } else {
      trimester = "Third Trimester (Weeks 27-40)";
    }

    // Calculate important milestone dates
    const milestones = [
      {
        name: "First Trimester Ends",
        date: new Date(lmpDate.getTime() + (13 * 7 * 24 * 60 * 60 * 1000)),
        week: 13
      },
      {
        name: "Anatomy Scan (18-22 weeks)",
        date: new Date(lmpDate.getTime() + (20 * 7 * 24 * 60 * 60 * 1000)),
        week: 20
      },
      {
        name: "Viability (24 weeks)",
        date: new Date(lmpDate.getTime() + (24 * 7 * 24 * 60 * 60 * 1000)),
        week: 24
      },
      {
        name: "Third Trimester Begins",
        date: new Date(lmpDate.getTime() + (27 * 7 * 24 * 60 * 60 * 1000)),
        week: 27
      },
      {
        name: "Full Term (37 weeks)",
        date: new Date(lmpDate.getTime() + (37 * 7 * 24 * 60 * 60 * 1000)),
        week: 37
      }
    ];

    // Calculate date range for birth (37-42 weeks)
    const earlyTermDate = new Date(lmpDate);
    earlyTermDate.setDate(lmpDate.getDate() + (37 * 7));
    
    const lateTermDate = new Date(lmpDate);
    lateTermDate.setDate(lmpDate.getDate() + (42 * 7));

    setResult({
      dueDate: dueDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      lmpDate: lmpDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      conceptionDate: estimatedConceptionDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      gestationalWeeks,
      remainingDays,
      gestationalAgeDays,
      daysUntilDue,
      progressPercentage,
      trimester,
      milestones,
      earlyTermDate: earlyTermDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      lateTermDate: lateTermDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      calculationMethod
    });

    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setLastMenstrualPeriod("");
    setConceptionDate("");
    setCycleLength("28");
    setCalculationMethod("lmp");
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
          <motion.div variants={itemVariants} className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full w-fit">
            <Calendar className="h-8 w-8 text-blue-400" />
          </motion.div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Due Date Calculator
          </CardTitle>
          <motion.p variants={itemVariants} className="text-gray-400 mt-2">
            Calculate your due date using LMP or conception date with medical precision
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">Calculation Method</Label>
                <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="lmp">Last Menstrual Period (LMP)</SelectItem>
                    <SelectItem value="conception">Conception Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {calculationMethod === "lmp" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="lmp" className="text-sm font-medium text-gray-300">
                      Last Menstrual Period Date *
                    </Label>
                    <Input
                      id="lmp"
                      type="date"
                      value={lastMenstrualPeriod}
                      onChange={(e) => setLastMenstrualPeriod(e.target.value)}
                      className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 text-white"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">
                      Average Cycle Length (days)
                    </Label>
                    <Select value={cycleLength} onValueChange={setCycleLength}>
                      <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 text-white">
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
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="conception" className="text-sm font-medium text-gray-300">
                    Conception Date *
                  </Label>
                  <Input
                    id="conception"
                    type="date"
                    value={conceptionDate}
                    onChange={(e) => setConceptionDate(e.target.value)}
                    className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 text-white"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center space-y-4">
              <Button
                onClick={calculateDueDate}
                disabled={isCalculating}
                className="w-full h-11 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Due Date
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
                className="mt-8 p-6 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-xl border border-blue-800/30"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Your Due Date Results</h3>
                  <div className="text-xl font-semibold text-blue-400 flex items-center justify-center gap-2">
                    <Calendar className="h-6 w-6" />
                    {result.dueDate}
                  </div>
                  {result.daysUntilDue > 0 ? (
                    <p className="text-gray-400 mt-2">{result.daysUntilDue} days to go!</p>
                  ) : (
                    <p className="text-orange-400 mt-2">Past due date - consult your healthcare provider</p>
                  )}
                </div>

                {/* Pregnancy Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Pregnancy Progress</span>
                    <span>{result.progressPercentage.toFixed(1)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(100, result.progressPercentage)}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-blue-400 font-medium">
                      {result.gestationalWeeks} weeks, {result.remainingDays} days
                    </span>
                    <span className="text-gray-400 ml-2">• {result.trimester}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Dates */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Important Dates
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Last Menstrual Period:</span>
                        <span className="text-white font-medium">{result.lmpDate}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Estimated Conception:</span>
                        <span className="text-white font-medium">{result.conceptionDate}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                        <span className="text-gray-400">Due Date:</span>
                        <span className="text-blue-400 font-semibold">{result.dueDate}</span>
                      </div>
                      <div className="p-3 bg-indigo-900/20 rounded-lg border border-indigo-800/30">
                        <div className="text-gray-400 text-sm mb-1">Expected Birth Window:</div>
                        <div className="text-indigo-300 font-medium">
                          {result.earlyTermDate} to {result.lateTermDate}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">(37-42 weeks)</div>
                      </div>
                    </div>
                  </div>

                  {/* Pregnancy Milestones */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                      <Baby className="h-5 w-5" />
                      Upcoming Milestones
                    </h4>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {result.milestones
                        .filter(milestone => milestone.date > new Date())
                        .slice(0, 5)
                        .map((milestone, index) => (
                          <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-white font-medium text-sm">{milestone.name}</p>
                                <p className="text-gray-400 text-xs">Week {milestone.week}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-indigo-300 text-sm font-medium">
                                  {milestone.date.toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  {Math.ceil((milestone.date - new Date()) / (1000 * 60 * 60 * 24))} days
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-lg border border-green-800/30">
                  <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Important Information
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Only 5% of babies are born exactly on their due date</li>
                    <li>• Normal delivery can occur anywhere from 37-42 weeks</li>
                    <li>• First-time mothers often deliver 1-2 days after their due date</li>
                    <li>• Ultrasound dating may be more accurate than LMP calculations</li>
                    <li>• Regular prenatal care is essential throughout pregnancy</li>
                  </ul>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-200 text-sm">
                      <strong>Medical Disclaimer:</strong> This calculator provides estimates based on standard 
                      formulas. Actual due dates may vary. Ultrasound dating is more accurate than LMP calculations. 
                      Always consult your healthcare provider for official pregnancy dating and medical advice.
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

export default DueDateCalculator;