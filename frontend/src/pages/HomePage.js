import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, History, Target, Sun, Moon, Ruler, Weight, User, Calendar, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { useBMI } from '../contexts/BMIContext';
import { useToast } from '../hooks/use-toast';
import BMIResult from '../components/BMIResult';
import AdvancedMetrics from '../components/AdvancedMetrics';
import BMIInformation from '../components/BMIInformation';
import ChildrenBMIInfo from '../components/ChildrenBMIInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { calculateBMI, calculateBodyFat, calculateIdealWeight, getHealthRecommendations } from '../utils/bmiCalculations';

const HomePage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { units, addBMIRecord } = useBMI();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    heightFeet: '',
    heightInches: '',
    age: '',
    gender: '',
    weightUnit: 'kg',
    heightUnit: 'cm',
    unitSystem: 'metric', // 'metric', 'us', 'indian'
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const setUnitSystem = (system) => {
    let newData = { ...formData, unitSystem: system };
    
    switch(system) {
      case 'us':
        newData.weightUnit = 'lbs';
        newData.heightUnit = 'feet';
        break;
      case 'metric':
        newData.weightUnit = 'kg';
        newData.heightUnit = 'cm';
        break;
      case 'indian':
        newData.weightUnit = 'kg';
        newData.heightUnit = 'cm';
        break;
      default:
        break;
    }
    
    setFormData(newData);
  };

  const clearForm = () => {
    setFormData({
      weight: '',
      height: '',
      heightFeet: '',
      heightInches: '',
      age: '',
      gender: '',
      weightUnit: formData.weightUnit,
      heightUnit: formData.heightUnit,
      unitSystem: formData.unitSystem,
    });
    setResult(null);
  };

  const getHeightInCm = () => {
    if (formData.heightUnit === 'cm') {
      return parseFloat(formData.height);
    } else if (formData.heightUnit === 'inches') {
      return parseFloat(formData.height) * 2.54;
    } else if (formData.heightUnit === 'feet') {
      // Handle both combined (5.9) and separate feet/inches input
      if (formData.heightFeet && formData.heightInches) {
        // Separate feet and inches input
        const feet = parseInt(formData.heightFeet);
        const inches = parseInt(formData.heightInches);
        return ((feet * 12) + inches) * 2.54;
      } else if (formData.height) {
        // Combined feet.inches input (e.g., 5.9 or 6.10)
        const heightStr = formData.height.toString();
        if (heightStr.includes('.')) {
          const [feetStr, inchesStr] = heightStr.split('.');
          const feet = parseInt(feetStr);
          const inches = parseInt(inchesStr);
          return ((feet * 12) + inches) * 2.54;
        } else {
          // Just feet, no inches
          return parseInt(formData.height) * 12 * 2.54;
        }
      }
    }
    return 0;
  };

  const calculateResults = async () => {
    // Validation
    const heightInCm = getHeightInCm();
    
    if (!formData.weight || !heightInCm || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your BMI.",
        variant: "destructive",
      });
      return;
    }

    if (heightInCm <= 0) {
      toast({
        title: "Invalid Height",
        description: "Please enter a valid height.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const age = parseInt(formData.age);
      
      // Convert weight to kg if needed
      let weightInKg = weight;
      if (formData.weightUnit === 'lbs') {
        weightInKg = weight * 0.453592;
      }
      
      const bmi = calculateBMI(weightInKg, heightInCm, 'metric');
      const bodyFat = calculateBodyFat(bmi, age, formData.gender);
      const idealWeight = calculateIdealWeight(heightInCm, age, formData.gender, 'metric');
      const recommendations = getHealthRecommendations(bmi, bodyFat, age, formData.gender);
      
      const resultData = {
        bmi,
        bodyFat,
        idealWeight,
        recommendations,
        weight,
        height: formData.heightUnit === 'feet' && formData.heightFeet && formData.heightInches 
          ? `${formData.heightFeet}'${formData.heightInches}"` 
          : formData.height,
        heightInCm,
        age,
        gender: formData.gender,
        weightUnit: formData.weightUnit,
        heightUnit: formData.heightUnit,
        unitSystem: formData.unitSystem,
      };
      
      setResult(resultData);
      addBMIRecord(resultData);
      setLoading(false);
      
      toast({
        title: "BMI Calculated!",
        description: "Your results have been saved to history.",
      });
    }, 800);
  };

  const resetForm = () => {
    setFormData({ 
      weight: '', 
      height: '', 
      heightFeet: '',
      heightInches: '',
      age: '', 
      gender: '', 
      weightUnit: 'kg', 
      heightUnit: 'cm',
      unitSystem: 'metric',
    });
    setResult(null);
  };

  const getUnitSystemColor = (system) => {
    const isActive = formData.unitSystem === system;
    if (isActive) {
      return theme === 'white' 
        ? 'bg-teal-600 text-white border-teal-600' 
        : theme === 'dark'
        ? 'bg-purple-600 text-white border-purple-600'
        : 'bg-green-600 text-white border-green-600';
    }
    return theme === 'white' 
      ? 'bg-white text-teal-600 border-teal-300 hover:bg-teal-50' 
      : theme === 'dark'
      ? 'bg-gray-700 text-purple-300 border-purple-500/50 hover:bg-purple-900/20'
      : 'bg-gray-800 text-green-300 border-green-500/50 hover:bg-green-900/20';
  };

  const getHeightPlaceholder = () => {
    switch(formData.heightUnit) {
      case 'feet':
        return 'e.g., 6.10 for 6\'10" or use separate fields below';
      case 'inches':
        return 'e.g., 70 for 70 inches';
      case 'cm':
        return 'e.g., 175 for 175 cm';
      default:
        return `Enter height in ${formData.heightUnit}`;
    }
  };

  const getWeightPlaceholder = () => {
    switch(formData.weightUnit) {
      case 'kg':
        return 'e.g., 70 for 70 kilograms';
      case 'lbs':
        return 'e.g., 154 for 154 pounds';
      default:
        return `Enter weight in ${formData.weightUnit}`;
    }
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Advanced BMI Calculator
            </h1>
            {/* Accent underline */}
            <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
              theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
              theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
              'bg-gradient-to-r from-green-400 to-emerald-500'
            }`} />
          </div>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your Body Mass Index with advanced health insights, body fat estimation, and personalized recommendations.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Instant Results', 'PDF Reports', 'Workout Plans', 'Health Insights'].map((feature, index) => (
              <Badge 
                key={feature}
                variant="secondary" 
                className={`px-4 py-2 text-sm font-medium transition-all duration-500 transform hover:scale-105 animate-slide-in ${
                  theme === 'white' ? 'bg-teal-100 text-teal-800 hover:bg-teal-200' :
                  theme === 'dark' ? 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/50' :
                  'bg-green-900/50 text-green-200 hover:bg-green-800/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Enhanced Calculator Form */}
          <Card className={`backdrop-blur-md border-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 glass-effect animate-scale-in ${
            theme === 'white' 
              ? 'bg-white/80 hover:bg-white/90 border-teal-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 hover:bg-gray-800/90 border-purple-500/20'
              : 'bg-black/80 hover:bg-gray-900/50 border-green-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <Calculator className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                BMI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Unit System Selection */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '50ms' }}>
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Unit System
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    onClick={() => setUnitSystem('metric')}
                    className={`transition-all duration-300 hover:scale-105 ${getUnitSystemColor('metric')}`}
                  >
                    Metric
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setUnitSystem('us')}
                    className={`transition-all duration-300 hover:scale-105 ${getUnitSystemColor('us')}`}
                  >
                    US
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setUnitSystem('indian')}
                    className={`transition-all duration-300 hover:scale-105 ${getUnitSystemColor('indian')}`}
                  >
                    Indian
                  </Button>
                </div>
                <div className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {formData.unitSystem === 'metric' && 'Metric: kg + cm'}
                  {formData.unitSystem === 'us' && 'US: lbs + feet/inches'}
                  {formData.unitSystem === 'indian' && 'Indian: kg + cm'}
                </div>
              </div>

              {/* Weight Input */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <Label htmlFor="weight" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Weight className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Weight
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="weight"
                    type="number"
                    placeholder={getWeightPlaceholder()}
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={`flex-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white'
                        : 'bg-gray-900/50 border-green-500/30 text-white'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Height Input */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '200ms' }}>
                <Label htmlFor="height" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Ruler className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Height
                </Label>
                
                {/* Primary Height Input */}
                <div className="flex gap-3">
                  <Input
                    id="height"
                    type="number"
                    step={formData.heightUnit === 'feet' ? '0.01' : '1'}
                    placeholder={getHeightPlaceholder()}
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    className={`flex-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange('heightUnit', value)}>
                    <SelectTrigger className={`w-24 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white'
                        : 'bg-gray-900/50 border-green-500/30 text-white'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="inches">in</SelectItem>
                      <SelectItem value="feet">ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Separate Feet and Inches Input (when feet is selected) */}
                {formData.heightUnit === 'feet' && (
                  <div className="space-y-2">
                    <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Or enter feet and inches separately:
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                          Feet
                        </Label>
                        <Input
                          type="number"
                          placeholder="e.g., 6"
                          value={formData.heightFeet}
                          onChange={(e) => handleInputChange('heightFeet', e.target.value)}
                          className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                            theme === 'white' 
                              ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                              : theme === 'dark'
                              ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                              : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                          }`}
                        />
                      </div>
                      <div>
                        <Label className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                          Inches
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          max="11"
                          placeholder="e.g., 10"
                          value={formData.heightInches}
                          onChange={(e) => handleInputChange('heightInches', e.target.value)}
                          className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                            theme === 'white' 
                              ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                              : theme === 'dark'
                              ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                              : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Height Input Examples and Tips */}
                <div className={`text-xs space-y-1 ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                  <div className="font-medium">Examples:</div>
                  {formData.heightUnit === 'feet' && (
                    <div>
                      • Combined: 6.10 (6 feet 10 inches) or 5.09 (5 feet 9 inches)<br/>
                      • Separate: 6 feet + 10 inches or 5 feet + 9 inches
                    </div>
                  )}
                  {formData.heightUnit === 'inches' && (
                    <div>• 70 inches, 68 inches, 72 inches</div>
                  )}
                  {formData.heightUnit === 'cm' && (
                    <div>• 175 cm, 165 cm, 180 cm</div>
                  )}
                </div>
              </div>

              {/* Age Input */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '300ms' }}>
                <Label htmlFor="age" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Calendar className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Gender Select */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '400ms' }}>
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <User className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex gap-4 pt-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
                <Button 
                  onClick={calculateResults}
                  disabled={loading}
                  className={`flex-1 font-semibold py-3 transform hover:scale-105 transition-all duration-300 shadow-lg ${
                    theme === 'white' 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white' 
                      : theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Calculating...
                    </>
                  ) : (
                    'Calculate BMI'
                  )}
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className={`px-6 transform hover:scale-105 transition-all duration-300 ${
                    theme === 'white' 
                      ? 'border-teal-200 text-teal-700 hover:bg-teal-50' 
                      : theme === 'dark'
                      ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
                      : 'border-green-500/30 text-green-300 hover:bg-green-500/10'
                  }`}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          {result && (
            <div className="space-y-6">
              <BMIResult result={result} />
              <AdvancedMetrics result={result} />
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link to="/history" className="group">
            <Card className={`backdrop-blur-md border-0 shadow-xl transform group-hover:scale-105 transition-all duration-300 cursor-pointer ${
              theme === 'dark' 
                ? 'bg-white/10 hover:bg-white/15' 
                : 'bg-white/70 hover:bg-white/80'
            }`}>
              <CardContent className="p-6 text-center">
                <History className={`h-12 w-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  BMI History
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Track your BMI progress over time
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/goals" className="group">
            <Card className={`backdrop-blur-md border-0 shadow-xl transform group-hover:scale-105 transition-all duration-300 cursor-pointer ${
              theme === 'dark' 
                ? 'bg-white/10 hover:bg-white/15' 
                : 'bg-white/70 hover:bg-white/80'
            }`}>
              <CardContent className="p-6 text-center">
                <Target className={`h-12 w-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Health Goals
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Set and track your fitness goals
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-white/10 hover:bg-white/15' 
              : 'bg-white/70 hover:bg-white/80'
          }`}>
            <CardContent className="p-6 text-center">
              <Calculator className={`h-12 w-12 mx-auto mb-4 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Advanced Analytics
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Body fat estimation & health insights
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive BMI Information Sections */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Complete BMI Guide & Health Information
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Comprehensive information about BMI, health risks, limitations, and special considerations.
            </p>
          </div>

          {/* BMI Information Sections */}
          <BMIInformation />
          
          {/* Children BMI Information */}
          <div className="mt-12">
            <ChildrenBMIInfo />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;