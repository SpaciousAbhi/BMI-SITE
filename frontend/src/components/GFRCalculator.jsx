import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertCircle, Activity, RefreshCw, Info, Heart } from 'lucide-react';

const GFRCalculator = () => {
  const [formData, setFormData] = useState({
    creatinine: '',
    age: '',
    gender: '',
    creatinineUnit: 'mg/dL'
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
      creatinine: '',
      age: '',
      gender: '',
      creatinineUnit: 'mg/dL'
    });
    setResults(null);
  };

  const calculateGFR = () => {
    // Validate inputs
    const { creatinine, age, gender, creatinineUnit } = formData;
    
    if (!creatinine || !age || !gender) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for user experience
    setTimeout(() => {
      // Convert creatinine to mg/dL if needed
      let creatinineValue = parseFloat(creatinine);
      if (creatinineUnit === 'µmol/L') {
        creatinineValue = creatinineValue / 88.4; // Convert µmol/L to mg/dL
      }

      // CKD-EPI 2021 equation implementation (race-free formula)
      const ageValue = parseInt(age);
      const isFemale = gender === 'female';

      let gfr;
      
      // CKD-EPI 2021 (without race) equation
      if (isFemale) {
        if (creatinineValue <= 0.7) {
          gfr = 142 * Math.pow((creatinineValue / 0.7), -0.241) * Math.pow(0.9938, ageValue);
        } else {
          gfr = 142 * Math.pow((creatinineValue / 0.7), -1.200) * Math.pow(0.9938, ageValue);
        }
      } else {
        if (creatinineValue <= 0.9) {
          gfr = 142 * Math.pow((creatinineValue / 0.9), -0.302) * Math.pow(0.9938, ageValue);
        } else {
          gfr = 142 * Math.pow((creatinineValue / 0.9), -1.200) * Math.pow(0.9938, ageValue);
        }
      }

      // Round to 1 decimal place
      gfr = Math.round(gfr * 10) / 10;

      // Determine CKD stage and status with enhanced risk assessment
      let stage, status, description, riskLevel, recommendations;
      
      if (gfr >= 90) {
        stage = 'G1';
        status = 'Normal or High';
        description = 'Normal kidney function or kidney damage with normal or high GFR';
        riskLevel = 'low';
        recommendations = 'Monitor regularly if other kidney disease markers present. Maintain healthy lifestyle.';
      } else if (gfr >= 60) {
        stage = 'G2';
        status = 'Mild Decrease';
        description = 'Mild decrease in kidney function';
        riskLevel = 'low';
        recommendations = 'Monitor kidney function annually. Control blood pressure and diabetes if present.';
      } else if (gfr >= 45) {
        stage = 'G3a';
        status = 'Mild to Moderate Decrease';
        description = 'Mild to moderate decrease in kidney function';
        riskLevel = 'moderate';
        recommendations = 'Monitor every 6 months. Begin CKD management strategies. Consider nephrology referral.';
      } else if (gfr >= 30) {
        stage = 'G3b';
        status = 'Moderate to Severe Decrease';
        description = 'Moderate to severe decrease in kidney function';
        riskLevel = 'moderate';
        recommendations = 'Monitor every 3-6 months. Nephrology referral recommended. Prepare for complications.';
      } else if (gfr >= 15) {
        stage = 'G4';
        status = 'Severe Decrease';
        description = 'Severe decrease in kidney function';
        riskLevel = 'high';
        recommendations = 'Nephrology care essential. Monitor every 3 months. Prepare for renal replacement therapy.';
      } else {
        stage = 'G5';
        status = 'Kidney Failure';
        description = 'Kidney failure (end-stage renal disease)';
        riskLevel = 'critical';
        recommendations = 'Immediate nephrology care. Dialysis or transplant evaluation required.';
      }

      // Calculate cardiovascular risk based on GFR
      let cvRisk = 'Normal';
      if (gfr < 60) cvRisk = 'Increased';
      if (gfr < 45) cvRisk = 'Moderately Increased';
      if (gfr < 30) cvRisk = 'High';
      if (gfr < 15) cvRisk = 'Very High';

      setResults({
        gfr,
        stage,
        status,
        description,
        riskLevel,
        recommendations,
        cvRisk,
        creatinineUsed: creatinineValue.toFixed(2),
        equation: 'CKD-EPI 2021 (Race-Free)'
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400 bg-green-900/20 border-green-800';
      case 'moderate': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-800';
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-800';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-800';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl mb-6 shadow-lg">
              <Activity className="w-9 h-9 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">eGFR Calculator</h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Calculate your estimated glomerular filtration rate using the latest CKD-EPI 2021 race-free equation for accurate kidney function assessment
            </p>
          </div>

          {/* Enhanced Info Banner */}
          <div className="mb-8 p-4 bg-blue-900/20 border border-blue-800 rounded-xl">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-200">
                <strong className="text-blue-400">Updated Formula:</strong> This calculator uses the CKD-EPI 2021 equation, which removes race as a factor for more equitable kidney function assessment across all populations.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Serum Creatinine */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">
                Serum Creatinine <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.01"
                  min="0.1"
                  max="20"
                  placeholder="Enter creatinine level"
                  value={formData.creatinine}
                  onChange={(e) => handleInputChange('creatinine', e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 sm:h-11 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  aria-label="Serum creatinine value"
                />
                <Select
                  value={formData.creatinineUnit}
                  onValueChange={(value) => handleInputChange('creatinineUnit', value)}
                >
                  <SelectTrigger className="w-20 sm:w-24 bg-gray-800 border-gray-700 text-white h-12 sm:h-11 focus:ring-2 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="mg/dL">mg/dL</SelectItem>
                    <SelectItem value="µmol/L">µmol/L</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-400">Normal range: 0.6-1.2 mg/dL (53-106 µmol/L)</p>
            </div>

            {/* Age */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">
                Age <span className="text-red-400">*</span>
              </label>
              <Input
                type="number"
                min="18"
                max="120"
                placeholder="Enter age in years"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 sm:h-11 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                aria-label="Age in years"
              />
              <p className="text-xs text-gray-400">Age affects kidney function naturally</p>
            </div>

            {/* Gender */}
            <div className="space-y-3 lg:col-span-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Biological Sex <span className="text-red-400">*</span>
              </label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 sm:h-11 focus:ring-2 focus:ring-blue-500 max-w-xs">
                  <SelectValue placeholder="Select biological sex" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">Biological sex affects muscle mass and creatinine production</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              onClick={calculateGFR}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold h-12 sm:h-11 text-base disabled:opacity-50 transition-all transform hover:scale-105 shadow-lg"
              aria-label="Calculate eGFR"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Calculating eGFR...
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5 mr-2" />
                  Calculate eGFR
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
                <h3 className="text-xl font-bold text-white mb-6">Your eGFR Results</h3>
                
                <div className="text-5xl sm:text-6xl font-bold text-blue-400 mb-3">
                  {results.gfr}
                </div>
                <div className="text-gray-300 text-base mb-6">
                  mL/min/1.73 m² ({results.equation})
                </div>
                
                <div className={`inline-block px-6 py-3 rounded-xl border ${getRiskColor(results.riskLevel)} font-bold text-lg`}>
                  Stage {results.stage}: {results.status}
                </div>
                
                <p className="text-gray-300 text-base mt-6 max-w-lg mx-auto leading-relaxed">
                  {results.description}
                </p>

                {/* Enhanced Information Grid */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-red-400" />
                      <h4 className="font-semibold text-white">Cardiovascular Risk</h4>
                    </div>
                    <p className="text-sm text-gray-300">{results.cvRisk}</p>
                  </div>
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-blue-400" />
                      <h4 className="font-semibold text-white">Monitoring Frequency</h4>
                    </div>
                    <p className="text-sm text-gray-300">
                      {results.stage === 'G1' || results.stage === 'G2' ? 'Annual' : 
                       results.stage === 'G3a' ? 'Every 6 months' :
                       results.stage === 'G3b' ? 'Every 3-6 months' :
                       results.stage === 'G4' ? 'Every 3 months' : 'Monthly'}
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                  <h4 className="font-semibold text-blue-400 mb-2">Clinical Recommendations</h4>
                  <p className="text-sm text-blue-200 leading-relaxed">{results.recommendations}</p>
                </div>
              </div>

              {/* Enhanced Medical Disclaimer */}
              <div className="bg-amber-900/20 border border-amber-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-200 leading-relaxed">
                    <strong className="text-amber-400 text-base">Important Medical Disclaimer:</strong><br />
                    This calculator provides estimates for educational purposes only using the CKD-EPI 2021 equation. 
                    eGFR results should always be interpreted by qualified healthcare professionals alongside clinical symptoms, 
                    medical history, additional laboratory tests (including albumin-to-creatinine ratio), and imaging studies. 
                    <strong className="text-amber-300"> Never use this tool for self-diagnosis or treatment decisions.</strong> 
                    Consult your healthcare provider for proper medical evaluation and care.
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

export default GFRCalculator;