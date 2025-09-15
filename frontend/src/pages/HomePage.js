import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, History, Target, Sun, Moon, Ruler, Weight, User, Users, Calendar, X, Utensils, Zap, Activity, BookOpen } from 'lucide-react';
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
import SEOContent from '../components/SEOContent';
import SEOHead from '../components/SEOHead';
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
      <SEOHead 
        title="Free BMI Calculator - Calculate Body Mass Index Online 2025 | Instant Results"
        description="Free BMI calculator online - Calculate your Body Mass Index instantly with our advanced BMI calculator. Includes body fat estimation, ideal weight, calorie needs, and macros calculator. Get instant BMI results with health recommendations."
        keywords="BMI calculator, body mass index calculator, calculate BMI, free BMI calculator, BMI calculator online, healthy BMI range, BMI categories, body fat calculator, calorie calculator, ideal weight calculator, healthy weight BMI"
        canonical="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Free BMI Calculator - Body Mass Index Calculator",
          "description": "Free online BMI calculator to calculate your Body Mass Index instantly. Includes body fat estimation, ideal weight calculator, calorie needs calculator, and macros breakdown.",
          "url": "https://bmicalculator.com/",
          "applicationCategory": "HealthApplication",
          "operatingSystem": ["Windows", "macOS", "Linux", "Android", "iOS"],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "15000"
          }
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Free BMI Calculator - Calculate Body Mass Index Online
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
            <strong>Calculate your BMI instantly</strong> with our free Body Mass Index calculator. Get accurate BMI results, healthy BMI range analysis, body fat estimation, and personalized health recommendations.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Free BMI Calculator', 'Instant BMI Results', 'Body Fat Calculator', 'Healthy BMI Range', 'Calorie Calculator', 'Health Reports'].map((feature, index) => (
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
                Free BMI Calculator Online
              </CardTitle>
              <p className={`text-sm mt-2 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Calculate your Body Mass Index instantly with our free, accurate BMI calculator
              </p>
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

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 animate-slide-in" style={{ animationDelay: '500ms' }}>
                <Button
                  onClick={calculateResults}
                  disabled={loading}
                  className={`transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl'
                      : theme === 'dark'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate BMI
                    </>
                  )}
                </Button>
                <Button
                  onClick={clearForm}
                  variant="outline"
                  className={`transition-all duration-300 hover:scale-105 ${
                    theme === 'white'
                      ? 'border-teal-300 text-teal-700 hover:bg-teal-50'
                      : theme === 'dark'
                      ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/20'
                      : 'border-green-500/50 text-green-300 hover:bg-green-900/20'
                  }`}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
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

        {/* Comprehensive Health Calculator Suite */}
        <div className="mt-16 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Complete Health Calculator Suite
            </h2>
            <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Professional-grade health calculators designed for comprehensive body composition analysis and personalized health insights.
            </p>
            <div className={`w-24 h-1 mx-auto mt-6 rounded-full ${
              theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
              theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
              'bg-gradient-to-r from-green-400 to-emerald-500'
            }`} />
          </div>

          {/* Essential Health Calculators */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className={`text-2xl md:text-3xl font-semibold mb-4 ${
                theme === 'white' ? 'text-gray-800' : 'text-gray-100'
              }`}>
                Essential Health Calculators
              </h3>
              <p className={`text-lg max-w-2xl mx-auto ${
                theme === 'white' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Core calculators for comprehensive health assessment and goal planning
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Body Fat Calculator */}
              <Link to="/body-fat" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.05] group-hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-white/90 hover:bg-white border border-red-100 hover:border-red-200' 
                    : theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-800 border border-red-500/20 hover:border-red-500/40'
                    : 'bg-gray-900/90 hover:bg-gray-900 border border-red-500/20 hover:border-red-500/40'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      theme === 'white' 
                        ? 'bg-red-50 group-hover:bg-red-100' 
                        : 'bg-red-900/20 group-hover:bg-red-900/30'
                    }`}>
                      <Target className={`h-10 w-10 transition-all duration-300 ${
                        theme === 'white' ? 'text-red-600 group-hover:text-red-700' : 'text-red-400 group-hover:text-red-300'
                      }`} />
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Body Fat Calculator
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      US Navy method using waist, neck & hip measurements for accurate body fat percentage
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Calorie Calculator */}
              <Link to="/calories" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.05] group-hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-white/90 hover:bg-white border border-orange-100 hover:border-orange-200' 
                    : theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-800 border border-orange-500/20 hover:border-orange-500/40'
                    : 'bg-gray-900/90 hover:bg-gray-900 border border-orange-500/20 hover:border-orange-500/40'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      theme === 'white' 
                        ? 'bg-orange-50 group-hover:bg-orange-100' 
                        : 'bg-orange-900/20 group-hover:bg-orange-900/30'
                    }`}>
                      <Zap className={`h-10 w-10 transition-all duration-300 ${
                        theme === 'white' ? 'text-orange-600 group-hover:text-orange-700' : 'text-orange-400 group-hover:text-orange-300'
                      }`} />
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Calorie Calculator
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      TDEE & BMR calculator for precise daily calorie needs and weight goals
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Macros Calculator */}
              <Link to="/macros" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.05] group-hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-white/90 hover:bg-white border border-green-100 hover:border-green-200' 
                    : theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-800 border border-green-500/20 hover:border-green-500/40'
                    : 'bg-gray-900/90 hover:bg-gray-900 border border-green-500/20 hover:border-green-500/40'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      theme === 'white' 
                        ? 'bg-green-50 group-hover:bg-green-100' 
                        : 'bg-green-900/20 group-hover:bg-green-900/30'
                    }`}>
                      <Utensils className={`h-10 w-10 transition-all duration-300 ${
                        theme === 'white' ? 'text-green-600 group-hover:text-green-700' : 'text-green-400 group-hover:text-green-300'
                      }`} />
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Macros Calculator
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Optimal protein, carbs, and fats breakdown for your specific fitness goals
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Workout Plans */}
              <Link to="/workout" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.05] group-hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-white/90 hover:bg-white border border-blue-100 hover:border-blue-200' 
                    : theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-800 border border-blue-500/20 hover:border-blue-500/40'
                    : 'bg-gray-900/90 hover:bg-gray-900 border border-blue-500/20 hover:border-blue-500/40'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      theme === 'white' 
                        ? 'bg-blue-50 group-hover:bg-blue-100' 
                        : 'bg-blue-900/20 group-hover:bg-blue-900/30'
                    }`}>
                      <Activity className={`h-10 w-10 transition-all duration-300 ${
                        theme === 'white' ? 'text-blue-600 group-hover:text-blue-700' : 'text-blue-400 group-hover:text-blue-300'
                      }`} />
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Workout Plans
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Personalized exercise routines tailored to your fitness level and goals
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Specialized BMI Calculators */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className={`text-2xl md:text-3xl font-semibold mb-4 ${
                theme === 'white' ? 'text-gray-800' : 'text-gray-100'
              }`}>
                Specialized BMI Calculators
              </h3>
              <p className={`text-lg max-w-2xl mx-auto ${
                theme === 'white' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Advanced calculators with demographic-specific adjustments for more accurate results
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Pregnancy BMI Calculator */}
              <Link to="/pregnancy-bmi" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-gradient-to-br from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border border-pink-200/50' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-br from-pink-900/20 to-purple-900/20 hover:from-pink-800/30 hover:to-purple-800/30 border border-pink-500/20'
                    : 'bg-gradient-to-br from-pink-900/20 to-purple-900/20 hover:from-pink-800/30 hover:to-purple-800/30 border border-pink-500/20'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-18 h-18 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      theme === 'white' ? 'bg-pink-100' : 'bg-pink-900/30'
                    }`}>
                      <span className={`text-3xl ${
                        theme === 'white' ? 'text-pink-600' : 'text-pink-400'
                      }`}>🤱</span>
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Pregnancy BMI
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Track healthy weight gain with trimester-specific recommendations
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Senior BMI Calculator */}
              <Link to="/senior-bmi" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-indigo-200/50' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 hover:from-blue-800/30 hover:to-indigo-800/30 border border-indigo-500/20'
                    : 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 hover:from-blue-800/30 hover:to-indigo-800/30 border border-indigo-500/20'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-18 h-18 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      theme === 'white' ? 'bg-indigo-100' : 'bg-indigo-900/30'
                    }`}>
                      <Users className={`h-9 w-9 ${
                        theme === 'white' ? 'text-indigo-600' : 'text-indigo-400'
                      }`} />
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Senior BMI (65+)
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Age-adjusted categories and health recommendations for seniors
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Ethnicity BMI Calculator */}
              <Link to="/ethnicity-bmi" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200/50' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20 hover:from-emerald-800/30 hover:to-teal-800/30 border border-emerald-500/20'
                    : 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20 hover:from-emerald-800/30 hover:to-teal-800/30 border border-emerald-500/20'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-18 h-18 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      theme === 'white' ? 'bg-emerald-100' : 'bg-emerald-900/30'
                    }`}>
                      <span className={`text-3xl ${
                        theme === 'white' ? 'text-emerald-600' : 'text-emerald-400'
                      }`}>🌍</span>
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Ethnicity-Adjusted BMI
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Culturally-aware BMI with ethnic background adjustments
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* BMI for Athletes */}
              <Link to="/bmi-for-athletes" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border border-red-200/50' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-br from-red-900/20 to-pink-900/20 hover:from-red-800/30 hover:to-pink-800/30 border border-red-500/20'
                    : 'bg-gradient-to-br from-red-900/20 to-pink-900/20 hover:from-red-800/30 hover:to-pink-800/30 border border-red-500/20'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-18 h-18 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      theme === 'white' ? 'bg-red-100' : 'bg-red-900/30'
                    }`}>
                      <span className={`text-3xl ${
                        theme === 'white' ? 'text-red-600' : 'text-red-400'
                      }`}>🏃‍♂️</span>
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      BMI for Athletes
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Specialized calculator for high muscle mass and athletic builds
                    </p>  
                  </CardContent>
                </Card>
              </Link>

              {/* Smart BMI Calculator */}
              <Link to="/smart-bmi" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-gradient-to-br from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 border border-violet-200/50' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-br from-violet-900/20 to-purple-900/20 hover:from-violet-800/30 hover:to-purple-800/30 border border-violet-500/20'
                    : 'bg-gradient-to-br from-violet-900/20 to-purple-900/20 hover:from-violet-800/30 hover:to-purple-800/30 border border-violet-500/20'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-18 h-18 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      theme === 'white' ? 'bg-violet-100' : 'bg-violet-900/30'
                    }`}>
                      <span className={`text-3xl ${
                        theme === 'white' ? 'text-violet-600' : 'text-violet-400'
                      }`}>🧠</span>
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Smart BMI Calculator
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      AI-powered analysis with advanced health insights
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Health Blog */}
              <Link to="/blog" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-2xl transform group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 border border-orange-200/50' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 hover:from-yellow-800/30 hover:to-orange-800/30 border border-orange-500/20'
                    : 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 hover:from-yellow-800/30 hover:to-orange-800/30 border border-orange-500/20'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-18 h-18 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      theme === 'white' ? 'bg-orange-100' : 'bg-orange-900/30'
                    }`}>
                      <BookOpen className={`h-9 w-9 ${
                        theme === 'white' ? 'text-orange-600' : 'text-orange-400'
                      }`} />
                    </div>
                    <h4 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Health & BMI Blog
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Expert articles on health, fitness, and wellness
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Health Tools & Resources */}
          <div className="mb-12">
            <div className="text-center mb-10">
              <h3 className={`text-2xl md:text-3xl font-semibold mb-4 ${
                theme === 'white' ? 'text-gray-800' : 'text-gray-100'
              }`}>
                Health Tools & Resources
              </h3>
              <p className={`text-lg max-w-2xl mx-auto ${
                theme === 'white' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Additional tools to support your health and fitness journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Link to="/history" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-xl transform group-hover:scale-105 transition-all duration-300 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-white/70 hover:bg-white/90 border border-purple-100' 
                    : theme === 'dark'
                    ? 'bg-gray-800/70 hover:bg-gray-800/90 border border-purple-500/20'
                    : 'bg-gray-900/70 hover:bg-gray-900/90 border border-purple-500/20'
                }`}>
                  <CardContent className="p-6 text-center">
                    <History className={`h-12 w-12 mx-auto mb-4 ${
                      theme === 'white' ? 'text-purple-600' : 'text-purple-400'
                    }`} />
                    <h4 className={`text-lg font-semibold mb-2 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Progress Tracking
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Monitor your health metrics over time
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/goals" className="group">
                <Card className={`backdrop-blur-md border-0 shadow-xl transform group-hover:scale-105 transition-all duration-300 cursor-pointer ${
                  theme === 'white' 
                    ? 'bg-white/70 hover:bg-white/90 border border-teal-100' 
                    : theme === 'dark'
                    ? 'bg-gray-800/70 hover:bg-gray-800/90 border border-teal-500/20'
                    : 'bg-gray-900/70 hover:bg-gray-900/90 border border-teal-500/20'
                }`}>
                  <CardContent className="p-6 text-center">
                    <Target className={`h-12 w-12 mx-auto mb-4 ${
                      theme === 'white' ? 'text-teal-600' : 'text-teal-400'
                    }`} />
                    <h4 className={`text-lg font-semibold mb-2 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Health Goals
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Set and track your fitness objectives
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Card className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
                theme === 'white' 
                  ? 'bg-white/70 hover:bg-white/90 border border-indigo-100' 
                  : theme === 'dark'
                  ? 'bg-gray-800/70 hover:bg-gray-800/90 border border-indigo-500/20'
                  : 'bg-gray-900/70 hover:bg-gray-900/90 border border-indigo-500/20'
              }`}>
                <CardContent className="p-6 text-center">
                  <Calculator className={`h-12 w-12 mx-auto mb-4 ${
                    theme === 'white' ? 'text-indigo-600' : 'text-indigo-400'
                  }`} />
                  <h4 className={`text-lg font-semibold mb-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Health Reports
                  </h4>
                  <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    Download comprehensive health reports
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* SEO-Optimized Content Section */}
        <SEOContent />

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