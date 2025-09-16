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

        {/* Comprehensive Scientific Content */}
        <div className="max-w-6xl mx-auto mt-16 space-y-12">
          
          {/* Pregnancy Weight Gain Science */}
          <div id="science" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  The Science of Pregnancy Weight Gain
                </h2>
                
                <div className="grid gap-6">
                  {/* Maternal Physiological Changes */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('physiological')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Maternal Physiological Adaptations
                      </h3>
                      {expandedSections.physiological ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.physiological && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Blood Volume Changes</h4>
                            <p className="mb-3">Maternal blood volume increases by 40-50% during pregnancy, contributing 3-4 lbs to total weight gain. This expansion supports increased cardiac output and prepares for delivery blood loss.</p>
                            <h4 className="font-semibold mb-2">Metabolic Adaptations</h4>
                            <p>Basal metabolic rate increases by 15-20% by the third trimester. Insulin sensitivity decreases progressively, promoting maternal fat storage for breastfeeding energy reserves.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Hormonal Influences</h4>
                            <p className="mb-3">Estrogen, progesterone, and placental lactogen drive appetite changes and fat deposition. Leptin levels increase 2-3 fold, while ghrelin patterns shift throughout pregnancy.</p>
                            <h4 className="font-semibold mb-2">Tissue Growth</h4>
                            <p>Uterine growth accounts for 2 lbs, breast tissue 1-3 lbs, and amniotic fluid 2 lbs. Placental weight contributes approximately 1.5 lbs at term.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fetal Development Impact */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('fetal')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Fetal Development and Maternal Weight
                      </h3>
                      {expandedSections.fetal ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.fetal && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Critical Growth Periods</h4>
                            <p className="mb-3">First trimester: Neural tube development requires adequate folate and steady glucose. Inadequate maternal nutrition can cause neural tube defects and growth restriction.</p>
                            <h4 className="font-semibold mb-2">Second Trimester Expansion</h4>
                            <p>Rapid fetal growth requires increased protein (25g/day), calcium (1000mg), and iron (27mg). Maternal weight gain supports placental development and fetal organ maturation.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Third Trimester Fat Accumulation</h4>
                            <p className="mb-3">Fetal brain development requires DHA and adequate maternal fat stores. Birth weight strongly correlates with maternal weight gain in this period.</p>
                            <h4 className="font-semibold mb-2">Long-term Programming</h4>
                            <p>Maternal weight extremes can program fetal metabolism, affecting offspring's lifelong risk of obesity, diabetes, and cardiovascular disease through epigenetic mechanisms.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Weight Distribution Analysis */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('distribution')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Weight Distribution Components
                      </h3>
                      {expandedSections.distribution ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.distribution && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Fetal-Placental Unit (30%)</h4>
                            <ul className="space-y-1">
                              <li>• Baby: 7.5 lbs (3.4 kg)</li>
                              <li>• Placenta: 1.5 lbs (0.7 kg)</li>
                              <li>• Amniotic fluid: 2 lbs (0.9 kg)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Maternal Adaptations (35%)</h4>
                            <ul className="space-y-1">
                              <li>• Blood volume: 3-4 lbs (1.4-1.8 kg)</li>
                              <li>• Breast tissue: 1-3 lbs (0.5-1.4 kg)</li>
                              <li>• Uterine growth: 2 lbs (0.9 kg)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Maternal Reserves (35%)</h4>
                            <ul className="space-y-1">
                              <li>• Fat stores: 6-8 lbs (2.7-3.6 kg)</li>
                              <li>• Protein stores: 2 lbs (0.9 kg)</li>
                              <li>• Increased fluid: 2-3 lbs (0.9-1.4 kg)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Risk Factors and Complications */}
                  <div className={`border rounded-lg p-6 transition-all duration-300 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('risks')}
                    >
                      <h3 className={`text-xl font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Weight-Related Pregnancy Complications
                      </h3>
                      {expandedSections.risks ? 
                        <ChevronDown className={`h-5 w-5 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} /> : 
                        <ChevronRight className={`h-5 w-5 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`} />
                      }
                    </div>
                    {expandedSections.risks && (
                      <div className={`mt-4 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-red-600">Insufficient Weight Gain</h4>
                            <ul className="space-y-1 mb-4">
                              <li>• Low birth weight (&lt;2500g): 2x increased risk</li>
                              <li>• Preterm birth: 1.5x increased risk</li>
                              <li>• Intrauterine growth restriction</li>
                              <li>• Neural tube defects</li>
                              <li>• Maternal nutritional deficiencies</li>
                            </ul>
                            <h4 className="font-semibold mb-2 text-orange-600">Excessive Weight Gain</h4>
                            <ul className="space-y-1">
                              <li>• Gestational diabetes: 2-3x increased risk</li>
                              <li>• Preeclampsia: 2x increased risk</li>
                              <li>• Macrosomia (>4000g): 3x increased risk</li>
                              <li>• Cesarean delivery: 1.5x increased risk</li>
                              <li>• Postpartum weight retention</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Long-term Consequences</h4>
                            <p className="mb-3">Maternal weight gain outside recommendations increases lifelong obesity risk for both mother and child. Children of mothers with excessive gain have 30% higher obesity rates at age 7.</p>
                            <h4 className="font-semibold mb-2">Prevention Strategies</h4>
                            <ul className="space-y-1">
                              <li>• Pre-conception weight optimization</li>
                              <li>• Early prenatal nutrition counseling</li>
                              <li>• Regular weight monitoring</li>
                              <li>• Individualized activity plans</li>
                              <li>• Behavioral support interventions</li>
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

          {/* Comprehensive Nutrition Guide */}
          <div id="nutrition" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Complete Pregnancy Nutrition Guide
                </h2>
                
                <div className="grid gap-6">
                  {/* Trimester-Specific Nutrition */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Trimester-Specific Nutritional Needs
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}>
                          First Trimester (0-12 weeks)
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <strong>Goal:</strong> Manage nausea, establish healthy patterns
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Calories: +0-200 per day</li>
                          <li>• Folic acid: 600 mcg daily</li>
                          <li>• Iron: 27 mg daily</li>
                          <li>• Frequent small meals</li>
                          <li>• Focus on nutrient density</li>
                          <li>• Avoid alcohol completely</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}>
                          Second Trimester (13-27 weeks)
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <strong>Goal:</strong> Support rapid fetal growth
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Calories: +300-350 per day</li>
                          <li>• Protein: 71g daily (+25g)</li>
                          <li>• Calcium: 1000 mg daily</li>
                          <li>• DHA: 200-300 mg daily</li>
                          <li>• Increase healthy snacks</li>
                          <li>• Monitor weight gain pattern</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}>
                          Third Trimester (28-40 weeks)
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <strong>Goal:</strong> Brain development, birth preparation
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Calories: +450-500 per day</li>
                          <li>• Choline: 450 mg daily</li>
                          <li>• Vitamin D: 600 IU daily</li>
                          <li>• Smaller, frequent meals</li>
                          <li>• Focus on digestible foods</li>
                          <li>• Prepare for breastfeeding</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Essential Nutrients */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Critical Nutrients and Food Sources
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Macro Nutrients
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-white/60' : 'bg-gray-700/30'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Protein (71g/day):</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Lean meats, fish, eggs, dairy, legumes, nuts. Critical for fetal tissue development and maternal blood volume expansion.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-white/60' : 'bg-gray-700/30'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Healthy Fats (20-35% calories):</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Avocados, nuts, olive oil, fatty fish. Essential for brain development and hormone production.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-white/60' : 'bg-gray-700/30'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Complex Carbs (45-65% calories):</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Whole grains, fruits, vegetables. Provide steady energy and prevent gestational diabetes.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Critical Micronutrients
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-white/60' : 'bg-gray-700/30'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Folate (600 mcg):</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Dark leafy greens, fortified cereals, citrus. Prevents neural tube defects.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-white/60' : 'bg-gray-700/30'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Iron (27 mg):</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Red meat, poultry, fish, beans. Prevents anemia and supports increased blood volume.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-white/60' : 'bg-gray-700/30'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Calcium (1000 mg):</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Dairy, fortified foods, leafy greens. Essential for fetal bone development.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sample Meal Plans */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Daily Meal Plan Examples by Pre-Pregnancy BMI
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      {[
                        { category: 'Underweight BMI <18.5', calories: '2200-2500', color: 'blue' },
                        { category: 'Normal BMI 18.5-24.9', calories: '2000-2300', color: 'green' },
                        { category: 'Overweight BMI 25-29.9', calories: '1800-2100', color: 'yellow' },
                        { category: 'Obese BMI ≥30', calories: '1500-1800', color: 'orange' }
                      ].map((plan, index) => (
                        <div key={index} className={`p-4 rounded-lg ${
                          theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                        }`}>
                          <h4 className={`font-semibold mb-2 ${
                            plan.color === 'blue' ? 'text-blue-600' :
                            plan.color === 'green' ? 'text-green-600' :
                            plan.color === 'yellow' ? 'text-yellow-600' :
                            'text-orange-600'
                          }`}>
                            {plan.category}
                          </h4>
                          <p className={`font-medium mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                            Target: {plan.calories} calories
                          </p>
                          <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                            <li><strong>Breakfast:</strong> Fortified cereal + milk + berries</li>
                            <li><strong>Snack:</strong> Greek yogurt + nuts</li>
                            <li><strong>Lunch:</strong> Quinoa salad + salmon</li>
                            <li><strong>Snack:</strong> Apple + almond butter</li>
                            <li><strong>Dinner:</strong> Lean protein + vegetables + whole grains</li>
                            <li><strong>Evening:</strong> Calcium-rich snack</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exercise and Safety Guidelines */}
          <div id="exercise" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Safe Exercise During Pregnancy
                </h2>
                
                <div className="grid gap-6">
                  {/* Exercise Benefits */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Benefits of Prenatal Exercise
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-green-600' : 'text-green-400'}`}>
                          Maternal Health Benefits
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Reduced gestational diabetes risk by 30%</li>
                          <li>• Lower preeclampsia risk by 40%</li>
                          <li>• Improved mood and reduced depression</li>
                          <li>• Better sleep quality</li>
                          <li>• Reduced back pain and swelling</li>
                          <li>• Faster postpartum recovery</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-blue-600' : 'text-blue-400'}`}>
                          Labor and Delivery Benefits
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Shorter active labor by 1-2 hours</li>
                          <li>• Reduced need for pain medication</li>
                          <li>• Lower cesarean delivery risk</li>
                          <li>• Improved pelvic floor strength</li>
                          <li>• Better endurance during pushing</li>
                          <li>• Reduced delivery complications</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-purple-600' : 'text-purple-400'}`}>
                          Fetal Benefits
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Improved placental function</li>
                          <li>• Better fetal heart rate patterns</li>
                          <li>• Reduced macrosomia risk</li>
                          <li>• Enhanced neurodevelopment</li>
                          <li>• Lower childhood obesity risk</li>
                          <li>• Improved stress tolerance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Exercise Guidelines by Trimester */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Trimester-Specific Exercise Guidelines
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}>
                          First Trimester Focus
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <strong>Goal:</strong> Establish routine, manage fatigue
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Continue pre-pregnancy activities</li>
                          <li>• Moderate intensity: 150 min/week</li>
                          <li>• Listen to body's energy levels</li>
                          <li>• Avoid overheating</li>
                          <li>• Stay well hydrated</li>
                          <li>• Modify as needed for nausea</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}>
                          Second Trimester Peak
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <strong>Goal:</strong> Optimal fitness, energy levels high
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Peak exercise tolerance period</li>
                          <li>• Avoid supine exercises after 20 weeks</li>
                          <li>• Modify core exercises for diastasis</li>
                          <li>• Include pelvic floor training</li>
                          <li>• Monitor for dizziness</li>
                          <li>• Adjust for growing belly</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-pink-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}>
                          Third Trimester Caution
                        </h4>
                        <p className={`mb-3 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <strong>Goal:</strong> Maintain fitness, prepare for labor
                        </p>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <li>• Reduce intensity, focus on endurance</li>
                          <li>• Emphasize breathing techniques</li>
                          <li>• Include birthing ball exercises</li>
                          <li>• Practice labor positions</li>
                          <li>• Watch for preterm labor signs</li>
                          <li>• Prepare for recovery</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Recommended and Contraindicated Activities */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Safe vs. Unsafe Activities
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 text-green-600`}>
                          ✅ Recommended Activities
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-green-50' : 'bg-green-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Low-Impact Cardio:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Walking, swimming, stationary cycling, elliptical. Maintains cardiovascular fitness without joint stress.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-green-50' : 'bg-green-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Strength Training:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Light weights, resistance bands, bodyweight exercises. Maintains muscle mass and bone density.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-green-50' : 'bg-green-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Flexibility & Balance:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Prenatal yoga, gentle stretching, tai chi. Improves flexibility and reduces muscle tension.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 text-red-600`}>
                          ❌ Activities to Avoid
                        </h4>
                        <div className="space-y-3">
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>High-Risk Sports:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Contact sports, skiing, horseback riding, gymnastics. Risk of falls and abdominal trauma.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Extreme Conditions:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Hot yoga, high altitude activities, scuba diving. Risk of overheating and oxygen deprivation.
                            </p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                            <strong className={theme === 'white' ? 'text-gray-900' : 'text-white'}>Certain Positions:</strong>
                            <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-300'} mt-1`}>
                              Supine exercises after 20 weeks, prone positions. Risk of reduced blood flow to fetus.
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

          {/* Health Monitoring and Warning Signs */}
          <div id="monitoring" className="scroll-mt-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-3xl font-bold mb-8 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Health Monitoring and Warning Signs
                </h2>
                
                <div className="grid gap-6">
                  {/* Regular Monitoring */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Regular Health Monitoring Schedule
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-blue-600' : 'text-blue-400'}`}>
                          Weekly Self-Monitoring
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Weight tracking (same time, same scale)</li>
                          <li>• Blood pressure monitoring</li>
                          <li>• Fetal movement counting (after 28 weeks)</li>
                          <li>• Urine protein dipstick testing</li>
                          <li>• Edema assessment (hands, feet, face)</li>
                          <li>• Energy level and mood tracking</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-green-600' : 'text-green-400'}`}>
                          Prenatal Appointments
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• 1st trimester: Every 4 weeks</li>
                          <li>• 2nd trimester: Every 4 weeks</li>
                          <li>• 28-36 weeks: Every 2 weeks</li>
                          <li>• 36+ weeks: Weekly</li>
                          <li>• High-risk: More frequent</li>
                          <li>• Emergency: Any concerning symptoms</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-white/80' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-900/50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-purple-600' : 'text-purple-400'}`}>
                          Key Laboratory Tests
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Glucose screening (24-28 weeks)</li>
                          <li>• Complete blood count (each trimester)</li>
                          <li>• Urinalysis (each visit)</li>
                          <li>• Group B Strep (35-37 weeks)</li>
                          <li>• Blood pressure trends</li>
                          <li>• Protein levels monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Warning Signs */}
                  <div className={`border-2 border-red-500 rounded-lg p-6 ${
                    theme === 'white' ? 'bg-red-50/80' :
                    theme === 'dark' ? 'bg-red-900/20' :
                    'bg-red-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 text-red-600`}>
                      🚨 EMERGENCY WARNING SIGNS - CALL HEALTHCARE PROVIDER IMMEDIATELY
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-red-700' : 'text-red-400'}`}>
                          Immediate Medical Attention Required
                        </h4>
                        <ul className={`space-y-2 ${theme === 'white' ? 'text-red-800' : 'text-red-300'}`}>
                          <li>• <strong>Severe headaches</strong> with vision changes or upper right abdominal pain</li>
                          <li>• <strong>Vaginal bleeding</strong> or gush of fluid from vagina</li>
                          <li>• <strong>Severe nausea/vomiting</strong> preventing food/fluid intake for 24+ hours</li>
                          <li>• <strong>Decreased fetal movement</strong> (less than 10 movements in 2 hours after 28 weeks)</li>
                          <li>• <strong>Regular contractions</strong> before 37 weeks (5+ minutes apart for 1+ hour)</li>
                          <li>• <strong>Sudden swelling</strong> of hands, feet, or face</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-red-700' : 'text-red-400'}`}>
                          Other Serious Symptoms
                        </h4>
                        <ul className={`space-y-2 ${theme === 'white' ? 'text-red-800' : 'text-red-300'}`}>
                          <li>• <strong>Persistent fever</strong> over 100.4°F (38°C)</li>
                          <li>• <strong>Burning sensation</strong> during urination with frequency</li>
                          <li>• <strong>Severe back pain</strong> that doesn't improve with rest</li>
                          <li>• <strong>Rapid weight gain</strong> (more than 4 lbs in one week)</li>
                          <li>• <strong>Dizziness/fainting</strong> especially when lying down</li>
                          <li>• <strong>Thoughts of self-harm</strong> or inability to care for yourself</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Postpartum Considerations */}
                  <div className={`border rounded-lg p-6 ${
                    theme === 'white' ? 'border-pink-200 bg-pink-50/50' :
                    theme === 'dark' ? 'border-purple-500/30 bg-purple-900/20' :
                    'border-green-500/30 bg-green-900/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Postpartum Weight Management
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Immediate Postpartum (0-6 weeks)
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Expect 10-15 lb immediate loss (baby, placenta, fluid)</li>
                          <li>• No active weight loss during recovery period</li>
                          <li>• Focus on healing and establishing breastfeeding</li>
                          <li>• Adequate nutrition for milk production</li>
                          <li>• Gentle walking as tolerated</li>
                          <li>• Stay hydrated and rest when possible</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Extended Postpartum (6+ weeks)
                        </h4>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          <li>• Gradual return to pre-pregnancy weight over 6-12 months</li>
                          <li>• Breastfeeding burns 300-500 calories/day</li>
                          <li>• Resume exercise gradually after medical clearance</li>
                          <li>• Address diastasis recti and pelvic floor issues</li>
                          <li>• Monitor for postpartum depression/anxiety</li>
                          <li>• Plan future pregnancies with optimal spacing</li>
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
                  Expert FAQ: Pregnancy Weight Gain
                </h2>
                
                {/* FAQ Categories */}
                <div className="grid md:grid-cols-4 gap-3 mb-8">
                  {[
                    { id: 'basics', label: 'Basics', icon: BookOpen },
                    { id: 'nutrition', label: 'Nutrition', icon: Apple },
                    { id: 'exercise', label: 'Exercise', icon: Activity },
                    { id: 'complications', label: 'Complications', icon: Shield }
                  ].map((category) => {
                    const Icon = category.icon;
                    return (
                      <Badge
                        key={category.id}
                        variant="outline"
                        className={`p-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          theme === 'white' 
                            ? 'border-pink-200 text-pink-700 hover:bg-pink-50'
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
                      question: 'How much weight should I gain during pregnancy?',
                      answer: 'Weight gain recommendations depend on your pre-pregnancy BMI: Underweight (BMI <18.5): 28-40 lbs; Normal weight (BMI 18.5-24.9): 25-35 lbs; Overweight (BMI 25-29.9): 15-25 lbs; Obese (BMI ≥30): 11-20 lbs. These ranges support optimal maternal and fetal health outcomes based on extensive research.'
                    },
                    {
                      category: 'basics',
                      question: 'When should I start gaining weight during pregnancy?',
                      answer: 'Most women should gain 1-4.4 lbs during the entire first trimester, then approximately 0.8-1 lb per week during the second and third trimesters. The pattern matters more than total amount - steady, gradual gain is healthier than dramatic fluctuations.'
                    },
                    {
                      category: 'basics', 
                      question: 'What if I was overweight before pregnancy?',
                      answer: 'Women with higher pre-pregnancy BMI should gain less weight (11-25 lbs total) but still need adequate nutrition for fetal development. Focus on nutrient-dense foods, regular physical activity, and close monitoring for gestational diabetes and hypertension. Work with a registered dietitian for personalized guidance.'
                    },
                    {
                      category: 'nutrition',
                      question: 'How many extra calories do I need during pregnancy?',
                      answer: 'Calorie needs increase gradually: First trimester: +0-200 calories/day; Second trimester: +300-350 calories/day; Third trimester: +450-500 calories/day. Quality matters more than quantity - focus on nutrient-dense foods rather than empty calories.'
                    },
                    {
                      category: 'nutrition',
                      question: 'Which nutrients are most important during pregnancy?',
                      answer: 'Critical nutrients include: Folic acid (600 mcg/day) prevents neural tube defects; Iron (27 mg/day) prevents anemia; Calcium (1000 mg/day) supports bone development; DHA (200-300 mg/day) aids brain development; Protein (+25g/day) supports tissue growth. Prenatal vitamins help fill gaps.'
                    },
                    {
                      category: 'nutrition',
                      question: 'Can I diet during pregnancy if I am overweight?',
                      answer: 'Restrictive dieting is not recommended during pregnancy as it can harm fetal development. Instead, focus on healthy eating patterns, portion control, and nutrient-dense foods. Even overweight women need adequate calories and nutrients. Work with healthcare providers for safe weight management strategies.'
                    },
                    {
                      category: 'exercise',
                      question: 'Is it safe to exercise during pregnancy?',
                      answer: 'Yes, regular moderate exercise is recommended for most pregnant women. Benefits include reduced gestational diabetes risk, improved mood, shorter labor, and faster recovery. Aim for 150 minutes of moderate-intensity exercise weekly. Avoid contact sports, supine positions after 20 weeks, and activities with fall risk.'
                    },
                    {
                      category: 'exercise',
                      question: 'What exercises should I avoid during pregnancy?',
                      answer: 'Avoid: Contact sports (soccer, basketball); Activities with fall risk (skiing, cycling after first trimester); Supine exercises after 20 weeks; Hot yoga or saunas; Scuba diving; High-altitude activities above 6000 feet; Heavy weightlifting with Valsalva maneuver.'
                    },
                    {
                      category: 'exercise',
                      question: 'Can exercise cause miscarriage?',
                      answer: 'No, moderate exercise does not increase miscarriage risk. Most miscarriages result from chromosomal abnormalities, not physical activity. However, stop exercising and consult your provider if you experience vaginal bleeding, severe nausea, dizziness, chest pain, or contractions.'
                    },
                    {
                      category: 'complications',
                      question: 'What are the risks of gaining too much weight?',
                      answer: 'Excessive weight gain increases risks of: Gestational diabetes (2-3x risk); Preeclampsia (2x risk); Macrosomia/large baby (3x risk); Cesarean delivery (1.5x risk); Postpartum weight retention; Childhood obesity in offspring (30% higher risk). Prevention through early intervention is key.'
                    },
                    {
                      category: 'complications',
                      question: 'What are the risks of gaining too little weight?',
                      answer: 'Insufficient weight gain increases risks of: Low birth weight (&lt;2500g); Preterm birth; Intrauterine growth restriction; Neural tube defects; Maternal nutritional deficiencies; Breastfeeding difficulties. Adequate nutrition is essential for optimal fetal development.'
                    },
                    {
                      category: 'complications',
                      question: 'How does multiple pregnancy affect weight gain?',
                      answer: 'Twin pregnancies require higher weight gain: Normal BMI: 37-54 lbs; Overweight BMI: 31-50 lbs; Obese BMI: 25-42 lbs. Triplets and higher-order multiples require individualized recommendations. Higher protein needs (up to 150g/day) and earlier/more frequent monitoring are essential.'
                    },
                    {
                      category: 'complications',
                      question: 'When should I be concerned about my weight gain pattern?',
                      answer: 'Contact your healthcare provider if you experience: Sudden weight gain (>4 lbs in one week); No weight gain for several weeks after first trimester; Persistent nausea preventing adequate intake; Signs of preeclampsia (headaches, vision changes, upper abdominal pain); Extreme fatigue or mood changes.'
                    },
                    {
                      category: 'basics',
                      question: 'How will breastfeeding affect my postpartum weight loss?',
                      answer: 'Breastfeeding burns 300-500 calories/day and may help with weight loss, but results vary. Some women lose weight faster, others maintain weight while nursing. Focus on adequate nutrition (additional 300-500 calories/day) rather than restriction. Most women return to pre-pregnancy weight within 6-12 months.'
                    },
                    {
                      category: 'complications',
                      question: 'Can pregnancy weight gain affect my future health?',
                      answer: 'Yes, excessive pregnancy weight gain increases long-term risks of: Type 2 diabetes; Cardiovascular disease; Subsequent pregnancy complications; Difficulty returning to pre-pregnancy weight. Optimal weight gain during pregnancy sets the foundation for lifelong health for both mother and child.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className={`border rounded-lg p-4 transition-all duration-300 ${
                      theme === 'white' ? 'border-pink-200 bg-pink-50/30' :
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

export default PregnancyBMIPage;