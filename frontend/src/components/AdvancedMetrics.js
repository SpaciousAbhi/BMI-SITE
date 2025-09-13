import React from 'react';
import { Calculator, TrendingUp, BarChart3, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useTheme } from '../contexts/ThemeContext';

const AdvancedMetrics = ({ result }) => {
  const { theme } = useTheme();
  
  if (!result) return null;

  const { bmi, weight, height, weightUnit, heightUnit } = result;
  
  // Calculate BMI Prime
  const bmiPrime = (bmi / 25).toFixed(2);
  
  // Calculate Ponderal Index
  let weightInKg = weight;
  let heightInM = height;
  
  if (weightUnit === 'lbs') {
    weightInKg = weight * 0.453592;
  }
  
  if (heightUnit === 'cm') {
    heightInM = height / 100;
  } else if (heightUnit === 'inches') {
    heightInM = height * 0.0254;
  } else if (heightUnit === 'feet') {
    heightInM = height * 0.3048;
  }
  
  const ponderalIndex = (weightInKg / Math.pow(heightInM, 3)).toFixed(1);
  
  // Calculate healthy weight range
  const heightInMeters = heightInM;
  const minHealthyWeight = 18.5 * Math.pow(heightInMeters, 2);
  const maxHealthyWeight = 25 * Math.pow(heightInMeters, 2);
  
  // Convert to display units
  const minWeight = weightUnit === 'lbs' ? (minHealthyWeight * 2.20462).toFixed(1) : minHealthyWeight.toFixed(1);
  const maxWeight = weightUnit === 'lbs' ? (maxHealthyWeight * 2.20462).toFixed(1) : maxHealthyWeight.toFixed(1);
  const weightUnitDisplay = weightUnit === 'lbs' ? 'lbs' : 'kg';
  
  // BMI Prime categories
  const getBMIPrimeCategory = (prime) => {
    if (prime < 0.74) return { category: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-500' };
    if (prime >= 0.74 && prime <= 1.0) return { category: 'Normal', color: 'text-green-500', bg: 'bg-green-500' };
    if (prime > 1.0 && prime <= 1.2) return { category: 'Overweight', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    return { category: 'Obese', color: 'text-red-500', bg: 'bg-red-500' };
  };
  
  const bmiPrimeCategory = getBMIPrimeCategory(parseFloat(bmiPrime));
  const bmiPrimeProgress = Math.min((parseFloat(bmiPrime) / 1.6) * 100, 100);
  
  const cardClass = `backdrop-blur-md border-0 shadow-xl ${
    theme === 'dark' 
      ? 'bg-white/10' 
      : 'bg-white/80'
  }`;
  
  const textClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const headingClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className="space-y-6">
      {/* Advanced Metrics Overview */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${headingClass}`}>
            <BarChart3 className="h-5 w-5" />
            Advanced Health Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* BMI Prime */}
            <div className="text-center space-y-3">
              <div className={`text-3xl font-bold ${bmiPrimeCategory.color}`}>
                {bmiPrime}
              </div>
              <div>
                <div className={`text-sm font-medium ${headingClass}`}>BMI Prime</div>
                <Badge variant="outline" className={`${bmiPrimeCategory.bg} text-white border-none mt-1`}>
                  {bmiPrimeCategory.category}
                </Badge>
              </div>
              <Progress 
                value={bmiPrimeProgress} 
                className="h-2"
              />
            </div>
            
            {/* Ponderal Index */}
            <div className="text-center space-y-3">
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                {ponderalIndex}
              </div>
              <div>
                <div className={`text-sm font-medium ${headingClass}`}>Ponderal Index</div>
                <div className={`text-xs ${textClass}`}>kg/m³</div>
              </div>
            </div>
            
            {/* Healthy Weight Range */}
            <div className="text-center space-y-3">
              <div className={`text-lg font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                {minWeight} - {maxWeight}
              </div>
              <div>
                <div className={`text-sm font-medium ${headingClass}`}>Healthy Range</div>
                <div className={`text-xs ${textClass}`}>{weightUnitDisplay}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BMI Prime Explanation */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${headingClass}`}>
            <Target className="h-5 w-5" />
            Understanding BMI Prime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`space-y-4 ${textClass}`}>
            <p>
              <strong>BMI Prime</strong> is the ratio of your actual BMI to the upper limit of the "normal" BMI range (25 kg/m²). 
              It provides a quick assessment of how much your BMI differs from the normal upper limit.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className={`font-semibold mb-2 ${headingClass}`}>BMI Prime Categories:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>< 0.74</span>
                    <Badge variant="outline" className="bg-blue-500 text-white border-none">Underweight</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>0.74 - 1.0</span>
                    <Badge variant="outline" className="bg-green-500 text-white border-none">Normal</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>1.0 - 1.2</span>
                    <Badge variant="outline" className="bg-yellow-500 text-white border-none">Overweight</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>> 1.2</span>
                    <Badge variant="outline" className="bg-red-500 text-white border-none">Obese</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className={`font-semibold mb-2 ${headingClass}`}>Your BMI Prime: {bmiPrime}</h4>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="text-sm">
                    Formula: BMI ÷ 25 = {bmi} ÷ 25 = {bmiPrime}
                  </div>
                  <div className="text-xs mt-2">
                    {parseFloat(bmiPrime) === 1 
                      ? "Your BMI is exactly at the upper normal limit."
                      : parseFloat(bmiPrime) < 1 
                        ? `Your BMI is ${((1 - parseFloat(bmiPrime)) * 100).toFixed(1)}% below the upper normal limit.`
                        : `Your BMI is ${((parseFloat(bmiPrime) - 1) * 100).toFixed(1)}% above the upper normal limit.`
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ponderal Index Explanation */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${headingClass}`}>
            <Calculator className="h-5 w-5" />
            Understanding Ponderal Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`space-y-4 ${textClass}`}>
            <p>
              The <strong>Ponderal Index (PI)</strong> is similar to BMI but uses the cube of height instead of the square. 
              This makes it more reliable for very tall or short individuals, where BMI might give misleading results.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className={`font-semibold mb-2 ${headingClass}`}>Key Differences:</h4>
                <ul className="text-sm space-y-1">
                  <li>• More accurate for extreme heights</li>
                  <li>• Less affected by height variations</li>
                  <li>• Better for athletic populations</li>
                  <li>• Uses cubic scaling vs BMI's square scaling</li>
                </ul>
              </div>
              
              <div>
                <h4 className={`font-semibold mb-2 ${headingClass}`}>Your Ponderal Index: {ponderalIndex}</h4>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="text-sm">
                    Formula: Weight (kg) ÷ Height³ (m)
                  </div>
                  <div className="text-sm mt-1">
                    {weightInKg.toFixed(1)} ÷ {heightInM.toFixed(2)}³ = {ponderalIndex}
                  </div>
                  <div className="text-xs mt-2">
                    Normal PI range: 11-15 kg/m³
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`mt-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'} border-l-4 border-blue-500`}>
              <p className="text-sm">
                <strong>Note:</strong> While BMI is more widely recognized, Ponderal Index can provide additional insights, 
                especially for individuals at the extremes of height or with athletic builds.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedMetrics;