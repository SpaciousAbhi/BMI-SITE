import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calculator, Timer, TrendingUp, Target, Zap, Clock } from "lucide-react";

const PaceCalculator = () => {
  const [mode, setMode] = useState('pace'); // 'pace', 'time', 'distance'
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' });
  const [pace, setPace] = useState({ minutes: '', seconds: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculatePace = () => {
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
          // Calculate pace from distance and time
          const pacePerKm = totalSeconds / distanceInKm;
          const pacePerMile = pacePerKm * 1.609344;
          
          const speedKmh = distanceInKm / (totalSeconds / 3600);
          const speedMph = speedKmh / 1.609344;

          // Generate splits for common distances
          const splits = {
            '1km': formatTime(pacePerKm),
            '1mile': formatTime(pacePerMile),
            '5km': formatTime(pacePerKm * 5),
            '10km': formatTime(pacePerKm * 10),
            'halfMarathon': formatTime(pacePerKm * 21.0975),
            'marathon': formatTime(pacePerKm * 42.195)
          };

          // Pace predictions for different distances using Jack Daniels formula
          const vdot = calculateVDOT(distanceInKm, totalSeconds);
          const predictions = generatePacePredictions(vdot);

          setResult({
            type: 'pace',
            pacePerKm: formatTime(pacePerKm),
            pacePerMile: formatTime(pacePerMile),
            speedKmh: speedKmh.toFixed(2),
            speedMph: speedMph.toFixed(2),
            splits,
            predictions,
            vdot: vdot.toFixed(1)
          });
        } else if (mode === 'time') {
          // Calculate time from distance and pace
          const paceSeconds = (parseInt(pace.minutes) || 0) * 60 + (parseInt(pace.seconds) || 0);
          const totalTime = paceSeconds * distanceInKm;
          
          setResult({
            type: 'time',
            totalTime: formatTime(totalTime),
            distance: distance,
            distanceUnit: distanceUnit,
            pace: `${pace.minutes}:${pace.seconds.padStart(2, '0')}`
          });
        } else if (mode === 'distance') {
          // Calculate distance from time and pace
          const paceSeconds = (parseInt(pace.minutes) || 0) * 60 + (parseInt(pace.seconds) || 0);
          const calculatedDistance = totalSeconds / paceSeconds;
          
          setResult({
            type: 'distance',
            distance: calculatedDistance.toFixed(2),
            distanceUnit: 'km',
            totalTime: formatTime(totalSeconds),
            pace: `${pace.minutes}:${pace.seconds.padStart(2, '0')}`
          });
        }
      } catch (error) {
        console.error('Calculation error:', error);
      }
      setLoading(false);
    }, 800);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateVDOT = (distanceKm, timeSeconds) => {
    // Jack Daniels VDOT formula
    const velocity = distanceKm * 1000 / timeSeconds; // m/s
    const vo2 = -4.6 + 0.182258 * velocity + 0.000104 * Math.pow(velocity, 2);
    const percentVO2Max = 0.8 + 0.1894393 * Math.exp(-0.012778 * timeSeconds) + 0.2989558 * Math.exp(-0.1932605 * timeSeconds);
    return vo2 / percentVO2Max;
  };

  const generatePacePredictions = (vdot) => {
    // Simplified pace predictions based on VDOT
    const races = [
      { name: '5K', distance: 5, factor: 0.86 },
      { name: '10K', distance: 10, factor: 0.82 },
      { name: 'Half Marathon', distance: 21.0975, factor: 0.78 },
      { name: 'Marathon', distance: 42.195, factor: 0.74 }
    ];

    return races.map(race => {
      const velocity = (vdot * race.factor - 4.6) / (0.182258 + 0.000104 * (vdot * race.factor - 4.6));
      const timeSeconds = (race.distance * 1000) / velocity;
      const pace = timeSeconds / race.distance;
      
      return {
        distance: race.name,
        predictedTime: formatTime(timeSeconds),
        pace: formatTime(pace)
      };
    });
  };

  const resetForm = () => {
    setDistance('');
    setTime({ hours: '', minutes: '', seconds: '' });
    setPace({ minutes: '', seconds: '' });
    setResult(null);
  };

  const isFormValid = () => {
    if (mode === 'pace') {
      return distance && (time.minutes || time.seconds || time.hours);
    } else if (mode === 'time') {
      return distance && (pace.minutes || pace.seconds);
    } else if (mode === 'distance') {
      return (time.minutes || time.seconds || time.hours) && (pace.minutes || pace.seconds);
    }
    return false;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center pb-6 sm:pb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-500/10 mr-4">
              <Timer className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Advanced Pace Calculator
            </CardTitle>
          </div>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Calculate pace, time, or distance with precision. Includes race predictions, splits, and VDOT analysis for serious runners.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8">
          {/* Mode Selection - Enhanced for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Button
              onClick={() => setMode('pace')}
              variant={mode === 'pace' ? 'default' : 'outline'}
              className="flex items-center justify-center space-x-2 h-11 sm:h-10 text-sm sm:text-base"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate Pace</span>
            </Button>
            <Button
              onClick={() => setMode('time')}
              variant={mode === 'time' ? 'default' : 'outline'}
              className="flex items-center justify-center space-x-2 h-11 sm:h-10 text-sm sm:text-base"
            >
              <Clock className="h-4 w-4" />
              <span>Calculate Time</span>
            </Button>
            <Button
              onClick={() => setMode('distance')}
              variant={mode === 'distance' ? 'default' : 'outline'}
              className="flex items-center justify-center space-x-2 h-11 sm:h-10 text-sm sm:text-base"
            >
              <Target className="h-4 w-4" />
              <span>Calculate Distance</span>
            </Button>
          </div>

          {/* Input Form - Optimized grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Distance Input (for pace and time modes) */}
            {(mode === 'pace' || mode === 'time') && (
              <div className="space-y-3 sm:space-y-4">
                <Label className="text-white font-semibold text-sm sm:text-base">Distance *</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Enter distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white flex-1 h-11 sm:h-10"
                    step="0.01"
                  />
                  <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-20 sm:w-24 h-11 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="km">km</SelectItem>
                      <SelectItem value="miles">miles</SelectItem>
                      <SelectItem value="meters">meters</SelectItem>
                      <SelectItem value="yards">yards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Time Input (for pace and distance modes) */}
            {(mode === 'pace' || mode === 'distance') && (
              <div className="space-y-3 sm:space-y-4">
                <Label className="text-white font-semibold text-sm sm:text-base">Time *</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Input
                      type="number"
                      placeholder="Hours"
                      value={time.hours}
                      onChange={(e) => setTime({...time, hours: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white text-center h-11 sm:h-10"
                      min="0"
                    />
                    <Label className="text-xs text-gray-400 block text-center mt-1">Hours</Label>
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Minutes"
                      value={time.minutes}
                      onChange={(e) => setTime({...time, minutes: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white text-center h-11 sm:h-10"
                      min="0"
                      max="59"
                    />
                    <Label className="text-xs text-gray-400 block text-center mt-1">Minutes</Label>
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Seconds"
                      value={time.seconds}
                      onChange={(e) => setTime({...time, seconds: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white text-center h-11 sm:h-10"
                      min="0"
                      max="59"
                    />
                    <Label className="text-xs text-gray-400 block text-center mt-1">Seconds</Label>
                  </div>
                </div>
              </div>
            )}

            {/* Pace Input (for time and distance modes) */}
            {(mode === 'time' || mode === 'distance') && (
              <div className="space-y-3 sm:space-y-4">
                <Label className="text-white font-semibold text-sm sm:text-base">Pace (per km) *</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      type="number"
                      placeholder="Minutes"
                      value={pace.minutes}
                      onChange={(e) => setPace({...pace, minutes: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white text-center h-11 sm:h-10"
                      min="0"
                    />
                    <Label className="text-xs text-gray-400 block text-center mt-1">Minutes</Label>
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Seconds"
                      value={pace.seconds}
                      onChange={(e) => setPace({...pace, seconds: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white text-center h-11 sm:h-10"
                      min="0"
                      max="59"
                    />
                    <Label className="text-xs text-gray-400 block text-center mt-1">Seconds</Label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons - Enhanced mobile design */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <Button
              onClick={calculatePace}
              disabled={!isFormValid() || loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 h-12 sm:h-auto rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Calculating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Calculate {mode === 'pace' ? 'Pace' : mode === 'time' ? 'Time' : 'Distance'}</span>
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
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-800/30">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-400" />
                Your Results
              </h3>

              {result.type === 'pace' && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Main Results - Responsive grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center p-3 sm:p-4 bg-blue-900/20 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-blue-300">{result.pacePerKm}</div>
                      <div className="text-xs sm:text-sm text-blue-200">per km</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-cyan-900/20 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-cyan-300">{result.pacePerMile}</div>
                      <div className="text-xs sm:text-sm text-cyan-200">per mile</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-green-900/20 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-green-300">{result.speedKmh}</div>
                      <div className="text-xs sm:text-sm text-green-200">km/h</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-purple-900/20 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-purple-300">{result.speedMph}</div>
                      <div className="text-xs sm:text-sm text-purple-200">mph</div>
                    </div>
                  </div>

                  {/* Splits - Mobile optimized */}
                  <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Split Times</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-sm">
                      <div className="flex justify-between"><span>1km:</span><span className="font-mono">{result.splits['1km']}</span></div>
                      <div className="flex justify-between"><span>1 mile:</span><span className="font-mono">{result.splits['1mile']}</span></div>
                      <div className="flex justify-between"><span>5km:</span><span className="font-mono">{result.splits['5km']}</span></div>
                      <div className="flex justify-between"><span>10km:</span><span className="font-mono">{result.splits['10km']}</span></div>
                      <div className="flex justify-between"><span>Half Marathon:</span><span className="font-mono">{result.splits.halfMarathon}</span></div>
                      <div className="flex justify-between"><span>Marathon:</span><span className="font-mono">{result.splits.marathon}</span></div>
                    </div>
                  </div>

                  {/* Race Predictions - Mobile optimized */}
                  <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Race Time Predictions (VDOT: {result.vdot})</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {result.predictions.map((pred, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 sm:p-3 bg-gray-700/30 rounded text-sm">
                          <span className="font-semibold">{pred.distance}:</span>
                          <div className="text-right">
                            <div className="font-mono text-blue-300">{pred.predictedTime}</div>
                            <div className="text-xs text-gray-400">{pred.pace}/km</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {result.type === 'time' && (
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-300 mb-2">{result.totalTime}</div>
                  <div className="text-sm sm:text-base text-gray-300">
                    Time to complete {result.distance} {result.distanceUnit} at {result.pace}/km pace
                  </div>
                </div>
              )}

              {result.type === 'distance' && (
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-300 mb-2">{result.distance} km</div>
                  <div className="text-sm sm:text-base text-gray-300">
                    Distance covered in {result.totalTime} at {result.pace}/km pace
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

export default PaceCalculator;