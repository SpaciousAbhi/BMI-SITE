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
  const [expandedSections, setExpandedSections] = useState({});
  const [activeNavSection, setActiveNavSection] = useState('genetics');

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
        title="Ethnicity-Adjusted BMI Calculator - Comprehensive Cultural Health Assessment 2025 | Genetic BMI Analysis"
        description="World's most advanced ethnicity-adjusted BMI calculator with genetic risk factors, cultural dietary patterns, and population-specific health insights. Expert analysis for Asian, South Asian, Pacific Islander, African American, Hispanic, and mixed ethnicities."
        keywords="ethnicity BMI calculator, Asian BMI calculator, race adjusted BMI, cultural BMI, South Asian BMI, Pacific Islander BMI, African American BMI, Hispanic BMI calculator, genetic BMI factors, population health calculator, cultural health assessment, ethnic health risks, genetic predisposition calculator, multicultural BMI tool, diversity health metrics"
        canonical="/ethnicity-bmi"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "Ethnicity-Adjusted BMI Calculator",
              "description": "Advanced BMI calculator with ethnicity-specific adjustments, genetic risk factors, and comprehensive cultural health considerations",
              "url": "https://bmicalculator.com/ethnicity-bmi",
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
              "name": "Ethnicity-Adjusted BMI Calculator",
              "description": "Expert BMI calculator with ethnicity-specific health recommendations and genetic risk factor analysis",
              "medicalAudience": [
                {
                  "@type": "MedicalAudience",
                  "audienceType": "Healthcare providers, genetic counselors, multicultural health specialists"
                }
              ],
              "about": {
                "@type": "MedicalCondition",
                "name": "Ethnic Health Disparities and Weight Management"
              }
            },
            {
              "@type": "HowTo",
              "name": "How to Calculate Ethnicity-Adjusted BMI",
              "description": "Step-by-step guide to calculating BMI with ethnic and genetic considerations",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Enter Basic Measurements",
                  "text": "Input weight, height, age in preferred units"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Select Gender",
                  "text": "Choose male or female for gender-specific analysis"
                },
                {
                  "@type": "HowToStep",
                  "name": "Choose Ethnicity", 
                  "text": "Select from 11 ethnic/racial categories for population-specific adjustments"
                },
                {
                  "@type": "HowToStep",
                  "name": "Get Comprehensive Analysis",
                  "text": "Receive ethnicity-adjusted BMI categories, genetic risk factors, and cultural health recommendations"
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Why do different ethnicities have different BMI ranges?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Different ethnic groups have varying body compositions, genetic predispositions, and disease risk thresholds. For example, Asian populations develop diabetes at lower BMI levels, while Pacific Islanders have naturally larger body frames."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate are ethnicity-adjusted BMI calculations?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "Ethnicity-adjusted BMI provides more accurate health risk assessment than standard BMI alone, based on extensive population research showing different disease thresholds across ethnic groups."
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
          
          {/* Professional Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'Genetic Risk Analysis',
              'Population-Specific BMI Categories', 
              'Cultural Dietary Assessment',
              'Ancestral Health Patterns',
              'Disease Predisposition Mapping',
              'Multicultural Health Expertise'
            ].map((feature, index) => (
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

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'genetics', label: 'Genetic Factors', icon: Dna },
              { id: 'populations', label: 'Population Studies', icon: Users },
              { id: 'cultural', label: 'Cultural Health', icon: Globe },
              { id: 'prevention', label: 'Disease Prevention', icon: Shield }
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
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : theme === 'dark'
                        ? 'bg-purple-900/50 text-purple-200 border-purple-500/50'
                        : 'bg-green-900/50 text-green-200 border-green-500/50'
                      : theme === 'white' 
                        ? 'bg-white/80 text-gray-700 border-emerald-200/50 hover:bg-emerald-50'
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

        {/* Comprehensive Scientific Content for Ethnicity-Adjusted BMI */}
        <div className="max-w-6xl mx-auto mt-16 space-y-12">
          
          {/* Genetic Factors and Population Differences */}
          <div id="genetics" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Genetic Foundations of Ethnicity-Adjusted BMI
                </h2>
                
                <div className="grid gap-6">
                  {/* Genetic Polymorphisms and Metabolism */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('polymorphisms')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Key Genetic Polymorphisms and Metabolic Differences
                      </h3>
                      {expandedSections.polymorphisms ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-emerald-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-emerald-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.polymorphisms && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">FTO Gene Variants</h4>
                            <p className="mb-3">The "fat mass and obesity-associated" gene shows significant frequency differences across ethnicities. Europeans: 16% carry obesity-risk alleles. East Asians: 2-5% frequency. These variants affect appetite regulation and energy expenditure by 10-15%.</p>
                            <h4 className="font-semibold mb-2">MC4R Mutations</h4>
                            <p>Melanocortin-4 receptor mutations cause severe obesity and are most common in individuals of European descent (1 in 1000). Rare in Asian populations but when present, cause more severe phenotypes due to different genetic backgrounds.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">PPAR-γ Variations</h4>
                            <p className="mb-3">Peroxisome proliferator-activated receptor gamma affects fat storage patterns. South Asians show variants associated with central adiposity and insulin resistance at lower BMI levels. Pacific Islanders have protective variants allowing higher BMI with less metabolic dysfunction.</p>
                            <h4 className="font-semibold mb-2">UCP1 and Thermogenesis</h4>
                            <p>Uncoupling protein variants affect brown fat activity. Inuit populations have adaptive mutations for cold climates. These affect metabolic rate and explain some population differences in optimal BMI ranges.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Evolutionary Adaptations */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('evolution')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Evolutionary Adaptations and Environmental Pressures
                      </h3>
                      {expandedSections.evolution ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-emerald-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-emerald-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.evolution && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Thrifty Gene Hypothesis</h4>
                            <p className="mb-3">Populations experiencing historical feast-famine cycles developed efficient energy storage. Affects: Pacific Islanders, Native Americans, Aboriginal Australians. Modern abundance leads to obesity and diabetes at lower BMI thresholds.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Climate Adaptations</h4>
                            <p className="mb-3">Cold climate populations (Northern Europeans, Inuit) developed higher metabolic rates and different fat distribution. Tropical populations (sub-Saharan Africans) optimized for heat dissipation with different body composition ratios.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Agricultural Transitions</h4>
                            <p>Populations with longer agricultural history (Europeans, Middle Easterners) have greater genetic adaptation to carbohydrate-rich diets. Hunter-gatherer ancestry (Aboriginal populations) shows greater sensitivity to processed foods and refined carbohydrates.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Body Composition Differences */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('composition')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Population-Specific Body Composition Patterns
                      </h3>
                      {expandedSections.composition ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-emerald-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-emerald-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.composition && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Muscle Mass Variations</h4>
                            <p className="mb-3">African Americans: 6-8% higher muscle mass at same BMI. Contributes to higher bone density and different BMI risk thresholds. East Asians: 3-5% lower muscle mass, higher body fat percentage at same BMI. Affects diabetes risk calculations.</p>
                            <h4 className="font-semibold mb-2">Bone Density Differences</h4>
                            <p>African Americans: 10-15% higher bone density. Pacific Islanders: Naturally larger bone structure. East Asians: Lower bone density, especially post-menopausal women. These differences affect total body weight and BMI interpretations.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Fat Distribution Patterns</h4>
                            <p className="mb-3">South Asians: Tendency toward central/visceral adiposity at lower BMI. Associated with higher diabetes and cardiovascular risk. Africans: More subcutaneous fat storage, potentially protective metabolic profile at moderate BMI levels.</p>
                            <h4 className="font-semibold mb-2">Organ Fat Accumulation</h4>
                            <p>East Asians develop liver fat and pancreatic fat at lower BMI levels. South Asians show early visceral fat accumulation. These differences explain population-specific disease risk thresholds and adjusted BMI categories.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Epigenetic and Environmental Interactions */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('epigenetics')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Epigenetic Factors and Gene-Environment Interactions
                      </h3>
                      {expandedSections.epigenetics ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-emerald-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-emerald-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.epigenetics && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Maternal Programming</h4>
                            <p className="mb-3">In utero exposure to famine (Dutch Hunger Winter, Chinese Great Famine) shows transgenerational effects on metabolism. Affected populations show altered fat storage patterns and diabetes susceptibility. These epigenetic markers affect multiple generations.</p>
                            <h4 className="font-semibold mb-2">Dietary Adaptation Responses</h4>
                            <p>Populations transitioning from traditional to Western diets show rapid epigenetic changes. Native Hawaiian, Aboriginal Australian, and Inuit populations demonstrate accelerated metabolic dysfunction due to mismatch between genes and current food environment.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Stress Response Variations</h4>
                            <p className="mb-3">Chronic stress from historical trauma, discrimination, and socioeconomic factors affects cortisol patterns and fat storage. Research shows elevated baseline cortisol in some populations contributes to central obesity and metabolic syndrome risk.</p>
                            <h4 className="font-semibold mb-2">Microbiome Interactions</h4>
                            <p>Gut microbiome composition varies by ethnicity and affects nutrient extraction efficiency. Traditional fermented foods in various cultures provide protective microbiome patterns. Western diet rapidly alters microbiome, affecting metabolism differently across populations.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Population-Specific Research and Evidence */}
          <div id="populations" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Population-Specific Research and Evidence Base
                </h2>
                
                <div className="grid gap-6">
                  {/* Major Population Studies */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Landmark Population Studies Informing BMI Adjustments
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Asian Population Research
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-blue-50' : 'bg-blue-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Singapore Chinese Health Study:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              63,000 participants followed for 20+ years. Diabetes risk increases significantly at BMI >23 in Chinese populations. Cardiovascular disease risk elevated at BMI >25, lower than Western thresholds.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-green-50' : 'bg-green-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Japan Public Health Center Study:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              140,000 Japanese adults demonstrate J-shaped mortality curve with optimal BMI 22-25. Higher BMI categories associated with increased mortality from diabetes and cardiovascular disease.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-purple-50' : 'bg-purple-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Korea National Health Insurance:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              23 million participants show metabolic syndrome prevalence increases dramatically at BMI >23. Led to Korean obesity guidelines using BMI >25 as obesity threshold.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Multi-Ethnic Research
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Multi-Ethnic Study of Atherosclerosis:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              6,800 adults from 4 ethnic groups show different BMI-disease relationships. African Americans have lower cardiovascular risk at higher BMI. Hispanics show elevated diabetes risk at BMI >26.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-orange-50' : 'bg-orange-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Strong Heart Study:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Native American populations show high diabetes prevalence (40-60%) with unique BMI patterns. Traditional lifestyle protective despite higher BMI. Demonstrates importance of lifestyle factors beyond BMI.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-teal-50' : 'bg-teal-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>UK Biobank Multi-Ethnic Analysis:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              500,000 participants demonstrate clear ethnic differences in BMI-mortality relationships. South Asians show increased disease risk at BMI >22. Black populations show protective effects up to BMI 32.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Disease-Specific Evidence by Ethnicity */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Disease-Specific Risk Thresholds by Ethnicity
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-red-600' : 'text-red-400'}`}>
                          Type 2 Diabetes Risk
                        </h4>
                        <ul className={`space-y-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li><strong>South Asians:</strong> Risk increases at BMI >21</li>
                          <li><strong>East Asians:</strong> Significant risk at BMI >23</li>
                          <li><strong>Pacific Islanders:</strong> Risk threshold BMI >30</li>
                          <li><strong>Hispanics:</strong> Elevated risk at BMI >26</li>
                          <li><strong>African Americans:</strong> Risk increases at BMI >27</li>
                          <li><strong>Caucasians:</strong> Traditional threshold BMI >25</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-blue-600' : 'text-blue-400'}`}>
                          Cardiovascular Disease
                        </h4>
                        <ul className={`space-y-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li><strong>South Asians:</strong> Risk elevation at BMI >22</li>
                          <li><strong>East Asians:</strong> Cardiovascular risk at BMI >24</li>
                          <li><strong>Middle Eastern:</strong> Risk increases at BMI >26</li>
                          <li><strong>African Americans:</strong> Complex relationship, protective effects noted</li>
                          <li><strong>Pacific Islanders:</strong> Traditional lifestyle protective up to BMI 32</li>
                          <li><strong>Native Americans:</strong> High baseline risk regardless of BMI</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-green-600' : 'text-green-400'}`}>
                          Metabolic Syndrome
                        </h4>
                        <ul className={`space-y-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li><strong>South Asians:</strong> High prevalence at BMI >23</li>
                          <li><strong>East Asians:</strong> Components present at BMI >24</li>
                          <li><strong>Hispanics:</strong> Insulin resistance at BMI >25</li>
                          <li><strong>African Americans:</strong> Different component patterns</li>
                          <li><strong>Caucasians:</strong> Standard definitions apply</li>
                          <li><strong>Mixed Ancestry:</strong> Requires individual assessment</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Validation Studies for Adjusted Thresholds */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Validation Studies for Ethnicity-Adjusted BMI Categories
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Clinical Validation Studies
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-yellow-50' : 'bg-yellow-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>WHO Expert Consultation 2004:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Reviewed evidence for Asian population BMI adjustments. Recommended action points: BMI ≥23 for increased risk, BMI ≥25 for high risk in Asian populations.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-indigo-50' : 'bg-indigo-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>International Diabetes Federation:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Established ethnicity-specific waist circumference cutoffs. Validated different abdominal obesity thresholds showing correlation with BMI adjustments.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Recent Meta-Analyses
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-pink-50' : 'bg-pink-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Global BMI Mortality Collaboration 2016:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              10.6 million participants across multiple ethnicities confirm different optimal BMI ranges. East Asians show lowest mortality at BMI 22-24.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-cyan-50' : 'bg-cyan-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Diabetes Prevention Meta-Analysis 2019:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Confirmed effectiveness of ethnicity-adjusted BMI thresholds for diabetes screening and prevention interventions across 50+ studies.
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

          {/* Cultural and Environmental Factors */}
          <div id="cultural" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Cultural Factors and Environmental Influences
                </h2>
                
                <div className="grid gap-6">
                  {/* Traditional Dietary Patterns */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Traditional Dietary Patterns and Health Outcomes
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Protective Traditional Diets
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-green-50' : 'bg-green-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Mediterranean Pattern (Southern Europeans):</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              High olive oil, fish, vegetables, moderate wine. Associated with lower cardiovascular disease despite moderate BMI elevation. Provides protection through anti-inflammatory effects.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-blue-50' : 'bg-blue-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Traditional Japanese Diet:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              High fish, fermented soy, vegetables, minimal processed foods. Supports optimal health at BMI 21-24. Rich in omega-3s and fermented foods supporting gut health.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-purple-50' : 'bg-purple-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Traditional Indian Vegetarian:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Legume-based proteins, diverse vegetables, spices with anti-inflammatory properties. Challenges: high refined carbohydrate content in modern adaptations affecting BMI-diabetes relationship.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Dietary Transition Challenges
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Pacific Islander Transition:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Shift from traditional taro, breadfruit, fish to processed foods. Associated with rapid increase in diabetes and obesity. Traditional foods supported higher BMI with better metabolic health.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-orange-50' : 'bg-orange-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Native American Diet Changes:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Loss of traditional hunting/gathering foods replaced by government commodity foods high in refined carbohydrates. Dramatic increase in diabetes prevalence from &lt;1% to 15-40%.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-yellow-50' : 'bg-yellow-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Urban Asian Populations:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Adoption of Western fast food while maintaining some traditional foods. Increased portion sizes and sugar consumption. Earlier onset of diabetes at lower BMI levels than historical patterns.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Socioeconomic and Environmental Factors */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Socioeconomic and Environmental Health Determinants
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-purple-600' : 'text-purple-400'}`}>
                          Food Environment Access
                        </h4>
                        <ul className={`space-y-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Food deserts disproportionately affect minority communities</li>
                          <li>• Limited access to traditional/cultural foods</li>
                          <li>• Higher cost of healthy foods in low-income areas</li>
                          <li>• Fast food density higher in minority neighborhoods</li>
                          <li>• Corner store dependency for grocery shopping</li>
                          <li>• Transportation barriers to quality grocery stores</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-blue-600' : 'text-blue-400'}`}>
                          Physical Activity Barriers
                        </h4>
                        <ul className={`space-y-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Unsafe neighborhoods limiting outdoor activity</li>
                          <li>• Limited access to recreational facilities</li>
                          <li>• Cultural barriers to certain activities (swimming, gym)</li>
                          <li>• Work schedule constraints in service jobs</li>
                          <li>• Lack of culturally appropriate fitness programs</li>
                          <li>• Childcare responsibilities affecting exercise time</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-green-600' : 'text-green-400'}`}>
                          Healthcare Access Issues
                        </h4>
                        <ul className={`space-y-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Language barriers in medical settings</li>
                          <li>• Limited culturally competent healthcare providers</li>
                          <li>• Insurance coverage gaps for preventive care</li>
                          <li>• Mistrust of medical system in some communities</li>
                          <li>• Delayed diagnosis due to access barriers</li>
                          <li>• Limited availability of cultural dietary counseling</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Cultural Attitudes and Beliefs */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Cultural Attitudes Toward Body Weight and Health
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Cultural Perceptions of Ideal Body Weight
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-teal-50' : 'bg-teal-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Pacific Islander Cultures:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Traditionally, larger body size associated with prosperity, health, and beauty. Modern conflict between traditional values and Western medical recommendations creates psychological stress.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-pink-50' : 'bg-pink-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>East Asian Cultures:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Strong preference for lower body weight, sometimes leading to underweight status. May delay seeking help for eating disorders. Important to balance cultural preferences with health needs.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-indigo-50' : 'bg-indigo-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>African American Culture:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Greater acceptance of higher body weight, particularly among women. May provide protection against body image disorders but can delay recognition of health risks from obesity.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Religious and Traditional Health Practices
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-amber-50' : 'bg-amber-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Islamic Dietary Laws:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Halal restrictions affect food choices and meal timing (Ramadan fasting). Traditional Middle Eastern foods can be very healthy but Westernization creates challenges.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-lime-50' : 'bg-lime-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Traditional Chinese Medicine:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Emphasizes balance and moderation. Some practices (herbal medicine) may interact with conventional treatment. Important to integrate traditional and modern approaches.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-rose-50' : 'bg-rose-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Indian Ayurvedic Principles:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Body constitution (dosha) types influence dietary recommendations. Some practices promote healthy eating patterns, others may conflict with diabetes management.
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

          {/* Disease Prevention and Management Strategies */}
          <div id="prevention" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Culturally-Tailored Disease Prevention Strategies
                </h2>
                
                <div className="grid gap-6">
                  {/* Ethnicity-Specific Prevention Approaches */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Population-Specific Prevention and Intervention Strategies
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          population: 'South Asian Populations',
                          color: 'red',
                          strategies: [
                            'Early diabetes screening starting at BMI >21',
                            'Focus on reducing central adiposity through diet and exercise',
                            'Cultural food modifications (reduce refined grains, increase fiber)',
                            'Family-based interventions including extended family members',
                            'Address insulin resistance with metformin consideration at lower BMI',
                            'Incorporate traditional physical activities (yoga, dance)'
                          ]
                        },
                        {
                          population: 'East Asian Populations',
                          color: 'blue',
                          strategies: [
                            'Metabolic screening at BMI >23 rather than standard thresholds',
                            'Focus on preventing visceral fat accumulation',
                            'Maintain traditional dietary patterns while reducing portion sizes',
                            'Address cultural stigma around mental health affecting eating behaviors',
                            'Consider genetic testing for familial hypercholesterolemia',
                            'Promote traditional exercises (tai chi, qigong)'
                          ]
                        },
                        {
                          population: 'Pacific Islander Communities',
                          color: 'green',
                          strategies: [
                            'Community-based interventions respecting cultural values',
                            'Return to traditional foods (taro, breadfruit, fresh fish)',
                            'Address food sovereignty and access to traditional foods',
                            'Church-based health promotion programs',
                            'Focus on functional fitness rather than weight loss alone',
                            'Diabetes prevention at BMI >26 rather than >25'
                          ]
                        },
                        {
                          population: 'African American Communities',
                          color: 'purple',
                          strategies: [
                            'Hypertension screening and management as primary focus',
                            'Address food insecurity and access to healthy foods',
                            'Cultural hair and skin care considerations for exercise programs',
                            'Faith-based community health programs',
                            'Focus on functional health rather than BMI reduction alone',
                            'Address historical medical mistrust through community partnerships'
                          ]
                        }
                      ].map((group, index) => (
                        <div key={index} className={`p-4 rounded-lg ${
                          theme === 'white' ? 'bg-white/60' : theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-900/30'
                        }`}>
                          <h4 className={`font-semibold mb-3 ${
                            group.color === 'red' ? 'text-red-600' :
                            group.color === 'blue' ? 'text-blue-600' :
                            group.color === 'green' ? 'text-green-600' :
                            'text-purple-600'
                          }`}>
                            {group.population}
                          </h4>
                          <ul className={`space-y-1 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                            {group.strategies.map((strategy, i) => (
                              <li key={i}>• {strategy}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Healthcare Provider Guidelines */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-emerald-200 bg-emerald-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Healthcare Provider Guidelines for Culturally Competent Care
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-indigo-600' : 'text-indigo-400'}`}>
                          Assessment Considerations
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Use ethnicity-adjusted BMI categories for screening</li>
                          <li>• Assess traditional dietary patterns and changes</li>
                          <li>• Consider family history of diabetes, CVD by ethnicity</li>
                          <li>• Evaluate cultural barriers to lifestyle modification</li>
                          <li>• Screen for food insecurity and access issues</li>
                          <li>• Assess traditional medicine use and interactions</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-teal-600' : 'text-teal-400'}`}>
                          Communication Strategies
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Use professional interpreters when needed</li>
                          <li>• Explain ethnicity-adjusted BMI rationale</li>
                          <li>• Respect cultural views on body weight and health</li>
                          <li>• Involve family members in health discussions when appropriate</li>
                          <li>• Use culturally relevant examples and analogies</li>
                          <li>• Address cultural stigma around certain health topics</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-orange-600' : 'text-orange-400'}`}>
                          Treatment Modifications
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Adjust medication dosing for ethnic differences in metabolism</li>
                          <li>• Consider genetic testing for medication responses</li>
                          <li>• Incorporate traditional foods into dietary counseling</li>
                          <li>• Refer to culturally competent dietitians and specialists</li>
                          <li>• Connect patients with community resources</li>
                          <li>• Monitor for different disease progression patterns</li>
                        </ul>
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
                  Expert FAQ: Ethnicity-Adjusted BMI and Multicultural Health
                </h2>
                
                {/* FAQ Categories */}
                <div className="grid md:grid-cols-4 gap-3 mb-8">
                  {[
                    { id: 'genetics', label: 'Genetics', icon: Dna },
                    { id: 'populations', label: 'Populations', icon: Users },
                    { id: 'cultural', label: 'Cultural', icon: Globe },
                    { id: 'prevention', label: 'Prevention', icon: Shield }
                  ].map((category) => {
                    const Icon = category.icon;
                    return (
                      <Badge
                        key={category.id}
                        variant="outline"
                        className={`p-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          theme === 'white' 
                            ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
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
                      category: 'genetics',
                      question: 'Why do different ethnicities have different BMI thresholds for health risks?',
                      answer: 'Ethnic groups have evolved different body composition patterns, metabolic rates, and disease susceptibilities based on historical environmental pressures. For example, East Asians develop diabetes at lower BMI levels due to genetic variants affecting fat storage and insulin sensitivity. Pacific Islanders have naturally larger body frames and different muscle-to-fat ratios. These differences are supported by extensive population studies showing different disease risk thresholds.'
                    },
                    {
                      category: 'genetics', 
                      question: 'How do genetic factors influence BMI interpretation across ethnicities?',
                      answer: 'Genetic polymorphisms in obesity-related genes (FTO, MC4R, PPARG) vary significantly by ethnicity. For instance, the FTO obesity-risk allele is found in 16% of Europeans but only 2-5% of East Asians. These genetic differences affect appetite regulation, fat distribution, and metabolic rate, requiring adjusted BMI interpretations for accurate health risk assessment.'
                    },
                    {
                      category: 'populations',
                      question: 'What research supports ethnicity-adjusted BMI categories?',
                      answer: 'Major studies include the Singapore Chinese Health Study (63,000 participants), Japan Public Health Center Study (140,000 participants), and UK Biobank Multi-Ethnic Analysis (500,000 participants). These consistently show different BMI-disease relationships across ethnicities. The 2004 WHO Expert Consultation officially recommended BMI adjustments for Asian populations based on this evidence.'
                    },
                    {
                      category: 'populations',
                      question: 'Are ethnicity-adjusted BMI categories more accurate than standard BMI?',
                      answer: 'Yes, for health risk assessment. Standard BMI was developed primarily from European populations and may misclassify risk in other ethnic groups. Ethnicity-adjusted BMI provides more accurate diabetes and cardiovascular disease risk prediction. For example, using adjusted categories, South Asians show diabetes risk at BMI >21, while standard BMI would miss early intervention opportunities.'
                    },
                    {
                      category: 'cultural',
                      question: 'How do traditional diets affect optimal BMI ranges for different ethnicities?',
                      answer: 'Traditional diets that co-evolved with genetic backgrounds often support optimal health within ethnicity-specific BMI ranges. Japanese traditional diets support health at BMI 21-24, while Mediterranean diets may be protective at slightly higher BMI levels. However, Western dietary transitions often disrupt these optimal ranges, requiring earlier intervention at lower BMI thresholds.'
                    },
                    {
                      category: 'cultural',
                      question: 'How should cultural attitudes toward body weight be addressed in healthcare?',
                      answer: 'Healthcare providers should respect cultural perspectives while providing evidence-based guidance. Some cultures value larger body sizes (Pacific Islander, some African communities), while others prefer lower weights (East Asian). Important to focus on health outcomes and functional capacity rather than appearance, and work within cultural frameworks to promote healthy behaviors.'
                    },
                    {
                      category: 'prevention',
                      question: 'When should diabetes screening begin for different ethnic groups?',
                      answer: 'Screening should begin earlier for high-risk ethnicities: South Asians at BMI >21 or age 25; East Asians at BMI >23 or age 35; Native Americans regardless of BMI at age 25; Pacific Islanders at BMI >26; African Americans and Hispanics at BMI >25. Family history and other risk factors may warrant even earlier screening.'
                    },
                    {
                      category: 'prevention',
                      question: 'How should weight loss goals differ by ethnicity?',
                      answer: 'Weight loss goals should consider ethnicity-specific optimal ranges and focus on metabolic health rather than specific BMI targets. For South Asians, even 3-5% weight loss at BMI >23 can significantly improve insulin sensitivity. For Pacific Islanders, maintaining BMI <32 with good metabolic health may be more appropriate than targeting standard ranges. Individual assessment remains crucial.'
                    },
                    {
                      category: 'genetics',
                      question: 'Can mixed ethnicity individuals use these adjusted BMI categories?',
                      answer: 'Mixed ethnicity individuals require individualized assessment considering their combined genetic heritage, family history, and personal risk factors. Generally, use the more conservative (lower) BMI thresholds if one parent is from a high-risk group like South Asian. Genetic testing for specific variants may provide additional guidance. Focus on metabolic markers rather than BMI alone.'
                    },
                    {
                      category: 'populations',
                      question: 'Do these ethnicity adjustments apply to children and adolescents?',
                      answer: 'Ethnicity-specific differences in body composition and disease risk begin in childhood. Asian children develop higher body fat percentages at lower BMI levels. However, pediatric BMI interpretation is complex due to growth patterns. Use ethnicity-adjusted adult categories as guidance but rely primarily on growth charts and individual assessment for children.'
                    },
                    {
                      category: 'cultural',
                      question: 'How do socioeconomic factors interact with ethnicity and BMI?',
                      answer: 'Socioeconomic factors significantly impact the relationship between ethnicity and BMI through food access, physical activity opportunities, and healthcare access. Low-income ethnic minorities face higher rates of food insecurity, limited access to healthy foods, and environmental barriers to exercise. These factors can accelerate the development of obesity-related diseases regardless of BMI levels.'
                    },
                    {
                      category: 'prevention',
                      question: 'Should medications be dosed differently based on ethnicity and BMI?',
                      answer: 'Yes, some medications require ethnicity-based dosing adjustments. East Asians often need lower doses of certain diabetes medications and statins due to different metabolism rates. African Americans may respond differently to ACE inhibitors versus other blood pressure medications. Always consider ethnicity in medication selection and dosing, especially for diabetes and cardiovascular medications.'
                    },
                    {
                      category: 'genetics',
                      question: 'How do environmental factors interact with genetic predispositions?',
                      answer: 'Environmental factors can amplify or mitigate genetic predispositions. For example, traditional Pacific Islander diets supported healthy metabolism despite "thrifty genes," but modern processed foods activate these genes to cause rapid weight gain. Similarly, urban environments may accelerate genetic tendencies toward diabetes in South Asians through reduced physical activity and dietary changes.'
                    },
                    {
                      category: 'populations',
                      question: 'Are there ethnicity-specific biomarkers that are more useful than BMI?',
                      answer: 'Yes, several biomarkers may be more informative than BMI for certain ethnicities. Waist circumference and waist-to-hip ratio are particularly important for South Asians who develop central obesity at lower BMI. Insulin levels, liver enzymes, and inflammatory markers may be more predictive than BMI in East Asians. HbA1c may be naturally higher in some ethnic groups without indicating diabetes.'
                    },
                    {
                      category: 'cultural',
                      question: 'How can healthcare systems become more culturally competent in BMI assessment?',
                      answer: 'Healthcare systems should implement ethnicity-adjusted BMI screening protocols, train providers in cultural competency, employ diverse healthcare workers, and partner with community organizations. Electronic health records should prompt ethnicity-adjusted screening thresholds. Dietary counseling should incorporate traditional foods and cultural practices. Patient education materials should be culturally appropriate and available in multiple languages.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className={`border rounded-lg p-4 transition-all duration-300 ${
                      theme === 'white' ? 'border-emerald-200 bg-emerald-50/30' :
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

export default EthnicityBMIPage;