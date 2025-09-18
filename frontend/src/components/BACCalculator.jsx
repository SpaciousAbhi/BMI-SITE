import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertTriangle, Wine, RefreshCw, Clock } from 'lucide-react';

const BACCalculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'lbs',
    gender: '',
    drinks: '',
    alcoholContent: '40',
    drinkSize: '1.5',
    timeElapsed: ''
  });
  
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setFormData({
      weight: '',
      weightUnit: 'lbs',
      gender: '',
      drinks: '',
      alcoholContent: '40',
      drinkSize: '1.5',
      timeElapsed: ''
    });
    setResults(null);
  };

  const calculateBAC = () => {
    // Validate inputs
    const { weight, gender, drinks, alcoholContent, drinkSize, timeElapsed, weightUnit } = formData;
    
    if (!weight || !gender || !drinks || !timeElapsed) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for user experience
    setTimeout(() => {
      // Convert weight to pounds if needed
      let weightValue = parseFloat(weight);
      if (weightUnit === 'kg') {
        weightValue = weightValue * 2.20462; // Convert kg to lbs
      }

      // Calculate total alcohol consumed in fluid ounces
      const totalDrinks = parseFloat(drinks);
      const drinkSizeOz = parseFloat(drinkSize);
      const alcoholPercentage = parseFloat(alcoholContent) / 100;
      const totalAlcoholOz = totalDrinks * drinkSizeOz * alcoholPercentage;

      // Widmark equation parameters
      const isFemale = gender === 'female';
      const widmarkFactor = isFemale ? 0.66 : 0.73; // Body water distribution factor
      const metabolismRate = 0.015; // Standard metabolism rate per hour
      const hoursElapsed = parseFloat(timeElapsed);

      // Widmark formula: BAC = (A × 5.14) / (W × r) - (0.015 × H)
      // Where: A = alcohol in oz, W = weight in lbs, r = Widmark factor, H = hours
      let bac = (totalAlcoholOz * 5.14) / (weightValue * widmarkFactor) - (metabolismRate * hoursElapsed);
      
      // Ensure BAC doesn't go below 0
      bac = Math.max(0, bac);
      
      // Round to 4 decimal places
      bac = Math.round(bac * 10000) / 10000;

      // Determine impairment level and legal status
      let impairmentLevel, legalStatus, impairmentDescription, riskLevel, warnings;
      
      if (bac === 0) {
        impairmentLevel = 'Sober';
        legalStatus = 'Legal to Drive';
        impairmentDescription = 'No measurable alcohol in bloodstream';
        riskLevel = 'safe';
        warnings = [];
      } else if (bac < 0.02) {
        impairmentLevel = 'Minimal Impairment';
        legalStatus = 'Legal to Drive (Most Places)';
        impairmentDescription = 'Some loss of judgment, relaxation, slight body warmth';
        riskLevel = 'low';
        warnings = ['Still some impairment present'];
      } else if (bac < 0.05) {
        impairmentLevel = 'Mild Impairment';
        legalStatus = 'May Be Illegal in Some Places';
        impairmentDescription = 'Exaggerated behavior, loss of small-muscle control, impaired judgment';
        riskLevel = 'moderate';
        warnings = ['Reaction time affected', 'Judgment impaired'];
      } else if (bac < 0.08) {
        impairmentLevel = 'Moderate Impairment';
        legalStatus = 'Illegal in Many Places';
        impairmentDescription = 'Muscle coordination problems, loss of balance, speech and vision issues';
        riskLevel = 'high';
        warnings = ['Do not drive', 'Significant impairment'];
      } else if (bac < 0.15) {
        impairmentLevel = 'Severe Impairment';
        legalStatus = 'Illegal Everywhere';
        impairmentDescription = 'Major loss of motor control, vomiting, mental confusion';
        riskLevel = 'critical';
        warnings = ['Never drive', 'Seek assistance', 'Dangerous level'];
      } else {
        impairmentLevel = 'Life-Threatening';
        legalStatus = 'Extremely Dangerous';
        impairmentDescription = 'Risk of coma, death, severe alcohol poisoning';
        riskLevel = 'emergency';
        warnings = ['Call emergency services', 'Life-threatening level', 'Immediate medical attention needed'];
      }

      // Calculate time to reach 0.08 BAC (if currently above)
      let timeToLegal = null;
      if (bac > 0.08) {
        timeToLegal = Math.ceil((bac - 0.08) / metabolismRate * 10) / 10;
      }

      // Calculate time to reach 0.00 BAC
      let timeToSober = null;
      if (bac > 0) {
        timeToSober = Math.ceil(bac / metabolismRate * 10) / 10;
      }

      setResults({
        bac: bac.toFixed(4),
        bacPercentage: (bac * 100).toFixed(2),
        impairmentLevel,
        legalStatus,
        impairmentDescription,
        riskLevel,
        warnings,
        timeToLegal,
        timeToSober,
        totalAlcoholOz: totalAlcoholOz.toFixed(2),
        weightUsed: weightValue.toFixed(1)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'safe': return 'text-green-400 bg-green-900/20 border-green-800';
      case 'low': return 'text-blue-400 bg-blue-900/20 border-blue-800';
      case 'moderate': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-800';
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-800';
      case 'emergency': return 'text-red-500 bg-red-900/30 border-red-700';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-800';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl mb-4">
              <Wine className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">BAC Calculator</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Estimate your blood alcohol content for safety and legal awareness
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Weight */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Body Weight *
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="50"
                  max="500"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-11 sm:h-10"
                />
                <Select
                  value={formData.weightUnit}
                  onValueChange={(value) => handleInputChange('weightUnit', value)}
                >
                  <SelectTrigger className="w-16 sm:w-20 bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="lbs">lbs</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Gender *
              </label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Drinks */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Number of Drinks *
              </label>
              <Input
                type="number"
                step="0.5"
                min="0"
                max="20"
                placeholder="Enter number of drinks"
                value={formData.drinks}
                onChange={(e) => handleInputChange('drinks', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-11 sm:h-10"
              />
            </div>

            {/* Drink Size */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Drink Size (fl oz)
              </label>
              <Select
                value={formData.drinkSize}
                onValueChange={(value) => handleInputChange('drinkSize', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="0.6">0.6 oz (Shot)</SelectItem>
                  <SelectItem value="1.5">1.5 oz (Standard Shot)</SelectItem>
                  <SelectItem value="5">5 oz (Wine Glass)</SelectItem>
                  <SelectItem value="12">12 oz (Beer)</SelectItem>
                  <SelectItem value="16">16 oz (Pint)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alcohol Content */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Alcohol Content (%)
              </label>
              <Select
                value={formData.alcoholContent}
                onValueChange={(value) => handleInputChange('alcoholContent', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="5">5% (Beer)</SelectItem>
                  <SelectItem value="12">12% (Wine)</SelectItem>
                  <SelectItem value="20">20% (Fortified Wine)</SelectItem>
                  <SelectItem value="40">40% (Spirits/Vodka)</SelectItem>
                  <SelectItem value="50">50% (Strong Spirits)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Elapsed */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Time Since First Drink (hours) *
              </label>
              <Input
                type="number"
                step="0.25"
                min="0"
                max="24"
                placeholder="Enter hours elapsed"
                value={formData.timeElapsed}
                onChange={(e) => handleInputChange('timeElapsed', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-11 sm:h-10"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <Button
              onClick={calculateBAC}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold h-11 sm:h-10 disabled:opacity-50"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Wine className="w-4 h-4 mr-2" />
                  Calculate BAC
                </>
              )}
            </Button>
            <Button
              onClick={resetCalculator}
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white h-11 sm:h-10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Calculator
            </Button>
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Your BAC Results</h3>
                
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  {results.bacPercentage}%
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  ({results.bac} BAC using Widmark equation)
                </div>
                
                <div className={`inline-block px-4 py-2 rounded-lg border ${getRiskColor(results.riskLevel)} font-semibold`}>
                  {results.impairmentLevel}
                </div>
                
                <div className="mt-3 text-center">
                  <span className={`text-sm font-medium ${results.riskLevel === 'safe' || results.riskLevel === 'low' ? 'text-green-400' : 'text-red-400'}`}>
                    {results.legalStatus}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mt-4 max-w-md mx-auto">
                  {results.impairmentDescription}
                </p>

                {/* Time estimates */}
                {(results.timeToLegal || results.timeToSober) && (
                  <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">Time Estimates</span>
                    </div>
                    {results.timeToLegal && (
                      <p className="text-xs text-gray-300">Time to 0.08% BAC: ~{results.timeToLegal} hours</p>
                    )}
                    {results.timeToSober && (
                      <p className="text-xs text-gray-300">Time to 0.00% BAC: ~{results.timeToSober} hours</p>
                    )}
                  </div>
                )}

                {/* Warnings */}
                {results.warnings.length > 0 && (
                  <div className="mt-4 space-y-1">
                    {results.warnings.map((warning, index) => (
                      <div key={index} className="text-xs text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded">
                        {warning}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Safety Warning */}
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-200">
                    <strong className="text-red-400">Safety Warning:</strong> This calculator provides estimates only and should never be used to determine if it's safe to drive or operate machinery. 
                    Individual factors like medications, food intake, fatigue, and health conditions significantly affect impairment. 
                    Legal limits vary by location and situation. When in doubt, don't drive. Always arrange alternative transportation.
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

export default BACCalculator;