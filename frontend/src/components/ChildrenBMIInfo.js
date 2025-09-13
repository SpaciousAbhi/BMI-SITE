import React, { useState } from 'react';
import { Baby, Users, ChevronDown, ChevronUp, AlertCircle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTheme } from '../contexts/ThemeContext';

const ChildrenBMIInfo = () => {
  const { theme } = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const childrenCategories = [
    { category: 'Underweight', percentile: '< 5%', color: 'bg-blue-500', description: 'Below the 5th percentile' },
    { category: 'Healthy Weight', percentile: '5% - 85%', color: 'bg-green-500', description: '5th to 85th percentile' },
    { category: 'At Risk of Overweight', percentile: '85% - 95%', color: 'bg-yellow-500', description: '85th to 95th percentile' },
    { category: 'Overweight', percentile: '> 95%', color: 'bg-red-500', description: 'Above the 95th percentile' }
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
      {/* Children BMI Overview */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${headingClass}`}>
            <Baby className="h-5 w-5" />
            BMI for Children and Teens (Ages 2-20)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`space-y-4 ${textClass}`}>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'} border-l-4 border-yellow-500`}>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Important Notice</p>
                  <p className="text-sm">
                    This calculator is designed for adults (20+ years). For children and teens (2-20 years), 
                    BMI is interpreted differently using percentiles based on age and gender-specific growth charts.
                  </p>
                </div>
              </div>
            </div>
            
            <p>
              For children and teenagers, BMI is age and sex-specific and is often referred to as BMI-for-age. 
              The CDC uses percentiles to determine if a child or teen is underweight, healthy weight, overweight, or obese.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Children BMI Categories */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${headingClass}`}>
            <Users className="h-5 w-5" />
            CDC BMI Categories for Children and Teens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                  <th className={`text-left py-2 ${headingClass}`}>Category</th>
                  <th className={`text-left py-2 ${headingClass}`}>Percentile Range</th>
                  <th className={`text-left py-2 ${headingClass}`}>Description</th>
                  <th className={`text-left py-2 ${headingClass}`}>Indicator</th>
                </tr>
              </thead>
              <tbody>
                {childrenCategories.map((item, index) => (
                  <tr key={index} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className={`py-3 font-medium ${textClass}`}>{item.category}</td>
                    <td className={`py-3 ${textClass}`}>{item.percentile}</td>
                    <td className={`py-3 ${textClass} text-sm`}>{item.description}</td>
                    <td className="py-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h4 className={`font-semibold mb-2 ${headingClass}`}>Understanding Percentiles</h4>
            <p className={`text-sm ${textClass}`}>
              BMI percentile shows how a child's BMI compares to other children of the same age and sex. 
              For example, if a child has a BMI at the 75th percentile, it means 75% of children of the same age and sex have a lower BMI.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Growth Charts Information */}
      <Card className={cardClass}>
        <CardHeader>
          <Button
            variant="ghost"
            onClick={() => toggleSection('growthCharts')}
            className={`w-full justify-between p-0 h-auto ${headingClass}`}
          >
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-blue-500" />
              CDC Growth Charts & Resources
            </CardTitle>
            {expandedSection === 'growthCharts' ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardHeader>
        {expandedSection === 'growthCharts' && (
          <CardContent>
            <div className={`space-y-4 ${textClass}`}>
              <p>
                The CDC provides official BMI-for-age percentile growth charts that healthcare providers use 
                to assess children's growth patterns and nutritional status.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
                  <h4 className={`font-semibold mb-2 ${headingClass}`}>Boys (2-20 years)</h4>
                  <p className="text-sm mb-3">CDC BMI-for-age percentiles chart for boys</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open('https://www.cdc.gov/growthcharts/data/set1clinical/cj41l023.pdf', '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Boys Chart (PDF)
                  </Button>
                </div>
                
                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
                  <h4 className={`font-semibold mb-2 ${headingClass}`}>Girls (2-20 years)</h4>
                  <p className="text-sm mb-3">CDC BMI-for-age percentiles chart for girls</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open('https://www.cdc.gov/growthcharts/data/set1clinical/cj41l024.pdf', '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Girls Chart (PDF)
                  </Button>
                </div>
              </div>
              
              <div className={`mt-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'} border-l-4 border-blue-500`}>
                <p className="text-sm">
                  <strong>Healthcare Provider Consultation:</strong> Always consult with a pediatrician or healthcare provider 
                  for proper interpretation of a child's BMI percentile and to determine if any intervention is needed.
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Special Considerations */}
      <Card className={cardClass}>
        <CardHeader>
          <Button
            variant="ghost"
            onClick={() => toggleSection('considerations')}
            className={`w-full justify-between p-0 h-auto ${headingClass}`}
          >
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Special Considerations for Children
            </CardTitle>
            {expandedSection === 'considerations' ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardHeader>
        {expandedSection === 'considerations' && (
          <CardContent>
            <div className={`space-y-4 ${textClass}`}>
              <p>
                BMI in children and adolescents has additional factors that make interpretation more complex than in adults:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Baby className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className={`font-medium ${headingClass}`}>Growth and Development</h4>
                    <p className="text-sm">Children grow at different rates, and BMI changes naturally as they develop. What's normal varies significantly by age.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className={`font-medium ${headingClass}`}>Sexual Maturation</h4>
                    <p className="text-sm">Puberty affects body composition, and BMI patterns differ between boys and girls during adolescence.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className={`font-medium ${headingClass}`}>Muscle vs. Fat Mass</h4>
                    <p className="text-sm">BMI may not accurately reflect body composition in very muscular or athletic children and teens.</p>
                  </div>
                </div>
              </div>
              
              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'} border-l-4 border-red-500`}>
                <p className="font-medium mb-2">Professional Assessment Required</p>
                <p className="text-sm">
                  BMI percentiles are screening tools, not diagnostic instruments. A healthcare provider should always 
                  evaluate a child's overall health, growth pattern, family history, and other factors before making any 
                  health determinations or recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChildrenBMIInfo;