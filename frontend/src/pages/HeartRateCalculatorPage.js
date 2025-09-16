import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Heart, 
  Calculator, 
  Target, 
  Activity,
  Calendar,
  Users,
  TrendingUp,
  Zap,
  Award,
  Clock,
  Brain,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  BarChart3,
  Timer,
  PlayCircle
} from 'lucide-react';
import { 
  calculateHeartRateZones, 
  getFitnessLevels, 
  getAgeMaxFormulas,
  getTrainingGuidelines,
  getRestingHRGuidelines
} from '../utils/heartRateCalculations';

const HeartRateCalculatorPage = () => {
  const { theme, getBackgroundGradient } = useTheme();
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    restingHR: '',
    fitnessLevel: 'intermediate',
    formula: 'tanaka'
  });
  const [result, setResult] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateZones = () => {
    if (!formData.age || !formData.restingHR) return;

    const hrResult = calculateHeartRateZones(
      parseInt(formData.age),
      formData.gender,
      parseInt(formData.restingHR),
      formData.fitnessLevel,
      formData.formula
    );

    setResult(hrResult);
  };

  const clearForm = () => {
    setFormData({
      age: '',
      gender: 'male',
      restingHR: '',
      fitnessLevel: 'intermediate',
      formula: 'tanaka'
    });
    setResult(null);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const professionalBadges = [
    { icon: <Heart className="h-4 w-4" />, text: "5 Training Zones" },
    { icon: <Calculator className="h-4 w-4" />, text: "4 Scientific Formulas" },
    { icon: <Target className="h-4 w-4" />, text: "Goal-Specific Targets" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "Performance Optimization" },
    { icon: <Brain className="h-4 w-4" />, text: "Science-Based Training" },
    { icon: <Award className="h-4 w-4" />, text: "Professional Grade Analysis" }
  ];

  // Quick Navigation Menu
  const navigationMenu = [
    { id: 'hr-science', label: 'HR Science', icon: <Brain className="h-4 w-4" /> },
    { id: 'zone-breakdown', label: 'Zone Analysis', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'formula-comparison', label: 'Formula Guide', icon: <Calculator className="h-4 w-4" /> },
    { id: 'training-plans', label: 'Training Plans', icon: <Target className="h-4 w-4" /> },
    { id: 'expert-faq', label: 'Expert FAQ', icon: <BookOpen className="h-4 w-4" /> }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="World's Best Heart Rate Zone Calculator - Professional HR Training Calculator 2025"
        description="Calculate optimal heart rate training zones with the world's most comprehensive HR calculator. Features 4 scientific formulas, 5 training zones, personalized recommendations, and professional coaching insights for maximum performance."
        keywords="heart rate calculator, HR zone calculator, training zones, target heart rate, cardio zones, fat burning zone, VO2 max zone, heart rate training, Karvonen formula, max heart rate calculator, aerobic threshold, lactate threshold, professional heart rate zones"
        canonical="/heart-rate-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebApplication", "MedicalWebPage"],
          "name": "Professional Heart Rate Zone Calculator - World's Most Comprehensive HR Training Tool",
          "description": "The world's most advanced heart rate zone calculator with 4 scientific formulas, personalized training zones, and professional coaching insights.",
          "url": "https://bmicalculator.com/heart-rate-calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "permissions": "browser",
          "medicalSpecialty": ["Cardiology", "Sports Medicine", "Exercise Physiology"],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "5 heart rate training zones with Karvonen method",
            "4 scientific max HR formulas (Tanaka, Gulati, Nes, Traditional)", 
            "Fitness level adjustments and personalization",
            "Professional training recommendations",
            "Zone-specific coaching guidance",
            "Performance optimization strategies",
            "Evidence-based training periodization"
          ],
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the most accurate heart rate formula?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Tanaka formula (208 - 0.7 × age) is generally more accurate than the traditional 220-age formula, especially for older adults and trained individuals, with a standard deviation of ±7-10 bpm vs ±10-12 bpm."
                }
              },
              {
                "@type": "Question", 
                "name": "How do I measure my resting heart rate accurately?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Measure first thing in the morning before getting out of bed, lying down and relaxed. Take measurements for 3-5 consecutive days and calculate the average for the most accurate resting heart rate."
                }
              }
            ]
          }
        }}
      />

      <Header />

      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              theme === 'white' ? 'bg-gradient-to-br from-red-100 to-pink-100' :
              theme === 'dark' ? 'bg-gradient-to-br from-red-900/50 to-pink-900/50' :
              'bg-gradient-to-br from-red-900/50 to-orange-900/50'
            }`}>
              <Heart className={`h-12 w-12 ${
                theme === 'white' ? 'text-red-600' :
                theme === 'dark' ? 'text-red-400' :
                'text-red-400'
              }`} />
            </div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Professional Heart Rate Zone Calculator
          </h1>

          <p className={`text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            The world's most comprehensive heart rate training calculator. Calculate optimal HR zones using 4 scientific formulas, 
            personalized for your fitness level with professional coaching insights and performance optimization strategies.
          </p>

          {/* Professional Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {professionalBadges.map((badge, index) => (
              <Badge 
                key={index}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  theme === 'white' 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700'
                    : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700'
                }`}
              >
                {badge.icon}
                <span className="ml-2">{badge.text}</span>
              </Badge>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {navigationMenu.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 hover:scale-105 ${
                  theme === 'white'
                    ? 'border-red-200 text-red-600 hover:bg-red-50'
                    : 'border-red-500/30 text-red-400 hover:bg-red-900/20'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Calculator Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className={`backdrop-blur-md border-0 shadow-2xl ${
              theme === 'white' 
                ? 'bg-white/95' 
                : theme === 'dark'
                ? 'bg-gray-800/95 border border-red-500/20'
                : 'bg-gray-900/95 border border-red-500/20'
            }`}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className={`text-2xl font-bold mb-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Calculate Your Professional Heart Rate Training Zones
                  </h2>
                  <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    Enter your details for personalized heart rate zones with scientific precision
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Personal Information
                    </h3>
                    
                    {/* Age */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <Calendar className="inline h-4 w-4 mr-2" />
                        Age
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter age"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <Users className="inline h-4 w-4 mr-2" />
                        Gender
                      </Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Resting Heart Rate */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <Heart className="inline h-4 w-4 mr-2" />
                        Resting Heart Rate (bpm)
                      </Label>
                      <Input
                        type="number"
                        placeholder="e.g., 65"
                        value={formData.restingHR}
                        onChange={(e) => handleInputChange('restingHR', e.target.value)}
                        className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}
                      />
                      <p className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Measure first thing in the morning before getting up
                      </p>
                    </div>
                  </div>

                  {/* Training Information */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Training Information
                    </h3>

                    {/* Fitness Level */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <Activity className="inline h-4 w-4 mr-2" />
                        Fitness Level
                      </Label>
                      <Select value={formData.fitnessLevel} onValueChange={(value) => handleInputChange('fitnessLevel', value)}>
                        <SelectTrigger className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getFitnessLevels().map(level => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label} - {level.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Max HR Formula */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <Calculator className="inline h-4 w-4 mr-2" />
                        Max HR Formula
                      </Label>
                      <Select value={formData.formula} onValueChange={(value) => handleInputChange('formula', value)}>
                        <SelectTrigger className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="traditional">Traditional (220 - Age)</SelectItem>
                          <SelectItem value="tanaka">Tanaka (208 - 0.7 × Age) - Recommended</SelectItem>
                          <SelectItem value="gulati">Gulati (Women) - 206 - 0.88 × Age</SelectItem>
                          <SelectItem value="nes">Nes (211 - 0.64 × Age)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="flex gap-4 mt-8">
                  <Button
                    onClick={calculateZones}
                    disabled={!formData.age || !formData.restingHR}
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'white'
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white'
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white'
                        : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white'
                    }`}
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Professional HR Zones
                  </Button>
                  <Button
                    onClick={clearForm}
                    variant="outline"
                    className={`px-6 py-3 transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'white'
                        ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Clear
                  </Button>
                </div>

                {/* Results */}
                {result && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-6 text-center">Your Professional Heart Rate Training Zones</h3>
                    
                    {/* Key Metrics */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                        <div className="text-2xl font-bold text-red-600">{result.maxHR} bpm</div>
                        <div className="text-sm text-gray-600">Max Heart Rate</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{result.restingHR} bpm</div>
                        <div className="text-sm text-gray-600">Resting Heart Rate</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{result.hrReserve} bpm</div>
                        <div className="text-sm text-gray-600">Heart Rate Reserve</div>
                      </div>
                    </div>

                    {/* Training Zones */}
                    <div className="space-y-4">
                      {result.zones.map((zone, index) => (
                        <Card key={index} className="border-l-4" style={{ borderLeftColor: zone.color }}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-4 h-4 rounded-full" 
                                  style={{ backgroundColor: zone.color }}
                                />
                                <h4 className="font-semibold text-lg">Zone {zone.zone}: {zone.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {zone.percentage}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg">
                                  {zone.targetHR.lower} - {zone.targetHR.upper} bpm
                                </div>
                                <div className="text-sm text-gray-500">
                                  ({zone.maxHRMethod.lower} - {zone.maxHRMethod.upper} bpm max HR method)
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3">{zone.description}</p>
                            
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <strong>Duration:</strong> {zone.duration}<br/>
                                <strong>Feeling:</strong> {zone.feeling}
                              </div>
                              <div>
                                <strong>Activities:</strong> {zone.activities.slice(0, 2).join(', ')}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Heart Rate Science Deep-Dive */}
        <section id="hr-science" className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                The Science of Heart Rate Training
              </h2>
              <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
                Understanding the physiological foundations that make heart rate training the gold standard for cardiovascular fitness optimization
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Cardiac Output & Oxygen Delivery",
                  icon: <Heart className="h-6 w-6" />,
                  summary: "Heart rate directly correlates with cardiac output (Q = HR × SV), determining oxygen delivery to working muscles during exercise.",
                  details: [
                    "Stroke volume increases with training but plateaus around 40-60% max effort",
                    "Beyond this point, heart rate becomes the primary driver of increased cardiac output",
                    "Optimal training zones maximize oxygen delivery while managing metabolic stress",
                    "Trained athletes can achieve 35-40 L/min cardiac output vs 20-25 L/min in untrained individuals"
                  ]
                },
                {
                  title: "Metabolic Substrate Utilization",
                  icon: <Zap className="h-6 w-6" />,
                  summary: "Different heart rate zones correspond to distinct metabolic pathways and fuel utilization patterns for energy production.", 
                  details: [
                    "Zone 1-2: Primary fat oxidation (0.7-1.0 g/min) with high oxygen efficiency",
                    "Zone 3: Crossover point where carbohydrate contribution increases significantly",
                    "Zone 4-5: Predominantly carbohydrate metabolism with lactate accumulation",
                    "Training zones optimize mitochondrial adaptations and enzyme activity"
                  ]
                },
                {
                  title: "Autonomic Nervous System Response",
                  icon: <Brain className="h-6 w-6" />,
                  summary: "Heart rate zones reflect the balance between sympathetic and parasympathetic nervous system activation during exercise.",
                  details: [
                    "Parasympathetic dominance in recovery zones promotes adaptation and regeneration",
                    "Sympathetic activation in higher zones drives performance improvements",
                    "Heart rate variability (HRV) decreases as exercise intensity increases",
                    "Chronic training improves parasympathetic tone and recovery capacity"
                  ]
                },
                {
                  title: "Lactate Dynamics & Buffering",
                  icon: <TrendingUp className="h-6 w-6" />,
                  summary: "Heart rate zones correspond to lactate production, clearance, and buffering capacity thresholds critical for performance.",
                  details: [
                    "Lactate Threshold 1 (LT1): ~2mM lactate, typically 65-75% max HR",
                    "Lactate Threshold 2 (LT2): ~4mM lactate, typically 80-90% max HR", 
                    "Training below LT1 improves fat oxidation and aerobic base",
                    "Training at/above LT2 enhances lactate buffering and clearance mechanisms"
                  ]
                }
              ].map((science, index) => (
                <Card 
                  key={index}
                  className={`transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    theme === 'white' 
                      ? 'bg-white/90 hover:bg-white/95' 
                      : theme === 'dark'
                      ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-red-500/20'
                      : 'bg-gray-900/90 hover:bg-gray-900/95 border border-red-500/20'
                  }`}
                  onClick={() => toggleSection(`science-${index}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        theme === 'white' ? 'bg-red-100 text-red-600' :
                        theme === 'dark' ? 'bg-red-900/50 text-red-400' :
                        'bg-red-900/50 text-red-400'
                      }`}>
                        {science.icon}
                      </div>
                      <h3 className={`text-lg font-semibold ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {science.title}
                      </h3>
                      {expandedSection === `science-${index}` ? 
                        <ChevronUp className="h-5 w-5 ml-auto" /> : 
                        <ChevronDown className="h-5 w-5 ml-auto" />
                      }
                    </div>
                    
                    <p className={`text-sm mb-4 ${
                      theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {science.summary}
                    </p>

                    {expandedSection === `science-${index}` && (
                      <div className="space-y-3">
                        {science.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Zone Analysis */}
        <section id="zone-breakdown" className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Professional Training Zone Analysis
              </h2>
              <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
                Deep-dive into each training zone with physiological adaptations, coaching strategies, and performance applications
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  zone: "Zone 1: Active Recovery (50-60% HRmax)",
                  color: "#3B82F6",
                  physiology: "Parasympathetic dominance, high fat oxidation, minimal lactate production, enhanced blood flow and nutrient delivery",
                  adaptations: "Improved capillarization, mitochondrial density, fat oxidation enzymes (HAD, CPT-1), parasympathetic tone",
                  applications: "Recovery sessions, warm-up/cool-down, base building for beginners, injury rehabilitation",
                  coaching: "Focus on movement quality, breathing techniques, stress reduction. Can be performed daily. Perfect for active recovery between hard sessions."
                },
                {
                  zone: "Zone 2: Aerobic Base (60-70% HRmax)", 
                  color: "#10B981",
                  physiology: "Optimal fat oxidation rate, steady-state oxygen consumption, minimal sympathetic stress, sustainable metabolic state",
                  adaptations: "Maximal mitochondrial adaptations, improved cardiac stroke volume, enhanced fat metabolism, increased capillary density",
                  applications: "Base building, long slow distance, fat adaptation, metabolic efficiency training, general fitness maintenance",
                  coaching: "Foundation of all endurance training. Should comprise 70-80% of total training volume. Develops aerobic power sustainably."
                },
                {
                  zone: "Zone 3: Aerobic Threshold (70-80% HRmax)",
                  color: "#F59E0B", 
                  physiology: "Increasing carbohydrate contribution, rising lactate but stable clearance, moderate sympathetic activation",
                  adaptations: "Improved lactate clearance, enhanced cardiac output, increased oxygen extraction, better fuel flexibility",
                  applications: "Tempo runs, steady-state efforts, race pace training, metabolic conditioning, lactate clearance training",
                  coaching: "Comfortably hard effort. Develops sustainable pace for longer events. Key zone for marathon and half-marathon training."
                },
                {
                  zone: "Zone 4: Lactate Threshold (80-90% HRmax)",
                  color: "#EF4444",
                  physiology: "Lactate threshold crossing, significant carbohydrate dependence, high sympathetic drive, maximal steady state",
                  adaptations: "Enhanced lactate buffering, improved glycolytic power, increased stroke volume, better lactate tolerance",
                  applications: "Threshold intervals, time trials, race-specific training, VO2max development, anaerobic threshold training",
                  coaching: "Hard but manageable effort. Critical for 10K-half marathon performance. Requires careful recovery management."
                },
                {
                  zone: "Zone 5: VO2max (90-100% HRmax)",
                  color: "#8B5CF6",
                  physiology: "Maximal oxygen uptake, high lactate accumulation, near-maximal cardiac output, significant oxygen debt",
                  adaptations: "Maximal stroke volume, peak cardiac output, enhanced oxygen extraction, improved neuromuscular power",
                  applications: "VO2max intervals, track repeats, short race pace, power development, anaerobic capacity training",
                  coaching: "Very hard to maximal effort. Develops top-end fitness. Limited weekly volume due to high recovery demands."
                }
              ].map((zone, index) => (
                <Card 
                  key={index}
                  className={`border-l-4 transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
                    theme === 'white' 
                      ? 'bg-white/90 hover:bg-white/95' 
                      : theme === 'dark'
                      ? 'bg-gray-800/90 hover:bg-gray-800/95 border-r border-t border-b border-red-500/20'
                      : 'bg-gray-900/90 hover:bg-gray-900/95 border border-red-500/20'
                  }`}
                  style={{ borderLeftColor: zone.color }}
                  onClick={() => toggleSection(`zone-${index}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: zone.color }} />
                        <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                          {zone.zone}
                        </h3>
                      </div>
                      {expandedSection === `zone-${index}` ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />
                      }
                    </div>
                    
                    <p className={`text-sm mb-4 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {zone.physiology}
                    </p>

                    {expandedSection === `zone-${index}` && (
                      <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-green-600">Training Adaptations</h4>
                          <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                            {zone.adaptations}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-blue-600">Applications</h4>
                          <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                            {zone.applications}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-semibold mb-2 text-purple-600">Coaching Insights</h4>
                          <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                            {zone.coaching}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Expert FAQ Section */}
        <section id="expert-faq" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Expert Heart Rate Training FAQ
              </h2>
              <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Professional insights from exercise physiologists and performance coaches
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  category: "Scientific Foundation",
                  question: "Why is the Karvonen method (heart rate reserve) more accurate than percentage of max HR?",
                  answer: "The Karvonen method accounts for individual resting heart rate, providing a more personalized training zone. It better reflects the actual physiological stress and metabolic demands. For example, two athletes with the same max HR but different resting HRs (50 vs 70 bpm) have vastly different fitness levels and should train at different absolute heart rates for the same relative intensity."
                },
                {
                  category: "Training Application", 
                  question: "How should I distribute training time across heart rate zones for optimal results?",
                  answer: "Follow the 80/20 rule: 80% of training in Zones 1-2 (low intensity), 20% in Zones 3-5 (moderate to high intensity). Elite endurance athletes often use 90/10. This polarized approach maximizes aerobic adaptations while allowing adequate recovery. Avoid spending too much time in Zone 3 ('gray zone') as it's too hard for easy days and too easy for hard days."
                },
                {
                  category: "Accuracy & Measurement",
                  question: "What factors can affect heart rate accuracy during training?",
                  answer: "Temperature (heat increases HR by 10-15 bpm), dehydration (5-10 bpm increase), caffeine (5-15 bpm increase), altitude (10-20 bpm increase), overtraining (elevated resting HR), illness (variable), and cardiac drift during long sessions (5-20 bpm increase). For accuracy, use chest strap monitors, calibrate regularly, and consider power meters for cycling as an additional metric."
                },
                {
                  category: "Individual Variation",
                  question: "Why don't I fit the predicted heart rate formulas?",
                  answer: "Heart rate formulas are population averages with significant individual variation (±10-15 bpm). Factors include genetics, training history, body composition, cardiac efficiency, and age-related changes. Lab testing (VO2max test) provides the most accurate max HR. Alternatively, perform a field test: warm up thoroughly, then gradually increase intensity until you can't maintain the pace for more than 2-3 minutes."
                },
                {
                  category: "Performance Optimization",
                  question: "How do I know if my heart rate zones are working for performance improvement?",
                  answer: "Track these metrics: decreasing heart rate at the same pace (improved efficiency), faster pace at the same heart rate (increased fitness), improved heart rate recovery (better autonomic function), and decreased resting heart rate over time. Perform regular time trials or lactate testing every 6-8 weeks to reassess zones and validate training adaptations."
                },
                {
                  category: "Special Populations",
                  question: "How should older athletes or those on medications adjust heart rate training?",
                  answer: "Older athletes may have blunted max HR responses and should prioritize RPE alongside HR. Beta-blockers can reduce max HR by 20-40 bpm - use RPE and lactate testing instead. ACE inhibitors may slightly reduce HR. Always consult healthcare providers. Focus more on consistency and gradual progression rather than hitting specific numbers. Heart rate variability becomes increasingly important for recovery monitoring."
                }
              ].map((faq, index) => (
                <Card 
                  key={index}
                  className={`transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
                    theme === 'white' 
                      ? 'bg-white/90 hover:bg-white/95' 
                      : theme === 'dark'
                      ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-red-500/20'
                      : 'bg-gray-900/90 hover:bg-gray-900/95 border border-red-500/20'
                  }`}
                  onClick={() => toggleSection(`faq-${index}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          {faq.category}
                        </Badge>
                        <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                          {faq.question}
                        </h3>
                      </div>
                      {expandedSection === `faq-${index}` ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />
                      }
                    </div>
                    
                    {expandedSection === `faq-${index}` && (
                      <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                        {faq.answer}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HeartRateCalculatorPage;