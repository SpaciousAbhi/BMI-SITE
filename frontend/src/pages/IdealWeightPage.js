import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Weight, User, Target, ArrowLeft, Download, X, Info, Heart, Brain, Activity, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  calculateIdealWeightAnalysis,
  formatIdealWeightResults
} from '../utils/idealWeightCalculations';

const IdealWeightPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    height: '',
    currentWeight: '',
    age: '',
    gender: '',
    units: 'metric' // metric or imperial
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearForm = () => {
    setFormData({
      height: '',
      currentWeight: '',
      age: '',
      gender: '',
      units: 'metric'
    });
    setResult(null);
  };

  const calculateIdealWeight = () => {
    if (!formData.height || !formData.currentWeight || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your ideal weight.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const height = parseFloat(formData.height);
      const currentWeight = parseFloat(formData.currentWeight);
      const age = parseInt(formData.age);
      
      const analysis = calculateIdealWeightAnalysis(height, formData.gender, currentWeight, age, formData.units);
      const formattedResults = formatIdealWeightResults(analysis, age, formData.gender);
      
      setResult(formattedResults);
      
      toast({
        title: "Ideal Weight Calculated!",
        description: `Your ideal weight range: ${formattedResults.summary.idealWeightRange}`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Within Healthy Range':
        return theme === 'white' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-green-900/30 text-green-300 border-green-700';
      case 'Underweight':
        return theme === 'white' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-blue-900/30 text-blue-300 border-blue-700';
      case 'Above Healthy Range':
        return theme === 'white' ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-orange-900/30 text-orange-300 border-orange-700';
      default:
        return theme === 'white' ? 'bg-gray-50 text-gray-800 border-gray-200' : 'bg-gray-900/30 text-gray-300 border-gray-700';
    }
  };

  const seoData = {
    title: "Free Ideal Weight Calculator | Healthy Weight Range Calculator 2025",
    description: "Calculate your ideal weight using multiple scientific formulas. Get personalized healthy weight range recommendations based on height, age, and gender. Free ideal weight calculator with expert analysis.",
    keywords: "ideal weight calculator, healthy weight calculator, perfect weight calculator, ideal body weight, healthy weight range, weight calculator, BMI ideal weight",
    canonicalUrl: "https://bmicalculator.dev/ideal-weight"
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className={`min-h-screen transition-all duration-500 ${
        theme === 'white' ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50' :
        theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' :
        'bg-gradient-to-br from-black via-gray-900 to-green-900'
      }`}>
        
        <Header />
        
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              to="/"
              className={`inline-flex items-center gap-2 text-sm hover:underline transition-colors ${
                theme === 'white' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to BMI Calculator
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${
                theme === 'white' ? 'bg-blue-100' : 
                theme === 'dark' ? 'bg-purple-900/30' : 
                'bg-green-900/30'
              }`}>
                <Target className={`h-12 w-12 ${
                  theme === 'white' ? 'text-blue-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Ideal Weight Calculator
            </h1>
            
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Calculate your ideal weight using multiple scientific formulas. Get personalized recommendations based on your height, age, and gender.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                '📊 4 Scientific Formulas',
                '🎯 Personalized Analysis', 
                '📈 Healthy Weight Range',
                '👥 Age-Adjusted Recommendations'
              ].map((badge, index) => (
                <Badge 
                  key={badge}
                  className={`px-4 py-2 text-sm ${
                    theme === 'white' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                    theme === 'dark' ? 'bg-purple-900/30 text-purple-300 border-purple-700' :
                    'bg-green-900/30 text-green-300 border-green-700'
                  }`}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className={`${
                theme === 'white' ? 'bg-white border-gray-200' : 
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
                'bg-gray-900 border-gray-600'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 text-2xl ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Calculator className={`h-6 w-6 ${
                      theme === 'white' ? 'text-blue-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Calculate Your Ideal Weight
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Units Selection */}
                  <div className="space-y-2">
                    <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                      Measurement System
                    </Label>
                    <Select value={formData.units} onValueChange={(value) => handleInputChange('units', value)}>
                      <SelectTrigger className={theme === 'white' ? 'border-gray-300' : 'border-gray-600'}>
                        <SelectValue placeholder="Select units" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                        <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Height Input */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        Height {formData.units === 'metric' ? '(cm)' : '(inches)'}
                      </Label>
                      <Input
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        placeholder={formData.units === 'metric' ? '170' : '67'}
                        className={theme === 'white' ? 'border-gray-300' : 'border-gray-600'}
                      />
                    </div>

                    {/* Current Weight Input */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        Current Weight {formData.units === 'metric' ? '(kg)' : '(lbs)'}
                      </Label>
                      <Input
                        type="number"
                        value={formData.currentWeight}
                        onChange={(e) => handleInputChange('currentWeight', e.target.value)}
                        placeholder={formData.units === 'metric' ? '70' : '154'}
                        className={theme === 'white' ? 'border-gray-300' : 'border-gray-600'}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Age Input */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        Age (years)
                      </Label>
                      <Input
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="30"
                        className={theme === 'white' ? 'border-gray-300' : 'border-gray-600'}
                      />
                    </div>

                    {/* Gender Selection */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        Gender
                      </Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger className={theme === 'white' ? 'border-gray-300' : 'border-gray-600'}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={calculateIdealWeight}
                      disabled={loading}
                      className={`flex-1 h-12 text-lg font-semibold ${
                        theme === 'white' ? 'bg-blue-600 hover:bg-blue-700' :
                        theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' :
                        'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {loading ? 'Calculating...' : 'Calculate Ideal Weight'}
                    </Button>
                    
                    <Button
                      onClick={clearForm}
                      variant="outline"
                      className="h-12"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {result ? (
                <>
                  {/* Main Results */}
                  <Card className={`${
                    theme === 'white' ? 'bg-white border-gray-200' : 
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
                    'bg-gray-900 border-gray-600'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Your Ideal Weight Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Weight Status */}
                      <div className={`p-4 rounded-lg border ${getStatusColor(result.analysis.status)}`}>
                        <div className="text-center">
                          <p className="text-sm font-medium opacity-80">Current Status</p>
                          <p className="text-lg font-bold">{result.analysis.status}</p>
                        </div>
                      </div>

                      {/* Ideal Weight Range */}
                      <div className="text-center space-y-2">
                        <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          Healthy Weight Range
                        </p>
                        <p className={`text-2xl font-bold ${
                          theme === 'white' ? 'text-blue-600' : 
                          theme === 'dark' ? 'text-purple-400' : 
                          'text-green-400'
                        }`}>
                          {result.summary.idealWeightRange}
                        </p>
                      </div>

                      {/* Scientific Formulas */}
                      <div className="space-y-2">
                        <p className={`text-sm font-medium ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Scientific Calculations:
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Hamwi Formula:</span>
                            <span className={theme === 'white' ? 'text-gray-900' : 'text-white'}>
                              {result.formulas.hamwi} {result.units === 'metric' ? 'kg' : 'lbs'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Robinson Formula:</span>
                            <span className={theme === 'white' ? 'text-gray-900' : 'text-white'}>
                              {result.formulas.robinson} {result.units === 'metric' ? 'kg' : 'lbs'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Miller Formula:</span>
                            <span className={theme === 'white' ? 'text-gray-900' : 'text-white'}>
                              {result.formulas.miller} {result.units === 'metric' ? 'kg' : 'lbs'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Devine Formula:</span>
                            <span className={theme === 'white' ? 'text-gray-900' : 'text-white'}>
                              {result.formulas.devine} {result.units === 'metric' ? 'kg' : 'lbs'}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t">
                            <span className={`font-medium ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>Average:</span>
                            <span className={`font-bold ${
                              theme === 'white' ? 'text-blue-600' : 
                              theme === 'dark' ? 'text-purple-400' : 
                              'text-green-400'
                            }`}>
                              {result.formulas.average} {result.units === 'metric' ? 'kg' : 'lbs'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Recommendation */}
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-blue-50 border border-blue-200' : 
                        theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' :
                        'bg-blue-900/20 border border-blue-700'
                      }`}>
                        <p className={`text-sm ${
                          theme === 'white' ? 'text-blue-800' : 'text-blue-300'
                        }`}>
                          {result.summary.primaryRecommendation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Age-Specific Recommendations */}
                  <Card className={`${
                    theme === 'white' ? 'bg-white border-gray-200' : 
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
                    'bg-gray-900 border-gray-600'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-lg ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Age-Specific Guidance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className={`font-medium ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          {result.ageRecommendations.ageGroup}
                        </p>
                        <p className={`text-sm mt-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {result.ageRecommendations.adjustments}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className={`text-sm font-medium ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Key Considerations:
                        </p>
                        <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {result.ageRecommendations.considerations.map((consideration, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              {consideration}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className={`${
                  theme === 'white' ? 'bg-white border-gray-200' : 
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
                  'bg-gray-900 border-gray-600'
                }`}>
                  <CardContent className="p-8 text-center">
                    <Target className={`h-12 w-12 mx-auto mb-4 ${
                      theme === 'white' ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Enter your details to calculate your ideal weight
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Educational Content */}
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Scientific Foundation */}
            <Card className={`${
              theme === 'white' ? 'bg-white border-gray-200' : 
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
              'bg-gray-900 border-gray-600'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  <Brain className="h-5 w-5" />
                  Scientific Foundation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Multiple Formula Approach
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Our calculator uses four scientifically validated formulas (Hamwi, Robinson, Miller, and Devine) to provide 
                      a comprehensive assessment of your ideal weight, giving you a more accurate picture than single-formula calculators.
                    </p>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Age-Adjusted Recommendations
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Weight recommendations are adjusted based on your age, as metabolic needs and body composition naturally 
                      change throughout life. This provides more personalized and realistic goals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Understanding Your Results */}
            <Card className={`${
              theme === 'white' ? 'bg-white border-gray-200' : 
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
              'bg-gray-900 border-gray-600'
            }`}>
              <CardHeader>
                <button
                  onClick={() => toggleSection('understanding')}
                  className={`flex items-center justify-between w-full text-left ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Understanding Your Results
                  </div>
                  {expandedSections.understanding ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </CardHeader>
              {expandedSections.understanding && (
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Formula Explanations
                      </h4>
                      <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        <li><strong>Hamwi Formula (1964):</strong> Most commonly used by medical professionals, simple and reliable.</li>
                        <li><strong>Robinson Formula (1983):</strong> Updated version of Hamwi with refined calculations.</li>
                        <li><strong>Miller Formula (1983):</strong> Provides conservative estimates, often used in clinical settings.</li>
                        <li><strong>Devine Formula (1974):</strong> Widely used in medical dosing calculations and research.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Important Considerations
                      </h4>
                      <ul className={`space-y-1 text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        <li>• Ideal weight formulas are general guidelines, not absolute targets</li>
                        <li>• Body composition (muscle vs. fat) is more important than total weight</li>
                        <li>• Athletes and very muscular individuals may exceed "ideal" weights healthily</li>
                        <li>• Consult healthcare professionals for personalized weight management advice</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Related Calculators */}
            <Card className={`${
              theme === 'white' ? 'bg-white border-gray-200' : 
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
              'bg-gray-900 border-gray-600'
            }`}>
              <CardHeader>
                <CardTitle className={`${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Related Health Calculators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link 
                    to="/"
                    className={`p-4 rounded-lg border transition-colors ${
                      theme === 'white' ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' : 
                      'bg-blue-900/20 border-blue-800 hover:bg-blue-900/30'
                    }`}
                  >
                    <Calculator className={`h-6 w-6 mb-2 ${
                      theme === 'white' ? 'text-blue-600' : 'text-blue-400'
                    }`} />
                    <h4 className={`font-semibold mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      BMI Calculator
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Calculate your Body Mass Index
                    </p>
                  </Link>

                  <Link 
                    to="/body-fat"
                    className={`p-4 rounded-lg border transition-colors ${
                      theme === 'white' ? 'bg-purple-50 border-purple-200 hover:bg-purple-100' : 
                      'bg-purple-900/20 border-purple-800 hover:bg-purple-900/30'
                    }`}
                  >
                    <User className={`h-6 w-6 mb-2 ${
                      theme === 'white' ? 'text-purple-600' : 'text-purple-400'
                    }`} />
                    <h4 className={`font-semibold mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Body Fat Calculator
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Measure body fat percentage
                    </p>
                  </Link>

                  <Link 
                    to="/calories"
                    className={`p-4 rounded-lg border transition-colors ${
                      theme === 'white' ? 'bg-green-50 border-green-200 hover:bg-green-100' : 
                      'bg-green-900/20 border-green-800 hover:bg-green-900/30'
                    }`}
                  >
                    <Activity className={`h-6 w-6 mb-2 ${
                      theme === 'white' ? 'text-green-600' : 'text-green-400'
                    }`} />
                    <h4 className={`font-semibold mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      TDEE & BMR Calculator
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Calculate daily calorie needs
                    </p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default IdealWeightPage;