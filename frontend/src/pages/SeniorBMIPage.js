import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Users, Heart, Info, ArrowLeft, Calendar, Weight, Ruler, User, ChevronDown, ChevronRight, Brain, Shield, Activity, BookOpen } from 'lucide-react';
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

const SeniorBMIPage = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    weightUnit: 'kg',
    heightUnit: 'cm',
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeNavSection, setActiveNavSection] = useState('aging');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const scrollToSection = (sectionId) => {
    setActiveNavSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  const calculateSeniorBMI = () => {
    const heightInCm = getHeightInCm();
    const weightKg = getWeightInKg();
    const age = parseInt(formData.age);

    if (!weightKg || !heightInCm || !age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (age < 65) {
      toast({
        title: "Age Requirement",
        description: "This calculator is designed for seniors aged 65 and above.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const heightInM = heightInCm / 100;
      const bmi = weightKg / (heightInM * heightInM);

      // Senior-specific BMI categories (more lenient than standard)
      let category = '';
      let healthRisk = '';
      let recommendations = [];

      if (bmi < 22) {
        category = 'Underweight for Seniors';
        healthRisk = 'Increased risk of malnutrition, frailty, and reduced bone density';
        recommendations = [
          'Focus on nutrient-dense foods to gain healthy weight',
          'Include protein-rich foods at every meal',
          'Consider strength training to build muscle mass',
          'Consult with a registered dietitian',
          'Monitor for underlying health conditions'
        ];
      } else if (bmi < 27) {
        category = 'Normal Weight for Seniors';
        healthRisk = 'Optimal weight range for seniors - associated with lower mortality risk';
        recommendations = [
          'Maintain current healthy lifestyle',
          'Continue regular physical activity',
          'Focus on balanced nutrition',
          'Monitor weight changes regularly',
          'Stay hydrated and get adequate sleep'
        ];
      } else if (bmi < 30) {
        category = 'Slightly Overweight for Seniors';
        healthRisk = 'May actually be protective for seniors - lower mortality risk than lower BMI';
        recommendations = [
          'This range may be optimal for seniors',
          'Focus on muscle maintenance rather than weight loss',
          'Emphasize strength and balance training',
          'Maintain good nutrition quality',
          'Monitor for chronic disease management'
        ];
      } else if (bmi < 35) {
        category = 'Moderately Overweight for Seniors';
        healthRisk = 'Moderate risk - consider health status and mobility';
        recommendations = [
          'Focus on gradual, sustainable lifestyle changes',
          'Prioritize physical function over weight loss',
          'Include low-impact exercises like walking, swimming',
          'Work with healthcare provider for comprehensive care',
          'Monitor blood pressure, diabetes, and heart health'
        ];
      } else {
        category = 'Significantly Overweight for Seniors';
        healthRisk = 'May impact mobility and quality of life';
        recommendations = [
          'Work closely with healthcare team',
          'Focus on functional improvement over rapid weight loss',
          'Consider supervised exercise programs',
          'Address underlying health conditions',
          'Gradual, sustainable dietary changes'
        ];
      }

      // Age-specific adjustments
      let ageGroup = '';
      if (age >= 65 && age < 75) {
        ageGroup = 'Young Seniors (65-74)';
      } else if (age >= 75 && age < 85) {
        ageGroup = 'Middle Seniors (75-84)';
      } else {
        ageGroup = 'Older Seniors (85+)';
      }

      // Calculate ideal weight range for seniors (higher than standard)
      const minIdealWeight = 22 * (heightInM * heightInM);
      const maxIdealWeight = 27 * (heightInM * heightInM);

      const resultData = {
        bmi: Math.round(bmi * 10) / 10,
        category,
        healthRisk,
        ageGroup,
        idealWeightRange: {
          min: Math.round(minIdealWeight * 10) / 10,
          max: Math.round(maxIdealWeight * 10) / 10
        },
        recommendations,
        specialConsiderations: getSeniorSpecialConsiderations(bmi, age, formData.gender)
      };

      setResult(resultData);
      setLoading(false);

      toast({
        title: "Senior BMI Calculated!",
        description: "Your age-adjusted BMI analysis is ready.",
      });
    }, 800);
  };

  const getSeniorSpecialConsiderations = (bmi, age, gender) => {
    const considerations = [];

    // Age-specific considerations
    if (age >= 85) {
      considerations.push("For adults 85+, slightly higher BMI (25-30) is often associated with better survival rates");
    }

    // Gender-specific considerations
    if (gender === 'female') {
      considerations.push("Post-menopausal women may benefit from slightly higher BMI for bone protection");
      considerations.push("Women typically lose muscle mass faster after menopause");
    } else {
      considerations.push("Men over 65 should focus on maintaining muscle mass to prevent sarcopenia");
    }

    // BMI-specific considerations
    if (bmi < 22) {
      considerations.push("Low BMI in seniors is associated with increased mortality risk");
      considerations.push("May indicate underlying malnutrition or chronic disease");
    } else if (bmi > 30) {
      considerations.push("Weight loss should be gradual (1-2 lbs per month) to preserve muscle mass");
      considerations.push("Focus on improving mobility and function rather than just weight loss");
    }

    // General senior considerations
    considerations.push("Sarcopenia (muscle loss) is a major concern regardless of BMI");
    considerations.push("Medication effects on weight and appetite should be considered");
    considerations.push("Social factors affecting nutrition and mobility are important");

    return considerations;
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
    }
  };

  const getBMIColor = (bmi) => {
    if (bmi < 22) return theme === 'white' ? 'text-blue-600' : 'text-blue-400';
    if (bmi < 27) return theme === 'white' ? 'text-green-600' : 'text-green-400';
    if (bmi < 30) return theme === 'white' ? 'text-teal-600' : 'text-teal-400';
    if (bmi < 35) return theme === 'white' ? 'text-yellow-600' : 'text-yellow-400';
    return theme === 'white' ? 'text-orange-600' : 'text-orange-400';
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Senior BMI Calculator - BMI Calculator for Adults 65+ | Age-Adjusted BMI 2025"
        description="Free BMI calculator designed specifically for seniors aged 65+. Get age-adjusted BMI categories and health recommendations tailored for older adults."
        keywords="senior BMI calculator, elderly BMI calculator, BMI for seniors, BMI over 65, age adjusted BMI, senior health calculator, elderly weight calculator"
        canonical="/senior-bmi"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Senior BMI Calculator",
          "description": "BMI calculator specifically designed for adults aged 65 and above with age-adjusted categories",
          "url": "https://bmicalculator.com/senior-bmi",
          "applicationCategory": "HealthApplication",
          "operatingSystem": ["Windows", "macOS", "Linux", "Android", "iOS"]
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className={`inline-flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105 ${
            theme === 'white' ? 'text-indigo-600 hover:text-indigo-700' :
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
              Senior BMI Calculator
            </h1>
            <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
              theme === 'white' ? 'bg-gradient-to-r from-indigo-400 to-purple-500' :
              theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
              'bg-gradient-to-r from-green-400 to-emerald-500'
            }`} />
          </div>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Specialized <strong>BMI calculator for seniors aged 65+</strong> with age-adjusted categories and health recommendations tailored for older adults.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Age-Adjusted BMI', 'Senior Health Focus', 'Muscle Mass Considerations', 'Longevity Insights'].map((feature, index) => (
              <Badge 
                key={feature}
                variant="secondary" 
                className={`px-4 py-2 text-sm font-medium transition-all duration-500 transform hover:scale-105 animate-slide-in ${
                  theme === 'white' ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200' :
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
              ? 'bg-white/80 hover:bg-white/90 border-indigo-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 hover:bg-gray-800/90 border-purple-500/20'
              : 'bg-black/80 hover:bg-gray-900/50 border-green-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <Users className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-indigo-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                Senior BMI Calculator (65+)
              </CardTitle>
              <p className={`text-sm mt-2 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Age-adjusted BMI calculator with senior-specific health recommendations
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Weight Input */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '50ms' }}>
                <Label htmlFor="weight" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Weight className={`h-4 w-4 ${
                    theme === 'white' ? 'text-indigo-600' : 
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
                        ? 'bg-white/70 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-indigo-200' 
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
                    theme === 'white' ? 'text-indigo-600' : 
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
                        ? 'bg-white/70 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange('heightUnit', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-indigo-200' 
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
                    theme === 'white' ? 'text-indigo-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Age (65+ years)
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="65"
                  placeholder="Enter your age (65+)"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400/20' 
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
                    theme === 'white' ? 'text-indigo-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-indigo-200' 
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

              {/* Calculate Button */}
              <div className="pt-4 animate-slide-in" style={{ animationDelay: '250ms' }}>
                <Button
                  onClick={calculateSeniorBMI}
                  disabled={loading}
                  className={`w-full transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
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
                      Calculate Senior BMI
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
                    <Heart className={`h-5 w-5 ${
                      theme === 'white' ? 'text-indigo-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Your Senior BMI Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getBMIColor(result.bmi)}`}>
                      {result.bmi}
                    </div>
                    <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Age-Adjusted BMI
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${
                      theme === 'white' ? 'bg-indigo-100 text-indigo-800' :
                      theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
                      'bg-green-900/50 text-green-200'
                    }`}>
                      {result.category}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <Badge variant="outline" className={`${
                      theme === 'white' ? 'border-indigo-200 text-indigo-700' :
                      theme === 'dark' ? 'border-purple-500/50 text-purple-300' :
                      'border-green-500/50 text-green-300'
                    }`}>
                      {result.ageGroup}
                    </Badge>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    theme === 'white' ? 'bg-indigo-50' :
                    theme === 'dark' ? 'bg-purple-900/20' :
                    'bg-green-900/20'
                  }`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Healthy Weight Range for Seniors:
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                      {result.idealWeightRange.min} - {result.idealWeightRange.max} {formData.weightUnit}
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      (BMI 22-27 range, optimal for seniors)
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
                      theme === 'white' ? 'text-indigo-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Health Assessment
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
                    <Heart className={`h-5 w-5 ${
                      theme === 'white' ? 'text-indigo-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Senior Health Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className={`flex items-start gap-3 text-sm ${
                        theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          theme === 'white' ? 'bg-indigo-500' :
                          theme === 'dark' ? 'bg-purple-400' :
                          'bg-green-400'
                        }`} />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Special Considerations */}
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
                      theme === 'white' ? 'text-indigo-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Special Considerations for Seniors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.specialConsiderations.map((consideration, index) => (
                      <li key={index} className={`flex items-start gap-3 text-sm ${
                        theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          theme === 'white' ? 'bg-yellow-500' :
                          theme === 'dark' ? 'bg-yellow-400' :
                          'bg-yellow-400'
                        }`} />
                        {consideration}
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
            theme === 'white' ? 'bg-blue-50 text-blue-800' :
            theme === 'dark' ? 'bg-blue-900/20 text-blue-200' :
            'bg-blue-900/20 text-blue-200'
          }`}>
            <Info className="h-4 w-4" />
            <AlertDescription className="font-medium">
              <strong>Important for Seniors:</strong> This calculator uses age-adjusted BMI categories that recognize the different health implications of weight in older adults. Research shows that slightly higher BMI (25-30) may be associated with better survival rates in seniors. Always consult with your healthcare provider for personalized advice.
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
                BMI and Healthy Aging
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                    Why Senior BMI is Different
                  </h3>
                  <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                    <li>• Muscle mass naturally decreases with age</li>
                    <li>• Bone density changes affect weight</li>
                    <li>• Metabolism slows down</li>
                    <li>• Higher BMI may be protective against illness</li>
                    <li>• Recovery from illness is better with higher weight</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                    Key Health Priorities for Seniors
                  </h3>
                  <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                    <li>• Maintaining muscle mass (sarcopenia prevention)</li>
                    <li>• Bone health and fall prevention</li>
                    <li>• Functional mobility and independence</li>
                    <li>• Adequate nutrition and hydration</li>
                    <li>• Managing chronic conditions</li>
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

export default SeniorBMIPage;