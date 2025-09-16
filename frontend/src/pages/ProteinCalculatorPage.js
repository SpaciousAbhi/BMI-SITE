import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Calculator, 
  Dumbbell, 
  Target, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Utensils,
  Zap,
  Award,
  Users,
  Activity,
  User,
  Ruler,
  Calendar
} from 'lucide-react';
import { 
  calculateProteinIntake, 
  getActivityLevels, 
  getGoalTypes, 
  getProteinRecommendations,
  getProteinHealthBenefits
} from '../utils/proteinCalculations';

const ProteinCalculatorPage = () => {
  const { theme, getBackgroundGradient } = useTheme();
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'lbs',
    age: '',
    gender: 'male',
    activityLevel: 'moderately_active',
    goal: 'maintenance'
  });
  const [result, setResult] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateProtein = () => {
    if (!formData.weight || !formData.age) return;

    const proteinResult = calculateProteinIntake(
      parseFloat(formData.weight),
      formData.weightUnit,
      formData.activityLevel,
      formData.goal,
      parseInt(formData.age),
      formData.gender
    );

    setResult(proteinResult);
  };

  const clearForm = () => {
    setFormData({
      weight: '',
      weightUnit: 'lbs',
      age: '',
      gender: 'male',
      activityLevel: 'moderately_active',
      goal: 'maintenance'
    });
    setResult(null);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const proteinScience = [
    {
      title: "Muscle Protein Synthesis & Leucine Threshold",
      icon: <Dumbbell className="h-5 w-5" />,
      content: "Muscle protein synthesis (MPS) is maximally stimulated by approximately 2.5-3g of leucine per meal, typically found in 20-30g of high-quality protein. This threshold effect means that consuming larger amounts of protein in a single meal doesn't proportionally increase MPS, making meal distribution crucial for optimization.",
      keyPoints: [
        "Leucine acts as the primary trigger for muscle protein synthesis",
        "20-30g protein per meal optimally stimulates MPS in most individuals",
        "Protein timing every 3-4 hours maintains elevated amino acid levels",
        "Higher protein needs may require 4-6 meals to optimize distribution"
      ]
    },
    {
      title: "Complete vs Incomplete Proteins & Amino Acid Profiles",
      icon: <Zap className="h-5 w-5" />,
      content: "Complete proteins contain all nine essential amino acids in adequate proportions for human needs. Animal proteins are typically complete, while most plant proteins are incomplete but can be combined strategically. The digestibility score (PDCAAS) ranks protein quality, with whey, casein, and egg proteins scoring highest at 1.0.",
      keyPoints: [
        "Complete proteins support optimal muscle protein synthesis",
        "Plant protein combinations can achieve complete amino acid profiles",
        "Digestibility affects actual protein utilization by the body",
        "Whey protein has the fastest absorption rate (1-2 hours)"
      ]
    },
    {
      title: "Protein Turnover & Nitrogen Balance",
      icon: <Activity className="h-5 w-5" />,
      content: "Protein turnover is the continuous process of muscle protein breakdown (MPB) and synthesis (MPS). Positive protein balance occurs when MPS exceeds MPB, leading to muscle growth. This balance is influenced by exercise, protein intake timing, amino acid availability, and hormonal factors like insulin and IGF-1.",
      keyPoints: [
        "Net protein balance = Muscle Protein Synthesis - Muscle Protein Breakdown",
        "Exercise increases both MPS and MPB, but MPS increases more with adequate protein",
        "Protein intake must match or exceed daily protein breakdown (~1.6g/kg minimum)",
        "Resistance training can keep MPS elevated for 24-48 hours"
      ]
    },
    {
      title: "Individual Variation & Genetic Factors",
      icon: <Users className="h-5 w-5" />,
      content: "Protein needs vary significantly between individuals due to genetics, training status, age, and metabolic health. Genetic polymorphisms affect amino acid metabolism, while training experience influences protein utilization efficiency. Age-related changes in protein synthesis require higher intakes in older adults (1.2-1.6g/kg vs 0.8g/kg for younger adults).",
      keyPoints: [
        "Genetic variations can affect optimal protein intake by 20-30%",
        "Trained individuals may utilize protein more efficiently than untrained",
        "Age-related decrease in MPS sensitivity requires higher protein intake",
        "Gender differences are minimal when adjusted for body weight and muscle mass"
      ]
    }
  ];

  const professionalBadges = [
    { icon: <Calculator className="h-4 w-4" />, text: "Science-Based Calculations" },
    { icon: <Target className="h-4 w-4" />, text: "Goal-Specific Targets" },
    { icon: <Award className="h-4 w-4" />, text: "Professional Grade Analysis" },
    { icon: <Clock className="h-4 w-4" />, text: "Optimal Timing Guidance" }
  ];

  const quickNavigation = [
    { label: 'Protein Science', section: 'science' },
    { label: 'Calculator', section: 'calculator' },
    { label: 'Meal Planning', section: 'meals' },
    { label: 'Expert FAQ', section: 'faq' }
  ];

  const faqData = [
    {
      category: 'Basics',
      question: 'How much protein do I really need per day?',
      answer: 'Protein needs vary based on activity level, goals, age, and body composition. The RDA of 0.8g/kg is sufficient for sedentary individuals to prevent deficiency, but active individuals need 1.2-2.2g/kg for optimal performance and body composition. Athletes and those building muscle may need up to 2.5g/kg during intensive training phases.'
    },
    {
      category: 'Timing',
      question: 'When is the best time to consume protein?',
      answer: 'Protein timing has modest but meaningful effects. The "anabolic window" is wider than once thought (2-4 hours post-workout), but consuming 20-30g protein within 2 hours of training optimizes muscle protein synthesis. More important is total daily intake and spreading protein throughout the day every 3-4 hours to maintain elevated amino acid levels.'
    },
    {
      category: 'Sources',
      question: 'Are plant proteins as good as animal proteins?',
      answer: 'Plant proteins can be just as effective when combined properly to provide complete amino acid profiles. While individual plant proteins may be lower in certain amino acids (especially leucine), combinations like rice+beans or hemp+pea provide complete nutrition. Plant proteins may require slightly higher total intake (10-15% more) due to lower digestibility scores.'
    },
    {
      category: 'Supplements',
      question: 'Do I need protein powder or can I get enough from food?',
      answer: 'Whole foods should be the foundation of protein intake, but supplements offer convenience and cost-effectiveness. Protein powder is particularly useful for post-workout nutrition, meeting high protein targets (>2g/kg), or when whole food options are limited. Whey is fast-absorbing for post-workout, while casein provides sustained amino acid release.'
    },
    {
      category: 'Weight Loss',
      question: 'How does protein help with weight loss?',
      answer: 'Protein supports weight loss through multiple mechanisms: increased satiety (protein is the most satiating macronutrient), higher thermic effect (20-30% of protein calories burned through digestion), and muscle preservation during caloric deficits. Higher protein intakes (1.2-1.6g/kg) during weight loss help maintain metabolic rate and improve body composition.'
    },
    {
      category: 'Muscle Building',
      question: 'How much protein do I need to build muscle?',
      answer: 'Muscle building requires 1.6-2.2g/kg body weight, with some evidence supporting up to 2.5g/kg during intensive training. More protein isn\'t always better - excess protein beyond needs may be converted to glucose or stored as fat. Focus on distributing intake across 4-6 meals with 20-30g per meal for optimal muscle protein synthesis.'
    },
    {
      category: 'Age Factors',
      question: 'Do older adults need more protein?',
      answer: 'Yes, older adults (65+) need higher protein intake (1.2-1.6g/kg) due to anabolic resistance - reduced muscle protein synthesis response to protein intake. This helps combat sarcopenia (age-related muscle loss) and maintain bone health. Older adults should prioritize high-quality, easily digestible proteins and may benefit from leucine-rich sources.'
    },
    {
      category: 'Health Risks',
      question: 'Can too much protein be harmful?',
      answer: 'High protein intakes (up to 2.5g/kg) are generally safe for healthy individuals with normal kidney function. Concerns about kidney damage, bone health, or dehydration from high protein have not been supported by research in healthy populations. However, very high intakes may displace other important nutrients and should be balanced with adequate carbohydrates and fats.'
    },
    {
      category: 'Athletic Performance',
      question: 'How does protein affect athletic performance?',
      answer: 'Protein supports athletic performance by facilitating recovery, maintaining muscle mass during training, and supporting immune function. Endurance athletes need 1.2-1.6g/kg for recovery and glycogen storage, while strength athletes require 1.6-2.2g/kg for muscle building. Protein intake should be periodized with training cycles and increased during high-volume phases.'
    },
    {
      category: 'Special Diets',
      question: 'How do I meet protein needs on a vegetarian or vegan diet?',
      answer: 'Plant-based diets can meet protein needs through strategic food combinations and variety. Focus on legumes, quinoa, hemp seeds, spirulina, and protein-rich vegetables. Combine complementary proteins (beans + rice, hummus + pita) and consider plant protein powders. Vegetarians may need 10-15% more total protein due to lower digestibility, and should monitor B12, iron, and zinc intake.'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Free Protein Calculator - Daily Protein Intake Calculator 2025 | Optimal Protein Needs"
        description="Calculate your optimal daily protein intake based on weight, activity level, and fitness goals. Professional protein calculator with meal planning, timing guidance, and science-based recommendations for muscle building, weight loss, and athletic performance."
        keywords="protein calculator, daily protein intake, protein needs calculator, how much protein, muscle building protein, weight loss protein, athletic protein requirements, protein per day calculator"
        canonical="/protein-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Protein Calculator - Daily Protein Intake Calculator",
          "description": "Professional protein calculator to determine optimal daily protein intake based on individual factors and fitness goals.",
          "url": "https://bmicalculator.com/protein-calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "permissions": "browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Goal-specific protein calculations",
            "Activity level adjustments", 
            "Meal distribution planning",
            "Protein source recommendations",
            "Timing optimization"
          ]
        }}
      />

      <Header />

      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              theme === 'white' ? 'bg-gradient-to-br from-blue-100 to-indigo-100' :
              theme === 'dark' ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50' :
              'bg-gradient-to-br from-emerald-900/50 to-teal-900/50'
            }`}>
              <Dumbbell className={`h-12 w-12 ${
                theme === 'white' ? 'text-blue-600' :
                theme === 'dark' ? 'text-purple-400' :
                'text-emerald-400'
              }`} />
            </div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Professional Protein Calculator
          </h1>

          <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your optimal daily protein intake based on scientific research, activity level, and fitness goals. 
            Get personalized recommendations for muscle building, weight loss, and athletic performance.
          </p>

          {/* Professional Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {professionalBadges.map((badge, index) => (
              <Badge 
                key={index}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  theme === 'white' 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
                }`}
              >
                {badge.icon}
                <span className="ml-2">{badge.text}</span>
              </Badge>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {quickNavigation.map((nav, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => document.getElementById(nav.section)?.scrollIntoView({ behavior: 'smooth' })}
                className={`transition-all duration-300 hover:scale-105 ${
                  theme === 'white'
                    ? 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300'
                    : theme === 'dark'
                    ? 'border-purple-500/30 text-purple-300 hover:bg-purple-900/30 hover:border-purple-400'
                    : 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-400'
                }`}
              >
                {nav.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Protein Science Section */}
        <section id="science" className="mb-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              The Science of Protein Requirements
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Understanding the biochemical foundations of protein metabolism for optimal intake calculations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {proteinScience.map((section, index) => (
              <Card 
                key={index} 
                className={`backdrop-blur-md border-0 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${
                  theme === 'white' 
                    ? 'bg-white/90 hover:bg-white/95' 
                    : theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-purple-500/20'
                    : 'bg-gray-900/90 hover:bg-gray-900/95 border border-emerald-500/20'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      theme === 'white' ? 'bg-blue-100 text-blue-600' :
                      theme === 'dark' ? 'bg-purple-900/50 text-purple-400' :
                      'bg-emerald-900/50 text-emerald-400'
                    }`}>
                      {section.icon}
                    </div>
                    <h3 className={`text-xl font-semibold ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {section.title}
                    </h3>
                  </div>
                  
                  <p className={`text-sm leading-relaxed mb-4 ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {section.content}
                  </p>

                  <div className="space-y-2">
                    {section.keyPoints.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                          theme === 'white' ? 'bg-blue-500' :
                          theme === 'dark' ? 'bg-purple-400' :
                          'bg-emerald-400'
                        }`} />
                        <p className={`text-sm ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Calculator Section */}
        <section id="calculator" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className={`backdrop-blur-md border-0 shadow-2xl ${
              theme === 'white' 
                ? 'bg-white/95' 
                : theme === 'dark'
                ? 'bg-gray-800/95 border border-purple-500/20'
                : 'bg-gray-900/95 border border-emerald-500/20'
            }`}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className={`text-2xl font-bold mb-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Calculate Your Optimal Protein Intake
                  </h2>
                  <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    Enter your details for personalized protein recommendations
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Basic Information
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
                        <Users className="inline h-4 w-4 mr-2" />
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
                  </div>

                  {/* Activity & Goals */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Activity & Goals
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

                    {/* Goal */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <Target className="inline h-4 w-4 mr-2" />
                        Primary Goal
                      </Label>
                      <Select value={formData.goal} onValueChange={(value) => handleInputChange('goal', value)}>
                        <SelectTrigger className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getGoalTypes().map(goal => (
                            <SelectItem key={goal.value} value={goal.value}>
                              {goal.label} - {goal.description}
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
                    onClick={calculateProtein}
                    disabled={!formData.weight || !formData.age}
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'white'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
                    }`}
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Protein Needs
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
                  <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Your Protein Requirements</h3>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <div className="text-2xl font-bold text-blue-600">{result.totalGrams}g</div>
                        <div className="text-sm text-gray-600">Total Daily Protein</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <div className="text-2xl font-bold text-indigo-600">{result.perPound}g</div>
                        <div className="text-sm text-gray-600">Per {formData.weightUnit === 'lbs' ? 'Pound' : 'Kilogram'}</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <div className="text-2xl font-bold text-purple-600">{result.calories}</div>
                        <div className="text-sm text-gray-600">Protein Calories</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-gray-900">Meal Distribution</h4>
                      <p className="text-gray-700">
                        Distribute across {result.meals.meals} meals with approximately {result.meals.perMeal}g per meal for optimal muscle protein synthesis.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900">Recommendations</h4>
                      <ul className="space-y-1">
                        {getProteinRecommendations(result, formData.activityLevel, formData.goal, parseInt(formData.age), formData.gender).slice(0, 3).map((rec, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {rec}
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

        {/* Rest of the component continues... */}
        {/* I'll add the meal planning section and FAQ in the next part */}
      </main>

      <Footer />
    </div>
  );
};

export default ProteinCalculatorPage;