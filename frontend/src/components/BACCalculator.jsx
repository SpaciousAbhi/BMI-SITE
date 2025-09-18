import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertTriangle, Wine, RefreshCw, Clock, Shield, Info, Scale } from 'lucide-react';

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

      // Enhanced Widmark equation calculation
      const totalDrinks = parseFloat(drinks);
      const drinkSizeOz = parseFloat(drinkSize);
      const alcoholPercentage = parseFloat(alcoholContent) / 100;
      const totalAlcoholOz = totalDrinks * drinkSizeOz * alcoholPercentage;

      // Widmark equation parameters with enhanced precision
      const isFemale = gender === 'female';
      const widmarkFactor = isFemale ? 0.66 : 0.73; // Body water distribution factor
      const metabolismRate = 0.015; // Standard metabolism rate per hour
      const hoursElapsed = parseFloat(timeElapsed);

      // Enhanced Widmark formula: BAC = (A × 5.14) / (W × r) - (0.015 × H)
      // Where: A = alcohol in oz, W = weight in lbs, r = Widmark factor, H = hours
      let bac = (totalAlcoholOz * 5.14) / (weightValue * widmarkFactor) - (metabolismRate * hoursElapsed);
      
      // Ensure BAC doesn't go below 0
      bac = Math.max(0, bac);
      
      // Round to 4 decimal places
      bac = Math.round(bac * 10000) / 10000;

      // Enhanced impairment level determination with legal context
      let impairmentLevel, legalStatus, impairmentDescription, riskLevel, warnings, legalContext;
      
      if (bac === 0) {
        impairmentLevel = 'Sober';
        legalStatus = 'Legal to Drive';
        impairmentDescription = 'No measurable alcohol in bloodstream';
        riskLevel = 'safe';
        warnings = [];
        legalContext = 'Safe for all driving situations';
      } else if (bac < 0.02) {
        impairmentLevel = 'Minimal Impairment';
        legalStatus = 'Legal to Drive (Most Places)';
        impairmentDescription = 'Some loss of judgment, slight relaxation, body warmth';
        riskLevel = 'low';
        warnings = ['Still some impairment present', 'Consider your individual tolerance'];
        legalContext = 'Legal in most jurisdictions for adults 21+';
      } else if (bac < 0.05) {
        impairmentLevel = 'Mild Impairment';
        legalStatus = 'May Be Illegal in Some Places';
        impairmentDescription = 'Exaggerated behavior, loss of small-muscle control, impaired judgment, reduced reaction time';
        riskLevel = 'moderate';
        warnings = ['Reaction time significantly affected', 'Judgment impaired', 'May be illegal for commercial drivers'];
        legalContext = 'Illegal for commercial drivers (0.04% limit), some countries have 0.05% limit';
      } else if (bac < 0.08) {
        impairmentLevel = 'Moderate Impairment';
        legalStatus = 'Illegal in Many Places';
        impairmentDescription = 'Muscle coordination problems, loss of balance, speech and vision issues, reasoning impaired';
        riskLevel = 'high';
        warnings = ['Do not drive', 'Significant impairment', 'Legal consequences likely'];
        legalContext = 'Approaching legal limit (0.08%) in most US states, already illegal in many countries';
      } else if (bac < 0.15) {
        impairmentLevel = 'Severe Impairment';
        legalStatus = 'Illegal Everywhere';
        impairmentDescription = 'Major loss of motor control, vomiting, mental confusion, severely impaired judgment';
        riskLevel = 'critical';
        warnings = ['Never drive', 'Seek immediate assistance', 'Dangerous impairment level', 'Risk of alcohol poisoning'];
        legalContext = 'Illegal worldwide, severe DUI penalties, potential felony charges';
      } else {
        impairmentLevel = 'Life-Threatening';
        legalStatus = 'Medical Emergency';
        impairmentDescription = 'Risk of coma, death, severe alcohol poisoning, respiratory depression';
        riskLevel = 'emergency';
        warnings = ['Call emergency services immediately', 'Life-threatening level', 'Immediate medical attention required', 'Risk of death'];
        legalContext = 'Medical emergency - legal consequences secondary to health risks';
      }

      // Calculate enhanced time estimates
      let timeToLegal = null;
      let timeToSober = null;
      let peakBACTime = null;
      
      if (bac > 0.08) {
        timeToLegal = Math.ceil((bac - 0.08) / metabolismRate * 10) / 10;
      }
      
      if (bac > 0) {
        timeToSober = Math.ceil(bac / metabolismRate * 10) / 10;
        // Estimate when BAC would have peaked (typically 30-90 minutes after last drink)
        peakBACTime = hoursElapsed < 1.5 ? '30-90 minutes after last drink' : 'Already peaked';
      }

      setResults({
        bac: bac.toFixed(4),
        bacPercentage: (bac * 100).toFixed(2),
        impairmentLevel,
        legalStatus,
        legalContext,
        impairmentDescription,
        riskLevel,
        warnings,
        timeToLegal,
        timeToSober,
        peakBACTime,
        totalAlcoholOz: totalAlcoholOz.toFixed(2),
        weightUsed: weightValue.toFixed(1),
        widmarkFactor: widmarkFactor.toFixed(2)
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
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-red-500 rounded-3xl mb-6 shadow-lg">
              <Wine className="w-9 h-9 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">BAC Calculator</h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Estimate your blood alcohol content (BAC) using the Widmark equation for safety awareness and legal compliance
            </p>
          </div>

          {/* Enhanced Safety Warning Banner */}
          <div className="mb-8 p-4 bg-red-900/20 border border-red-800 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-200">
                <strong className="text-red-400">Safety First:</strong> This calculator provides estimates only and should never be used to determine if it's safe to drive. 
                When in doubt, don't drive. Always arrange alternative transportation if you've been drinking.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Weight */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">
                Body Weight <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="50"
                  max="500"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 sm:h-11 text-base focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  aria-label="Body weight"
                />
                <Select
                  value={formData.weightUnit}
                  onValueChange={(value) => handleInputChange('weightUnit', value)}
                >
                  <SelectTrigger className="w-20 sm:w-24 bg-gray-800 border-gray-700 text-white h-12 sm:h-11 focus:ring-2 focus:ring-amber-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="lbs">lbs</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-400">Weight affects alcohol distribution in the body</p>
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">
                Biological Sex <span className="text-red-400">*</span>
              </label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 sm:h-11 focus:ring-2 focus:ring-amber-500">
                  <SelectValue placeholder="Select biological sex" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">Affects body water distribution (Widmark factor)</p>
            </div>

            {/* Number of Drinks */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">
                Number of Drinks <span className="text-red-400">*</span>
              </label>
              <Input
                type="number"
                step="0.5"
                min="0"
                max="20"
                placeholder="Enter number of drinks"
                value={formData.drinks}
                onChange={(e) => handleInputChange('drinks', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 sm:h-11 text-base focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                aria-label="Number of alcoholic drinks consumed"
              />
              <p className="text-xs text-gray-400">Total alcoholic beverages consumed</p>
            </div>

            {/* Drink Size */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">
                Drink Size (fl oz)
              </label>
              <Select
                value={formData.drinkSize}
                onValueChange={(value) => handleInputChange('drinkSize', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 sm:h-11 focus:ring-2 focus:ring-amber-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="0.6">0.6 oz (Small Shot)</SelectItem>
                  <SelectItem value="1.5">1.5 oz (Standard Shot)</SelectItem>
                  <SelectItem value="5">5 oz (Wine Glass)</SelectItem>
                  <SelectItem value="12">12 oz (Beer Bottle/Can)</SelectItem>
                  <SelectItem value="16">16 oz (Pint Beer)</SelectItem>
                  <SelectItem value="24">24 oz (Large Beer)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">Standard serving size per drink</p>
            </div>

            {/* Alcohol Content */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">
                Alcohol Content (%)
              </label>
              <Select
                value={formData.alcoholContent}
                onValueChange={(value) => handleInputChange('alcoholContent', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 sm:h-11 focus:ring-2 focus:ring-amber-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="3.5">3.5% (Light Beer)</SelectItem>
                  <SelectItem value="5">5% (Regular Beer)</SelectItem>
                  <SelectItem value="7">7% (Strong Beer/Malt Liquor)</SelectItem>
                  <SelectItem value="12">12% (Wine)</SelectItem>
                  <SelectItem value="15">15% (Fortified Wine)</SelectItem>
                  <SelectItem value="20">20% (Port/Sherry)</SelectItem>
                  <SelectItem value="40">40% (Spirits/Vodka/Whiskey)</SelectItem>
                  <SelectItem value="50">50% (Strong Spirits)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">Alcohol by volume (ABV) percentage</p>
            </div>

            {/* Time Elapsed */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">
                Time Since First Drink (hours) <span className="text-red-400">*</span>
              </label>
              <Input
                type="number"
                step="0.25"
                min="0"
                max="24"
                placeholder="Enter hours elapsed"
                value={formData.timeElapsed}
                onChange={(e) => handleInputChange('timeElapsed', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 sm:h-11 text-base focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                aria-label="Hours since first alcoholic drink"
              />
              <p className="text-xs text-gray-400">Time since consuming first alcoholic beverage</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              onClick={calculateBAC}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold h-12 sm:h-11 text-base disabled:opacity-50 transition-all transform hover:scale-105 shadow-lg"
              aria-label="Calculate blood alcohol content"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Calculating BAC...
                </>
              ) : (
                <>
                  <Wine className="w-5 h-5 mr-2" />
                  Calculate BAC
                </>
              )}
            </Button>
            <Button
              onClick={resetCalculator}
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white h-12 sm:h-11 text-base transition-all"
              aria-label="Reset calculator"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reset Calculator
            </Button>
          </div>

          {/* Enhanced Results */}
          {results && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="text-center p-6 sm:p-8 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-6">Your BAC Results</h3>
                
                <div className="text-5xl sm:text-6xl font-bold text-amber-400 mb-3">
                  {results.bacPercentage}%
                </div>
                <div className="text-gray-300 text-base mb-6">
                  ({results.bac} BAC using Widmark equation)
                </div>
                
                <div className={`inline-block px-6 py-3 rounded-xl border ${getRiskColor(results.riskLevel)} font-bold text-lg`}>
                  {results.impairmentLevel}
                </div>
                
                <div className="mt-4 text-center">
                  <span className={`text-base font-bold ${results.riskLevel === 'safe' || results.riskLevel === 'low' ? 'text-green-400' : 'text-red-400'}`}>
                    {results.legalStatus}
                  </span>
                </div>
                
                <p className="text-gray-300 text-base mt-6 max-w-lg mx-auto leading-relaxed">
                  {results.impairmentDescription}
                </p>

                {/* Enhanced Information Grid */}
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="w-5 h-5 text-blue-400" />
                      <h4 className="font-semibold text-white text-sm">Widmark Factor</h4>
                    </div>
                    <p className="text-sm text-gray-300">{results.widmarkFactor}</p>
                  </div>
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Wine className="w-5 h-5 text-amber-400" />
                      <h4 className="font-semibold text-white text-sm">Total Alcohol</h4>
                    </div>
                    <p className="text-sm text-gray-300">{results.totalAlcoholOz} fl oz</p>
                  </div>
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <h4 className="font-semibold text-white text-sm">Peak BAC</h4>
                    </div>
                    <p className="text-sm text-gray-300">{results.peakBACTime}</p>
                  </div>
                </div>

                {/* Time estimates */}
                {(results.timeToLegal || results.timeToSober) && (
                  <div className="mt-6 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-base font-semibold text-blue-400">Metabolism Time Estimates</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      {results.timeToLegal && (
                        <div className="text-center">
                          <p className="text-gray-300">Time to reach 0.08% BAC</p>
                          <p className="text-yellow-400 font-semibold">~{results.timeToLegal} hours</p>
                        </div>
                      )}
                      {results.timeToSober && (
                        <div className="text-center">
                          <p className="text-gray-300">Time to reach 0.00% BAC</p>
                          <p className="text-green-400 font-semibold">~{results.timeToSober} hours</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Legal Context */}
                <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                  <h4 className="font-semibold text-blue-400 mb-2">Legal Context</h4>
                  <p className="text-sm text-blue-200 leading-relaxed">{results.legalContext}</p>
                </div>

                {/* Warnings */}
                {results.warnings.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {results.warnings.map((warning, index) => (
                      <div key={index} className={`text-sm px-3 py-2 rounded-lg ${
                        results.riskLevel === 'emergency' ? 'text-red-200 bg-red-900/30 border border-red-700' :
                        results.riskLevel === 'critical' ? 'text-red-300 bg-red-900/20 border border-red-800' :
                        'text-yellow-300 bg-yellow-900/20 border border-yellow-800'
                      }`}>
                        {warning}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Enhanced Safety Warning */}
              <div className="bg-red-900/30 border border-red-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-200 leading-relaxed">
                    <strong className="text-red-400 text-base">Critical Safety Disclaimer:</strong><br />
                    This calculator provides estimates only with ±20% variability and should <strong>never</strong> be used to determine 
                    if it's safe to drive or operate machinery. Individual factors like medications, food intake, fatigue, health conditions, 
                    and metabolism significantly affect impairment levels. Legal limits vary by location, driver age, and license type. 
                    <strong className="text-red-300"> When in doubt, don't drive.</strong> Always arrange alternative transportation 
                    after consuming alcohol. This tool is for educational purposes only - consult legal and medical professionals for 
                    serious matters.
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