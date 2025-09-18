import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertCircle, Activity, RefreshCw } from 'lucide-react';

const GFRCalculator = () => {
  const [formData, setFormData] = useState({
    creatinine: '',
    age: '',
    gender: '',
    race: '',
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
      race: '',
      creatinineUnit: 'mg/dL'
    });
    setResults(null);
  };

  const calculateGFR = () => {
    // Validate inputs
    const { creatinine, age, gender, race, creatinineUnit } = formData;
    
    if (!creatinine || !age || !gender || !race) {
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

      // CKD-EPI equation implementation
      const ageValue = parseInt(age);
      const isFemale = gender === 'female';
      const isBlack = race === 'black';

      let gfr;
      
      if (isFemale) {
        if (creatinineValue <= 0.7) {
          gfr = 144 * Math.pow((creatinineValue / 0.7), -0.329) * Math.pow(0.993, ageValue);
        } else {
          gfr = 144 * Math.pow((creatinineValue / 0.7), -1.209) * Math.pow(0.993, ageValue);
        }
      } else {
        if (creatinineValue <= 0.9) {
          gfr = 141 * Math.pow((creatinineValue / 0.9), -0.411) * Math.pow(0.993, ageValue);
        } else {
          gfr = 141 * Math.pow((creatinineValue / 0.9), -1.209) * Math.pow(0.993, ageValue);
        }
      }

      // Apply race factor if Black/African American
      if (isBlack) {
        gfr *= 1.159;
      }

      // Round to 1 decimal place
      gfr = Math.round(gfr * 10) / 10;

      // Determine CKD stage and status
      let stage, status, description, riskLevel;
      
      if (gfr >= 90) {
        stage = 'G1';
        status = 'Normal or High';
        description = 'Normal kidney function or kidney damage with normal or high GFR';
        riskLevel = 'low';
      } else if (gfr >= 60) {
        stage = 'G2';
        status = 'Mild Decrease';
        description = 'Mild decrease in kidney function';
        riskLevel = 'low';
      } else if (gfr >= 45) {
        stage = 'G3a';
        status = 'Mild to Moderate Decrease';
        description = 'Mild to moderate decrease in kidney function';
        riskLevel = 'moderate';
      } else if (gfr >= 30) {
        stage = 'G3b';
        status = 'Moderate to Severe Decrease';
        description = 'Moderate to severe decrease in kidney function';
        riskLevel = 'moderate';
      } else if (gfr >= 15) {
        stage = 'G4';
        status = 'Severe Decrease';
        description = 'Severe decrease in kidney function';
        riskLevel = 'high';
      } else {
        stage = 'G5';
        status = 'Kidney Failure';
        description = 'Kidney failure (end-stage renal disease)';
        riskLevel = 'critical';
      }

      setResults({
        gfr,
        stage,
        status,
        description,
        riskLevel,
        creatinineUsed: creatinineValue.toFixed(2),
        equation: 'CKD-EPI'
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
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">GFR Calculator</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Calculate your estimated glomerular filtration rate for kidney function assessment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Serum Creatinine */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Serum Creatinine *
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
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-11 sm:h-10"
                />
                <Select
                  value={formData.creatinineUnit}
                  onValueChange={(value) => handleInputChange('creatinineUnit', value)}
                >
                  <SelectTrigger className="w-20 sm:w-24 bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="mg/dL">mg/dL</SelectItem>
                    <SelectItem value="µmol/L">µmol/L</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Age *
              </label>
              <Input
                type="number"
                min="18"
                max="120"
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-11 sm:h-10"
              />
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

            {/* Race */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Race/Ethnicity *
              </label>
              <Select
                value={formData.race}
                onValueChange={(value) => handleInputChange('race', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-11 sm:h-10">
                  <SelectValue placeholder="Select race/ethnicity" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="other">Non-Black/African American</SelectItem>
                  <SelectItem value="black">Black/African American</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <Button
              onClick={calculateGFR}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold h-11 sm:h-10 disabled:opacity-50"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 mr-2" />
                  Calculate GFR
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
                <h3 className="text-lg font-semibold text-white mb-4">Your GFR Results</h3>
                
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {results.gfr}
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  mL/min/1.73 m² (CKD-EPI equation)
                </div>
                
                <div className={`inline-block px-4 py-2 rounded-lg border ${getRiskColor(results.riskLevel)} font-semibold`}>
                  Stage {results.stage}: {results.status}
                </div>
                
                <p className="text-gray-300 text-sm mt-4 max-w-md mx-auto">
                  {results.description}
                </p>
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-amber-900/20 border border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-200">
                    <strong className="text-amber-400">Medical Disclaimer:</strong> This calculator provides an estimate for educational purposes only. 
                    GFR results should always be interpreted by a qualified healthcare professional in conjunction with clinical symptoms, 
                    medical history, and other laboratory tests. Do not use this tool for self-diagnosis or treatment decisions.
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