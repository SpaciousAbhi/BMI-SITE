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
        title="Senior BMI Calculator - Complete Health Guide for Adults 65+ | Age-Adjusted BMI Calculator 2025"
        description="World's most comprehensive senior BMI calculator with age-adjusted categories, sarcopenia prevention, chronic disease management, and longevity insights. Expert geriatric health guidance for optimal aging."
        keywords="senior BMI calculator, elderly BMI calculator, BMI for seniors, BMI over 65, age adjusted BMI, senior health calculator, elderly weight calculator, geriatric BMI, sarcopenia prevention, senior nutrition, healthy aging BMI, elderly fitness calculator, senior wellness tool, aging BMI categories, gerontology calculator"
        canonical="/senior-bmi"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "Senior BMI Calculator",
              "description": "Comprehensive BMI calculator designed specifically for adults aged 65+ with age-adjusted categories and geriatric health guidance",
              "url": "https://bmicalculator.com/senior-bmi",
              "applicationCategory": "HealthApplication",
              "operatingSystem": ["Windows", "macOS", "Linux", "Android", "iOS"],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@type": "MedicalWebPage",
              "name": "Senior BMI Calculator",
              "description": "Expert BMI calculator for seniors with age-adjusted health recommendations and geriatric wellness guidance",
              "medicalAudience": [
                {
                  "@type": "MedicalAudience",
                  "audienceType": "Seniors 65+, geriatricians, healthcare providers"
                }
              ],
              "about": {
                "@type": "MedicalCondition",
                "name": "Senior Health and Weight Management"
              }
            },
            {
              "@type": "HowTo",
              "name": "How to Calculate Senior BMI",
              "description": "Step-by-step guide to calculating age-adjusted BMI for seniors aged 65+",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Enter Current Weight",
                  "text": "Input your current weight in kg or lbs"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Enter Height",
                  "text": "Provide your height in centimeters or inches"
                },
                {
                  "@type": "HowToStep",
                  "name": "Enter Age", 
                  "text": "Input your age (must be 65 or older)"
                },
                {
                  "@type": "HowToStep",
                  "name": "Select Gender",
                  "text": "Choose male or female for gender-specific analysis"
                },
                {
                  "@type": "HowToStep",
                  "name": "Get Age-Adjusted Results",
                  "text": "Receive senior-specific BMI categories and health recommendations"
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Why is BMI different for seniors?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Senior BMI categories are adjusted because research shows slightly higher BMI (25-30) may be protective for adults 65+, associated with better survival rates and reduced mortality risk."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is a healthy BMI for seniors?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "For seniors 65+, the optimal BMI range is typically 22-27, which is higher than standard adult ranges. This accounts for age-related changes in muscle mass, bone density, and metabolism."
                  }
                }
              ]
            }
          ]
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
          
          {/* Professional Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'Geriatric Health Expertise',
              'Age-Adjusted BMI Categories', 
              'Sarcopenia Prevention',
              'Chronic Disease Management',
              'Longevity Optimization',
              'Cognitive Health Integration'
            ].map((feature, index) => (
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

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'aging', label: 'Aging Science', icon: BookOpen },
              { id: 'sarcopenia', label: 'Muscle Health', icon: Activity },
              { id: 'cognitive', label: 'Brain Health', icon: Brain },
              { id: 'management', label: 'Health Management', icon: Shield }
            ].map((nav, index) => {
              const Icon = nav.icon;
              return (
                <Button
                  key={nav.id}
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToSection(nav.id)}
                  className={`transition-all duration-300 hover:scale-105 animate-slide-in ${
                    activeNavSection === nav.id
                      ? theme === 'white'
                        ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                        : theme === 'dark'
                        ? 'bg-purple-900/50 text-purple-200 border-purple-500/50'
                        : 'bg-green-900/50 text-green-200 border-green-500/50'
                      : theme === 'white' 
                        ? 'bg-white/80 text-gray-700 border-indigo-200/50 hover:bg-indigo-50'
                        : theme === 'dark'
                        ? 'bg-gray-800/80 text-gray-300 border-purple-500/30 hover:bg-purple-900/30'
                        : 'bg-black/80 text-gray-300 border-green-500/30 hover:bg-green-900/30'
                  }`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {nav.label}
                </Button>
              );
            })}
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

        {/* Comprehensive Scientific Content for Seniors */}
        <div className="max-w-6xl mx-auto mt-16 space-y-12">
          
          {/* Aging and BMI Science */}
          <div id="aging" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  The Science of Aging and Weight Management
                </h2>
                
                <div className="grid gap-6">
                  {/* Physiological Changes in Aging */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('physiological')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Age-Related Physiological Changes
                      </h3>
                      {expandedSections.physiological ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.physiological && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Metabolic Changes</h4>
                            <p className="mb-3">Basal metabolic rate decreases 1-3% per decade after age 30. Mitochondrial efficiency declines, reducing cellular energy production. Insulin sensitivity often decreases, affecting glucose metabolism and fat storage patterns.</p>
                            <h4 className="font-semibold mb-2">Body Composition Shifts</h4>
                            <p>Adults lose 3-8% of muscle mass per decade after age 30, accelerating after 65. Fat distribution shifts to visceral areas. Bone density decreases 0.5-1% annually, affecting overall weight and fracture risk.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Hormonal Changes</h4>
                            <p className="mb-3">Growth hormone and testosterone decline affect muscle maintenance. Thyroid function may decrease, slowing metabolism. Cortisol patterns change, potentially affecting weight distribution and stress response.</p>
                            <h4 className="font-semibold mb-2">Digestive System Changes</h4>
                            <p>Reduced stomach acid production affects nutrient absorption. Decreased appetite regulation due to altered ghrelin and leptin sensitivity. Slower gastric emptying can affect meal timing and portion sizes.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* The "Obesity Paradox" in Seniors */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('paradox')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        The Obesity Paradox in Older Adults
                      </h3>
                      {expandedSections.paradox ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.paradox && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Research Evidence</h4>
                            <p className="mb-3">Multiple studies show seniors with BMI 25-30 have lower mortality rates than those with "normal" BMI 18.5-25. The Framingham Heart Study found optimal BMI for 65+ adults is 27-30, challenging traditional categories.</p>
                            <h4 className="font-semibold mb-2">Protective Mechanisms</h4>
                            <p>Higher BMI provides energy reserves during illness or stress. Increased muscle mass (not just fat) in higher BMI seniors supports functional capacity. Improved nutritional status helps recovery from illness or surgery.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Clinical Implications</h4>
                            <p className="mb-3">Weight loss interventions in seniors should focus on preserving muscle mass rather than total weight reduction. Functional capacity and quality of life matter more than BMI alone.</p>
                            <h4 className="font-semibold mb-2">Important Limitations</h4>
                            <p>The paradox doesn't apply to all seniors or all health outcomes. Mobility, cardiovascular health, and diabetes risk still correlate with higher BMI. Individual assessment remains crucial.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Longevity and Weight Research */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('longevity')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Longevity Research and Optimal Weight
                      </h3>
                      {expandedSections.longevity ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.longevity && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Blue Zone Studies</h4>
                            <p className="mb-3">Populations with exceptional longevity (Okinawans, Sardinians, Costa Ricans) show optimal BMI ranges of 24-27 in older adults. These populations maintain muscle mass and functional capacity into their 90s.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Centenarian Research</h4>
                            <p className="mb-3">Studies of people living to 100+ show they maintain stable weight throughout their 80s and 90s. Weight loss in very old age is associated with increased mortality, regardless of starting BMI.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Genetic Factors</h4>
                            <p>APOE4 carriers may benefit from different weight targets. FTO gene variants affect metabolism in older adults. Telomere length correlates with weight stability and longevity outcomes.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Age-Specific Health Risks */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('risks')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Age-Specific Health Risk Assessment
                      </h3>
                      {expandedSections.risks ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.risks && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-red-600">Underweight Risks (BMI &lt;22)</h4>
                            <ul className="space-y-1 mb-4">
                              <li>• Increased mortality risk (up to 50% higher)</li>
                              <li>• Malnutrition and micronutrient deficiencies</li>
                              <li>• Increased infection susceptibility</li>
                              <li>• Slower wound healing and recovery</li>
                              <li>• Higher risk of falls and fractures</li>
                              <li>• Reduced ability to withstand medical treatments</li>
                            </ul>
                            <h4 className="font-semibold mb-2 text-orange-600">Moderate Overweight (BMI 27-32)</h4>
                            <ul className="space-y-1">
                              <li>• May be protective in many seniors</li>
                              <li>• Monitor for mobility limitations</li>
                              <li>• Increased diabetes risk in some individuals</li>
                              <li>• Joint stress in knees and hips</li>
                              <li>• Sleep apnea considerations</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-green-600">Optimal Range (BMI 22-27)</h4>
                            <ul className="space-y-1 mb-4">
                              <li>• Lowest mortality risk for seniors</li>
                              <li>• Best balance of energy reserves and mobility</li>
                              <li>• Adequate nutritional status</li>
                              <li>• Better surgical outcomes</li>
                              <li>• Maintained functional independence</li>
                              <li>• Reduced frailty syndrome risk</li>
                            </ul>
                            <h4 className="font-semibold mb-2 text-red-700">Severe Obesity (BMI &gt;35)</h4>
                            <ul className="space-y-1">
                              <li>• Significant mobility impairment</li>
                              <li>• Increased cardiovascular disease risk</li>
                              <li>• Higher diabetes and metabolic syndrome rates</li>
                              <li>• Reduced quality of life</li>
                              <li>• Increased healthcare utilization</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sarcopenia and Muscle Health */}
          <div id="sarcopenia" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Sarcopenia Prevention and Muscle Health
                </h2>
                
                <div className="grid gap-6">
                  {/* Understanding Sarcopenia */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Understanding Sarcopenia: The Hidden Epidemic
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}>
                          Definition & Prevalence
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Age-related loss of muscle mass, strength, and function
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Affects 10-16% of adults 65+</li>
                          <li>• Increases to 50% by age 85</li>
                          <li>• More common in women post-menopause</li>
                          <li>• Often undiagnosed until severe</li>
                          <li>• Accelerated by chronic diseases</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}>
                          Diagnostic Criteria
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Three key components for diagnosis
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Low muscle mass (DEXA/BIA)</li>
                          <li>• Reduced grip strength (&lt;27kg men, &lt;16kg women)</li>
                          <li>• Slow gait speed (&lt;0.8 m/s)</li>
                          <li>• Chair stand test (>15 seconds)</li>
                          <li>• SARC-F screening questionnaire</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-indigo-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}>
                          Health Consequences
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Impact on health and independence
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• 3x increased fall risk</li>
                          <li>• 2x higher fracture rates</li>
                          <li>• Increased hospitalization</li>
                          <li>• Loss of functional independence</li>
                          <li>• Higher mortality rates</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Prevention and Treatment Strategies */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Evidence-Based Prevention and Treatment
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Resistance Training Protocol
                        </h4>
                        <div className={`p-4 rounded-lg mb-4 ${
                          theme === 'white' ? 'bg-green-50' : theme === 'dark' ? 'bg-green-900/20' : 'bg-green-900/20'
                        }`}>
                          <strong className={`${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>Optimal Program:</strong>
                          <ul className={`mt-2 space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                            <li>• Frequency: 2-3 sessions per week</li>
                            <li>• Intensity: 70-85% of 1RM</li>
                            <li>• Volume: 8-12 repetitions, 2-3 sets</li>
                            <li>• Progression: Increase weight weekly</li>
                            <li>• Focus: Compound movements (squats, deadlifts)</li>
                            <li>• Duration: Minimum 12-week programs</li>
                          </ul>
                        </div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Nutritional Interventions
                        </h4>
                        <div className={`p-4 rounded-lg ${
                          theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                        }`}>
                          <strong className={`${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>Protein Requirements:</strong>
                          <ul className={`mt-2 space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                            <li>• Target: 1.2-1.6g per kg body weight</li>
                            <li>• Distribution: 25-30g per meal</li>
                            <li>• Timing: Post-exercise protein within 2 hours</li>
                            <li>• Quality: Complete proteins (leucine >2.5g)</li>
                            <li>• Sources: Whey, casein, lean meats, eggs</li>
                            <li>• Supplements: Consider if dietary intake inadequate</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Advanced Interventions
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-white/60' : 'bg-gray-700/30'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Creatine Supplementation:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              3-5g daily improves muscle mass and strength when combined with resistance training. Particularly effective in vegetarians and older adults.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-white/60' : 'bg-gray-700/30'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Vitamin D Optimization:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Maintain levels >30 ng/mL (75 nmol/L). Deficiency common in seniors and impairs muscle function. May require 1000-4000 IU daily.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-white/60' : 'bg-gray-700/30'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>HMB (β-Hydroxy β-Methylbutyrate):</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              3g daily may reduce muscle protein breakdown. Most effective during periods of increased muscle stress or bed rest.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exercise Programming for Seniors */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Comprehensive Exercise Programming for Healthy Aging
                    </h3>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      {[
                        {
                          title: 'Resistance Training',
                          color: 'red',
                          frequency: '2-3x per week',
                          exercises: ['Squats/Chair stands', 'Modified deadlifts', 'Chest press', 'Rows', 'Overhead press', 'Core stabilization'],
                          benefits: 'Builds muscle mass, increases bone density, improves metabolic health'
                        },
                        {
                          title: 'Cardiovascular Exercise',
                          color: 'blue', 
                          frequency: '150 min/week moderate',
                          exercises: ['Walking', 'Swimming', 'Cycling', 'Elliptical', 'Dancing', 'Water aerobics'],
                          benefits: 'Improves heart health, endurance, mood, and cognitive function'
                        },
                        {
                          title: 'Balance & Flexibility',
                          color: 'green',
                          frequency: 'Daily',
                          exercises: ['Tai Chi', 'Yoga', 'Single-leg stands', 'Heel-to-toe walks', 'Stretching', 'Proprioception training'],
                          benefits: 'Reduces fall risk, maintains mobility, improves quality of life'
                        },
                        {
                          title: 'Functional Training',
                          color: 'purple',
                          frequency: '2-3x per week',
                          exercises: ['Sit-to-stand', 'Stair climbing', 'Carrying objects', 'Reaching activities', 'Multi-directional movements'],
                          benefits: 'Maintains independence in daily activities, real-world strength'
                        }
                      ].map((program, index) => (
                        <div key={index} className={`p-4 rounded-lg ${
                          theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                        }`}>
                          <h4 className={`font-semibold mb-2 ${
                            program.color === 'red' ? 'text-red-600' :
                            program.color === 'blue' ? 'text-blue-600' :
                            program.color === 'green' ? 'text-green-600' :
                            'text-purple-600'
                          }`}>
                            {program.title}
                          </h4>
                          <p className={`font-medium mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                            {program.frequency}
                          </p>
                          <ul className={`space-y-1 mb-3 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                            {program.exercises.map((exercise, i) => (
                              <li key={i}>• {exercise}</li>
                            ))}
                          </ul>
                          <p className={`text-xs italic ${theme === 'white' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {program.benefits}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cognitive Health and Weight Connection */}
          <div id="cognitive" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Brain Health and Weight in Aging
                </h2>
                
                <div className="grid gap-6">
                  {/* Weight-Brain Health Connection */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      The Weight-Cognition Connection in Seniors
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Research Findings
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-blue-50' : 'bg-blue-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>U-Shaped Relationship:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Both very low and very high BMI associated with cognitive decline. Optimal cognitive health occurs at BMI 25-29 in seniors.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-green-50' : 'bg-green-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Protective Mechanisms:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Moderate weight provides brain energy reserves, supports neurotransmitter production, and maintains vascular health.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-purple-50' : 'bg-purple-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Longitudinal Studies:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Weight loss after age 65 predicts cognitive decline, even when controlling for underlying disease.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Mechanisms of Action
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-yellow-50' : 'bg-yellow-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Metabolic Support:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Brain requires 20% of daily calories. Adequate weight ensures glucose availability during illness or stress.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Vascular Health:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Moderate BMI maintains optimal blood flow to brain. Extreme low weight can compromise cerebral perfusion.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-indigo-50' : 'bg-indigo-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Hormone Production:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Adipose tissue produces hormones and growth factors that support neuroplasticity and neuroprotection.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nutrition for Brain Health */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Brain-Healthy Nutrition for Seniors
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-purple-600' : 'text-purple-400'}`}>
                          MIND Diet Principles
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Mediterranean-DASH diet for cognitive protection
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Leafy greens (6+ servings/week)</li>
                          <li>• Berries (2+ servings/week)</li>
                          <li>• Nuts (5+ servings/week)</li>
                          <li>• Fatty fish (1+ servings/week)</li>
                          <li>• Whole grains (3+ servings/day)</li>
                          <li>• Olive oil as primary fat</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-blue-600' : 'text-blue-400'}`}>
                          Key Nutrients
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Specific nutrients for brain health
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Omega-3 fatty acids (DHA/EPA)</li>
                          <li>• Vitamin B12 (often deficient)</li>
                          <li>• Folate for methylation</li>
                          <li>• Vitamin D for neuroprotection</li>
                          <li>• Choline for memory</li>
                          <li>• Antioxidants (vitamins C, E)</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-green-600' : 'text-green-400'}`}>
                          Meal Timing & Cognition
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Optimize eating patterns for brain function
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Regular meal times maintain glucose stability</li>
                          <li>• Avoid prolonged fasting in seniors</li>
                          <li>• Include protein at each meal</li>
                          <li>• Stay hydrated (dehydration affects cognition)</li>
                          <li>• Consider intermittent fasting carefully</li>
                          <li>• Monitor blood sugar fluctuations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chronic Disease Management */}
          <div id="management" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Chronic Disease Management and Weight
                </h2>
                
                <div className="grid gap-6">
                  {/* Disease-Specific Weight Considerations */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Disease-Specific Weight Management
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          disease: 'Type 2 Diabetes',
                          color: 'red',
                          recommendations: [
                            'Target BMI 25-29 may be optimal (not <25)',
                            'Focus on glycemic control over weight loss',
                            'Prevent muscle loss during any weight reduction',
                            'Monitor for hypoglycemia with weight changes',
                            'Consider diabetes remission potential',
                            'Regular A1C and glucose monitoring'
                          ]
                        },
                        {
                          disease: 'Cardiovascular Disease',
                          color: 'blue',
                          recommendations: [
                            'Moderate weight loss (5-10%) if overweight',
                            'Maintain weight if BMI 22-27',
                            'Focus on cardiac rehabilitation',
                            'Monitor blood pressure changes',
                            'Sodium restriction more important than weight',
                            'Consider heart failure implications'
                          ]
                        },
                        {
                          disease: 'Osteoarthritis',
                          color: 'orange',
                          recommendations: [
                            'Weight loss beneficial for knee/hip joints',
                            'Maintain muscle mass to support joints',
                            'Low-impact exercise essential',
                            'Consider joint replacement timing',
                            'Balance pain management with activity',
                            'Anti-inflammatory nutrition patterns'
                          ]
                        },
                        {
                          disease: 'Chronic Kidney Disease',
                          color: 'green',
                          recommendations: [
                            'Prevent muscle wasting (common in CKD)',
                            'Protein needs may be different',
                            'Monitor fluid status and edema',
                            'Coordinate with nephrology team',
                            'Consider dialysis implications',
                            'Phosphorus and potassium considerations'
                          ]
                        }
                      ].map((condition, index) => (
                        <div key={index} className={`p-4 rounded-lg ${
                          theme === 'white' ? 'bg-white/60' : theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-900/30'
                        }`}>
                          <h4 className={`font-semibold mb-3 ${
                            condition.color === 'red' ? 'text-red-600' :
                            condition.color === 'blue' ? 'text-blue-600' :
                            condition.color === 'orange' ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {condition.disease}
                          </h4>
                          <ul className={`space-y-1 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                            {condition.recommendations.map((rec, i) => (
                              <li key={i}>• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medication Effects on Weight */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-indigo-200 bg-indigo-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Medication Effects on Weight and Appetite
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 text-red-600`}>
                          Medications That May Cause Weight Gain
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Antidepressants:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              SSRIs (especially paroxetine), tricyclics, mirtazapine. Monitor weight monthly, consider alternatives if significant gain.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Diabetes Medications:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Insulin, sulfonylureas, thiazolidinediones. Consider weight-neutral alternatives like metformin, GLP-1 agonists.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Corticosteroids:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Prednisone, prednisolone increase appetite and redistribute fat. Use lowest effective dose, shortest duration.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 text-orange-600`}>
                          Medications That May Cause Weight Loss
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-orange-50' : 'bg-orange-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Cholinesterase Inhibitors:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Donepezil, rivastigmine for dementia can reduce appetite. Monitor nutrition status closely.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-orange-50' : 'bg-orange-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Diuretics:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Can cause fluid loss appearing as weight loss. Monitor for dehydration and electrolyte imbalances.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-orange-50' : 'bg-orange-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Certain Antibiotics:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Can alter gut microbiome and reduce appetite temporarily. Probiotics may help maintain gut health.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comprehensive FAQ Section */}
          <div className="max-w-6xl mx-auto mt-16">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Expert FAQ: Senior Health and Weight Management
                </h2>
                
                {/* FAQ Categories */}
                <div className="grid md:grid-cols-4 gap-3 mb-8">
                  {[
                    { id: 'basics', label: 'Aging Basics', icon: BookOpen },
                    { id: 'sarcopenia', label: 'Muscle Health', icon: Activity },
                    { id: 'cognitive', label: 'Brain Health', icon: Brain },
                    { id: 'management', label: 'Disease Management', icon: Shield }
                  ].map((category) => {
                    const Icon = category.icon;
                    return (
                      <Badge
                        key={category.id}
                        variant="outline"
                        className={`p-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          theme === 'white' 
                            ? 'border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                            : theme === 'dark'
                            ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30'
                            : 'border-green-500/50 text-green-300 hover:bg-green-900/30'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {category.label}
                      </Badge>
                    );
                  })}
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {[
                    {
                      category: 'basics',
                      question: 'Why is the BMI range different for seniors?',
                      answer: 'Research consistently shows that seniors aged 65+ with BMI 25-30 have lower mortality rates than those with "normal" BMI 18.5-25. This "obesity paradox" occurs because higher BMI provides energy reserves during illness, may indicate better nutritional status, and includes muscle mass. Age-related changes in metabolism, body composition, and health risks support these adjusted categories.'
                    },
                    {
                      category: 'basics',
                      question: 'Should seniors try to lose weight if they are overweight?',
                      answer: 'Weight loss in seniors should focus on health improvement rather than achieving specific BMI targets. If BMI is 27-32, moderate weight loss (5-10%) may improve mobility and diabetes control, but preserving muscle mass is crucial. Seniors with BMI >35 may benefit from supervised weight loss. However, rapid or severe weight loss can be dangerous and increase mortality risk.'
                    },
                    {
                      category: 'basics',
                      question: 'What is considered underweight for seniors, and why is it concerning?',
                      answer: 'BMI below 22 is considered underweight for seniors and is associated with 50% higher mortality risk. Low weight in seniors often indicates malnutrition, muscle loss (sarcopenia), or underlying illness. It reduces ability to recover from infections, surgeries, or other health stresses. Even seniors who have been thin their whole life should be monitored for unintentional weight loss.'
                    },
                    {
                      category: 'sarcopenia',
                      question: 'What is sarcopenia and how can it be prevented?',
                      answer: 'Sarcopenia is age-related loss of muscle mass, strength, and function, affecting 10-16% of adults 65+ and 50% by age 85. Prevention requires resistance training 2-3x per week at 70-85% intensity, adequate protein intake (1.2-1.6g per kg body weight), and vitamin D optimization. Early intervention is crucial - muscle loss accelerates with age and becomes harder to reverse.'
                    },
                    {
                      category: 'sarcopenia',
                      question: 'How much protein do seniors need to maintain muscle?',
                      answer: 'Seniors need 1.2-1.6g protein per kilogram of body weight daily, significantly higher than younger adults (0.8g/kg). Protein should be distributed throughout the day with 25-30g per meal to optimize muscle protein synthesis. Post-exercise protein within 2 hours is particularly important. Complete proteins containing leucine (>2.5g) are most effective for muscle maintenance.'
                    },
                    {
                      category: 'sarcopenia',
                      question: 'Can seniors safely do resistance training?',
                      answer: 'Yes, resistance training is safe and essential for most seniors when properly prescribed. Start with bodyweight exercises or light weights, progress gradually, and focus on compound movements. Medical clearance may be needed for those with cardiovascular disease, recent surgeries, or unstable conditions. The benefits (muscle preservation, bone health, fall prevention, metabolic health) far outweigh risks when done properly.'
                    },
                    {
                      category: 'cognitive',
                      question: 'How does weight affect brain health in seniors?',
                      answer: 'There is a U-shaped relationship between weight and cognitive health in seniors. Both very low and very high BMI increase dementia risk. Optimal cognitive health occurs at BMI 25-29. Moderate weight provides brain energy reserves, supports neurotransmitter production, and maintains vascular health. Weight loss after age 65 can predict cognitive decline even when controlling for underlying diseases.'
                    },
                    {
                      category: 'cognitive',
                      question: 'What foods support brain health in aging?',
                      answer: 'The MIND diet (Mediterranean-DASH) is most evidence-based for brain health: leafy greens (6+ servings/week), berries (2+ servings/week), nuts (5+ servings/week), fatty fish (1+ serving/week), whole grains, and olive oil. Key nutrients include omega-3s, vitamin B12 (often deficient in seniors), folate, vitamin D, and choline. Regular meal timing maintains glucose stability for optimal brain function.'
                    },
                    {
                      category: 'management',
                      question: 'How do common medications affect weight in seniors?',
                      answer: 'Many medications commonly prescribed to seniors affect weight. Weight-gaining medications include antidepressants (SSRIs, tricyclics), diabetes medications (insulin, sulfonylureas), and corticosteroids. Weight-reducing medications include cholinesterase inhibitors for dementia and some diuretics. Always discuss medication-related weight changes with healthcare providers - alternatives may be available.'
                    },
                    {
                      category: 'management',
                      question: 'Should seniors with diabetes aim for lower BMI?',
                      answer: 'Not necessarily. For seniors with diabetes, BMI 25-29 may be optimal rather than pushing toward "normal" weight. Focus should be on glycemic control, preventing muscle loss, and maintaining functional capacity. Severe calorie restriction can cause hypoglycemia and muscle loss. Moderate weight loss (5-10%) can improve diabetes control while preserving health.'
                    },
                    {
                      category: 'basics',
                      question: 'How often should seniors monitor their weight?',
                      answer: 'Seniors should weigh themselves weekly at the same time of day, using the same scale. Monthly measurements may be sufficient for those with stable chronic conditions. More frequent monitoring is needed during illness, medication changes, or active weight management. Unintentional weight loss of 5% in 6 months or 10% in a year requires medical evaluation.'
                    },
                    {
                      category: 'management',
                      question: 'Can intermittent fasting be beneficial for seniors?',
                      answer: 'Intermittent fasting should be approached very cautiously in seniors. While some research shows potential benefits for longevity and metabolic health, seniors are at higher risk for malnutrition, muscle loss, and medication timing issues. Time-restricted eating (12-14 hour fasts) may be safer than longer fasting periods. Always consult healthcare providers before starting any fasting regimen.'
                    },
                    {
                      category: 'cognitive',
                      question: 'Does weight training improve cognitive function in seniors?',
                      answer: 'Yes, resistance training has direct cognitive benefits beyond muscle preservation. Studies show strength training 2-3x per week improves executive function, memory, and processing speed in seniors with mild cognitive impairment. The mechanism involves increased BDNF (brain-derived neurotrophic factor), improved vascular health, and reduced inflammation. Combined aerobic and resistance training provides the greatest cognitive benefits.'
                    },
                    {
                      category: 'basics',
                      question: 'What role does social isolation play in senior weight changes?',
                      answer: 'Social isolation significantly affects eating patterns and weight in seniors. Isolation often leads to poor appetite, skipped meals, and weight loss, while some may overeat from depression or boredom. Communal dining, meal delivery programs, and social eating opportunities can help maintain healthy eating patterns. Depression screening is important when unexplained weight changes occur.'
                    },
                    {
                      category: 'management',
                      question: 'How should seniors approach weight management with multiple chronic conditions?',
                      answer: 'Seniors with multiple conditions need individualized approaches coordinated among their healthcare team. Priority is often functional capacity and quality of life rather than specific weight targets. Consider medication interactions, disease progression, life expectancy, and personal goals. Small, sustainable changes are usually more successful than dramatic interventions. Focus on nutrition quality, physical function, and preventing further decline.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className={`border rounded-lg p-4 transition-all duration-300 ${
                      theme === 'white' ? 'border-indigo-200 bg-indigo-50/30' :
                      theme === 'dark' ? 'border-purple-500/30 bg-purple-900/10' :
                      'border-green-500/30 bg-green-900/10'
                    }`}>
                      <h3 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {faq.question}
                      </h3>
                      <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeniorBMIPage;