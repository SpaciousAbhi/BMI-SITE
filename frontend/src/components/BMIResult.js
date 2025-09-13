import React from 'react';
import { TrendingUp, TrendingDown, Target, Heart, Activity, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useTheme } from '../contexts/ThemeContext';
import { getBMICategory, formatWeight, formatHeight } from '../utils/bmiCalculations';

const BMIResult = ({ result }) => {
  const { theme } = useTheme();
  const { bmi, bodyFat, idealWeight, recommendations, weight, height, gender, weightUnit, heightUnit } = result;
  const category = getBMICategory(bmi);

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'nutrition': return <Target className="h-4 w-4" />;
      case 'exercise': return <Activity className="h-4 w-4" />;
      case 'lifestyle': return <Heart className="h-4 w-4" />;
      case 'health': return <Zap className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className={`backdrop-blur-md border-0 shadow-2xl animate-slide-in ${
      theme === 'dark' 
        ? 'bg-white/10' 
        : 'bg-white/70'
    }`}>
      <CardHeader>
        <CardTitle className={`text-2xl ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Your BMI Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* BMI Score */}
        <div className="text-center space-y-4">
          <div className={`text-6xl font-bold ${category.color}`}>
            {bmi}
          </div>
          <Badge className={`${category.bgColor} ${category.color} border-0 px-4 py-2 text-lg`}>
            {category.category}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Body Fat
            </div>
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {bodyFat}%
            </div>
          </div>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Ideal Weight
            </div>
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {formatWeight(idealWeight, units)}
            </div>
          </div>
        </div>

        {/* Weight Comparison */}
        <div className="space-y-2">
          <div className={`flex justify-between text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>Current vs Ideal Weight</span>
            <span>{weight > idealWeight ? 'Above' : weight < idealWeight ? 'Below' : 'At'} ideal</span>
          </div>
          <div className="flex items-center gap-2">
            {weight > idealWeight ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : weight < idealWeight ? (
              <TrendingDown className="h-4 w-4 text-blue-500" />
            ) : (
              <Target className="h-4 w-4 text-green-500" />
            )}
            <Progress 
              value={Math.min((weight / idealWeight) * 100, 100)} 
              className="flex-1"
            />
            <span className={`text-sm font-medium ${
              weight > idealWeight ? 'text-red-500' : 
              weight < idealWeight ? 'text-blue-500' : 'text-green-500'
            }`}>
              {Math.abs(weight - idealWeight).toFixed(1)} {units === 'metric' ? 'kg' : 'lbs'}
            </span>
          </div>
        </div>

        {/* Health Recommendations */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Personalized Recommendations
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(rec.priority)} ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {getRecommendationIcon(rec.type)}
                  <div className="flex-1">
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {rec.title}
                    </h4>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {rec.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {rec.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
            <strong>Summary:</strong> Your BMI of {bmi} indicates {category.category.toLowerCase()}. 
            {bmi < 18.5 && " Consider consulting with a healthcare provider about healthy weight gain strategies."}
            {bmi >= 18.5 && bmi < 25 && " You're in a healthy weight range. Keep up your current lifestyle!"}
            {bmi >= 25 && bmi < 30 && " Consider lifestyle changes to reach a healthy weight range."}
            {bmi >= 30 && " We recommend consulting with a healthcare provider for a personalized weight management plan."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMIResult;