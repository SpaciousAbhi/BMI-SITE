import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Ruler, User, Target, ArrowLeft, Download, X, Info, Heart, Activity, TrendingUp, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
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
import { formatWaistHeightResults } from '../utils/waistHeightCalculations';

const WaistHeightRatioPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    waist: '',
    height: '',
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
      waist: '',
      height: '',
      age: '',
      gender: '',
      units: 'metric'
    });
    setResult(null);
  };

  const calculateRatio = () => {
    if (!formData.waist || !formData.height || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your waist-to-height ratio.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const waist = parseFloat(formData.waist);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      
      const results = formatWaistHeightResults(waist, height, age, formData.gender, formData.units);
      setResult(results);
      
      toast({
        title: "Ratio Calculated!",
        description: `Your waist-to-height ratio: ${results.ratio} (${results.category.category})`,
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

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Very Low':
        return theme === 'white' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-green-900/30 text-green-300 border-green-700';
      case 'Low':
        return theme === 'white' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-blue-900/30 text-blue-300 border-blue-700';
      case 'Moderate':
        return theme === 'white' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 'bg-yellow-900/30 text-yellow-300 border-yellow-700';
      case 'High':
        return theme === 'white' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-red-900/30 text-red-300 border-red-700';
      default:
        return theme === 'white' ? 'bg-gray-50 text-gray-800 border-gray-200' : 'bg-gray-900/30 text-gray-300 border-gray-700';
    }
  };

  const seoData = {
    title: "Free Waist-to-Height Ratio Calculator | Better Than BMI 2025",
    description: "Calculate your waist-to-height ratio - more accurate than BMI for predicting health risks. Get personalized cardiovascular disease and diabetes risk assessment with expert recommendations.",
    keywords: "waist to height ratio calculator, waist height ratio, WHR calculator, better than BMI, cardiovascular risk assessment, abdominal obesity calculator, central obesity",
    canonicalUrl: "https://bmicalculator.dev/waist-height-ratio"
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className={`min-h-screen transition-all duration-500 ${
        theme === 'white' ? 'bg-gradient-to-br from-orange-50 via-white to-red-50' :
        theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900' :
        'bg-gradient-to-br from-black via-gray-900 to-red-900'
      }`}>
        
        <Header />
        
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              to="/"
              className={`inline-flex items-center gap-2 text-sm hover:underline transition-colors ${
                theme === 'white' ? 'text-orange-600 hover:text-orange-800' : 'text-orange-400 hover:text-orange-300'
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
                theme === 'white' ? 'bg-orange-100' : 
                theme === 'dark' ? 'bg-orange-900/30' : 
                'bg-orange-900/30'
              }`}>
                <Ruler className={`h-12 w-12 ${
                  theme === 'white' ? 'text-orange-600' : 
                  theme === 'dark' ? 'text-orange-400' : 
                  'text-orange-400'
                }`} />
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Waist-to-Height Ratio Calculator
            </h1>
            
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              More accurate than BMI for predicting cardiovascular disease and diabetes risk. 
              Get your personalized health assessment based on the latest scientific research.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                '🎯 More Accurate Than BMI',
                '❤️ Cardiovascular Risk Assessment', 
                '🩺 Medical Grade Analysis',
                '📈 Age-Adjusted Results'
              ].map((badge, index) => (
                <Badge 
                  key={badge}
                  className={`px-4 py-2 text-sm ${
                    theme === 'white' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                    theme === 'dark' ? 'bg-orange-900/30 text-orange-300 border-orange-700' :
                    'bg-orange-900/30 text-orange-300 border-orange-700'
                  }`}
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Why Better Than BMI Alert */}
            <div className={`max-w-4xl mx-auto p-4 rounded-lg border mb-8 ${
              theme === 'white' ? 'bg-blue-50 border-blue-200' : 'bg-blue-900/20 border-blue-800'
            }`}>
              <div className="flex items-start gap-3">
                <Info className={`h-5 w-5 mt-0.5 ${
                  theme === 'white' ? 'text-blue-600' : 'text-blue-400'
                }`} />
                <div>
                  <h3 className={`font-semibold mb-1 ${
                    theme === 'white' ? 'text-blue-800' : 'text-blue-300'
                  }`}>
                    Why Waist-to-Height Ratio is Better Than BMI
                  </h3>
                  <p className={`text-sm ${
                    theme === 'white' ? 'text-blue-700' : 'text-blue-400'
                  }`}>
                    Recent studies show waist-to-height ratio is 30% more accurate than BMI for predicting cardiovascular disease, 
                    diabetes, and metabolic syndrome. It measures dangerous abdominal fat that BMI cannot detect.
                  </p>
                </div>
              </div>
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
                      theme === 'white' ? 'text-orange-600' : 
                      theme === 'dark' ? 'text-orange-400' : 
                      'text-orange-400'
                    }`} />
                    Calculate Your Waist-to-Height Ratio
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
                        <SelectItem value="metric">Metric (cm)</SelectItem>
                        <SelectItem value="imperial">Imperial (inches)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Waist Input */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        Waist Circumference {formData.units === 'metric' ? '(cm)' : '(inches)'}
                      </Label>
                      <Input
                        type="number"
                        value={formData.waist}
                        onChange={(e) => handleInputChange('waist', e.target.value)}
                        placeholder={formData.units === 'metric' ? '80' : '32'}
                        className={theme === 'white' ? 'border-gray-300' : 'border-gray-600'}
                      />
                      <p className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Measure at the narrowest part of your torso
                      </p>
                    </div>

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
                      <p className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Used for age-adjusted risk assessment
                      </p>
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
                      onClick={calculateRatio}
                      disabled={loading}
                      className={`flex-1 h-12 text-lg font-semibold ${
                        theme === 'white' ? 'bg-orange-600 hover:bg-orange-700' :
                        theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700' :
                        'bg-orange-600 hover:bg-orange-700'
                      }`}
                    >
                      {loading ? 'Calculating...' : 'Calculate Ratio'}
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
                        Your Risk Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Ratio Display */}
                      <div className="text-center space-y-2">
                        <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          Waist-to-Height Ratio
                        </p>
                        <p className={`text-3xl font-bold ${
                          theme === 'white' ? 'text-orange-600' : 
                          theme === 'dark' ? 'text-orange-400' : 
                          'text-orange-400'
                        }`}>
                          {result.ratio}
                        </p>
                      </div>

                      {/* Risk Status */}
                      <div className={`p-4 rounded-lg border ${getRiskColor(result.category.risk)}`}>
                        <div className="text-center">
                          <p className="text-sm font-medium opacity-80">Health Risk Level</p>
                          <p className="text-lg font-bold">{result.category.risk}</p>
                          <p className="text-xs mt-1 opacity-75">{result.category.category}</p>
                        </div>
                      </div>

                      {/* Target Recommendation */}
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-blue-50 border border-blue-200' : 
                        theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' :
                        'bg-blue-900/20 border border-blue-700'
                      }`}>
                        <p className={`text-sm ${
                          theme === 'white' ? 'text-blue-800' : 'text-blue-300'
                        }`}>
                          <strong>Target:</strong> {result.summary.targetMessage}
                        </p>
                      </div>

                      {/* Health Implications */}
                      <div className="space-y-2">
                        <p className={`text-sm font-medium ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Health Risk Assessment:
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Cardiovascular:</span>
                            <span className={`font-medium ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                              {result.healthImplications.cardiovascularRisk.split(' (')[0]}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Diabetes:</span>
                            <span className={`font-medium ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                              {result.healthImplications.diabetesRisk.split(' (')[0]}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Metabolic:</span>
                            <span className={`font-medium ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                              {result.healthImplications.metabolicRisk}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card className={`${
                    theme === 'white' ? 'bg-white border-gray-200' : 
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
                    'bg-gray-900 border-gray-600'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-lg ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Personalized Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {result.recommendations.slice(0, 4).map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-orange-400 mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                      {result.recommendations.length > 4 && (
                        <button
                          onClick={() => toggleSection('allRecommendations')}
                          className={`mt-3 text-sm font-medium ${
                            theme === 'white' ? 'text-orange-600 hover:text-orange-700' : 'text-orange-400 hover:text-orange-300'
                          }`}
                        >
                          {expandedSections.allRecommendations ? 'Show Less' : `Show All ${result.recommendations.length} Recommendations`}
                        </button>
                      )}
                      {expandedSections.allRecommendations && (
                        <ul className={`mt-3 space-y-2 text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {result.recommendations.slice(4).map((rec, index) => (
                            <li key={index + 4} className="flex items-start gap-2">
                              <span className="text-orange-400 mt-1">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      )}
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
                    <Ruler className={`h-12 w-12 mx-auto mb-4 ${
                      theme === 'white' ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Enter your measurements to assess health risks
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Educational Content */}
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Scientific Evidence */}
            <Card className={`${
              theme === 'white' ? 'bg-white border-gray-200' : 
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
              'bg-gray-900 border-gray-600'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  <Heart className="h-5 w-5" />
                  Scientific Evidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Why Waist-to-Height Ratio Matters
                    </h4>
                    <p className={`text-sm mb-3 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Research published in PLOS ONE (2013) analyzing 300,000+ adults found waist-to-height ratio 
                      was superior to BMI for predicting cardiovascular disease, diabetes, and early death across all age groups.
                    </p>
                    <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      <li>• 30% more accurate than BMI for health risks</li>
                      <li>• Better predictor of visceral (dangerous) fat</li>
                      <li>• Works across all ethnic groups</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      The 0.5 Rule
                    </h4>
                    <p className={`text-sm mb-3 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      The simple rule: keep your waist circumference less than half your height. 
                      This easy-to-remember guideline is supported by extensive research and used by health professionals worldwide.
                    </p>
                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-orange-50 border border-orange-200' : 'bg-orange-900/20 border border-orange-700'
                    }`}>
                      <p className={`text-sm font-medium ${
                        theme === 'white' ? 'text-orange-800' : 'text-orange-300'
                      }`}>
                        Ratio &lt; 0.5 = Healthy • Ratio ≥ 0.5 = Increased Risk
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Measurement Guide */}
            <Card className={`${
              theme === 'white' ? 'bg-white border-gray-200' : 
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
              'bg-gray-900 border-gray-600'
            }`}>
              <CardHeader>
                <button
                  onClick={() => toggleSection('measurement')}
                  className={`flex items-center justify-between w-full text-left ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    How to Measure Your Waist Correctly
                  </div>
                  {expandedSections.measurement ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </CardHeader>
              {expandedSections.measurement && (
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        When to Measure
                      </h4>
                      <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {result?.measurementTips.when.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Where to Measure
                      </h4>
                      <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {result?.measurementTips.where.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        How to Measure
                      </h4>
                      <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {result?.measurementTips.how.slice(0, 4).map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
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
                      Compare with traditional BMI
                    </p>
                  </Link>

                  <Link 
                    to="/ideal-weight"
                    className={`p-4 rounded-lg border transition-colors ${
                      theme === 'white' ? 'bg-green-50 border-green-200 hover:bg-green-100' : 
                      'bg-green-900/20 border-green-800 hover:bg-green-900/30'
                    }`}
                  >
                    <Target className={`h-6 w-6 mb-2 ${
                      theme === 'white' ? 'text-green-600' : 'text-green-400'
                    }`} />
                    <h4 className={`font-semibold mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Ideal Weight Calculator
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Find your healthy weight range
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
                      Measure body composition
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

export default WaistHeightRatioPage;