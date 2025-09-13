import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, History, Target, Sun, Moon, Ruler, Weight, User, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { useBMI } from '../contexts/BMIContext';
import { useToast } from '../hooks/use-toast';
import BMIResult from '../components/BMIResult';
import Header from '../components/Header';
import { calculateBMI, calculateBodyFat, calculateIdealWeight, getHealthRecommendations } from '../utils/bmiCalculations';

const HomePage = () => {
  const { theme } = useTheme();
  const { units, addBMIRecord } = useBMI();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateResults = async () => {
    if (!formData.weight || !formData.height || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your BMI.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      
      const bmi = calculateBMI(weight, height, units);
      const bodyFat = calculateBodyFat(bmi, age, formData.gender);
      const idealWeight = calculateIdealWeight(height, age, formData.gender, units);
      const recommendations = getHealthRecommendations(bmi, bodyFat, age, formData.gender);
      
      const resultData = {
        bmi,
        bodyFat,
        idealWeight,
        recommendations,
        weight,
        height,
        age,
        gender: formData.gender,
        units,
      };
      
      setResult(resultData);
      addBMIRecord(resultData);
      setLoading(false);
      
      toast({
        title: "BMI Calculated!",
        description: "Your results have been saved to history.",
      });
    }, 800);
  };

  const resetForm = () => {
    setFormData({ weight: '', height: '', age: '', gender: '' });
    setResult(null);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Advanced BMI Calculator
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Calculate your Body Mass Index with advanced health insights, body fat estimation, and personalized recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card className={`backdrop-blur-md border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-white/10 hover:bg-white/15' 
              : 'bg-white/70 hover:bg-white/80'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 text-2xl ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Calculator className="h-6 w-6" />
                BMI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Weight Input */}
              <div className="space-y-2">
                <Label htmlFor="weight" className={`flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <Weight className="h-4 w-4" />
                  Weight ({units === 'metric' ? 'kg' : 'lbs'})
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder={units === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className={`transition-all duration-300 focus:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-white/20 border-white/30 text-white placeholder:text-gray-400' 
                      : 'bg-white/50 border-gray-300'
                  }`}
                />
              </div>

              {/* Height Input */}
              <div className="space-y-2">
                <Label htmlFor="height" className={`flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <Ruler className="h-4 w-4" />
                  Height ({units === 'metric' ? 'cm' : 'inches'})
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder={units === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className={`transition-all duration-300 focus:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-white/20 border-white/30 text-white placeholder:text-gray-400' 
                      : 'bg-white/50 border-gray-300'
                  }`}
                />
              </div>

              {/* Age Input */}
              <div className="space-y-2">
                <Label htmlFor="age" className={`flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <Calendar className="h-4 w-4" />
                  Age (years)
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`transition-all duration-300 focus:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-white/20 border-white/30 text-white placeholder:text-gray-400' 
                      : 'bg-white/50 border-gray-300'
                  }`}
                />
              </div>

              {/* Gender Select */}
              <div className="space-y-2">
                <Label className={`flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <User className="h-4 w-4" />
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-white/20 border-white/30 text-white' 
                      : 'bg-white/50 border-gray-300'
                  }`}>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={calculateResults}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {loading ? 'Calculating...' : 'Calculate BMI'}
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className={`px-6 transform hover:scale-105 transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'border-white/30 text-white hover:bg-white/10' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          {result && <BMIResult result={result} />}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link to="/history" className="group">
            <Card className={`backdrop-blur-md border-0 shadow-xl transform group-hover:scale-105 transition-all duration-300 cursor-pointer ${
              theme === 'dark' 
                ? 'bg-white/10 hover:bg-white/15' 
                : 'bg-white/70 hover:bg-white/80'
            }`}>
              <CardContent className="p-6 text-center">
                <History className={`h-12 w-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  BMI History
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Track your BMI progress over time
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/goals" className="group">
            <Card className={`backdrop-blur-md border-0 shadow-xl transform group-hover:scale-105 transition-all duration-300 cursor-pointer ${
              theme === 'dark' 
                ? 'bg-white/10 hover:bg-white/15' 
                : 'bg-white/70 hover:bg-white/80'
            }`}>
              <CardContent className="p-6 text-center">
                <Target className={`h-12 w-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Health Goals
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Set and track your fitness goals
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-white/10 hover:bg-white/15' 
              : 'bg-white/70 hover:bg-white/80'
          }`}>
            <CardContent className="p-6 text-center">
              <Calculator className={`h-12 w-12 mx-auto mb-4 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Advanced Analytics
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Body fat estimation & health insights
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HomePage;