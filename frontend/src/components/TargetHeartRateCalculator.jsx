import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Heart, Activity, Target, TrendingUp, Zap, AlertCircle } from "lucide-react";

const TargetHeartRateCalculator = () => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('average');
  const [gender, setGender] = useState('');
  const [method, setMethod] = useState('karvonen');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Heart rate zone definitions with enhanced descriptions
  const heartRateZones = [
    {
      zone: 1,
      name: 'Active Recovery',
      percentage: { min: 50, max: 60 },
      description: 'Very light activity, promotes recovery',
      benefits: 'Aids recovery, increases blood flow, reduces stress',
      activities: 'Easy walking, gentle yoga, light stretching',
      color: 'blue',
      duration: '20-60 minutes'
    },
    {
      zone: 2,
      name: 'Base/Aerobic',
      percentage: { min: 60, max: 70 },
      description: 'Comfortable pace, builds aerobic base',
      benefits: 'Improves general fitness, burns fat, builds endurance',
      activities: 'Brisk walking, easy cycling, light jogging',
      color: 'green',
      duration: '30-90 minutes'
    },
    {
      zone: 3,
      name: 'Aerobic Threshold',
      percentage: { min: 70, max: 80 },
      description: 'Moderate intensity, still comfortable',
      benefits: 'Improves cardiovascular efficiency, fat burning',
      activities: 'Moderate cycling, steady jogging, dancing',
      color: 'yellow',
      duration: '20-60 minutes'
    },
    {
      zone: 4,
      name: 'Lactate Threshold',
      percentage: { min: 80, max: 90 },
      description: 'Hard effort, comfortably hard breathing',
      benefits: 'Improves lactate threshold, race pace training',
      activities: 'Tempo runs, cycling intervals, competitive sports',
      color: 'orange',
      duration: '10-40 minutes'
    },
    {
      zone: 5,
      name: 'VO2 Max/Anaerobic',
      percentage: { min: 90, max: 100 },
      description: 'Very hard effort, maximum sustainable pace',
      benefits: 'Improves VO2 max, anaerobic power, speed',
      activities: 'High-intensity intervals, sprints, max efforts',
      color: 'red',
      duration: '5-15 minutes (intervals)'
    }
  ];

  // Fitness level adjustments for max HR calculation
  const fitnessAdjustments = {
    poor: -5,
    belowAverage: -2,
    average: 0,
    aboveAverage: 2,
    excellent: 5,
    athlete: 8
  };

  const calculateHeartRate = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const ageNum = parseInt(age);
        const restingHRNum = parseInt(restingHR) || 70; // Default RHR if not provided
        
        // Calculate Maximum Heart Rate using multiple methods
        const maxHRMethods = {
          traditional: 220 - ageNum,
          tanaka: 208 - (0.7 * ageNum),
          gulati: 206 - (0.88 * ageNum), // For women
          nes: 211 - (0.64 * ageNum), // For athletic populations
          fairbarn: gender === 'male' ? 202 - (0.55 * ageNum) : 216 - (1.09 * ageNum)
        };

        // Apply fitness level adjustment
        const fitnessAdjustment = fitnessAdjustments[fitnessLevel] || 0;
        const selectedMaxHR = method === 'traditional' ? maxHRMethods.traditional : 
                             method === 'tanaka' ? maxHRMethods.tanaka :
                             gender === 'female' ? maxHRMethods.gulati : maxHRMethods.fairbarn;
        
        const adjustedMaxHR = selectedMaxHR + fitnessAdjustment;

        // Calculate Heart Rate Reserve (HRR)
        const heartRateReserve = adjustedMaxHR - restingHRNum;

        // Calculate zones using both percentage methods
        const zones = heartRateZones.map(zone => {
          let minHR, maxHR;
          
          if (method === 'karvonen' && restingHR) {
            // Karvonen method (more accurate with resting HR)
            minHR = Math.round((heartRateReserve * (zone.percentage.min / 100)) + restingHRNum);
            maxHR = Math.round((heartRateReserve * (zone.percentage.max / 100)) + restingHRNum);
          } else {
            // Simple percentage method
            minHR = Math.round(adjustedMaxHR * (zone.percentage.min / 100));
            maxHR = Math.round(adjustedMaxHR * (zone.percentage.max / 100));
          }

          return {
            ...zone,
            minHR,
            maxHR,
            targetHR: Math.round((minHR + maxHR) / 2)
          };
        });

        // Generate training recommendations
        const recommendations = generateTrainingRecommendations(zones, fitnessLevel, ageNum);

        // Calculate fat burning zone (typically zone 2-3)
        const fatBurningZone = {
          min: zones[1].minHR,
          max: zones[2].maxHR,
          target: Math.round((zones[1].minHR + zones[2].maxHR) / 2)
        };

        // Generate weekly training plan
        const weeklyPlan = generateWeeklyPlan(zones, fitnessLevel);

        setResult({
          maxHeartRate: Math.round(adjustedMaxHR),
          restingHeartRate: restingHRNum,
          heartRateReserve: heartRateReserve,
          zones: zones,
          fatBurningZone: fatBurningZone,
          recommendations: recommendations,
          weeklyPlan: weeklyPlan,
          method: method,
          fitnessLevel: fitnessLevel,
          maxHRMethods: maxHRMethods
        });
      } catch (error) {
        console.error('Calculation error:', error);
      }
      setLoading(false);
    }, 800);
  };

  const generateTrainingRecommendations = (zones, fitness, age) => {
    const recommendations = [];

    // Age-based recommendations
    if (age < 30) {
      recommendations.push({
        category: 'Age-Specific',
        title: 'Youth Advantage',
        message: 'Your young age allows for higher intensity training. Focus on building aerobic base with some high-intensity work.',
        icon: '🏃'
      });
    } else if (age > 50) {
      recommendations.push({
        category: 'Age-Specific',
        title: 'Mature Training',
        message: 'Prioritize longer duration in zones 1-3. Allow more recovery time between intense sessions.',
        icon: '🧘'
      });
    }

    // Fitness level recommendations
    const fitnessRecs = {
      poor: {
        title: 'Building Foundation',
        message: 'Start with 80% of training in zones 1-2. Add zone 3 gradually after 4-6 weeks.',
        icon: '🌱'
      },
      average: {
        title: 'Balanced Approach',
        message: '70% zones 1-2, 20% zone 3, 10% zones 4-5. Build base before adding intensity.',
        icon: '⚖️'
      },
      excellent: {
        title: 'Performance Focus',
        message: 'Can handle more zone 4-5 work. Use periodization for peak performance.',
        icon: '🏆'
      }
    };

    if (fitnessRecs[fitness]) {
      recommendations.push({
        category: 'Fitness Level',
        ...fitnessRecs[fitness]
      });
    }

    // Fat burning recommendation
    recommendations.push({
      category: 'Fat Burning',
      title: 'Optimal Fat Burn',
      message: `Target ${zones[1].minHR}-${zones[2].maxHR} BPM (zones 2-3) for maximum fat oxidation.`,
      icon: '🔥'
    });

    // Recovery recommendation
    recommendations.push({
      category: 'Recovery',
      title: 'Active Recovery',
      message: `Use zone 1 (${zones[0].minHR}-${zones[0].maxHR} BPM) for recovery days and warm-ups.`,
      icon: '🌿'
    });

    return recommendations;
  };

  const generateWeeklyPlan = (zones, fitness) => {
    const plans = {
      poor: [
        { day: 'Monday', zone: '1-2', duration: '20-30 min', activity: 'Easy walk/bike' },
        { day: 'Tuesday', zone: 'Rest', duration: '-', activity: 'Rest or gentle stretching' },
        { day: 'Wednesday', zone: '1-2', duration: '25-35 min', activity: 'Easy walk/bike' },
        { day: 'Thursday', zone: 'Rest', duration: '-', activity: 'Rest or gentle yoga' },
        { day: 'Friday', zone: '1-2', duration: '20-30 min', activity: 'Easy walk/bike' },
        { day: 'Saturday', zone: '2', duration: '30-40 min', activity: 'Brisk walk/light jog' },
        { day: 'Sunday', zone: 'Rest', duration: '-', activity: 'Rest or gentle activity' }
      ],
      average: [
        { day: 'Monday', zone: '2', duration: '30-45 min', activity: 'Base training' },
        { day: 'Tuesday', zone: '1', duration: '20-30 min', activity: 'Recovery' },
        { day: 'Wednesday', zone: '3', duration: '20-30 min', activity: 'Moderate intensity' },
        { day: 'Thursday', zone: '1-2', duration: '30-40 min', activity: 'Easy training' },
        { day: 'Friday', zone: 'Rest', duration: '-', activity: 'Rest day' },
        { day: 'Saturday', zone: '4', duration: '15-25 min', activity: 'Tempo/threshold' },
        { day: 'Sunday', zone: '2', duration: '45-60 min', activity: 'Long base training' }
      ],
      excellent: [
        { day: 'Monday', zone: '2', duration: '45-60 min', activity: 'Aerobic base' },
        { day: 'Tuesday', zone: '4-5', duration: '20-30 min', activity: 'Intervals' },
        { day: 'Wednesday', zone: '1', duration: '30-40 min', activity: 'Recovery' },
        { day: 'Thursday', zone: '3', duration: '30-45 min', activity: 'Tempo' },
        { day: 'Friday', zone: '1', duration: '20-30 min', activity: 'Easy recovery' },
        { day: 'Saturday', zone: '4', duration: '25-35 min', activity: 'Threshold' },
        { day: 'Sunday', zone: '2', duration: '60-90 min', activity: 'Long aerobic' }
      ]
    };

    return plans[fitness] || plans.average;
  };

  const resetForm = () => {
    setAge('');
    setRestingHR('');
    setGender('');
    setResult(null);
  };

  const isFormValid = () => {
    return age && parseInt(age) >= 15 && parseInt(age) <= 100;
  };

  const getZoneColor = (color) => {
    const colorMap = {
      blue: 'bg-blue-900/20 border-blue-800/30 text-blue-300',
      green: 'bg-green-900/20 border-green-800/30 text-green-300',
      yellow: 'bg-yellow-900/20 border-yellow-800/30 text-yellow-300',
      orange: 'bg-orange-900/20 border-orange-800/30 text-orange-300',
      red: 'bg-red-900/20 border-red-800/30 text-red-300'
    };
    return colorMap[color] || 'bg-gray-900/20 border-gray-800/30 text-gray-300';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center pb-6 sm:pb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-red-500/10 mr-4">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Advanced Target Heart Rate Calculator
            </CardTitle>
          </div>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Calculate precise training zones using Karvonen method with resting heart rate. Get personalized training plans and zone-specific recommendations.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8">
          {/* Input Form - Enhanced responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-white font-semibold text-sm sm:text-base">Age *</Label>
              <Input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
                min="15"
                max="100"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label className="text-white font-semibold text-sm sm:text-base">Resting Heart Rate (Optional)</Label>
              <Input
                type="number"
                placeholder="Enter resting HR (e.g., 60)"
                value={restingHR}
                onChange={(e) => setRestingHR(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10"
                min="40"
                max="100"
              />
              <p className="text-xs text-gray-400">
                Measure first thing in the morning for accuracy. Leave blank to use average (70 BPM).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-white font-semibold text-sm sm:text-base">Fitness Level</Label>
              <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="poor">Poor (Sedentary)</SelectItem>
                  <SelectItem value="belowAverage">Below Average</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="aboveAverage">Above Average</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="athlete">Athlete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Label className="text-white font-semibold text-sm sm:text-base">Gender (Optional)</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                  <SelectValue placeholder="Select gender for better accuracy" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Label className="text-white font-semibold text-sm sm:text-base">Calculation Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="karvonen">Karvonen Method (Recommended with RHR)</SelectItem>
                <SelectItem value="traditional">Simple Percentage Method</SelectItem>
                <SelectItem value="tanaka">Tanaka Formula (Age-Adjusted)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-400">
              Karvonen method uses resting heart rate for more accurate zones.
            </p>
          </div>

          {/* Action Buttons - Enhanced mobile design */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <Button
              onClick={calculateHeartRate}
              disabled={!isFormValid() || loading}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 h-12 sm:h-auto rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Calculating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Calculate Heart Rate Zones</span>
                </div>
              )}
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              className="px-6 border-gray-600 text-gray-300 hover:bg-gray-800 h-12 sm:h-auto sm:px-8"
            >
              Reset
            </Button>
          </div>

          {/* Results - Enhanced mobile responsiveness */}
          {result && (
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-xl border border-red-800/30">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-red-400" />
                Your Heart Rate Training Zones
              </h3>

              {/* Key Metrics - Responsive grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-center p-3 sm:p-4 bg-red-900/20 rounded-lg border border-red-800/30">
                  <div className="text-2xl sm:text-3xl font-bold text-red-300">{result.maxHeartRate}</div>
                  <div className="text-xs sm:text-sm text-red-200 font-medium">Max HR</div>
                  <div className="text-xs text-gray-400">BPM</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-300">{result.restingHeartRate}</div>
                  <div className="text-xs sm:text-sm text-blue-200 font-medium">Resting HR</div>
                  <div className="text-xs text-gray-400">BPM</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                  <div className="text-2xl sm:text-3xl font-bold text-green-300">{result.heartRateReserve}</div>
                  <div className="text-xs sm:text-sm text-green-200 font-medium">HR Reserve</div>
                  <div className="text-xs text-gray-400">BPM</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="text-lg sm:text-2xl font-bold text-yellow-300">{result.fatBurningZone.min}-{result.fatBurningZone.max}</div>
                  <div className="text-xs sm:text-sm text-yellow-200 font-medium">Fat Burn Zone</div>
                  <div className="text-xs text-gray-400">BPM</div>
                </div>
              </div>

              {/* Training Zones - Mobile optimized */}
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Training Zones Breakdown
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  {result.zones.map((zone, idx) => (
                    <div key={idx} className={`p-3 sm:p-4 rounded-lg border ${getZoneColor(zone.color)}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start">
                        <div>
                          <div className="font-bold text-sm sm:text-lg">Zone {zone.zone}: {zone.name}</div>
                          <div className="text-xs sm:text-sm opacity-80">{zone.percentage.min}-{zone.percentage.max}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold">{zone.minHR}-{zone.maxHR}</div>
                          <div className="text-xs">BPM Range</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm sm:text-lg font-semibold">{zone.duration}</div>
                          <div className="text-xs">Duration</div>
                        </div>
                        <div className="text-xs sm:text-sm">
                          <div className="font-medium mb-1">{zone.description}</div>
                          <div className="opacity-70">{zone.activities}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs sm:text-sm opacity-80">
                        <strong>Benefits:</strong> {zone.benefits}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Training Plan - Mobile optimized */}
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Suggested Weekly Training Plan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
                  {result.weeklyPlan.map((day, idx) => (
                    <div key={idx} className="text-center p-2 sm:p-3 bg-gray-700/30 rounded-lg">
                      <div className="font-semibold text-white text-xs sm:text-sm">{day.day}</div>
                      <div className="text-xs text-blue-300 font-medium">{day.zone}</div>
                      <div className="text-xs text-gray-400">{day.duration}</div>
                      <div className="text-xs text-gray-400 mt-1">{day.activity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations - Mobile optimized */}
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Personalized Recommendations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-2 sm:p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="text-lg sm:text-2xl">{rec.icon}</div>
                        <div>
                          <div className="font-semibold text-white text-sm sm:text-base">{rec.title}</div>
                          <div className="text-xs text-blue-300 mb-1">{rec.category}</div>
                          <div className="text-xs sm:text-sm text-gray-300">{rec.message}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notes - Mobile optimized */}
              <div className="bg-yellow-900/10 border border-yellow-800/30 p-3 sm:p-4 rounded-lg mt-4 sm:mt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-yellow-300 mb-2 text-sm sm:text-base">Important Notes:</h5>
                    <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
                      <li>• These are general guidelines. Individual responses may vary.</li>
                      <li>• Consult a healthcare provider before starting intense exercise programs.</li>
                      <li>• Monitor how you feel during exercise - ratings of perceived exertion matter too.</li>
                      <li>• Heart rate monitors provide more accurate readings than manual pulse checks.</li>
                      <li>• Allow adequate recovery between high-intensity sessions.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetHeartRateCalculator;