import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Baby, Heart, AlertTriangle, Info, ArrowLeft, Calendar, Weight, Ruler, ChevronDown, ChevronRight, Apple, Activity, Shield, BookOpen } from 'lucide-react';
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

const PregnancyBMIPage = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    prePregnancyWeight: '',
    height: '',
    currentWeight: '',
    weekOfPregnancy: '',
    weightUnit: 'kg',
    heightUnit: 'cm',
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeNavSection, setActiveNavSection] = useState('science');

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

  const getWeightInKg = (weight) => {
    if (formData.weightUnit === 'kg') {
      return parseFloat(weight);
    } else {
      return parseFloat(weight) * 0.453592;
    }
  };

  const calculatePregnancyBMI = () => {
    const heightInCm = getHeightInCm();
    const prePregnancyWeightKg = getWeightInKg(formData.prePregnancyWeight);
    const currentWeightKg = getWeightInKg(formData.currentWeight);
    const week = parseInt(formData.weekOfPregnancy);

    if (!prePregnancyWeightKg || !heightInCm || !currentWeightKg || !week) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (week < 1 || week > 42) {
      toast({
        title: "Invalid Week",
        description: "Please enter a valid week of pregnancy (1-42).",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const heightInM = heightInCm / 100;
      const prePregnancyBMI = prePregnancyWeightKg / (heightInM * heightInM);
      const currentBMI = currentWeightKg / (heightInM * heightInM);
      const weightGain = currentWeightKg - prePregnancyWeightKg;

      // Determine pre-pregnancy weight category
      let category = '';
      let recommendedWeightGain = '';
      let weeklyWeightGain = '';
      
      if (prePregnancyBMI < 18.5) {
        category = 'Underweight';
        recommendedWeightGain = '28-40 lbs (12.5-18 kg)';
        weeklyWeightGain = '1 lb (0.44-0.58 kg) per week';
      } else if (prePregnancyBMI < 25) {
        category = 'Normal Weight';
        recommendedWeightGain = '25-35 lbs (11.5-16 kg)';
        weeklyWeightGain = '0.8-1 lb (0.35-0.5 kg) per week';
      } else if (prePregnancyBMI < 30) {
        category = 'Overweight';
        recommendedWeightGain = '15-25 lbs (7-11.5 kg)';
        weeklyWeightGain = '0.5-0.7 lb (0.23-0.33 kg) per week';
      } else {
        category = 'Obese';
        recommendedWeightGain = '11-20 lbs (5-9 kg)';
        weeklyWeightGain = '0.4-0.6 lb (0.17-0.27 kg) per week';
      }

      // Calculate expected weight gain for current week
      let expectedWeightGain = 0;
      if (week <= 12) {
        expectedWeightGain = 1.1; // First trimester: 1-4.4 lbs
      } else if (week <= 28) {
        const weeksSinceFirst = week - 12;
        expectedWeightGain = 1.1 + (weeksSinceFirst * 0.35); // Second trimester
      } else {
        const weeksSinceSecond = week - 28;
        expectedWeightGain = 1.1 + (16 * 0.35) + (weeksSinceSecond * 0.35); // Third trimester
      }

      // Adjust for BMI category
      if (prePregnancyBMI < 18.5) {
        expectedWeightGain *= 1.3;
      } else if (prePregnancyBMI >= 30) {
        expectedWeightGain *= 0.7;
      }

      const weightGainStatus = weightGain < expectedWeightGain * 0.8 ? 'Below Expected' :
                              weightGain > expectedWeightGain * 1.2 ? 'Above Expected' : 'On Track';

      const resultData = {
        prePregnancyBMI: Math.round(prePregnancyBMI * 10) / 10,
        currentBMI: Math.round(currentBMI * 10) / 10,
        category,
        weightGain: Math.round(weightGain * 10) / 10,
        expectedWeightGain: Math.round(expectedWeightGain * 10) / 10,
        weightGainStatus,
        recommendedWeightGain,
        weeklyWeightGain,
        week,
        recommendations: getPregnancyRecommendations(prePregnancyBMI, weightGainStatus, week)
      };

      setResult(resultData);
      setLoading(false);

      toast({
        title: "Pregnancy BMI Calculated!",
        description: "Your pregnancy BMI and weight gain analysis is ready.",
      });
    }, 800);
  };

  const getPregnancyRecommendations = (bmi, weightGainStatus, week) => {
    const recommendations = [];

    // BMI-based recommendations
    if (bmi < 18.5) {
      recommendations.push("Focus on gaining adequate weight with nutrient-rich foods");
      recommendations.push("Consider working with a nutritionist for meal planning");
    } else if (bmi >= 30) {
      recommendations.push("Monitor weight gain carefully with your healthcare provider");
      recommendations.push("Focus on nutritious foods rather than restricting calories");
    }

    // Weight gain status recommendations
    if (weightGainStatus === 'Below Expected') {
      recommendations.push("Consider increasing healthy calorie intake");
      recommendations.push("Discuss weight gain concerns with your healthcare provider");
    } else if (weightGainStatus === 'Above Expected') {
      recommendations.push("Focus on nutrient-dense, lower-calorie foods");
      recommendations.push("Increase physical activity as approved by your doctor");
    }

    // General recommendations
    recommendations.push("Take prenatal vitamins as prescribed");
    recommendations.push("Stay hydrated with 8-10 glasses of water daily");
    recommendations.push("Engage in approved prenatal exercise");
    recommendations.push("Attend all prenatal appointments");

    return recommendations;
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50';
    }
  };

  const getBMIColor = (bmi) => {
    if (bmi < 18.5) return theme === 'white' ? 'text-blue-600' : 'text-blue-400';
    if (bmi < 25) return theme === 'white' ? 'text-green-600' : 'text-green-400';
    if (bmi < 30) return theme === 'white' ? 'text-yellow-600' : 'text-yellow-400';
    return theme === 'white' ? 'text-red-600' : 'text-red-400';
  };

  const getWeightGainColor = (status) => {
    if (status === 'On Track') return theme === 'white' ? 'text-green-600' : 'text-green-400';
    if (status === 'Below Expected') return theme === 'white' ? 'text-blue-600' : 'text-blue-400';
    return theme === 'white' ? 'text-orange-600' : 'text-orange-400';
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Pregnancy BMI Calculator - Complete Weight Gain Guide During Pregnancy 2025 | Expert Maternal Health Tool"
        description="World's most comprehensive pregnancy BMI calculator with trimester-specific weight gain tracking, nutritional guidance, exercise recommendations, and expert maternal health insights. Used by healthcare professionals worldwide."
        keywords="pregnancy BMI calculator, pregnancy weight gain calculator, healthy pregnancy weight, prenatal BMI, pregnancy nutrition, maternal health, trimester weight gain, pregnancy diet calculator, gestational weight gain, prenatal health tracker, pregnancy BMI chart, healthy pregnancy calculator, maternal BMI calculator, pregnancy weight tracking, prenatal nutrition calculator"
        canonical="/pregnancy-bmi"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "Pregnancy BMI Calculator",
              "description": "Comprehensive pregnancy BMI calculator with trimester-specific weight gain tracking and expert maternal health guidance",
              "url": "https://bmicalculator.com/pregnancy-bmi",
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
              "name": "Pregnancy BMI Calculator",
              "description": "Expert pregnancy weight gain calculator with comprehensive maternal health guidance",
              "medicalAudience": [
                {
                  "@type": "MedicalAudience",
                  "audienceType": "Pregnant women, healthcare providers, obstetricians"
                }
              ],
              "about": {
                "@type": "MedicalCondition",
                "name": "Pregnancy Weight Management"
              }
            },
            {
              "@type": "HowTo",
              "name": "How to Calculate Pregnancy BMI",
              "description": "Step-by-step guide to calculating healthy weight gain during pregnancy",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Enter Pre-Pregnancy Weight",
                  "text": "Input your weight before becoming pregnant"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Enter Current Height",
                  "text": "Provide your height in centimeters or inches"
                },
                {
                  "@type": "HowToStep",
                  "name": "Enter Current Weight", 
                  "text": "Input your current pregnancy weight"
                },
                {
                  "@type": "HowToStep",
                  "name": "Select Pregnancy Week",
                  "text": "Choose your current week of pregnancy (1-42)"
                },
                {
                  "@type": "HowToStep",
                  "name": "Get Results",
                  "text": "Receive personalized weight gain recommendations and health guidance"
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is a healthy pregnancy weight gain?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Healthy pregnancy weight gain depends on pre-pregnancy BMI: underweight women should gain 28-40 lbs, normal weight 25-35 lbs, overweight 15-25 lbs, and obese women 11-20 lbs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is pregnancy BMI calculated?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "Pregnancy BMI is calculated using pre-pregnancy weight divided by height squared, then used to determine appropriate weight gain ranges for each trimester."
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
            theme === 'white' ? 'text-pink-600 hover:text-pink-700' :
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
              Pregnancy BMI Calculator
            </h1>
            <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
              theme === 'white' ? 'bg-gradient-to-r from-pink-400 to-purple-500' :
              theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
              'bg-gradient-to-r from-green-400 to-emerald-500'
            }`} />
          </div>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Track your <strong>healthy weight gain during pregnancy</strong> with our specialized BMI calculator. Get personalized recommendations based on your pre-pregnancy BMI.
          </p>
          
          {/* Professional Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'Expert Maternal Health Guidance',
              'Trimester-Specific Tracking', 
              'Nutritional Recommendations',
              'Exercise Guidelines',
              'Complications Monitoring',
              'Postpartum Planning'
            ].map((feature, index) => (
              <Badge 
                key={feature}
                variant="secondary" 
                className={`px-4 py-2 text-sm font-medium transition-all duration-500 transform hover:scale-105 animate-slide-in ${
                  theme === 'white' ? 'bg-pink-100 text-pink-800 hover:bg-pink-200' :
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
              { id: 'science', label: 'Pregnancy Science', icon: BookOpen },
              { id: 'nutrition', label: 'Nutrition Guide', icon: Apple },
              { id: 'exercise', label: 'Safe Exercise', icon: Activity },
              { id: 'monitoring', label: 'Health Monitoring', icon: Shield }
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
                        ? 'bg-pink-100 text-pink-800 border-pink-300'
                        : theme === 'dark'
                        ? 'bg-purple-900/50 text-purple-200 border-purple-500/50'
                        : 'bg-green-900/50 text-green-200 border-green-500/50'
                      : theme === 'white' 
                        ? 'bg-white/80 text-gray-700 border-pink-200/50 hover:bg-pink-50'
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
              ? 'bg-white/80 hover:bg-white/90 border-pink-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 hover:bg-gray-800/90 border-purple-500/20'
              : 'bg-black/80 hover:bg-gray-900/50 border-green-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <Baby className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-pink-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                Pregnancy BMI Calculator
              </CardTitle>
              <p className={`text-sm mt-2 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Calculate healthy weight gain during pregnancy based on your pre-pregnancy BMI
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pre-Pregnancy Weight */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '50ms' }}>
                <Label htmlFor="prePregnancyWeight" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Weight className={`h-4 w-4 ${
                    theme === 'white' ? 'text-pink-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Pre-Pregnancy Weight
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="prePregnancyWeight"
                    type="number"
                    placeholder="Enter your pre-pregnancy weight"
                    value={formData.prePregnancyWeight}
                    onChange={(e) => handleInputChange('prePregnancyWeight', e.target.value)}
                    className={`flex-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-pink-200 focus:border-pink-400 focus:ring-pink-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-pink-200' 
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

              {/* Height */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <Label htmlFor="height" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Ruler className={`h-4 w-4 ${
                    theme === 'white' ? 'text-pink-600' : 
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
                        ? 'bg-white/70 border-pink-200 focus:border-pink-400 focus:ring-pink-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange('heightUnit', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-pink-200' 
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

              {/* Current Weight */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '150ms' }}>
                <Label htmlFor="currentWeight" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Weight className={`h-4 w-4 ${
                    theme === 'white' ? 'text-pink-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Current Weight
                </Label>
                <Input
                  id="currentWeight"
                  type="number"
                  placeholder="Enter your current weight"
                  value={formData.currentWeight}
                  onChange={(e) => handleInputChange('currentWeight', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-pink-200 focus:border-pink-400 focus:ring-pink-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Week of Pregnancy */}
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '200ms' }}>
                <Label htmlFor="weekOfPregnancy" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Calendar className={`h-4 w-4 ${
                    theme === 'white' ? 'text-pink-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Week of Pregnancy
                </Label>
                <Input
                  id="weekOfPregnancy"
                  type="number"
                  min="1"
                  max="42"
                  placeholder="Enter current week (1-42)"
                  value={formData.weekOfPregnancy}
                  onChange={(e) => handleInputChange('weekOfPregnancy', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-pink-200 focus:border-pink-400 focus:ring-pink-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Calculate Button */}
              <div className="pt-4 animate-slide-in" style={{ animationDelay: '250ms' }}>
                <Button
                  onClick={calculatePregnancyBMI}
                  disabled={loading}
                  className={`w-full transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-xl'
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
                      Calculate Pregnancy BMI
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
                      theme === 'white' ? 'text-pink-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Your Pregnancy BMI Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getBMIColor(result.prePregnancyBMI)}`}>
                        {result.prePregnancyBMI}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Pre-Pregnancy BMI
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getBMIColor(result.currentBMI)}`}>
                        {result.currentBMI}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Current BMI
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${
                      theme === 'white' ? 'bg-pink-100 text-pink-800' :
                      theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
                      'bg-green-900/50 text-green-200'
                    }`}>
                      {result.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Weight Gain Analysis */}
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
                    <Weight className={`h-5 w-5 ${
                      theme === 'white' ? 'text-pink-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Weight Gain Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getWeightGainColor(result.weightGainStatus)}`}>
                        {result.weightGain} {formData.weightUnit}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Total Weight Gain
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Week {result.week}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Pregnancy Week
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Badge variant="outline" className={`text-lg px-4 py-2 ${getWeightGainColor(result.weightGainStatus)}`}>
                      {result.weightGainStatus}
                    </Badge>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    theme === 'white' ? 'bg-pink-50' :
                    theme === 'dark' ? 'bg-purple-900/20' :
                    'bg-green-900/20'
                  }`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Recommended Weight Gain:
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                      <strong>Total:</strong> {result.recommendedWeightGain}
                    </p>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                      <strong>Weekly (2nd & 3rd trimester):</strong> {result.weeklyWeightGain}
                    </p>
                  </div>
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
                      theme === 'white' ? 'text-pink-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Health Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className={`flex items-start gap-3 text-sm ${
                        theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          theme === 'white' ? 'bg-pink-500' :
                          theme === 'dark' ? 'bg-purple-400' :
                          'bg-green-400'
                        }`} />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Important Disclaimer */}
        <div className="max-w-4xl mx-auto mt-12">
          <Alert className={`border-0 shadow-lg ${
            theme === 'white' ? 'bg-orange-50 text-orange-800' :
            theme === 'dark' ? 'bg-orange-900/20 text-orange-200' :
            'bg-orange-900/20 text-orange-200'
          }`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-medium">
              <strong>Important:</strong> This calculator provides general guidelines only. Always consult with your healthcare provider, obstetrician, or midwife for personalized advice regarding weight gain during pregnancy. Individual needs may vary based on your health history, multiple pregnancies, and other factors.
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
                Understanding Pregnancy Weight Gain
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                    Weight Gain by Trimester
                  </h3>
                  <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                    <li><strong>1st Trimester (0-12 weeks):</strong> 1-4.4 lbs total</li>
                    <li><strong>2nd Trimester (13-27 weeks):</strong> 0.8-1 lb per week</li>
                    <li><strong>3rd Trimester (28-40 weeks):</strong> 0.8-1 lb per week</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                    Factors Affecting Weight Gain
                  </h3>
                  <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                    <li>• Pre-pregnancy BMI and weight</li>
                    <li>• Multiple pregnancies (twins, triplets)</li>
                    <li>• Age and overall health</li>
                    <li>• Physical activity level</li>
                    <li>• Dietary habits and nutrition</li>
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

export default PregnancyBMIPage;