import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Activity, User, ArrowLeft, Download, X, Info, Heart, Brain, Stethoscope, TrendingUp, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
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
import { formatBSAResults } from '../utils/bsaCalculations';

const BSACalculatorPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    weight: '',
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
      weight: '',
      height: '',
      age: '',
      gender: '',
      units: 'metric'
    });
    setResult(null);
  };

  const calculateBSA = () => {
    if (!formData.weight || !formData.height || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your body surface area.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      
      const results = formatBSAResults(weight, height, age, formData.gender, formData.units);
      setResult(results);
      
      toast({
        title: "BSA Calculated!",
        description: `Your body surface area: ${results.summary.primaryBSA} m² (${results.summary.category})`,
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Normal':
      case 'Normal for Age':
        return theme === 'white' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-green-900/30 text-green-300 border-green-700';
      case 'Small':
      case 'Very Small':
        return theme === 'white' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-blue-900/30 text-blue-300 border-blue-700';
      case 'Large':
      case 'Large for Age':
        return theme === 'white' ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-orange-900/30 text-orange-300 border-orange-700';
      default:
        return theme === 'white' ? 'bg-gray-50 text-gray-800 border-gray-200' : 'bg-gray-900/30 text-gray-300 border-gray-700';
    }
  };

  const seoData = {
    title: "Free Body Surface Area Calculator | BSA Calculator for Medical Use 2025",
    description: "Calculate body surface area (BSA) using multiple medical formulas. Essential for drug dosing, burn assessment, and medical research. Professional BSA calculator with detailed analysis.",
    keywords: "body surface area calculator, BSA calculator, medical BSA, drug dosing calculator, burn assessment, DuBois formula, Mosteller formula, medical calculator",
    canonicalUrl: "https://bmicalculator.dev/body-surface-area"
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className={`min-h-screen transition-all duration-500 ${
        theme === 'white' ? 'bg-gradient-to-br from-teal-50 via-white to-blue-50' :
        theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900' :
        'bg-gradient-to-br from-black via-gray-900 to-teal-900'
      }`}>
        
        <Header />
        
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              to="/"
              className={`inline-flex items-center gap-2 text-sm hover:underline transition-colors ${
                theme === 'white' ? 'text-teal-600 hover:text-teal-800' : 'text-teal-400 hover:text-teal-300'
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
                theme === 'white' ? 'bg-teal-100' : 
                theme === 'dark' ? 'bg-teal-900/30' : 
                'bg-teal-900/30'
              }`}>
                <Activity className={`h-12 w-12 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-teal-400' : 
                  'text-teal-400'
                }`} />
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Body Surface Area Calculator
            </h1>
            
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Calculate BSA using multiple medical formulas. Essential for medication dosing, burn assessment, 
              and clinical research. Used by healthcare professionals worldwide.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                '💊 Medical Drug Dosing',
                '🏥 Clinical Research', 
                '🔬 5 Scientific Formulas',
                '👩‍⚕️ Healthcare Professional'
              ].map((badge, index) => (
                <Badge 
                  key={badge}
                  className={`px-4 py-2 text-sm ${
                    theme === 'white' ? 'bg-teal-50 text-teal-700 border-teal-200' : 
                    theme === 'dark' ? 'bg-teal-900/30 text-teal-300 border-teal-700' :
                    'bg-teal-900/30 text-teal-300 border-teal-700'
                  }`}
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Medical Disclaimer */}
            <div className={`max-w-4xl mx-auto p-4 rounded-lg border mb-8 ${
              theme === 'white' ? 'bg-amber-50 border-amber-200' : 'bg-amber-900/20 border-amber-800'
            }`}>
              <div className="flex items-start gap-3">
                <AlertCircle className={`h-5 w-5 mt-0.5 ${
                  theme === 'white' ? 'text-amber-600' : 'text-amber-400'
                }`} />
                <div>
                  <h3 className={`font-semibold mb-1 ${
                    theme === 'white' ? 'text-amber-800' : 'text-amber-300'
                  }`}>
                    Medical Disclaimer
                  </h3>
                  <p className={`text-sm ${
                    theme === 'white' ? 'text-amber-700' : 'text-amber-400'
                  }`}>
                    This calculator is for educational purposes only. BSA calculations for medical dosing should always 
                    be verified by qualified healthcare professionals. Do not use for actual medication dosing without medical supervision.
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
                      theme === 'white' ? 'text-teal-600' : 
                      theme === 'dark' ? 'text-teal-400' : 
                      'text-teal-400'
                    }`} />
                    Calculate Body Surface Area
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
                    {/* Weight Input */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        Weight {formData.units === 'metric' ? '(kg)' : '(lbs)'}
                      </Label>
                      <Input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        placeholder={formData.units === 'metric' ? '70' : '154'}
                        className={theme === 'white' ? 'border-gray-300' : 'border-gray-600'}
                      />
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
                        Used for age-appropriate normal ranges
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
                      onClick={calculateBSA}
                      disabled={loading}
                      className={`flex-1 h-12 text-lg font-semibold ${
                        theme === 'white' ? 'bg-teal-600 hover:bg-teal-700' :
                        theme === 'dark' ? 'bg-teal-600 hover:bg-teal-700' :
                        'bg-teal-600 hover:bg-teal-700'
                      }`}
                    >
                      {loading ? 'Calculating...' : 'Calculate BSA'}
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
                        Your Body Surface Area
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* BSA Display */}
                      <div className="text-center space-y-2">
                        <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          Average BSA (4 Formulas)
                        </p>
                        <p className={`text-3xl font-bold ${
                          theme === 'white' ? 'text-teal-600' : 
                          theme === 'dark' ? 'text-teal-400' : 
                          'text-teal-400'
                        }`}>
                          {result.summary.primaryBSA} m²
                        </p>
                      </div>

                      {/* Category Status */}
                      <div className={`p-4 rounded-lg border ${getCategoryColor(result.summary.category)}`}>
                        <div className="text-center">
                          <p className="text-sm font-medium opacity-80">Category</p>
                          <p className="text-lg font-bold">{result.summary.category}</p>
                          <p className="text-xs mt-1 opacity-75">Normal Range: {result.summary.normalRange}</p>
                        </div>
                      </div>

                      {/* Formula Results */}
                      <div className="space-y-2">
                        <p className={`text-sm font-medium ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          Formula Results:
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>DuBois (Most Used):</span>
                            <span className={theme === 'white' ? 'text-gray-900' : 'text-white'}>
                              {result.formulas.dubois} m²
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Mosteller (Simple):</span>
                            <span className={theme === 'white' ? 'text-gray-900' : 'text-white'}>
                              {result.formulas.mosteller} m²
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Haycock (Accurate):</span>
                            <span className={theme === 'white' ? 'text-gray-900' : 'text-white'}>
                              {result.formulas.haycock} m²
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>Gehan-George:</span>
                            <span className={theme === 'white' ? 'text-gray-900' : 'text-white'}>
                              {result.formulas.gehanGeorge} m²
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Recommended Formula */}
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-teal-50 border border-teal-200' : 
                        theme === 'dark' ? 'bg-teal-900/20 border border-teal-800' :
                        'bg-teal-900/20 border border-teal-700'
                      }`}>
                        <p className={`text-sm ${
                          theme === 'white' ? 'text-teal-800' : 'text-teal-300'
                        }`}>
                          <strong>Recommended:</strong> {result.summary.recommendedFormula}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Medical Applications */}
                  <Card className={`${
                    theme === 'white' ? 'bg-white border-gray-200' : 
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
                    'bg-gray-900 border-gray-600'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-lg ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Medical Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          🏥 {result.medicalApplications.drugDosing.title}
                        </h4>
                        <p className={`text-xs mt-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {result.medicalApplications.drugDosing.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          🔥 {result.medicalApplications.burnAssessment.title}
                        </h4>
                        <p className={`text-xs mt-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {result.medicalApplications.burnAssessment.description}
                        </p>
                      </div>

                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                          ❤️ Cardiac Index
                        </h4>
                        <p className={`text-xs mt-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          Normal Range: {result.medicalApplications.cardiacIndex.normalRange}
                        </p>
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
                    <Activity className={`h-12 w-12 mx-auto mb-4 ${
                      theme === 'white' ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Enter your details to calculate BSA
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Educational Content */}
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Medical Importance */}
            <Card className={`${
              theme === 'white' ? 'bg-white border-gray-200' : 
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
              'bg-gray-900 border-gray-600'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  <Stethoscope className="h-5 w-5" />
                  Why BSA Matters in Medicine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Drug Dosing Accuracy
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      BSA-based dosing is more accurate than weight-based dosing for many medications, 
                      especially chemotherapy drugs, because it better correlates with metabolic rate and organ function.
                    </p>
                  </div>
                  <div>  
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Clinical Research
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      BSA normalization allows comparison of physiological parameters across different body sizes in research studies, 
                      making results more universally applicable.
                    </p>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Burn Assessment
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      BSA is crucial for calculating burn severity using the Rule of Nines and determining 
                      appropriate fluid resuscitation protocols in burn victims.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formula Comparison */}
            <Card className={`${
              theme === 'white' ? 'bg-white border-gray-200' : 
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
              'bg-gray-900 border-gray-600'
            }`}>
              <CardHeader>
                <button
                  onClick={() => toggleSection('formulas')}
                  className={`flex items-center justify-between w-full text-left ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Formula Comparison & Accuracy
                  </div>
                  {expandedSections.formulas ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </CardHeader>
              {expandedSections.formulas && result && (
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(result.formulaComparison).map(([key, formula]) => (
                      <div key={key} className={`p-4 rounded-lg border ${
                        theme === 'white' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800/50 border-gray-700'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-semibold ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                            {formula.name}
                          </h4>
                          <Badge className={`${
                            theme === 'white' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                            'bg-blue-900/30 text-blue-300 border-blue-600'
                          }`}>
                            {formula.accuracy} accuracy
                          </Badge>
                        </div>
                        <p className={`text-sm mb-2 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <strong>Best for:</strong> {formula.bestFor}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className={`font-medium ${theme === 'white' ? 'text-green-700' : 'text-green-400'}`}>
                              Advantages:
                            </p>
                            <ul className={`list-disc list-inside ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                              {formula.advantages.map((adv, idx) => (
                                <li key={idx}>{adv}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className={`font-medium ${theme === 'white' ? 'text-orange-700' : 'text-orange-400'}`}>
                              Limitations:
                            </p>
                            <ul className={`list-disc list-inside ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                              {formula.limitations.map((lim, idx) => (
                                <li key={idx}>{lim}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Medical Specialties */}
            <Card className={`${
              theme === 'white' ? 'bg-white border-gray-200' : 
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 
              'bg-gray-900 border-gray-600'
            }`}>
              <CardHeader>
                <button
                  onClick={() => toggleSection('specialties')}
                  className={`flex items-center justify-between w-full text-left ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    BSA in Medical Specialties
                  </div>
                  {expandedSections.specialties ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </CardHeader>
              {expandedSections.specialties && result && (
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(result.specialtyApplications).map(([key, specialty]) => (
                      <div key={key}>
                        <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          {specialty.title}
                        </h4>
                        <p className={`text-sm mb-3 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {specialty.description}
                        </p>
                        <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {(specialty.considerations || specialty.advantages || specialty.applications || specialty.uses).map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
                      Calculate Body Mass Index
                    </p>
                  </Link>

                  <Link 
                    to="/ideal-weight"
                    className={`p-4 rounded-lg border transition-colors ${
                      theme === 'white' ? 'bg-green-50 border-green-200 hover:bg-green-100' : 
                      'bg-green-900/20 border-green-800 hover:bg-green-900/30'
                    }`}
                  >
                    <TrendingUp className={`h-6 w-6 mb-2 ${
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

export default BSACalculatorPage;