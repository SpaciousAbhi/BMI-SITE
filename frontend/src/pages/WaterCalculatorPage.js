import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Droplets, 
  Calculator, 
  Clock, 
  ThermometerSun,
  Activity,
  User,
  Calendar,
  Zap,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { 
  calculateWaterIntake, 
  getActivityLevels, 
  getClimateTypes,
  getDehydrationSigns,
  getHydrationTips
} from '../utils/waterCalculations';

const WaterCalculatorPage = () => {
  const { theme, getBackgroundGradient } = useTheme();
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'lbs',
    age: '',
    gender: 'male',
    activityLevel: 'moderate',
    climate: 'temperate',
    pregnancy: false,
    breastfeeding: false
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateWater = () => {
    if (!formData.weight || !formData.age) return;

    const waterResult = calculateWaterIntake(
      parseFloat(formData.weight),
      formData.weightUnit,
      formData.activityLevel,
      formData.climate,
      parseInt(formData.age),
      formData.gender,
      formData.pregnancy,
      formData.breastfeeding
    );

    setResult(waterResult);
  };

  const clearForm = () => {
    setFormData({
      weight: '',
      weightUnit: 'lbs',
      age: '',
      gender: 'male',
      activityLevel: 'moderate',
      climate: 'temperate',
      pregnancy: false,
      breastfeeding: false
    });
    setResult(null);
  };

  const professionalBadges = [
    { icon: <Droplets className="h-4 w-4" />, text: "Hydration Science-Based" },
    { icon: <ThermometerSun className="h-4 w-4" />, text: "Climate Adjusted" },
    { icon: <Activity className="h-4 w-4" />, text: "Activity Personalized" },
    { icon: <Clock className="h-4 w-4" />, text: "Optimal Timing" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Free Water Intake Calculator - Daily Hydration Calculator 2025 | Optimal Water Needs"
        description="Calculate your optimal daily water intake based on weight, activity level, climate, and health factors. Professional hydration calculator with timing guidance and personalized recommendations for optimal health."
        keywords="water calculator, daily water intake, hydration calculator, how much water, water needs calculator, daily hydration, optimal water intake, water intake calculator"
        canonical="/water-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Water Intake Calculator - Daily Hydration Calculator",
          "description": "Professional water intake calculator to determine optimal daily hydration needs based on individual factors.",
          "url": "https://bmicalculator.com/water-calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "permissions": "browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Climate-adjusted calculations",
            "Activity level adjustments", 
            "Optimal timing guidance",
            "Hydration source recommendations",
            "Dehydration prevention"
          ]
        }}
      />

      <Header />

      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              theme === 'white' ? 'bg-gradient-to-br from-blue-100 to-cyan-100' :
              theme === 'dark' ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/50' :
              'bg-gradient-to-br from-blue-900/50 to-teal-900/50'
            }`}>
              <Droplets className={`h-12 w-12 ${
                theme === 'white' ? 'text-blue-600' :
                theme === 'dark' ? 'text-blue-400' :
                'text-cyan-400'
              }`} />
            </div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Daily Water Intake Calculator
          </h1>

          <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your optimal daily water intake based on scientific research, climate conditions, activity level, and personal factors. 
            Get personalized hydration recommendations for peak performance and health.
          </p>

          {/* Professional Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {professionalBadges.map((badge, index) => (
              <Badge 
                key={index}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  theme === 'white' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                    : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-700 hover:to-teal-700'
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
                ? 'bg-gray-800/95 border border-blue-500/20'
                : 'bg-gray-900/95 border border-cyan-500/20'
            }`}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className={`text-2xl font-bold mb-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Calculate Your Daily Water Needs
                  </h2>
                  <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    Enter your details for personalized hydration recommendations
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Personal Information
                    </h3>
                    
                    {/* Weight */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <User className="inline h-4 w-4 mr-2" />
                        Weight
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Enter weight"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}
                        />
                        <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                          <SelectTrigger className={`w-20 ${theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lbs">lbs</SelectItem>
                            <SelectItem value="kg">kg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

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

                    {/* Special Conditions */}
                    {formData.gender === 'female' && (
                      <div className="space-y-3">
                        <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                          Special Conditions
                        </Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="pregnancy"
                              checked={formData.pregnancy}
                              onCheckedChange={(checked) => handleInputChange('pregnancy', checked)}
                            />
                            <Label htmlFor="pregnancy" className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                              Pregnant
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="breastfeeding"
                              checked={formData.breastfeeding}
                              onCheckedChange={(checked) => handleInputChange('breastfeeding', checked)}
                            />
                            <Label htmlFor="breastfeeding" className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                              Breastfeeding
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Environmental Factors */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Environmental Factors
                    </h3>

                    {/* Activity Level */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <Activity className="inline h-4 w-4 mr-2" />
                        Activity Level
                      </Label>
                      <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                        <SelectTrigger className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getActivityLevels().map(level => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label} - {level.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Climate */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <ThermometerSun className="inline h-4 w-4 mr-2" />
                        Climate/Environment
                      </Label>
                      <Select value={formData.climate} onValueChange={(value) => handleInputChange('climate', value)}>
                        <SelectTrigger className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getClimateTypes().map(climate => (
                            <SelectItem key={climate.value} value={climate.value}>
                              {climate.label} - {climate.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="flex gap-4 mt-8">
                  <Button
                    onClick={calculateWater}
                    disabled={!formData.weight || !formData.age}
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'white'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                        : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white'
                    }`}
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Water Needs
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
                  <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Your Daily Hydration Needs</h3>
                    
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <div className="text-2xl font-bold text-blue-600">{result.liters}L</div>
                        <div className="text-sm text-gray-600">Liters</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <div className="text-2xl font-bold text-cyan-600">{result.ounces} oz</div>
                        <div className="text-sm text-gray-600">Fluid Ounces</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <div className="text-2xl font-bold text-teal-600">{result.cups}</div>
                        <div className="text-sm text-gray-600">Cups (8oz)</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <div className="text-2xl font-bold text-indigo-600">{result.hourlyIntake}ml</div>
                        <div className="text-sm text-gray-600">Per Hour</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-gray-900">Optimal Timing</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Upon Waking:</strong> {Math.round(result.breakdown.uponWaking)}ml
                        </div>
                        <div>
                          <strong>Before Meals:</strong> {Math.round(result.breakdown.beforeMeals)}ml
                        </div>
                        <div>
                          <strong>During Exercise:</strong> {Math.round(result.breakdown.duringExercise)}ml
                        </div>
                        <div>
                          <strong>Throughout Day:</strong> {Math.round(result.breakdown.throughoutDay)}ml
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900">Hydration Tips</h4>
                      <ul className="space-y-1">
                        {getHydrationTips(formData.activityLevel, formData.climate, parseInt(formData.age)).slice(0, 3).map((tip, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
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

export default WaterCalculatorPage;