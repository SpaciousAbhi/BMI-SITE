import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, AlertTriangle, Heart, Activity, Brain, Bone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTheme } from '../contexts/ThemeContext';

const BMIInformation = () => {
  const { theme } = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const bmiCategories = [
    { category: 'Severe Thinness', range: '< 16', color: 'bg-red-600', risk: 'High Risk' },
    { category: 'Moderate Thinness', range: '16 - 17', color: 'bg-red-500', risk: 'Moderate Risk' },
    { category: 'Mild Thinness', range: '17 - 18.5', color: 'bg-yellow-500', risk: 'Low Risk' },
    { category: 'Normal', range: '18.5 - 25', color: 'bg-green-500', risk: 'Healthy' },
    { category: 'Overweight', range: '25 - 30', color: 'bg-yellow-500', risk: 'Low Risk' },
    { category: 'Obese Class I', range: '30 - 35', color: 'bg-orange-500', risk: 'Moderate Risk' },
    { category: 'Obese Class II', range: '35 - 40', color: 'bg-red-500', risk: 'High Risk' },
    { category: 'Obese Class III', range: '> 40', color: 'bg-red-600', risk: 'Very High Risk' }
  ];

  const overweightRisks = [
    'High blood pressure',
    'Higher levels of LDL ("bad") cholesterol and lower HDL ("good") cholesterol',
    'Type II diabetes',
    'Coronary heart disease',
    'Stroke',
    'Gallbladder disease',
    'Osteoarthritis (joint cartilage breakdown)',
    'Sleep apnea and breathing problems',
    'Certain cancers (endometrial, breast, colon, kidney, gallbladder, liver)',
    'Low quality of life',
    'Mental health issues (depression, anxiety)',
    'Body pains and physical limitations',
    'Increased risk of mortality'
  ];

  const underweightRisks = [
    'Malnutrition and vitamin deficiencies',
    'Anemia (reduced blood oxygen capacity)',
    'Osteoporosis (bone weakness and fracture risk)',
    'Decreased immune function',
    'Growth and development issues (especially in children)',
    'Reproductive issues in women (hormonal imbalances)',
    'Higher miscarriage risk in first trimester',
    'Surgical complications',
    'Increased mortality risk'
  ];

  const bmiLimitations = [
    'Cannot distinguish between muscle mass and fat mass',
    'Age-related body composition changes not considered',
    'Gender differences in body fat distribution ignored',
    'Ethnic variations in body composition not accounted for',
    'Athletic individuals may be misclassified as overweight',
    'Elderly individuals may appear healthy despite excess fat',
    'Not suitable for children under 2 or pregnant women'
  ];

  const cardClass = `backdrop-blur-md border-0 shadow-xl ${
    theme === 'dark' 
      ? 'bg-white/10' 
      : 'bg-white/80'
  }`;

  const textClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const headingClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className="space-y-6">
      {/* BMI Categories Table */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${headingClass}`}>
            <Info className="h-5 w-5" />
            BMI Categories for Adults (WHO Classification)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                  <th className={`text-left py-2 ${headingClass}`}>Category</th>
                  <th className={`text-left py-2 ${headingClass}`}>BMI Range (kg/m²)</th>
                  <th className={`text-left py-2 ${headingClass}`}>Health Risk</th>
                  <th className={`text-left py-2 ${headingClass}`}>Indicator</th>
                </tr>
              </thead>
              <tbody>
                {bmiCategories.map((item, index) => (
                  <tr key={index} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className={`py-3 font-medium ${textClass}`}>{item.category}</td>
                    <td className={`py-3 ${textClass}`}>{item.range}</td>
                    <td className="py-3">
                      <Badge variant="outline" className={`${item.color} text-white border-none`}>
                        {item.risk}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Health Risks - Overweight */}
      <Card className={cardClass}>
        <CardHeader>
          <Button
            variant="ghost"
            onClick={() => toggleSection('overweight')}
            className={`w-full justify-between p-0 h-auto ${headingClass}`}
          >
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Health Risks Associated with Being Overweight
            </CardTitle>
            {expandedSection === 'overweight' ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardHeader>
        {expandedSection === 'overweight' && (
          <CardContent>
            <p className={`mb-4 ${textClass}`}>
              Being overweight increases the risk of numerous serious diseases and health conditions according to the CDC:
            </p>
            <div className="grid md:grid-cols-2 gap-2">
              {overweightRisks.map((risk, index) => (
                <div key={index} className={`flex items-start gap-2 ${textClass}`}>
                  <Heart className="h-4 w-4 mt-0.5 text-red-500 flex-shrink-0" />
                  <span className="text-sm">{risk}</span>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Health Risks - Underweight */}
      <Card className={cardClass}>
        <CardHeader>
          <Button
            variant="ghost"
            onClick={() => toggleSection('underweight')}
            className={`w-full justify-between p-0 h-auto ${headingClass}`}
          >
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-500" />
              Health Risks Associated with Being Underweight
            </CardTitle>
            {expandedSection === 'underweight' ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardHeader>
        {expandedSection === 'underweight' && (
          <CardContent>
            <p className={`mb-4 ${textClass}`}>
              Being underweight also has associated health risks that should not be overlooked:
            </p>
            <div className="grid md:grid-cols-2 gap-2">
              {underweightRisks.map((risk, index) => (
                <div key={index} className={`flex items-start gap-2 ${textClass}`}>
                  <Bone className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">{risk}</span>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* BMI Introduction */}
      <Card className={cardClass}>
        <CardHeader>
          <Button
            variant="ghost"
            onClick={() => toggleSection('introduction')}
            className={`w-full justify-between p-0 h-auto ${headingClass}`}
          >
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              What is BMI? (Body Mass Index Introduction)
            </CardTitle>
            {expandedSection === 'introduction' ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardHeader>
        {expandedSection === 'introduction' && (
          <CardContent>
            <div className={`space-y-4 ${textClass}`}>
              <p>
                BMI (Body Mass Index) is a measurement of a person's leanness or corpulence based on their height and weight, 
                intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy 
                body weight for their height.
              </p>
              <p>
                The BMI value obtained from the calculation is used to categorize whether a person is underweight, normal weight, 
                overweight, or obese. These ranges vary based on factors such as region and age, and are sometimes further 
                divided into subcategories.
              </p>
              <p>
                While BMI is an imperfect measure of healthy body weight, it serves as a useful indicator of whether additional 
                testing or action is required. Being overweight or underweight can have significant health effects.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* BMI Limitations */}
      <Card className={cardClass}>
        <CardHeader>
          <Button
            variant="ghost"
            onClick={() => toggleSection('limitations')}
            className={`w-full justify-between p-0 h-auto ${headingClass}`}
          >
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Limitations of BMI
            </CardTitle>
            {expandedSection === 'limitations' ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardHeader>
        {expandedSection === 'limitations' && (
          <CardContent>
            <div className={`space-y-4 ${textClass}`}>
              <p>
                Although BMI is widely used and useful for population-level assessments, it has several important limitations 
                when applied to individuals:
              </p>
              <div className="space-y-2">
                {bmiLimitations.map((limitation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm">{limitation}</span>
                  </div>
                ))}
              </div>
              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'} border-l-4 border-yellow-500`}>
                <p className="font-medium mb-2">Important Note:</p>
                <p className="text-sm">
                  BMI is fairly indicative of body fat for 90-95% of the population and can effectively be used along with 
                  other measures to help determine an individual's healthy body weight. Always consult healthcare professionals 
                  for personalized health assessments.
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* BMI Formula */}
      <Card className={cardClass}>
        <CardHeader>
          <Button
            variant="ghost"
            onClick={() => toggleSection('formula')}
            className={`w-full justify-between p-0 h-auto ${headingClass}`}
          >
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              BMI Calculation Formula
            </CardTitle>
            {expandedSection === 'formula' ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardHeader>
        {expandedSection === 'formula' && (
          <CardContent>
            <div className={`space-y-6 ${textClass}`}>
              <div>
                <h4 className={`font-semibold mb-3 ${headingClass}`}>Metric Units (kg, cm):</h4>
                <div className={`p-4 rounded-lg font-mono text-center text-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  BMI = weight (kg) ÷ [height (m)]²
                </div>
                <p className="text-sm mt-2">Example: 70 kg ÷ (1.75 m)² = 22.9 kg/m²</p>
              </div>
              
              <div>
                <h4 className={`font-semibold mb-3 ${headingClass}`}>Imperial Units (lbs, inches):</h4>
                <div className={`p-4 rounded-lg font-mono text-center text-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  BMI = 703 × weight (lbs) ÷ [height (inches)]²
                </div>
                <p className="text-sm mt-2">Example: 703 × 154 lbs ÷ (69 inches)² = 22.7 kg/m²</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default BMIInformation;