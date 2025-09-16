import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Weight, User, Target, ArrowLeft, Download, X, Info, Heart, Brain, Activity, TrendingUp, ChevronDown, ChevronUp, Scale, Users, AlertCircle, CheckCircle, Star, Zap } from 'lucide-react';
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

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-purple-900';
      default:
        return 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
    }
  };

  // World-Class Educational Content
  const idealWeightScience = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Scientific Foundation of Ideal Weight",
      description: "Ideal weight formulas are based on population studies correlating height with optimal health outcomes and longevity.",
      details: "Modern ideal weight calculations emerged from insurance actuarial tables in the early 1900s, refined through decades of epidemiological research. These formulas consider the statistical relationship between height, weight, and mortality rates across diverse populations, providing evidence-based targets for optimal health."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health Optimization vs Appearance",
      description: "Ideal weight prioritizes health outcomes including cardiovascular fitness, metabolic efficiency, and longevity over aesthetic preferences.",
      details: "Research consistently shows that weights within the ideal range correlate with reduced risk of cardiovascular disease, type 2 diabetes, and overall mortality. These ranges account for essential organ function, optimal blood pressure, and metabolic efficiency rather than cultural beauty standards."
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Individual Variation and Body Composition",
      description: "Ideal weight provides a baseline, but individual factors like muscle mass, bone density, and genetics create healthy variation.",
      details: "Athletes may exceed ideal weight due to muscle mass while maintaining excellent health. Conversely, individuals with low muscle mass might fall within ideal ranges but lack optimal body composition. The ideal weight should be considered alongside body fat percentage, muscle mass, and overall fitness levels."
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Age-Related Metabolic Changes",
      description: "Ideal weight ranges naturally shift with age due to changes in metabolism, hormone levels, and body composition.",
      details: "After age 30, metabolism typically decreases 1-2% per decade, and muscle mass declines 3-8% per decade. Research suggests slightly higher weights may be protective for older adults, supporting bone health and providing reserves during illness. Age-adjusted ideal weights reflect these physiological changes."
    }
  ];

  const formulaComparison = [
    {
      name: "Hamwi Formula (1964)",
      description: "Most widely used formula in clinical practice, especially for medication dosing.",
      formula: "Men: 106 + 6×(height in inches - 60), Women: 100 + 5×(height in inches - 60)",
      accuracy: "±10-15%",
      advantages: ["Simple calculation", "Widely validated", "Used in medical settings", "Good for average body types"],
      limitations: ["Doesn't account for age", "Less accurate for very tall/short people", "Ignores body composition", "Fixed gender differential"],
      bestFor: "General population, medical dosing calculations, initial assessment"
    },
    {
      name: "Robinson Formula (1983)",
      description: "Refinement of Hamwi formula with adjusted coefficients based on modern population data.",
      formula: "Men: 52 + 1.9×(height in cm - 152.4), Women: 49 + 1.7×(height in cm - 152.4)",
      accuracy: "±8-12%",
      advantages: ["Updated coefficients", "Better for taller individuals", "Metric system friendly", "Improved accuracy"],
      limitations: ["Still doesn't consider age", "Fixed gender differential", "Limited validation in diverse populations"],
      bestFor: "Taller individuals, international use, updated clinical practice"
    },
    {
      name: "Miller Formula (1983)",
      description: "Alternative to Hamwi with different height-weight relationships, used in pharmaceutical calculations.",
      formula: "Men: 56.2 + 1.41×(height in cm - 152.4), Women: 53.1 + 1.36×(height in cm - 152.4)",
      accuracy: "±8-12%",
      advantages: ["Pharmaceutical industry standard", "Good for drug dosing", "Considers height variations", "Well-documented"],
      limitations: ["Limited population validation", "Doesn't account for ethnicity", "Fixed age assumption"],
      bestFor: "Pharmaceutical dosing, clinical research, specific medical applications"
    },
    {
      name: "Devine Formula (1974)",
      description: "Developed specifically for creatinine clearance estimation, widely used in nephrology.",
      formula: "Men: 50 + 2.3×(height in inches - 60), Women: 45.5 + 2.3×(height in inches - 60)",
      accuracy: "±10-15%",
      advantages: ["Medical validation", "Renal function applications", "Simple calculation", "Established clinical use"],
      limitations: ["Primarily for medical use", "May overestimate for general population", "Limited age considerations"],
      bestFor: "Medical calculations, renal function assessment, clinical dosing"
    }
  ];

  const healthImplications = [
    {
      category: "Cardiovascular Health",
      lowRisk: "Within 10% of ideal weight",
      moderateRisk: "10-20% above ideal weight", 
      highRisk: "20%+ above ideal weight",
      description: "Weight significantly impacts cardiovascular disease risk through blood pressure, cholesterol, and cardiac workload.",
      details: "Excess weight increases blood volume, forcing the heart to work harder. Each pound of excess weight requires an additional mile of blood vessels. Research shows that maintaining weight within 10% of ideal reduces cardiovascular disease risk by up to 35%."
    },
    {
      category: "Metabolic Health",
      lowRisk: "Within ideal weight range",
      moderateRisk: "10-25% above ideal weight",
      highRisk: "25%+ above ideal weight",
      description: "Ideal weight correlates strongly with insulin sensitivity and metabolic syndrome prevention.",
      details: "Excess adipose tissue, particularly visceral fat, produces inflammatory cytokines that interfere with insulin action. Maintaining ideal weight helps preserve insulin sensitivity, reducing type 2 diabetes risk by up to 58% compared to significant overweight."
    },
    {
      category: "Longevity and Mortality",
      lowRisk: "Within ideal weight range",
      moderateRisk: "Significantly under or 15-30% over ideal",
      highRisk: "Extreme under/overweight (BMI <18.5 or >35)",
      description: "Research consistently shows optimal longevity occurs within ideal weight ranges, with increased mortality at extremes.",
      details: "Large-scale studies following millions of people for decades show U-shaped mortality curves, with lowest death rates in ideal weight ranges. Both significant underweight and obesity increase mortality risk through various mechanisms."
    },
    {
      category: "Joint and Bone Health",
      lowRisk: "Within ideal weight range",
      moderateRisk: "10-20% above ideal weight",
      highRisk: "20%+ above ideal weight",
      description: "Excess weight creates mechanical stress on joints while adequate weight supports bone density.",
      details: "Each pound of excess weight creates 4 pounds of additional pressure on knee joints during walking. However, some weight is necessary for bone health through mechanical loading. The ideal range balances joint protection with bone density maintenance."
    }
  ];

  const ageSpecificConsiderations = [
    {
      ageGroup: "18-30 years",
      adjustments: "Standard ideal weight ranges apply",
      considerations: "Peak metabolic efficiency, muscle building potential",
      healthFocus: "Establishing healthy habits, optimizing body composition",
      notes: "Young adults should focus on achieving and maintaining ideal weight through balanced nutrition and regular exercise. This is the optimal time for building lean muscle mass."
    },
    {
      ageGroup: "30-50 years",
      adjustments: "May add 5-10 lbs to account for metabolic changes",
      considerations: "Declining metabolism, hormone changes, lifestyle factors",
      healthFocus: "Preventing metabolic disease, maintaining muscle mass",
      notes: "Slight increases in ideal weight may be appropriate as metabolism slows. Focus shifts to preventing chronic disease and maintaining active lifestyle."
    },
    {
      ageGroup: "50-65 years",
      adjustments: "May add 10-15 lbs, especially post-menopause",
      considerations: "Hormonal changes, muscle mass decline, medication effects",
      healthFocus: "Bone health, cardiovascular disease prevention",
      notes: "Postmenopausal women and older men may benefit from slightly higher weights for bone protection and metabolic health. Muscle mass preservation becomes critical."
    },
    {
      ageGroup: "65+ years",
      adjustments: "May add 15-20 lbs for health protection",
      considerations: "Frailty prevention, immune system support, recovery reserves",
      healthFocus: "Maintaining independence, preventing falls, adequate nutrition",
      notes: "Research suggests slightly higher weights may be protective for seniors, providing reserves during illness and supporting bone health. Quality of life and function matter more than strict weight targets."
    }
  ];

  const bodyTypeConsiderations = [
    {
      type: "Ectomorph (Naturally Thin)",
      characteristics: "Fast metabolism, difficulty gaining weight, lean build",
      idealWeightAdjustment: "May target lower end of ideal range or slightly below",
      healthConsiderations: "Focus on adequate nutrition, muscle building, bone health",
      recommendations: "Strength training to build muscle mass, adequate caloric intake, monitor for underweight health risks"
    },
    {
      type: "Mesomorph (Athletic Build)",
      characteristics: "Muscular, athletic build, gains muscle easily",
      idealWeightAdjustment: "May exceed ideal weight due to muscle mass",
      healthConsiderations: "Consider body composition over pure weight",
      recommendations: "Focus on body fat percentage rather than weight, maintain active lifestyle, monitor cardiovascular health"
    },
    {
      type: "Endomorph (Larger Frame)",
      characteristics: "Slower metabolism, tendency to store fat, larger bone structure",
      idealWeightAdjustment: "May target higher end of ideal range",
      healthConsiderations: "Focus on metabolic health, sustainable weight management",
      recommendations: "Emphasis on portion control, regular exercise, metabolic health markers over strict weight targets"
    }
  ];

  const culturalEthnicConsiderations = [
    {
      population: "Asian Populations",
      adjustments: "BMI cutoffs 2-3 points lower than Western standards",
      reasonsGa: "Higher body fat percentage at lower BMI, increased diabetes risk",
      recommendations: "Consider lower ideal weight targets, focus on abdominal circumference",
      research: "WHO recommends BMI action points of 23 (overweight) and 25 (obese) for Asian populations"
    },
    {
      population: "African American",
      adjustments: "May target higher end of range due to bone density",
      reasons: "Higher bone mineral density, different body composition",
      recommendations: "Consider bone density in weight targets, focus on cardiovascular health",
      research: "Studies show higher bone density may warrant slightly higher weight targets for optimal health"
    },
    {
      population: "Hispanic/Latino",
      adjustments: "Consider genetic predisposition to diabetes",
      reasons: "Higher risk for metabolic syndrome at lower weights",
      recommendations: "Focus on waist circumference, metabolic health markers",
      research: "Increased insulin resistance risk requires attention to central adiposity even at ideal weights"
    }
  ];

  const expertFAQ = [
    {
      question: "What's the difference between ideal weight and healthy weight range?",
      answer: "Ideal weight provides a specific target based on height and gender, while healthy weight range (typically BMI 18.5-24.9) offers broader guidelines. Ideal weight is more precise but less flexible than healthy ranges. Both are tools to guide health decisions, with ideal weight being more specific for medical and fitness applications.",
      category: "Definitions"
    },
    {
      question: "Why do different ideal weight formulas give different results?",
      answer: "Each formula was developed for different populations and purposes. Hamwi (1964) used insurance data, Robinson (1983) updated coefficients for modern populations, Miller (1983) focused on pharmaceutical applications, and Devine (1974) targeted medical calculations. Differences of 5-15 pounds between formulas are normal and reflect different methodological approaches.",
      category: "Calculations"
    },
    {
      question: "Should athletes use ideal weight calculations?",
      answer: "Athletes often exceed ideal weight due to muscle mass while maintaining excellent health. For athletes, body composition (body fat percentage) is more relevant than weight. Endurance athletes may target lower weights for performance, while strength athletes may exceed ideal weight significantly. Focus should be on performance, health markers, and body composition rather than strict weight targets.",
      category: "Athletic Considerations"
    },
    {
      question: "How does age affect ideal weight targets?",
      answer: "Research suggests slightly higher weights may be healthier as we age. After 65, being 10-20 pounds above traditional ideal weight may be protective, providing reserves during illness and supporting bone health. The 'obesity paradox' shows that mild overweight in seniors correlates with better outcomes. Age-adjusted targets account for metabolic changes and health priorities.",
      category: "Age Factors"
    },
    {
      question: "Is it unhealthy to be significantly below ideal weight?",
      answer: "Yes, being significantly underweight (15+ pounds below ideal weight) can pose health risks including weakened immune system, bone loss, hormonal disruption, and increased mortality risk. Causes may include inadequate nutrition, medical conditions, or eating disorders. Gradual, healthy weight gain through proper nutrition and strength training is recommended.",
      category: "Health Risks"
    },
    {
      question: "How accurate are ideal weight calculations for very tall or short people?",
      answer: "Ideal weight formulas become less accurate at height extremes (under 5'0\" or over 6'6\"). They were developed based on average-height populations. Very tall people may need to target higher weights, while very short people may need adjustments. Body composition, health markers, and individual factors become more important than formula results at height extremes.",
      category: "Accuracy Limitations"
    },
    {
      question: "Do ideal weight formulas work for all ethnicities?",
      answer: "Standard formulas were developed primarily on Western populations and may not apply universally. Asian populations typically have higher body fat at lower weights, warranting lower targets. African Americans may have higher bone density supporting slightly higher weights. Cultural dietary patterns and genetic factors should be considered alongside formula results.",
      category: "Ethnic Considerations"
    },
    {
      question: "Should I lose weight if I'm above my ideal weight?",
      answer: "Not necessarily. Consider your overall health, body composition, fitness level, and medical history. If you're active, have good health markers, and feel well, being 10-15 pounds above ideal weight may not require intervention. Consult healthcare providers for personalized advice. Gradual, sustainable changes are always preferred over rapid weight loss.",
      category: "Weight Management"
    },
    {
      question: "How often should I reassess my ideal weight?",
      answer: "Ideal weight targets should be reassessed during major life changes: significant aging (every 10-15 years), major health changes, pregnancy, menopause, or significant lifestyle changes. However, the formula results themselves don't change frequently. Focus on trends in health markers rather than frequent recalculation.",
      category: "Monitoring"
    },
    {
      question: "What if my ideal weight seems unrealistic or unhealthy for me?",
      answer: "Ideal weight formulas provide population-based estimates, not individual prescriptions. If targets seem unrealistic, focus on improving health markers: blood pressure, cholesterol, fitness level, and energy. A 5-10% weight loss from current weight often provides significant health benefits regardless of ideal weight targets. Individual health always trumps formula results.",
      category: "Personalization"
    },
    {
      question: "Do medications affect ideal weight targets?",
      answer: "Yes, many medications can affect weight and metabolism. Antidepressants, steroids, diabetes medications, and blood pressure drugs can cause weight gain. Conversely, some medications may cause weight loss. Discuss with healthcare providers how medications might affect your weight targets and whether adjustments to ideal weight goals are appropriate.",
      category: "Medical Factors"
    },
    {
      question: "How does ideal weight relate to body fat percentage?",
      answer: "Ideal weight and healthy body fat percentage are related but measure different things. You can be at ideal weight with poor body composition (high fat, low muscle) or above ideal weight with excellent composition (high muscle, low fat). For comprehensive health assessment, consider both metrics along with fitness level and health markers.",
      category: "Body Composition"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Free Ideal Weight Calculator 2025 - Scientific Healthy Weight Calculator & Complete Guide"
        description="Professional ideal weight calculator using 4 scientific formulas (Hamwi, Robinson, Miller, Devine). Calculate your perfect weight with comprehensive guide covering age adjustments, health implications, body type considerations, and expert analysis. Free healthy weight calculator with personalized recommendations."
        keywords="ideal weight calculator, healthy weight calculator, perfect weight calculator, ideal body weight, healthy weight range, scientific weight calculator, Hamwi formula, Robinson formula, Miller formula, Devine formula, weight calculator for height, optimal weight calculator, healthy BMI calculator, ideal weight for men, ideal weight for women, age adjusted weight calculator, body weight calculator, healthy weight guide, weight loss goals, weight management calculator"
        canonical="/ideal-weight"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebApplication", "MedicalWebPage"],
          "name": "Professional Ideal Weight Calculator & Complete Healthy Weight Guide",
          "description": "Comprehensive ideal weight calculator using 4 scientific formulas with complete guide covering age adjustments, health implications, and personalized weight recommendations.",
          "url": "https://bmicalculator.com/ideal-weight",
          "applicationCategory": "HealthApplication",
          "medicalAudience": {
            "@type": "MedicalAudience",
            "audienceType": ["General public", "Healthcare providers", "Fitness professionals", "Nutritionists", "Weight management professionals"]
          },
          "about": {
            "@type": "MedicalCondition",
            "name": "Ideal Weight Calculation and Healthy Weight Management"
          },
          "featureList": [
            "4 scientific ideal weight formulas (Hamwi, Robinson, Miller, Devine)",
            "Age-adjusted weight recommendations",
            "Health implications analysis",
            "Body type considerations",
            "Cultural and ethnic adjustments",
            "Comprehensive weight science education",
            "Expert FAQ with 12 detailed questions",
            "Personalized weight management guidance"
          ],
          "isPartOf": {
            "@type": "WebApplication", 
            "name": "Professional BMI Calculator Suite",
            "url": "https://bmicalculator.com"
          }
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className={`inline-flex items-center gap-2 text-sm font-medium transition-colors hover:scale-105 ${
            theme === 'white' ? 'text-blue-600 hover:text-blue-700' : 
            theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 
            'text-green-400 hover:text-green-300'
          }`}>
            <ArrowLeft className="h-4 w-4" />
            Back to BMI Calculator
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Professional Ideal Weight Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-blue-400 to-purple-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
            'bg-gradient-to-r from-green-400 to-blue-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>Complete Ideal Weight Calculator & Scientific Guide</strong> - Professional healthy weight analysis using 4 scientific formulas with comprehensive educational resources covering age adjustments, health implications, body type considerations, and personalized weight management strategies.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">4 Scientific Formulas</Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">Age-Adjusted</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">Health Analysis</Badge>
            <Badge className="bg-pink-100 text-pink-800 px-4 py-2">Expert Guide</Badge>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-12 max-w-6xl mx-auto">
          <Card className={`backdrop-blur-md border-0 shadow-lg ${
            theme === 'white' 
              ? 'bg-white/80' 
              : theme === 'dark'
              ? 'bg-gray-800/80'
              : 'bg-black/80'
          }`}>
            <CardContent className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Complete Ideal Weight Analysis Guide
              </h2>
              <div className="grid md:grid-cols-5 gap-4">
                <Link to="#calculator" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-blue-50 hover:bg-blue-100 text-blue-700' : 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-300'}`}>
                  <Calculator className="h-6 w-6 mx-auto mb-2" />
                  Calculator
                </Link>
                <Link to="#science" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-purple-50 hover:bg-purple-100 text-purple-700' : 'bg-purple-900/20 hover:bg-purple-900/30 text-purple-300'}`}>
                  <Brain className="h-6 w-6 mx-auto mb-2" />
                  Weight Science
                </Link>
                <Link to="#formulas" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-green-50 hover:bg-green-100 text-green-700' : 'bg-green-900/20 hover:bg-green-900/30 text-green-300'}`}>
                  <Target className="h-6 w-6 mx-auto mb-2" />
                  Formulas
                </Link>
                <Link to="#health" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-pink-50 hover:bg-pink-100 text-pink-700' : 'bg-pink-900/20 hover:bg-pink-900/30 text-pink-300'}`}>
                  <Heart className="h-6 w-6 mx-auto mb-2" />
                  Health Guide
                </Link>
                <Link to="#faq" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-orange-50 hover:bg-orange-100 text-orange-700' : 'bg-orange-900/20 hover:bg-orange-900/30 text-orange-300'}`}>
                  <Info className="h-6 w-6 mx-auto mb-2" />
                  Expert FAQ
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Calculator Form */}
          <div id="calculator" className="lg:col-span-1">
            <Card className={`backdrop-blur-md border-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 glass-effect animate-scale-in ${
              theme === 'white' 
                ? 'bg-white/80 hover:bg-white/90 border-blue-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 hover:bg-gray-800/90 border-purple-500/20'
                : 'bg-black/80 hover:bg-gray-900/50 border-green-500/20'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  <Target className={`h-6 w-6 transition-colors duration-500 ${
                    theme === 'white' ? 'text-blue-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Ideal Weight Calculator
                </CardTitle>
                <Badge className={`w-fit ${
                  theme === 'white' ? 'bg-blue-100 text-blue-800' :
                  theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
                  'bg-green-900/50 text-green-200'
                }`}>
                  4 Scientific Formulas
                </Badge>
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
                      onClick={() => handleInputChange('units', 'metric')}
                      className={`transition-all duration-300 hover:scale-105 ${
                        formData.units === 'metric'
                          ? theme === 'white' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : theme === 'dark'
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-green-600 text-white border-green-600'
                          : theme === 'white' 
                          ? 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50' 
                          : theme === 'dark'
                          ? 'bg-gray-700 text-purple-300 border-purple-500/50 hover:bg-purple-900/20'
                          : 'bg-gray-800 text-green-300 border-green-500/50 hover:bg-green-900/20'
                      }`}
                    >
                      Metric (kg, cm)
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleInputChange('units', 'imperial')}
                      className={`transition-all duration-300 hover:scale-105 ${
                        formData.units === 'imperial'
                          ? theme === 'white' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : theme === 'dark'
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-green-600 text-white border-green-600'
                          : theme === 'white' 
                          ? 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50' 
                          : theme === 'dark'
                          ? 'bg-gray-700 text-purple-300 border-purple-500/50 hover:bg-purple-900/20'
                          : 'bg-gray-800 text-green-300 border-green-500/50 hover:bg-green-900/20'
                      }`}
                    >
                      Imperial (lbs, ft/in)
                    </Button>
                  </div>
                </div>

                {/* Gender Select */}
                <div className="space-y-3">
                  <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    <User className={`h-4 w-4 ${
                      theme === 'white' ? 'text-blue-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Gender *
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-blue-200' 
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
                        ? 'bg-white/70 border-blue-200 focus:border-blue-400 focus:ring-blue-400/20' 
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
                    <Weight className={`h-4 w-4 ${
                      theme === 'white' ? 'text-blue-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    Height *
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder={formData.units === 'metric' ? 'Height in cm (e.g., 175)' : 'Height in inches (e.g., 69)'}
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-blue-200 focus:border-blue-400 focus:ring-blue-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                </div>

                {/* Current Weight Input */}
                <div className="space-y-3">
                  <Label htmlFor="currentWeight" className={`font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Current Weight *
                  </Label>
                  <Input
                    id="currentWeight"
                    type="number" 
                    step="0.1"
                    placeholder={formData.units === 'metric' ? 'Weight in kg (e.g., 70)' : 'Weight in lbs (e.g., 154)'}
                    value={formData.currentWeight}
                    onChange={(e) => handleInputChange('currentWeight', e.target.value)}
                    className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-blue-200 focus:border-blue-400 focus:ring-blue-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={calculateIdealWeight}
                    disabled={loading}
                    className={`flex-1 h-12 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg' 
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                        : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Calculating...
                      </div>
                    ) : (
                      'Calculate Ideal Weight'
                    )}
                  </Button>
                  
                  <Button
                    onClick={clearForm}
                    variant="outline"
                    className={`h-12 px-4 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'border-blue-300 text-blue-600 hover:bg-blue-50' 
                        : theme === 'dark'
                        ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/20'
                        : 'border-green-500/50 text-green-300 hover:bg-green-900/20'
                    }`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              <>
                {/* Main Results Card */}
                <Card className={`backdrop-blur-md border-0 shadow-xl animate-fade-in ${
                  theme === 'white' 
                    ? 'bg-white/80 border-blue-200/20' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80 border-purple-500/20'
                    : 'bg-black/80 border-green-500/20'
                }`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Your Ideal Weight Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Primary Result */}
                    <div className="text-center space-y-4">
                      <div className={`text-4xl font-bold transition-colors duration-500 ${
                        theme === 'white' ? 'text-blue-600' : 
                        theme === 'dark' ? 'text-purple-400' : 
                        'text-green-400'
                      }`}>
                        {result.summary.idealWeightRange}
                      </div>
                      <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Your Ideal Weight Range
                      </p>
                      
                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(result.summary.status)}`}>
                        {result.summary.status === 'Within Healthy Range' ? 
                          <CheckCircle className="h-4 w-4" /> : 
                          <AlertCircle className="h-4 w-4" />
                        }
                        <span className="font-medium">{result.summary.status}</span>
                      </div>
                    </div>

                    {/* Formula Results */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(result.formulas || {}).map(([formulaName, value]) => (
                        <div key={formulaName} className={`p-4 rounded-lg border ${
                          theme === 'white' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800/50 border-gray-700'
                        }`}>
                          <div className={`text-sm font-medium ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                            {formulaName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className={`text-xl font-bold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Health Recommendations */}
                    {result.recommendations && (
                      <div className={`p-4 rounded-lg border ${
                        theme === 'white' ? 'bg-blue-50 border-blue-200' : 'bg-blue-900/20 border-blue-800'
                      }`}>
                        <h4 className={`font-semibold mb-2 ${
                          theme === 'white' ? 'text-blue-800' : 'text-blue-300'
                        }`}>
                          Personalized Recommendations
                        </h4>
                        <div className={`text-sm space-y-1 ${
                          theme === 'white' ? 'text-blue-700' : 'text-blue-200'
                        }`}>
                          {result.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Star className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className={`backdrop-blur-md border-0 shadow-xl ${
                theme === 'white' 
                  ? 'bg-white/80 border-blue-200/20' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80 border-purple-500/20'
                  : 'bg-black/80 border-green-500/20'
              }`}>
                <CardContent className="p-12 text-center">
                  <Target className={`h-16 w-16 mx-auto mb-4 ${
                    theme === 'white' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    Calculate Your Ideal Weight
                  </h3>
                  <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Enter your details to get a comprehensive ideal weight analysis using 4 scientific formulas
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content Sections */}
        <div className="max-w-6xl mx-auto mt-16 space-y-12">
          {/* Ideal Weight Science */}
          <section id="science" className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                The Science of Ideal Weight
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Understanding the scientific foundation behind ideal weight calculations and their health implications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {idealWeightScience.map((section, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === 'white' 
                    ? 'bg-white/80 hover:bg-white/90' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80 hover:bg-gray-800/90'
                    : 'bg-black/80 hover:bg-gray-900/50'
                }`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        theme === 'white' ? 'bg-blue-100' : 
                        theme === 'dark' ? 'bg-purple-900/30' : 
                        'bg-green-900/30'
                      }`}>
                        <div className={`${
                          theme === 'white' ? 'text-blue-600' : 
                          theme === 'dark' ? 'text-purple-400' : 
                          'text-green-400'
                        }`}>
                          {section.icon}
                        </div>
                      </div>
                      <CardTitle className={`${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {section.description}
                    </p>
                    <details className="group">
                      <summary className={`cursor-pointer font-medium ${
                        theme === 'white' ? 'text-blue-600 hover:text-blue-700' : 'text-purple-400 hover:text-purple-300'
                      }`}>
                        Learn more about the science
                      </summary>
                      <p className={`mt-3 text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {section.details}
                      </p>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Formula Comparison */}
          <section id="formulas" className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Scientific Formula Comparison
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Detailed analysis of the 4 major ideal weight formulas used by medical professionals worldwide
              </p>
            </div>

            <div className="grid gap-6">
              {formulaComparison.map((formula, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                  theme === 'white' 
                    ? 'bg-white/80' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80'
                    : 'bg-black/80'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className={`text-xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                          {formula.name}
                        </CardTitle>
                        <p className={`mt-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                          {formula.description}
                        </p>
                      </div>
                      <Badge className={`${
                        theme === 'white' ? 'bg-green-100 text-green-800 border-green-200' : 
                        'bg-green-900/30 text-green-300 border-green-700'
                      }`}>
                        {formula.accuracy} accuracy
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-gray-50' : 'bg-gray-800/50'
                    }`}>
                      <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Formula:
                      </h4>
                      <code className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                        {formula.formula}
                      </code>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-green-700' : 'text-green-400'}`}>
                          Advantages:
                        </h4>
                        <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {formula.advantages.map((adv, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0 text-green-500" />
                              {adv}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-orange-700' : 'text-orange-400'}`}>
                          Limitations:
                        </h4>
                        <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {formula.limitations.map((lim, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <AlertCircle className="h-3 w-3 mt-1 flex-shrink-0 text-orange-500" />
                              {lim}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-blue-700' : 'text-blue-400'}`}>
                          Best For:
                        </h4>
                        <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {formula.bestFor}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Health Implications */}
          <section id="health" className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Health Implications of Weight
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Understanding how your weight relative to ideal weight affects different aspects of your health
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {healthImplications.map((category, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                  theme === 'white' 
                    ? 'bg-white/80' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80'
                    : 'bg-black/80'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      {category.category}
                    </CardTitle>
                    <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {category.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg border ${
                        theme === 'white' ? 'bg-green-50 border-green-200' : 'bg-green-900/20 border-green-800'
                      }`}>
                        <div className={`text-sm font-medium ${
                          theme === 'white' ? 'text-green-800' : 'text-green-300'
                        }`}>
                          Low Risk: {category.lowRisk}
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg border ${
                        theme === 'white' ? 'bg-yellow-50 border-yellow-200' : 'bg-yellow-900/20 border-yellow-800'
                      }`}>
                        <div className={`text-sm font-medium ${
                          theme === 'white' ? 'text-yellow-800' : 'text-yellow-300'
                        }`}>
                          Moderate Risk: {category.moderateRisk}
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg border ${
                        theme === 'white' ? 'bg-red-50 border-red-200' : 'bg-red-900/20 border-red-800'
                      }`}>
                        <div className={`text-sm font-medium ${
                          theme === 'white' ? 'text-red-800' : 'text-red-300'
                        }`}>
                          High Risk: {category.highRisk}
                        </div>
                      </div>
                    </div>

                    <details className="group">
                      <summary className={`cursor-pointer font-medium ${
                        theme === 'white' ? 'text-blue-600 hover:text-blue-700' : 'text-purple-400 hover:text-purple-300'
                      }`}>
                        Learn more about the health impacts
                      </summary>
                      <p className={`mt-3 text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {category.details}
                      </p>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Age Considerations */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Age-Specific Weight Considerations
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                How ideal weight targets naturally adjust throughout different life stages
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {ageSpecificConsiderations.map((age, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                  theme === 'white' 
                    ? 'bg-white/80' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80'
                    : 'bg-black/80'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      {age.ageGroup}
                    </CardTitle>
                    <Badge className={`w-fit ${
                      theme === 'white' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/30 text-blue-300'
                    }`}>
                      {age.adjustments}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className={`font-medium ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Key Considerations:
                      </h4>
                      <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {age.considerations}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-medium ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Health Focus:
                      </h4>
                      <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {age.healthFocus}
                      </p>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-purple-50' : 'bg-purple-900/20'
                    }`}>
                      <p className={`text-sm ${theme === 'white' ? 'text-purple-700' : 'text-purple-300'}`}>
                        <strong>Expert Note:</strong> {age.notes}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Expert FAQ */}
          <section id="faq" className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Expert FAQ: Ideal Weight
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Comprehensive answers to the most common questions about ideal weight calculations and health implications
              </p>
            </div>

            <div className="space-y-4">
              {/* FAQ Categories */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[...new Set(expertFAQ.map(faq => faq.category))].map((category) => (
                  <Badge key={category} className={`px-4 py-2 ${
                    theme === 'white' ? 'bg-gray-100 text-gray-800' : 'bg-gray-800 text-gray-300'
                  }`}>
                    {category}
                  </Badge>
                ))}
              </div>

              {expertFAQ.map((faq, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                  theme === 'white' 
                    ? 'bg-white/80' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80'
                    : 'bg-black/80'
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className={`text-lg ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {faq.question}
                      </CardTitle>
                      <Badge className={`ml-4 flex-shrink-0 ${
                        theme === 'white' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/30 text-blue-300'
                      }`}>
                        {faq.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Related Calculators */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Related Health Calculators
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Comprehensive health assessment tools to complement your ideal weight calculation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                to="/"
                className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  theme === 'white' ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' : 
                  'bg-blue-900/20 border-blue-800 hover:bg-blue-900/30'
                }`}
              >
                <Calculator className={`h-8 w-8 mb-3 ${
                  theme === 'white' ? 'text-blue-600' : 'text-blue-400'
                }`} />
                <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  BMI Calculator
                </h4>
                <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Calculate your Body Mass Index and compare with ideal weight results
                </p>
              </Link>

              <Link 
                to="/body-fat"
                className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  theme === 'white' ? 'bg-green-50 border-green-200 hover:bg-green-100' : 
                  'bg-green-900/20 border-green-800 hover:bg-green-900/30'
                }`}
              >
                <User className={`h-8 w-8 mb-3 ${
                  theme === 'white' ? 'text-green-600' : 'text-green-400'
                }`} />
                <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Body Fat Calculator
                </h4>
                <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Analyze body composition alongside ideal weight for complete assessment
                </p>
              </Link>

              <Link 
                to="/waist-height-ratio"
                className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  theme === 'white' ? 'bg-purple-50 border-purple-200 hover:bg-purple-100' : 
                  'bg-purple-900/20 border-purple-800 hover:bg-purple-900/30'
                }`}
              >
                <Activity className={`h-8 w-8 mb-3 ${
                  theme === 'white' ? 'text-purple-600' : 'text-purple-400'
                }`} />
                <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Waist-Height Ratio
                </h4>
                <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Assess health risks more accurately than BMI or weight alone
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IdealWeightPage;