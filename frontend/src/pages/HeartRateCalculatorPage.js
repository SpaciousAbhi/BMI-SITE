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
  Clock
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

  const professionalBadges = [
    { icon: <Heart className="h-4 w-4" />, text: "5 Training Zones" },
    { icon: <Target className="h-4 w-4" />, text: "Goal-Specific Targets" },
    { icon: <Award className="h-4 w-4" />, text: "Multiple HR Formulas" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "Performance Optimization" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Free Heart Rate Zone Calculator - Training Zones Calculator 2025 | Optimal HR Zones"
        description="Calculate your optimal heart rate training zones based on age, fitness level, and resting heart rate. Professional HR zone calculator for cardio training, fat burning, and athletic performance optimization."
        keywords="heart rate calculator, HR zone calculator, training zones, target heart rate, cardio zones, fat burning zone, VO2 max zone, heart rate training"
        canonical="/heart-rate-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Heart Rate Zone Calculator - Training Zones Calculator",
          "description": "Professional heart rate zone calculator to determine optimal training zones for different fitness goals.",
          "url": "https://bmicalculator.com/heart-rate-calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "permissions": "browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "5 heart rate training zones",
            "Multiple max HR formulas", 
            "Fitness level adjustments",
            "Training recommendations",
            "Performance optimization"
          ]
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
            Heart Rate Zone Calculator
          </h1>

          <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your optimal heart rate training zones for cardio workouts, fat burning, and athletic performance. 
            Get personalized HR zones based on scientific formulas and your fitness level.
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
                    Calculate Your Heart Rate Training Zones
                  </h2>
                  <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    Enter your details for personalized heart rate zones
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
                    Calculate HR Zones
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
                    <h3 className="text-xl font-bold mb-6 text-center">Your Heart Rate Training Zones</h3>
                    
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
      </main>

      <Footer />
    </div>
  );
};

export default HeartRateCalculatorPage;