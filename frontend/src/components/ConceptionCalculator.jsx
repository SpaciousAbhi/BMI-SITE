import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, RotateCcw, Baby, AlertCircle, CheckCircle, Calendar, Heart, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const ConceptionCalculator = () => {
  const [calculationMethod, setCalculationMethod] = useState("due-date");
  const [dueDate, setDueDate] = useState("");
  const [birthDate, setBirthDate] = useState("");
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

  const calculateConception = async () => {
    if (calculationMethod === "due-date" && !dueDate) {
      toast({
        title: "Missing Information",
        description: "Please enter the due date.",
        variant: "destructive",
      });
      return;
    }
    
    if (calculationMethod === "birth-date" && !birthDate) {
      toast({
        title: "Missing Information",
        description: "Please enter the birth date.",
        variant: "destructive",
      });
      return;
    }

    if (calculationMethod === "lmp" && !lastMenstrualPeriod) {
      toast({
        title: "Missing Information",
        description: "Please enter your last menstrual period date.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    let conceptionDate, estimatedDueDate, lmpDate;
    const cycleLen = parseInt(cycleLength);

    if (calculationMethod === "due-date") {
      const dueDateObj = new Date(dueDate);
      // Conception typically occurs 266 days before due date
      conceptionDate = new Date(dueDateObj);
      conceptionDate.setDate(dueDateObj.getDate() - 266);
      
      // Calculate LMP (14 days before conception for average cycle)
      const ovulationDaysFromLMP = cycleLen - 14;
      lmpDate = new Date(conceptionDate);
      lmpDate.setDate(conceptionDate.getDate() - ovulationDaysFromLMP);
      
      estimatedDueDate = dueDateObj;
    } else if (calculationMethod === "birth-date") {
      const birthDateObj = new Date(birthDate);
      // Average pregnancy is 280 days from LMP, 266 from conception
      // If baby was born, work backwards
      conceptionDate = new Date(birthDateObj);
      conceptionDate.setDate(birthDateObj.getDate() - 266);
      
      // Calculate LMP
      const ovulationDaysFromLMP = cycleLen - 14;
      lmpDate = new Date(conceptionDate);
      lmpDate.setDate(conceptionDate.getDate() - ovulationDaysFromLMP);
      
      // Calculate what the due date would have been
      estimatedDueDate = new Date(lmpDate);
      estimatedDueDate.setDate(lmpDate.getDate() + 280);
    } else {
      // From LMP
      lmpDate = new Date(lastMenstrualPeriod);
      
      // Calculate conception date (ovulation typically occurs cycleLength - 14 days from LMP)
      const ovulationDaysFromLMP = cycleLen - 14;
      conceptionDate = new Date(lmpDate);
      conceptionDate.setDate(lmpDate.getDate() + ovulationDaysFromLMP);
      
      // Calculate due date using Naegele's rule
      estimatedDueDate = new Date(lmpDate);
      estimatedDueDate.setDate(lmpDate.getDate() + 280);
    }

    // Calculate conception window (sperm can survive up to 5 days)
    const conceptionWindowStart = new Date(conceptionDate);
    conceptionWindowStart.setDate(conceptionDate.getDate() - 5);
    
    const conceptionWindowEnd = new Date(conceptionDate);
    conceptionWindowEnd.setDate(conceptionDate.getDate() + 1);

    // Calculate ovulation window (24-48 hours)
    const ovulationStart = new Date(conceptionDate);
    const ovulationEnd = new Date(conceptionDate);
    ovulationEnd.setDate(conceptionDate.getDate() + 1);

    // Calculate weeks pregnant at conception
    const weeksAtConception = 2; // Gestational age starts from LMP

    // Calculate current gestational age if currently pregnant
    const today = new Date();
    const daysSinceLMP = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
    const currentGestationalWeeks = Math.floor(daysSinceLMP / 7);
    const currentGestationalDays = daysSinceLMP % 7;

    // Calculate zodiac sign if birth date is known
    let zodiacSign = "";
    if (calculationMethod === "birth-date") {
      const month = new Date(birthDate).getMonth() + 1;
      const day = new Date(birthDate).getDate();
      
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacSign = "Aries";
      else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacSign = "Taurus";
      else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacSign = "Gemini";
      else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacSign = "Cancer";
      else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacSign = "Leo";
      else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacSign = "Virgo";
      else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacSign = "Libra";
      else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacSign = "Scorpio";
      else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacSign = "Sagittarius";
      else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacSign = "Capricorn";
      else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacSign = "Aquarius";
      else zodiacSign = "Pisces";
    }

    // Calculate Chinese zodiac for birth year
    let chineseZodiac = "";
    if (calculationMethod === "birth-date") {
      const birthYear = new Date(birthDate).getFullYear();
      const animals = ["Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat"];
      chineseZodiac = animals[birthYear % 12];
    }

    setResult({
      conceptionDate: conceptionDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      conceptionWindowStart: conceptionWindowStart.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      conceptionWindowEnd: conceptionWindowEnd.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      ovulationStart: ovulationStart.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      ovulationEnd: ovulationEnd.toLocaleDateString('en-US', { 
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
      estimatedDueDate: estimatedDueDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      weeksAtConception,
      currentGestationalWeeks: calculationMethod !== "birth-date" ? currentGestationalWeeks : null,
      currentGestationalDays: calculationMethod !== "birth-date" ? currentGestationalDays : null,
      zodiacSign,
      chineseZodiac,
      calculationMethod,
      cycleLength: cycleLen,
      birthDateProvided: calculationMethod === "birth-date" ? birthDate : null
    });

    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setDueDate("");
    setBirthDate("");
    setLastMenstrualPeriod("");
    setCycleLength("28");
    setCalculationMethod("due-date");
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
          <motion.div variants={itemVariants} className="mx-auto mb-4 p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full w-fit">
            <Baby className="h-8 w-8 text-purple-400" />
          </motion.div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Conception Calculator
          </CardTitle>
          <motion.p variants={itemVariants} className="text-gray-400 mt-2">
            Calculate when conception occurred based on due date, birth date, or last menstrual period
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">Calculation Method</Label>
                <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                  <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="due-date">From Due Date</SelectItem>
                    <SelectItem value="birth-date">From Birth Date</SelectItem>
                    <SelectItem value="lmp">From Last Menstrual Period</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {calculationMethod === "due-date" && (
                <div className="space-y-2">
                  <Label htmlFor="due-date" className="text-sm font-medium text-gray-300">
                    Due Date *
                  </Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 text-white"
                  />
                </div>
              )}

              {calculationMethod === "birth-date" && (
                <div className="space-y-2">
                  <Label htmlFor="birth-date" className="text-sm font-medium text-gray-300">
                    Birth Date *
                  </Label>
                  <Input
                    id="birth-date"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 text-white"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}

              {calculationMethod === "lmp" && (
                <div className="space-y-2">
                  <Label htmlFor="lmp" className="text-sm font-medium text-gray-300">
                    Last Menstrual Period *
                  </Label>
                  <Input
                    id="lmp"
                    type="date"
                    value={lastMenstrualPeriod}
                    onChange={(e) => setLastMenstrualPeriod(e.target.value)}
                    className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 text-white"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}

              {(calculationMethod === "lmp" || calculationMethod === "due-date" || calculationMethod === "birth-date") && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">
                    Average Cycle Length (days)
                  </Label>
                  <Select value={cycleLength} onValueChange={setCycleLength}>
                    <SelectTrigger className="h-11 sm:h-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 text-white">
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
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center space-y-4">
              <Button
                onClick={calculateConception}
                disabled={isCalculating}
                className="w-full h-11 sm:h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Conception
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
                className="mt-8 p-6 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl border border-purple-800/30"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Conception Results</h3>
                  <div className="text-xl font-semibold text-purple-400 flex items-center justify-center gap-2">
                    <Heart className="h-6 w-6" />
                    {result.conceptionDate}
                  </div>
                  <p className="text-gray-400 mt-2">Most likely conception date</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Conception Details */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                      <Baby className="h-5 w-5" />
                      Conception Details
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                        <div className="text-gray-400 text-sm mb-1">Conception Window:</div>
                        <div className="text-purple-300 font-medium text-sm">
                          {result.conceptionWindowStart} to {result.conceptionWindowEnd}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">6-day fertile window</div>
                      </div>
                      
                      <div className="p-3 bg-indigo-900/20 rounded-lg border border-indigo-800/30">
                        <div className="text-gray-400 text-sm mb-1">Ovulation Period:</div>
                        <div className="text-indigo-300 font-medium text-sm">
                          {result.ovulationStart} to {result.ovulationEnd}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">24-48 hour window</div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Last Menstrual Period:</span>
                        <span className="text-white font-medium">{result.lmpDate}</span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Estimated Due Date:</span>
                        <span className="text-white font-medium">{result.estimatedDueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Additional Information
                    </h4>
                    <div className="space-y-3">
                      {result.currentGestationalWeeks !== null && (
                        <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                          <div className="text-gray-400 text-sm mb-1">Current Status:</div>
                          <div className="text-green-300 font-medium">
                            {result.currentGestationalWeeks} weeks, {result.currentGestationalDays} days pregnant
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Cycle Length Used:</span>
                        <span className="text-white font-medium">{result.cycleLength} days</span>
                      </div>

                      {result.zodiacSign && (
                        <div className="flex justify-between items-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                          <span className="text-gray-400">Zodiac Sign:</span>
                          <span className="text-yellow-300 font-medium">{result.zodiacSign}</span>
                        </div>
                      )}

                      {result.chineseZodiac && (
                        <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                          <span className="text-gray-400">Chinese Zodiac:</span>
                          <span className="text-red-300 font-medium">{result.chineseZodiac}</span>
                        </div>
                      )}

                      <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                        <div className="text-gray-400 text-sm mb-1">Calculation Method:</div>
                        <div className="text-blue-300 font-medium text-sm">
                          {result.calculationMethod === "due-date" && "Based on due date"}
                          {result.calculationMethod === "birth-date" && "Based on birth date"}
                          {result.calculationMethod === "lmp" && "Based on last menstrual period"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Understanding Conception */}
                <div className="mt-6 p-4 bg-gradient-to-r from-teal-900/20 to-cyan-900/20 rounded-lg border border-teal-800/30">
                  <h4 className="text-lg font-semibold text-teal-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Understanding Conception
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Conception occurs when sperm fertilizes the egg, typically during ovulation</li>
                    <li>• Sperm can survive in the female reproductive tract for up to 5 days</li>
                    <li>• The egg is viable for fertilization for about 24 hours after ovulation</li>
                    <li>• Implantation occurs 6-12 days after conception</li>
                    <li>• Pregnancy hormones (hCG) become detectable 10-14 days after conception</li>
                    <li>• These calculations are estimates; actual conception timing can vary</li>
                  </ul>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-200 text-sm">
                      <strong>Medical Disclaimer:</strong> Conception date calculations are estimates based on 
                      average cycle patterns and medical formulas. Individual cycles and ovulation timing can vary. 
                      For accurate pregnancy dating, consult your healthcare provider and consider ultrasound confirmation.
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

export default ConceptionCalculator;