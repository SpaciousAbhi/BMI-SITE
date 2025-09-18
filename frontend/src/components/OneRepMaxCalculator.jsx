import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dumbbell, TrendingUp, Target, Award, Zap, BarChart3 } from "lucide-react";

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [reps, setReps] = useState('');
  const [exercise, setExercise] = useState('');
  const [experience, setExperience] = useState('intermediate');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // One Rep Max formulas with their characteristics
  const formulas = {
    epley: {
      name: 'Epley Formula',
      calculate: (weight, reps) => weight * (1 + reps / 30),
      accuracy: 'High for 1-10 reps',
      bestFor: 'General use, most popular'
    },
    brzycki: {
      name: 'Brzycki Formula',
      calculate: (weight, reps) => weight * (36 / (37 - reps)),
      accuracy: 'High for 2-10 reps',
      bestFor: 'Lower rep ranges'
    },
    lander: {
      name: 'Lander Formula',
      calculate: (weight, reps) => (100 * weight) / (101.3 - 2.67123 * reps),
      accuracy: 'Good for 2-10 reps',
      bestFor: 'Conservative estimates'
    },
    lombardi: {
      name: 'Lombardi Formula',
      calculate: (weight, reps) => weight * Math.pow(reps, 0.10),
      accuracy: 'Good for 1-15 reps',
      bestFor: 'Higher rep ranges'
    },
    mayhew: {
      name: 'Mayhew Formula',
      calculate: (weight, reps) => (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps)),
      accuracy: 'Good for 1-15 reps',
      bestFor: 'Research-based'
    },
    oconner: {
      name: "O'Conner Formula",
      calculate: (weight, reps) => weight * (1 + 0.025 * reps),
      accuracy: 'Good for 1-15 reps',
      bestFor: 'Conservative approach'
    },
    wathan: {
      name: 'Wathan Formula',
      calculate: (weight, reps) => (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps)),
      accuracy: 'Good for 1-15 reps',
      bestFor: 'Scientific approach'
    }
  };

  // Exercise categories for strength standards
  const exercises = {
    'bench-press': { name: 'Bench Press', category: 'chest', multiplier: 1.0 },
    'squat': { name: 'Squat', category: 'legs', multiplier: 1.3 },
    'deadlift': { name: 'Deadlift', category: 'back', multiplier: 1.5 },
    'overhead-press': { name: 'Overhead Press', category: 'shoulders', multiplier: 0.6 },
    'barbell-row': { name: 'Barbell Row', category: 'back', multiplier: 0.8 },
    'incline-bench': { name: 'Incline Bench Press', category: 'chest', multiplier: 0.85 },
    'dumbbell-press': { name: 'Dumbbell Press', category: 'chest', multiplier: 0.8 },
    'leg-press': { name: 'Leg Press', category: 'legs', multiplier: 2.0 },
    'pull-up': { name: 'Pull Up (Weighted)', category: 'back', multiplier: 0.7 },
    'dip': { name: 'Dip (Weighted)', category: 'chest', multiplier: 0.75 }
  };

  // Strength standards (multipliers of body weight)
  const strengthStandards = {
    beginner: { bench: 0.5, squat: 0.75, deadlift: 1.0, overhead: 0.35 },
    novice: { bench: 0.75, squat: 1.0, deadlift: 1.25, overhead: 0.5 },
    intermediate: { bench: 1.0, squat: 1.25, deadlift: 1.5, overhead: 0.65 },
    advanced: { bench: 1.5, squat: 1.75, deadlift: 2.0, overhead: 0.9 },
    elite: { bench: 2.0, squat: 2.25, deadlift: 2.5, overhead: 1.1 }
  };

  const calculateOneRepMax = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const weightNum = parseFloat(weight);
        const repsNum = parseInt(reps);
        
        if (repsNum > 15) {
          alert('For accuracy, please use 15 reps or fewer');
          setLoading(false);
          return;
        }

        // Calculate 1RM using all formulas
        const results = {};
        Object.keys(formulas).forEach(key => {
          results[key] = Math.round(formulas[key].calculate(weightNum, repsNum));
        });

        // Calculate average and range
        const values = Object.values(results);
        const average = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
        const min = Math.min(...values);
        const max = Math.max(...values);

        // Generate percentage-based training zones
        const trainingZones = generateTrainingZones(average);

        // Calculate rep ranges for different percentages
        const repRanges = generateRepRanges(average);

        // Generate strength standards comparison if exercise is selected
        let strengthComparison = null;
        if (exercise && exercises[exercise]) {
          strengthComparison = generateStrengthComparison(average, exercise);
        }

        // Progressive overload recommendations
        const progressiveOverload = generateProgressiveOverload(weightNum, repsNum, average);

        setResult({
          formulas: results,
          average: average,
          range: { min, max },
          trainingZones: trainingZones,
          repRanges: repRanges,
          strengthComparison: strengthComparison,
          progressiveOverload: progressiveOverload,
          originalWeight: weightNum,
          originalReps: repsNum,
          weightUnit: weightUnit
        });
      } catch (error) {
        console.error('Calculation error:', error);
      }
      setLoading(false);
    }, 800);
  };

  const generateTrainingZones = (oneRepMax) => {
    return [
      { zone: 'Strength Endurance', percentage: '50-65%', weight: Math.round(oneRepMax * 0.575), reps: '12-20+', color: 'blue' },
      { zone: 'Hypertrophy', percentage: '65-80%', weight: Math.round(oneRepMax * 0.725), reps: '6-12', color: 'green' },
      { zone: 'Strength', percentage: '80-90%', weight: Math.round(oneRepMax * 0.85), reps: '3-6', color: 'orange' },
      { zone: 'Power/Max Strength', percentage: '90-100%', weight: Math.round(oneRepMax * 0.95), reps: '1-3', color: 'red' },
    ];
  };

  const generateRepRanges = (oneRepMax) => {
    const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
    return percentages.map(percent => ({
      percentage: `${percent}%`,
      weight: Math.round(oneRepMax * (percent / 100)),
      expectedReps: getExpectedReps(percent)
    }));
  };

  const getExpectedReps = (percentage) => {
    if (percentage >= 95) return '1';
    if (percentage >= 90) return '2-3';
    if (percentage >= 85) return '3-5';
    if (percentage >= 80) return '5-7';
    if (percentage >= 75) return '7-9';
    if (percentage >= 70) return '9-11';
    if (percentage >= 65) return '11-13';
    if (percentage >= 60) return '13-15';
    if (percentage >= 55) return '15-17';
    return '17+';
  };

  const generateStrengthComparison = (oneRepMax, exerciseKey) => {
    // This would need body weight input for accurate comparison
    // For now, we'll provide general strength level indicators
    const exerciseData = exercises[exerciseKey];
    const categories = ['beginner', 'novice', 'intermediate', 'advanced', 'elite'];
    
    return categories.map(level => ({
      level: level.charAt(0).toUpperCase() + level.slice(1),
      description: getStrengthDescription(level),
      color: getStrengthColor(level)
    }));
  };

  const getStrengthDescription = (level) => {
    const descriptions = {
      beginner: 'New to lifting, learning form',
      novice: '6-12 months of training',
      intermediate: '1-2 years of consistent training',
      advanced: '3-5 years of dedicated training',
      elite: 'Competitive level, 5+ years'
    };
    return descriptions[level];
  };

  const getStrengthColor = (level) => {
    const colors = {
      beginner: 'gray',
      novice: 'blue',
      intermediate: 'green',
      advanced: 'orange',
      elite: 'red'
    };
    return colors[level];
  };

  const generateProgressiveOverload = (currentWeight, currentReps, oneRepMax) => {
    const recommendations = [];
    
    // Weight progression recommendation
    const nextWeight = Math.round(currentWeight * 1.025); // 2.5% increase
    recommendations.push({
      type: 'Weight Progression',
      suggestion: `Try ${nextWeight}${weightUnit === 'kg' ? 'kg' : 'lbs'} for ${currentReps} reps next session`,
      explanation: 'Small 2.5% weight increases ensure consistent progression'
    });
    
    // Rep progression recommendation
    if (currentReps < 8) {
      recommendations.push({
        type: 'Rep Progression',
        suggestion: `Try ${currentWeight}${weightUnit === 'kg' ? 'kg' : 'lbs'} for ${currentReps + 1} reps`,
        explanation: 'Adding one rep builds endurance and strength'
      });
    }
    
    // Volume recommendation
    const targetVolume = Math.round(oneRepMax * 0.75 * 5 * 3); // 75% x 5 reps x 3 sets
    recommendations.push({
      type: 'Volume Target',
      suggestion: `Aim for ${Math.round(oneRepMax * 0.75)}${weightUnit === 'kg' ? 'kg' : 'lbs'} × 5 reps × 3 sets`,
      explanation: 'Optimal volume for strength development'
    });
    
    return recommendations;
  };

  const resetForm = () => {
    setWeight('');
    setReps('');
    setExercise('');
    setResult(null);
  };

  const isFormValid = () => {
    return weight && reps && parseInt(reps) >= 1 && parseInt(reps) <= 15;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-purple-500/10 mr-4">
              <Dumbbell className="h-8 w-8 text-purple-400" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Advanced One Rep Max Calculator
            </CardTitle>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Calculate your one-rep maximum using 7 proven formulas. Get training zones, rep ranges, and progressive overload recommendations.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Input Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-white font-semibold">Weight Lifted *</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                  step="0.5"
                />
                <Select value={weightUnit} onValueChange={setWeightUnit}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-white font-semibold">Repetitions Completed *</Label>
              <Input
                type="number"
                placeholder="Enter reps (1-15)"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                min="1"
                max="15"
              />
              <p className="text-xs text-gray-400">For best accuracy, use 15 reps or fewer</p>
            </div>
          </div>

          {/* Optional Exercise Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-white font-semibold">Exercise (Optional)</Label>
              <Select value={exercise} onValueChange={setExercise}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select exercise for strength standards" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {Object.entries(exercises).map(([key, ex]) => (
                    <SelectItem key={key} value={key}>{ex.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-white font-semibold">Training Experience</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="beginner">Beginner (0-6 months)</SelectItem>
                  <SelectItem value="novice">Novice (6-12 months)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (1-2 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                  <SelectItem value="elite">Elite (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              onClick={calculateOneRepMax}
              disabled={!isFormValid() || loading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Calculating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Dumbbell className="h-5 w-5" />
                  <span>Calculate 1RM</span>
                </div>
              )}
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Reset
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-800/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-purple-400" />
                Your One Rep Max Results
              </h3>

              {/* Main 1RM Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-800/30">
                  <div className="text-4xl font-bold text-purple-300">{result.average}</div>
                  <div className="text-purple-200 font-medium">Average 1RM</div>
                  <div className="text-xs text-gray-400 mt-1">{result.weightUnit}</div>
                </div>
                <div className="text-center p-4 bg-pink-900/20 rounded-lg border border-pink-800/30">
                  <div className="text-2xl font-bold text-pink-300">{result.range.min} - {result.range.max}</div>
                  <div className="text-pink-200 font-medium">Range</div>
                  <div className="text-xs text-gray-400 mt-1">Min - Max</div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <div className="text-2xl font-bold text-blue-300">{result.originalWeight} × {result.originalReps}</div>
                  <div className="text-blue-200 font-medium">Input</div>
                  <div className="text-xs text-gray-400 mt-1">Weight × Reps</div>
                </div>
              </div>

              {/* Formula Results */}
              <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Formula Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(result.formulas).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                      <span className="text-sm font-medium">{formulas[key].name}:</span>
                      <span className="font-bold text-purple-300">{value} {result.weightUnit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Zones */}
              <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Training Zones
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.trainingZones.map((zone, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border-l-4 border-${zone.color}-500 bg-${zone.color}-900/10`}>
                      <div className="font-semibold text-white">{zone.zone}</div>
                      <div className="text-sm text-gray-300">{zone.percentage} • {zone.weight} {result.weightUnit}</div>
                      <div className="text-xs text-gray-400">{zone.reps} reps</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rep Ranges Table */}
              <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Percentage-Based Rep Ranges</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                  {result.repRanges.slice(0, 10).map((range, idx) => (
                    <div key={idx} className="text-center p-2 bg-gray-700/30 rounded">
                      <div className="font-semibold text-white">{range.percentage}</div>
                      <div className="text-purple-300">{range.weight} {result.weightUnit}</div>
                      <div className="text-xs text-gray-400">{range.expectedReps} reps</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progressive Overload Recommendations */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Progressive Overload Recommendations
                </h4>
                <div className="space-y-3">
                  {result.progressiveOverload.map((rec, idx) => (
                    <div key={idx} className="p-3 bg-gray-700/30 rounded-lg">
                      <div className="font-semibold text-white mb-1">{rec.type}</div>
                      <div className="text-purple-300 mb-1">{rec.suggestion}</div>
                      <div className="text-xs text-gray-400">{rec.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strength Standards */}
              {result.strengthComparison && (
                <div className="bg-gray-800/50 p-4 rounded-lg mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Strength Level Standards
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {result.strengthComparison.map((level, idx) => (
                      <div key={idx} className={`text-center p-3 rounded-lg bg-${level.color}-900/20 border border-${level.color}-800/30`}>
                        <div className="font-semibold text-white">{level.level}</div>
                        <div className="text-xs text-gray-400 mt-1">{level.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OneRepMaxCalculator;