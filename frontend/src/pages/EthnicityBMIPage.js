import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Globe, Users, Info, ArrowLeft, Calendar, Weight, Ruler, User, ChevronDown, ChevronRight, Dna, Heart, BookOpen, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EthnicityBMIPage = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    ethnicity: '',
    weightUnit: 'kg',
    heightUnit: 'cm',
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const ethnicityOptions = [
    { value: 'asian', label: 'Asian' },
    { value: 'south-asian', label: 'South Asian (Indian, Pakistani, Bangladeshi, Sri Lankan)' },
    { value: 'east-asian', label: 'East Asian (Chinese, Japanese, Korean)' },
    { value: 'southeast-asian', label: 'Southeast Asian (Filipino, Thai, Vietnamese, Malaysian)' },
    { value: 'pacific-islander', label: 'Pacific Islander' },
    { value: 'african', label: 'African/African American' },
    { value: 'caucasian', label: 'Caucasian/White' },
    { value: 'hispanic', label: 'Hispanic/Latino' },
    { value: 'middle-eastern', label: 'Middle Eastern' },
    { value: 'indigenous', label: 'Indigenous/Native American' },
    { value: 'mixed', label: 'Mixed/Multi-ethnic' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getHeightInCm = () => {
    if (formData.heightUnit === 'cm') {
      return parseFloat(formData.height);
    } else {
      return parseFloat(formData.height) * 2.54;
    }
  };

  const getWeightInKg = () => {
    if (formData.weightUnit === 'kg') {
      return parseFloat(formData.weight);
    } else {
      return parseFloat(formData.weight) * 0.453592;
    }
  };

  const calculateEthnicityAdjustedBMI = () => {
    const heightInCm = getHeightInCm();
    const weightKg = getWeightInKg();
    const age = parseInt(formData.age);

    if (!weightKg || !heightInCm || !age || !formData.gender || !formData.ethnicity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields including ethnicity.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const heightInM = heightInCm / 100;
      const standardBMI = weightKg / (heightInM * heightInM);

      // Get ethnicity-adjusted categories and risks
      const ethnicityData = getEthnicityAdjustments(formData.ethnicity);
      
      let category = '';
      let healthRisk = '';
      let recommendations = [];

      // Apply ethnicity-specific BMI categories
      if (standardBMI < ethnicityData.categories.underweight) {
        category = 'Underweight';
        healthRisk = 'Increased risk of malnutrition and health complications';
        recommendations = [
          'Focus on nutrient-dense foods to gain healthy weight',
          'Include protein-rich foods at every meal',
          'Consider consulting with a healthcare provider',
          'Monitor for underlying health conditions'
        ];
      } else if (standardBMI < ethnicityData.categories.normal) {
        category = 'Normal Weight';
        healthRisk = 'Optimal weight range for your ethnic background';
        recommendations = [
          'Maintain current healthy lifestyle',
          'Continue balanced diet and regular exercise',
          'Monitor weight changes over time',
          'Focus on overall wellness and fitness'
        ];
      } else if (standardBMI < ethnicityData.categories.overweight) {
        category = 'Overweight';
        healthRisk = ethnicityData.risks.overweight;
        recommendations = [
          'Consider gradual weight loss through diet and exercise',
          'Focus on whole foods and portion control',
          'Increase physical activity levels',
          'Monitor for early signs of metabolic conditions',
          'Consider professional guidance for weight management'
        ];
      } else {
        category = 'Obese';
        healthRisk = ethnicityData.risks.obese;
        recommendations = [
          'Seek professional medical guidance for weight management',
          'Focus on sustainable lifestyle changes',
          'Regular monitoring of blood sugar, blood pressure, and cholesterol',
          'Consider structured weight loss programs',
          'Address cultural and dietary factors with a nutritionist'
        ];
      }

      // Calculate ideal weight range using ethnicity-specific categories
      const minIdealWeight = ethnicityData.categories.underweight * (heightInM * heightInM);
      const maxIdealWeight = (ethnicityData.categories.normal - 0.1) * (heightInM * heightInM);

      const resultData = {
        standardBMI: Math.round(standardBMI * 10) / 10,
        category,
        ethnicity: ethnicityData.name,
        ethnicityFactors: ethnicityData.factors,
        healthRisk,
        idealWeightRange: {
          min: Math.round(minIdealWeight * 10) / 10,
          max: Math.round(maxIdealWeight * 10) / 10
        },
        recommendations,
        culturalConsiderations: ethnicityData.culturalConsiderations,
        specificRisks: ethnicityData.specificRisks
      };

      setResult(resultData);
      setLoading(false);

      toast({
        title: "Ethnicity-Adjusted BMI Calculated!",
        description: "Your culturally-aware BMI analysis is ready.",
      });
    }, 800);
  };

  const getEthnicityAdjustments = (ethnicity) => {
    switch(ethnicity) {
      case 'asian':
      case 'east-asian':
        return {
          name: 'East Asian',
          categories: {
            underweight: 18.5,
            normal: 23,
            overweight: 25,
            obese: 30
          },
          risks: {
            overweight: 'Higher risk of type 2 diabetes and cardiovascular disease at lower BMI',
            obese: 'Significantly increased risk of metabolic syndrome and diabetes'
          },
          factors: [
            'Higher body fat percentage at same BMI compared to Caucasians',
            'Increased risk of diabetes at lower BMI thresholds',
            'Different fat distribution patterns',
            'Lower muscle mass relative to body weight'
          ],
          culturalConsiderations: [
            'Traditional diets may be high in refined carbohydrates',
            'Cultural emphasis on food in social situations',
            'Varying physical activity traditions across cultures',
            'Different body image ideals and weight perceptions'
          ],
          specificRisks: [
            'Type 2 diabetes risk increases at BMI >23',
            'Cardiovascular disease risk higher at lower BMI',
            'Metabolic syndrome more common',
            'Higher visceral fat accumulation'
          ]
        };

      case 'south-asian':
        return {
          name: 'South Asian',
          categories: {
            underweight: 18.5,
            normal: 23,
            overweight: 25,
            obese: 30
          },
          risks: {
            overweight: 'Highest risk of diabetes and heart disease among all ethnic groups at lower BMI',
            obese: 'Extremely high risk of metabolic complications'
          },
          factors: [
            'Highest risk of diabetes at lowest BMI thresholds',
            'Tendency to store fat in abdominal area',
            'Lower muscle mass and higher body fat percentage',
            'Genetic predisposition to insulin resistance'
          ],
          culturalConsiderations: [
            'Traditional diets rich in refined grains and sweets',
            'Cultural celebrations often centered around food',
            'Limited tradition of recreational physical activity',
            'Different concepts of ideal body weight'
          ],
          specificRisks: [
            'Diabetes risk increases at BMI >21',
            'Heart disease risk significantly elevated',
            'Higher rates of metabolic syndrome',
            'Increased risk of gestational diabetes in women'
          ]
        };

      case 'pacific-islander':
        return {
          name: 'Pacific Islander',
          categories: {
            underweight: 18.5,
            normal: 26,
            overweight: 32,
            obese: 37
          },
          risks: {
            overweight: 'Moderate risk with consideration for naturally larger body frame',
            obese: 'Increased risk of diabetes and cardiovascular disease'
          },
          factors: [
            'Naturally larger body frame and higher muscle mass',
            'Different body composition compared to other ethnicities',
            'Higher bone density',
            'Genetic adaptation to island environment'
          ],
          culturalConsiderations: [
            'Traditional foods often high in natural fats',
            'Cultural value placed on larger body size',
            'Traditional physical activities vs. modern sedentary lifestyle',
            'Food as expression of hospitality and community'
          ],
          specificRisks: [
            'High rates of type 2 diabetes in community',
            'Cardiovascular disease prevalence',
            'Higher rates of obesity-related complications',
            'Genetic predisposition to metabolic disorders'
          ]
        };

      case 'african':
        return {
          name: 'African/African American',
          categories: {
            underweight: 18.5,
            normal: 25,
            overweight: 30,
            obese: 35
          },
          risks: {
            overweight: 'Moderate risk with consideration for higher muscle mass',
            obese: 'Increased risk of hypertension and diabetes'
          },
          factors: [
            'Higher muscle mass and bone density',
            'Different fat distribution patterns',
            'Lower risk of osteoporosis',
            'Genetic variations affecting metabolism'
          ],
          culturalConsiderations: [
            'Historical and cultural relationship with food',
            'Traditional foods and cooking methods',
            'Cultural beauty standards and body image',
            'Socioeconomic factors affecting food access'
          ],
          specificRisks: [
            'Higher rates of hypertension',
            'Increased risk of type 2 diabetes',
            'Stroke risk elevation',
            'Kidney disease predisposition'
          ]
        };

      case 'hispanic':
        return {
          name: 'Hispanic/Latino',
          categories: {
            underweight: 18.5,
            normal: 25,
            overweight: 30,
            obese: 35
          },
          risks: {
            overweight: 'Increased risk of diabetes and cardiovascular disease',
            obese: 'High risk of metabolic complications'
          },
          factors: [
            'Genetic predisposition to diabetes',
            'Variable body composition across Hispanic subgroups',
            'Cultural and dietary diversity within ethnicity',
            'Mixed ancestry affecting body composition'
          ],
          culturalConsiderations: [
            'Diverse traditional diets across regions',
            'Cultural importance of family meals',
            'Varying physical activity traditions',
            'Language barriers in healthcare settings'
          ],
          specificRisks: [
            'High rates of type 2 diabetes',
            'Increased cardiovascular disease risk',
            'Higher rates of gestational diabetes',
            'Metabolic syndrome prevalence'
          ]
        };

      default:
        return {
          name: 'Standard/Mixed Ethnicity',
          categories: {
            underweight: 18.5,
            normal: 25,
            overweight: 30,
            obese: 35
          },
          risks: {
            overweight: 'Increased risk of health complications',
            obese: 'High risk of chronic diseases'
          },
          factors: [
            'Standard BMI categories apply',
            'Individual variation should be considered',
            'Mixed ancestry may affect body composition',
            'Lifestyle factors are primary considerations'
          ],
          culturalConsiderations: [
            'Diverse cultural influences on diet and lifestyle',
            'Individual assessment needed',
            'Consider family health history',
            'Personalized approach recommended'
          ],
          specificRisks: [
            'Standard health risks apply',
            'Individual risk factors should be assessed',
            'Family history considerations',
            'Lifestyle-related risk factors'
          ]
        };
    }
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50';
    }
  };

  const getBMIColor = (bmi, ethnicity) => {
    const data = getEthnicityAdjustments(ethnicity);
    if (bmi < data.categories.underweight) return theme === 'white' ? 'text-blue-600' : 'text-blue-400';
    if (bmi < data.categories.normal) return theme === 'white' ? 'text-green-600' : 'text-green-400';
    if (bmi < data.categories.overweight) return theme === 'white' ? 'text-yellow-600' : 'text-yellow-400';
    return theme === 'white' ? 'text-red-600' : 'text-red-400';
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Ethnicity-Adjusted BMI Calculator - BMI by Race & Ethnicity 2025"
        description="Free BMI calculator with ethnicity-specific adjustments for Asian, South Asian, Pacific Islander, African American, Hispanic populations. Get culturally-aware health recommendations."
        keywords="ethnicity BMI calculator, Asian BMI calculator, race adjusted BMI, cultural BMI, South Asian BMI, Pacific Islander BMI, African American BMI, Hispanic BMI calculator"
        canonical="/ethnicity-bmi"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Ethnicity-Adjusted BMI Calculator",
          "description": "BMI calculator with ethnicity-specific adjustments and cultural health considerations",
          "url": "https://bmicalculator.com/ethnicity-bmi",
          "applicationCategory": "HealthApplication",
          "operatingSystem": ["Windows", "macOS", "Linux", "Android", "iOS"]
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className={`inline-flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105 ${
            theme === 'white' ? 'text-emerald-600 hover:text-emerald-700' :
            theme === 'dark' ? 'text-purple-400 hover:text-purple-300' :
            'text-green-400 hover:text-green-300'
          }`}>
            <ArrowLeft className="h-4 w-4" />
            Back to Main Calculator
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Ethnicity-Adjusted BMI Calculator
            </h1>
            <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
              theme === 'white' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
              theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
              'bg-gradient-to-r from-green-400 to-emerald-500'
            }`} />
          </div>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>Culturally-aware BMI calculator</strong> with ethnicity-specific adjustments. Get personalized health recommendations based on your ethnic background and genetic predispositions.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Ethnicity-Specific BMI', 'Cultural Health Insights', 'Genetic Risk Factors', 'Personalized Recommendations'].map((feature, index) => (
              <Badge 
                key={feature}
                variant="secondary" 
                className={`px-4 py-2 text-sm font-medium transition-all duration-500 transform hover:scale-105 animate-slide-in ${
                  theme === 'white' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' :
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
          {/* Calculator Form */}
          <Card className={`backdrop-blur-md border-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 glass-effect animate-scale-in ${
            theme === 'white' 
              ? 'bg-white/80 hover:bg-white/90 border-emerald-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 hover:bg-gray-800/90 border-purple-500/20'
              : 'bg-black/80 hover:bg-gray-900/50 border-green-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <Globe className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-emerald-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                Ethnicity-Adjusted BMI Calculator
              </CardTitle>
              <p className={`text-sm mt-2 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Get BMI analysis tailored to your ethnic background and genetic factors
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Weight Input */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '50ms' }}>
                <Label htmlFor="weight" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Weight className={`h-4 w-4 ${
                    theme === 'white' ? 'text-emerald-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Weight
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter your weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={`flex-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-emerald-200' 
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
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <Label htmlFor="height" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Ruler className={`h-4 w-4 ${
                    theme === 'white' ? 'text-emerald-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Height
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter your height"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    className={`flex-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange('heightUnit', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-emerald-200' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white'
                        : 'bg-gray-900/50 border-green-500/30 text-white'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="inches">in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Age Input */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '150ms' }}>
                <Label htmlFor="age" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Calendar className={`h-4 w-4 ${
                    theme === 'white' ? 'text-emerald-600' : 
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
                      ? 'bg-white/70 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Gender Select */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '200ms' }}>
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <User className={`h-4 w-4 ${
                    theme === 'white' ? 'text-emerald-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-emerald-200' 
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

              {/* Ethnicity Select */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '250ms' }}>
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Users className={`h-4 w-4 ${
                    theme === 'white' ? 'text-emerald-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Ethnicity/Race
                </Label>
                <Select value={formData.ethnicity} onValueChange={(value) => handleInputChange('ethnicity', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-emerald-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue placeholder="Select your ethnicity" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {ethnicityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Calculate Button */}
              <div className="pt-4 animate-slide-in" style={{ animationDelay: '300ms' }}>
                <Button
                  onClick={calculateEthnicityAdjustedBMI}
                  disabled={loading}
                  className={`w-full transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
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
                      Calculate Ethnicity-Adjusted BMI
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* BMI Results */}
              <Card className={`backdrop-blur-md border-0 shadow-xl animate-scale-in ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Globe className={`h-5 w-5 ${
                      theme === 'white' ? 'text-emerald-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Your Ethnicity-Adjusted BMI Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getBMIColor(result.standardBMI, formData.ethnicity)}`}>
                      {result.standardBMI}
                    </div>
                    <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      BMI Score
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${
                      theme === 'white' ? 'bg-emerald-100 text-emerald-800' :
                      theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
                      'bg-green-900/50 text-green-200'
                    }`}>
                      {result.category}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <Badge variant="outline" className={`${
                      theme === 'white' ? 'border-emerald-200 text-emerald-700' :
                      theme === 'dark' ? 'border-purple-500/50 text-purple-300' :
                      'border-green-500/50 text-green-300'
                    }`}>
                      {result.ethnicity} Adjustments Applied
                    </Badge>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    theme === 'white' ? 'bg-emerald-50' :
                    theme === 'dark' ? 'bg-purple-900/20' :
                    'bg-green-900/20'
                  }`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Healthy Weight Range:
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                      {result.idealWeightRange.min} - {result.idealWeightRange.max} {formData.weightUnit}
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Based on ethnicity-specific BMI ranges
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Health Risk Assessment */}
              <Card className={`backdrop-blur-md border-0 shadow-xl animate-scale-in ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Info className={`h-5 w-5 ${
                      theme === 'white' ? 'text-emerald-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Health Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm mb-4 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {result.healthRisk}
                  </p>
                </CardContent>
              </Card>

              {/* Ethnicity Factors */}
              <Card className={`backdrop-blur-md border-0 shadow-xl animate-scale-in ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Users className={`h-5 w-5 ${
                      theme === 'white' ? 'text-emerald-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Ethnicity-Specific Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.ethnicityFactors.map((factor, index) => (
                      <li key={index} className={`flex items-start gap-3 text-sm ${
                        theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          theme === 'white' ? 'bg-emerald-500' :
                          theme === 'dark' ? 'bg-purple-400' :
                          'bg-green-400'
                        }`} />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className={`backdrop-blur-md border-0 shadow-xl animate-scale-in ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Info className={`h-5 w-5 ${
                      theme === 'white' ? 'text-emerald-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className={`flex items-start gap-3 text-sm ${
                        theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          theme === 'white' ? 'bg-blue-500' :
                          theme === 'dark' ? 'bg-blue-400' :
                          'bg-blue-400'
                        }`} />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Cultural Considerations */}
              <Card className={`backdrop-blur-md border-0 shadow-xl animate-scale-in ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Globe className={`h-5 w-5 ${
                      theme === 'white' ? 'text-emerald-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Cultural Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.culturalConsiderations.map((consideration, index) => (
                      <li key={index} className={`flex items-start gap-3 text-sm ${
                        theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          theme === 'white' ? 'bg-orange-500' :
                          theme === 'dark' ? 'bg-orange-400' :
                          'bg-orange-400'
                        }`} />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Specific Health Risks */}
              <Card className={`backdrop-blur-md border-0 shadow-xl animate-scale-in ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Info className={`h-5 w-5 ${
                      theme === 'white' ? 'text-emerald-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Ethnicity-Specific Health Risks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.specificRisks.map((risk, index) => (
                      <li key={index} className={`flex items-start gap-3 text-sm ${
                        theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          theme === 'white' ? 'bg-red-500' :
                          theme === 'dark' ? 'bg-red-400' :
                          'bg-red-400'
                        }`} />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Important Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <Alert className={`border-0 shadow-lg ${
            theme === 'white' ? 'bg-yellow-50 text-yellow-800' :
            theme === 'dark' ? 'bg-yellow-900/20 text-yellow-200' :
            'bg-yellow-900/20 text-yellow-200'
          }`}>
            <Info className="h-4 w-4" />
            <AlertDescription className="font-medium">
              <strong>Important:</strong> This calculator provides ethnicity-adjusted BMI categories based on current research. These adjustments reflect genetic and physiological differences among ethnic groups but should not replace professional medical advice. Individual health factors, family history, and lifestyle should also be considered for comprehensive health assessment.
            </AlertDescription>
          </Alert>
        </div>

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className={`backdrop-blur-md border-0 shadow-xl ${
            theme === 'white' 
              ? 'bg-white/80' 
              : theme === 'dark'
              ? 'bg-gray-800/80'
              : 'bg-black/80'
          }`}>
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-6 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Understanding Ethnicity-Adjusted BMI
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                    Why Ethnicity Matters
                  </h3>
                  <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                    <li>• Different ethnic groups have varying body compositions</li>
                    <li>• Genetic predispositions to certain health conditions</li>
                    <li>• Cultural dietary patterns and lifestyle factors</li>
                    <li>• Different fat distribution and muscle mass patterns</li>
                    <li>• Varying disease risk thresholds</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                    Research-Based Adjustments
                  </h3>
                  <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                    <li>• Asian populations: Lower BMI thresholds for health risks</li>
                    <li>• Pacific Islanders: Higher BMI ranges due to body frame</li>
                    <li>• African Americans: Considerations for muscle mass</li>
                    <li>• Hispanic populations: Diabetes risk factors</li>
                    <li>• Individual assessment remains important</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EthnicityBMIPage;