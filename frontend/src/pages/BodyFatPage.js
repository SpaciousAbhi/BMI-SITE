import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Ruler, User, Target, ArrowLeft, Download, X } from 'lucide-react';
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
  calculateBodyFatUSNavy, 
  getBodyFatCategory, 
  getBodyFatRecommendations,
  convertMeasurements 
} from '../utils/bodyFatCalculations';

const BodyFatPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    waist: '',
    neck: '',
    hip: '',
    height: '',
    age: '',
    gender: '',
    units: 'inches' // inches or cm
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      waist: '',
      neck: '',
      hip: '',
      height: '',
      age: '',
      gender: '',
      units: formData.units,
    });
    setResult(null);
  };

  const calculateBodyFat = async () => {
    // Validation
    const { waist, neck, height, age, gender } = formData;
    const hip = formData.hip || 0;
    
    if (!waist || !neck || !height || !age || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (gender === 'female' && !hip) {
      toast({
        title: "Missing Hip Measurement",
        description: "Hip measurement is required for females.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      try {
        const measurements = {
          waist: parseFloat(waist),
          neck: parseFloat(neck),
          hip: parseFloat(hip),
          height: parseFloat(height)
        };

        const bodyFat = calculateBodyFatUSNavy(measurements, gender);
        const category = getBodyFatCategory(bodyFat, gender);
        const recommendations = getBodyFatRecommendations(bodyFat, gender, parseInt(age));
        
        const resultData = {
          bodyFat,
          category,
          recommendations,
          measurements,
          age: parseInt(age),
          gender,
          units: formData.units
        };
        
        setResult(resultData);
        setLoading(false);
        
        toast({
          title: "Body Fat Calculated!",
          description: `Your body fat percentage is ${bodyFat}%`,
        });
      } catch (error) {
        setLoading(false);
        toast({
          title: "Calculation Error",
          description: "Please check your measurements and try again.",
          variant: "destructive",
        });
      }
    }, 800);
  };

  const getPlaceholder = (field) => {
    const unit = formData.units;
    const placeholders = {
      waist: unit === 'inches' ? 'e.g., 32 inches' : 'e.g., 81 cm',
      neck: unit === 'inches' ? 'e.g., 15 inches' : 'e.g., 38 cm',
      hip: unit === 'inches' ? 'e.g., 38 inches' : 'e.g., 97 cm',
      height: unit === 'inches' ? 'e.g., 70 inches' : 'e.g., 178 cm'
    };
    return placeholders[field];
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
    }
  };

  const getAccentColor = () => {
    return theme === 'white' ? 'teal' : theme === 'dark' ? 'purple' : 'green';
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className={`inline-flex items-center gap-2 text-sm font-medium transition-colors hover:scale-105 ${
            theme === 'white' ? 'text-teal-600 hover:text-teal-700' : 
            theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 
            'text-green-400 hover:text-green-300'
          }`}>
            <ArrowLeft className="h-4 w-4" />
            Back to BMI Calculator
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Body Fat Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
            'bg-gradient-to-r from-green-400 to-emerald-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your body fat percentage using the US Navy method with waist, neck, and hip measurements.
          </p>
          
          {/* Method Badge */}
          <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
            theme === 'white' ? 'bg-teal-100 text-teal-800' :
            theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
            'bg-green-900/50 text-green-200'
          }`}>
            US Navy Method - No Equipment Required
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card className={`backdrop-blur-md border-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 glass-effect animate-scale-in ${
            theme === 'white' 
              ? 'bg-white/80 hover:bg-white/90 border-teal-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 hover:bg-gray-800/90 border-purple-500/20'
              : 'bg-black/80 hover:bg-gray-900/50 border-green-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <Target className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                Body Fat Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Units Selection */}
              <div className="space-y-3">
                <Label className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Measurement Units
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    onClick={() => handleInputChange('units', 'inches')}
                    className={`transition-all duration-300 hover:scale-105 ${
                      formData.units === 'inches'
                        ? theme === 'white' 
                          ? 'bg-teal-600 text-white border-teal-600' 
                          : theme === 'dark'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-green-600 text-white border-green-600'
                        : theme === 'white' 
                        ? 'bg-white text-teal-600 border-teal-300 hover:bg-teal-50' 
                        : theme === 'dark'
                        ? 'bg-gray-700 text-purple-300 border-purple-500/50 hover:bg-purple-900/20'
                        : 'bg-gray-800 text-green-300 border-green-500/50 hover:bg-green-900/20'
                    }`}
                  >
                    Inches
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleInputChange('units', 'cm')}
                    className={`transition-all duration-300 hover:scale-105 ${
                      formData.units === 'cm'
                        ? theme === 'white' 
                          ? 'bg-teal-600 text-white border-teal-600' 
                          : theme === 'dark'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-green-600 text-white border-green-600'
                        : theme === 'white' 
                        ? 'bg-white text-teal-600 border-teal-300 hover:bg-teal-50' 
                        : theme === 'dark'
                        ? 'bg-gray-700 text-purple-300 border-purple-500/50 hover:bg-purple-900/20'
                        : 'bg-gray-800 text-green-300 border-green-500/50 hover:bg-green-900/20'
                    }`}
                  >
                    Centimeters
                  </Button>
                </div>
              </div>

              {/* Gender Select */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <User className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Gender *
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
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

              {/* Age Input */}
              <div className="space-y-3">
                <Label htmlFor="age" className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Age *
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Height Input */}
              <div className="space-y-3">
                <Label htmlFor="height" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Ruler className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Height *
                </Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  placeholder={getPlaceholder('height')}
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Waist Input */}
              <div className="space-y-3">
                <Label htmlFor="waist" className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Waist * (at narrowest point)
                </Label>
                <Input
                  id="waist"
                  type="number"
                  step="0.1"
                  placeholder={getPlaceholder('waist')}
                  value={formData.waist}
                  onChange={(e) => handleInputChange('waist', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Neck Input */}
              <div className="space-y-3">
                <Label htmlFor="neck" className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Neck * (below Adam's apple)
                </Label>
                <Input
                  id="neck"
                  type="number"
                  step="0.1"
                  placeholder={getPlaceholder('neck')}
                  value={formData.neck}
                  onChange={(e) => handleInputChange('neck', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
              </div>

              {/* Hip Input (for females) */}
              {formData.gender === 'female' && (
                <div className="space-y-3">
                  <Label htmlFor="hip" className={`font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Hip * (at widest point)
                  </Label>
                  <Input
                    id="hip"
                    type="number"
                    step="0.1"
                    placeholder={getPlaceholder('hip')}
                    value={formData.hip}
                    onChange={(e) => handleInputChange('hip', e.target.value)}
                    className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={calculateBodyFat}
                  disabled={loading}
                  className={`transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl'
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
                      Calculate
                    </>
                  )}
                </Button>
                <Button
                  onClick={clearForm}
                  variant="outline"
                  className={`transition-all duration-300 hover:scale-105 ${
                    theme === 'white'
                      ? 'border-teal-300 text-teal-700 hover:bg-teal-50'
                      : theme === 'dark'
                      ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/20'
                      : 'border-green-500/50 text-green-300 hover:bg-green-900/20'
                  }`}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          {result && (
            <div className="space-y-6">
              <Card className={`backdrop-blur-md border-0 shadow-2xl animate-fade-in ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    Your Body Fat Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Body Fat Percentage */}
                  <div className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${
                      theme === 'white' ? result.category.color : 'text-white'
                    }`}>
                      {result.bodyFat}%
                    </div>
                    <Badge className={`text-lg px-4 py-2 ${result.category.bgColor} ${result.category.color}`}>
                      {result.category.category}
                    </Badge>
                    <p className={`mt-2 text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {result.category.description}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Recommendations
                    </h3>
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                      }`}>
                        <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                          {rec.title}
                        </h4>
                        <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                          {rec.description}
                        </p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {rec.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* PDF Download Button */}
                  <Button 
                    className={`w-full ${
                      theme === 'white'
                        ? 'bg-teal-600 hover:bg-teal-700'
                        : theme === 'dark'
                        ? 'bg-purple-600 hover:bg-purple-700'  
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    onClick={() => toast({ title: "PDF Generation", description: "Body Fat PDF report feature coming soon!" })}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BodyFatPage;