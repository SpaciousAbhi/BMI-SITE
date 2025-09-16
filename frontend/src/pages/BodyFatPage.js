import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Ruler, User, Target, ArrowLeft, Download, X, Heart, Brain, Zap, Scale, ChevronDown, ChevronRight, Info, AlertCircle, CheckCircle, Activity, TrendingUp } from 'lucide-react';
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
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedMethod, setSelectedMethod] = useState('us-navy');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  const bodyFatScience = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Essential vs Storage Fat",
      description: "Essential fat is necessary for basic physical and physiological health. Men require 2-5% essential fat, women require 10-13% due to reproductive functions.",
      details: "Essential fat is found in nerve tissue, bone marrow, and organs. It's critical for hormone production, temperature regulation, and vitamin absorption. Storage fat accumulates in adipose tissue and provides energy reserves and insulation."
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Hormonal Impact",
      description: "Body fat percentage directly influences hormone production including testosterone, estrogen, leptin, and insulin sensitivity.",
      details: "Too low body fat (men <3%, women <12%) can suppress reproductive hormones and thyroid function. Optimal ranges support hormone balance: men 10-18%, women 16-24% for general health."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Metabolic Function",
      description: "Adipose tissue is metabolically active, producing hormones like leptin that regulate hunger and energy expenditure.",
      details: "Brown fat burns calories for heat production. Visceral fat releases inflammatory cytokines. Subcutaneous fat provides insulation and energy storage. The ratio and distribution matter more than total percentage."
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Health Risk Correlation",
      description: "Body fat distribution and percentage correlate with cardiovascular disease, diabetes, and metabolic syndrome risk.",
      details: "Visceral fat (around organs) poses higher health risks than subcutaneous fat. Android distribution (apple shape) increases disease risk more than gynoid distribution (pear shape)."
    }
  ];

  const measurementMethods = [
    {
      method: "US Navy Method",
      accuracy: "±3-4%",
      description: "Uses circumference measurements (waist, neck, hip for women) to estimate body fat percentage.",
      pros: ["No equipment needed", "Quick and easy", "Validated for military use", "Works for most body types"],
      cons: ["Less accurate for very lean individuals", "Doesn't account for muscle distribution", "Can be affected by measurement technique"],
      formula: "Based on statistical correlations between circumferences and DEXA scan results"
    },
    {
      method: "DEXA Scan",
      accuracy: "±1-2%",
      description: "Dual-energy X-ray absorptiometry - the gold standard for body composition analysis.",
      pros: ["Most accurate available", "Shows fat distribution", "Measures bone density", "Differentiates muscle mass"],
      cons: ["Expensive ($100-300)", "Requires medical facility", "Small radiation exposure", "Not widely available"],
      formula: "Direct measurement of tissue densities using X-ray attenuation"
    },
    {
      method: "Hydrostatic Weighing",
      accuracy: "±2-3%",
      description: "Underwater weighing based on body density and Archimedes' principle.",
      pros: ["Highly accurate", "Research standard", "Accounts for air in lungs", "Well-validated"],
      cons: ["Requires full submersion", "Time-consuming", "Uncomfortable for some", "Limited availability"],
      formula: "Body density = Mass / (Mass underwater / Water density)"
    },
    {
      method: "Skinfold Calipers",
      accuracy: "±3-5%",
      description: "Measures subcutaneous fat thickness at specific body sites using precision calipers.",
      pros: ["Inexpensive", "Portable", "Good for tracking changes", "Multiple site options"],
      cons: ["Technique dependent", "Doesn't measure visceral fat", "Less accurate for obese individuals", "Requires skill"],
      formula: "Sum of skinfolds converted using population-specific equations"
    },
    {
      method: "Bioelectrical Impedance",
      accuracy: "±4-6%",
      description: "Electrical current passes through body; fat has higher resistance than muscle tissue.",
      pros: ["Quick and easy", "Inexpensive devices available", "Shows trends well", "Non-invasive"],
      cons: ["Affected by hydration", "Less accurate for athletes", "Time of day matters", "Food intake affects results"],
      formula: "Resistance and reactance used with prediction equations"
    }
  ];

  const healthImplications = [
    {
      category: "Cardiovascular Health",
      lowRisk: "Men: 10-18%, Women: 16-24%",
      moderateRisk: "Men: 19-24%, Women: 25-31%",
      highRisk: "Men: 25%+, Women: 32%+",
      description: "Higher body fat percentages correlate with increased risk of heart disease, hypertension, and stroke.",
      details: "Visceral fat produces inflammatory cytokines that damage blood vessels. Excess adipose tissue increases workload on the heart and elevates blood pressure."
    },
    {
      category: "Metabolic Health",
      lowRisk: "Men: 8-19%, Women: 14-25%",
      moderateRisk: "Men: 20-25%, Women: 26-32%",
      highRisk: "Men: 26%+, Women: 33%+",
      description: "Body fat percentage affects insulin sensitivity and diabetes risk.",
      details: "Adipose tissue releases free fatty acids that interfere with insulin action. Higher body fat correlates with insulin resistance and type 2 diabetes development."
    },
    {
      category: "Reproductive Health",
      lowRisk: "Men: 8-25%, Women: 16-30%",
      moderateRisk: "Men: 3-7% or 26-30%, Women: 12-15% or 31-35%",
      highRisk: "Men: <3% or >30%, Women: <12% or >35%",
      description: "Both very low and very high body fat can disrupt reproductive hormones.",
      details: "Too little fat suppresses testosterone and estrogen production. Excess fat increases aromatase activity, converting testosterone to estrogen in men and disrupting ovulation in women."
    },
    {
      category: "Bone Health",
      lowRisk: "Men: 10-20%, Women: 16-25%",
      moderateRisk: "Men: 6-9% or 21-25%, Women: 12-15% or 26-30%",
      highRisk: "Men: <6% or >25%, Women: <12% or >30%",
      description: "Optimal body fat supports bone mineral density through mechanical loading and hormone production.",
      details: "Adequate fat mass supports estrogen production crucial for bone health. Very low body fat can lead to bone loss, while excess fat may increase fracture risk through falls."
    }
  ];

  const ageGenderConsiderations = [
    {
      demographic: "Men 20-39 years",
      excellent: "6-13%",
      good: "14-17%",
      average: "18-21%",
      belowAverage: "22-25%",
      poor: "26%+",
      notes: "Peak performance years with highest testosterone levels supporting lean mass maintenance."
    },
    {
      demographic: "Men 40-59 years",
      excellent: "11-16%",
      good: "17-20%",
      average: "21-24%",
      belowAverage: "25-28%",
      poor: "29%+",
      notes: "Testosterone decline begins, muscle mass maintenance becomes more challenging."
    },
    {
      demographic: "Men 60+ years",
      excellent: "13-19%",
      good: "20-23%",
      average: "24-27%",
      belowAverage: "28-31%",
      poor: "32%+",
      notes: "Slightly higher body fat may be protective for bone health and hormone production."
    },
    {
      demographic: "Women 20-39 years",
      excellent: "16-20%",
      good: "21-24%",
      average: "25-28%",
      belowAverage: "29-32%",
      poor: "33%+",
      notes: "Reproductive years require adequate fat for hormone production and fertility."
    },
    {
      demographic: "Women 40-59 years",
      excellent: "19-23%",
      good: "24-27%",
      average: "28-31%",
      belowAverage: "32-35%",
      poor: "36%+",
      notes: "Perimenopause brings hormonal changes affecting fat distribution and metabolism."
    },
    {
      demographic: "Women 60+ years",
      excellent: "20-24%",
      good: "25-28%",
      average: "29-32%",
      belowAverage: "33-36%",
      poor: "37%+",
      notes: "Post-menopause, slightly higher body fat supports bone health and overall wellbeing."
    }
  ];

  const athleticBodyFat = [
    {
      sport: "Bodybuilding (Competition)",
      male: "3-6%",
      female: "8-12%",
      notes: "Extremely low levels achieved only for competition; not sustainable long-term",
      healthWarning: "Below essential fat levels; requires careful monitoring"
    },
    {
      sport: "Marathon Running",
      male: "5-11%",
      female: "12-19%",
      notes: "Low body fat optimizes heat dissipation and energy efficiency",
      healthWarning: "Monitor for relative energy deficiency in sport (RED-S)"
    },
    {
      sport: "Swimming",
      male: "7-13%",
      female: "15-22%",
      notes: "Moderate body fat provides buoyancy and thermal insulation",
      healthWarning: "Higher fat acceptable due to water thermal demands"
    },
    {
      sport: "Gymnastics",
      male: "4-10%",
      female: "10-16%",
      notes: "Low body fat crucial for strength-to-weight ratio and aerial control",
      healthWarning: "Monitor growth and development in young athletes"
    },
    {
      sport: "American Football",
      male: "8-18%",
      female: "16-26%",
      notes: "Varies greatly by position; linemen carry more fat for protection",
      healthWarning: "Position-specific requirements; monitor cardiovascular health"
    },
    {
      sport: "Basketball",
      male: "7-14%",
      female: "15-22%",
      notes: "Lean build for agility and vertical jump while maintaining strength",
      healthWarning: "Balance leanness with power and endurance needs"
    }
  ];

  const measurementTips = [
    {
      measurement: "Waist Circumference",
      technique: "Measure at the narrowest point, typically just above the navel. Stand upright, breathe normally, and measure at the end of a normal expiration.",
      commonMistakes: ["Measuring over clothing", "Pulling tape too tight", "Measuring at wrong location", "Holding breath"],
      accuracy: "±0.5 inches with proper technique"
    },
    {
      measurement: "Neck Circumference",
      technique: "Measure just below the Adam's apple (laryngeal prominence). Keep tape perpendicular to the long axis of the neck.",
      commonMistakes: ["Measuring too high or low", "Not keeping tape level", "Compressing soft tissue", "Improper head position"],
      accuracy: "±0.25 inches with proper technique"
    },
    {
      measurement: "Hip Circumference (Females)",
      technique: "Measure at the widest part of the hips, typically at the level of the greater trochanter. Stand with feet together.",
      commonMistakes: ["Measuring at waist instead of hips", "Asymmetrical tape placement", "Compressing tissue", "Wrong anatomical landmark"],
      accuracy: "±0.5 inches with proper technique"
    }
  ];

  const detailedFAQ = [
    {
      question: "What's the difference between body fat percentage and BMI?",
      answer: "BMI uses only height and weight, while body fat percentage measures the actual proportion of fat tissue. BMI can't distinguish between muscle and fat, making it less accurate for athletic or muscular individuals. Body fat percentage provides a more precise assessment of body composition and health status.",
      category: "Basics"
    },
    {
      question: "How accurate is the US Navy body fat calculation method?",
      answer: "The US Navy method has an accuracy of ±3-4% when performed correctly. It's based on statistical correlations between circumference measurements and DEXA scan results from military populations. While not as accurate as DEXA or hydrostatic weighing, it's practical for regular monitoring and reasonably reliable for most individuals.",
      category: "Accuracy"
    },
    {
      question: "What body fat percentage is considered healthy for men and women?",
      answer: "For general health: Men 10-18%, Women 16-24%. Athletic ranges are lower: Men 6-13%, Women 14-20%. Essential fat minimums are Men 2-5%, Women 10-13%. These ranges vary with age, with slightly higher percentages acceptable and potentially beneficial for older adults.",
      category: "Health Ranges"
    },
    {
      question: "Can body fat percentage be too low?",
      answer: "Yes, extremely low body fat can be dangerous. Men below 3% and women below 12% risk hormonal disruption, immune suppression, bone loss, and organ dysfunction. Essential fat is necessary for basic physiological functions including hormone production and vitamin absorption.",
      category: "Health Risks"
    },
    {
      question: "How does body fat change with age?",
      answer: "Body fat typically increases with age due to hormonal changes, decreased muscle mass, and reduced metabolic rate. Healthy ranges shift upward: men may increase 1-2% per decade after 30, women 2-3% especially after menopause. Some increase is normal and may be protective for bone health.",
      category: "Age Factors"
    },
    {
      question: "What's the difference between subcutaneous and visceral fat?",
      answer: "Subcutaneous fat is under the skin and relatively benign. Visceral fat surrounds internal organs and is metabolically active, producing inflammatory compounds. Visceral fat poses higher health risks including diabetes and heart disease. The Navy method primarily measures subcutaneous fat.",
      category: "Fat Types"
    },
    {
      question: "How often should I measure my body fat percentage?",
      answer: "For general health monitoring: monthly. For athletes or those actively changing body composition: bi-weekly. Daily measurements aren't recommended due to normal fluctuations from hydration, food intake, and hormonal cycles. Focus on trends over time rather than single measurements.",
      category: "Monitoring"
    },
    {
      question: "Why do women have higher essential body fat than men?",
      answer: "Women require higher essential fat (10-13% vs 2-5% for men) due to reproductive physiology. This includes breast tissue, reproductive organs, and fat necessary for hormone production and fertility. This biological difference means healthy body fat ranges are naturally higher for women.",
      category: "Gender Differences"
    },
    {
      question: "How does body fat affect athletic performance?",
      answer: "The relationship varies by sport. Endurance sports benefit from lower body fat for heat dissipation and energy efficiency. Strength sports may tolerate higher levels if muscle mass is maximized. Swimming benefits from moderate fat for buoyancy. Each sport has optimal ranges balancing performance and health.",
      category: "Athletic Performance"
    },
    {
      question: "What factors can affect body fat measurement accuracy?",
      answer: "Hydration status, food intake, time of day, measurement technique, clothing, and hormonal fluctuations all affect accuracy. For best results: measure at the same time of day, in similar hydration state, before eating, with consistent technique, and track trends rather than single measurements.",
      category: "Measurement Factors"
    },
    {
      question: "Is it possible to have low body fat but still be unhealthy?",
      answer: "Yes, low body fat doesn't guarantee health. Factors include visceral fat distribution, muscle mass, cardiovascular fitness, metabolic health markers, and how the low body fat was achieved. Extreme restriction or certain medications can create low body fat with poor health status.",
      category: "Health Complexity"
    },
    {
      question: "How does body fat relate to hormone production?",
      answer: "Adipose tissue produces hormones like leptin (appetite regulation) and adiponectin (insulin sensitivity). Fat cells also convert androgens to estrogens via aromatase. Too little fat can suppress reproductive hormones, while excess fat can create hormonal imbalances affecting metabolism and fertility.",
      category: "Hormones"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Body Fat Calculator 2025 - Professional Body Fat Percentage Calculator & Complete Guide"
        description="Professional body fat calculator using US Navy method. Calculate body fat percentage with comprehensive scientific guide covering measurement methods, health implications, age considerations, and athletic body fat ranges. Free expert body composition analysis."
        keywords="body fat calculator, body fat percentage calculator, US Navy body fat method, body composition calculator, body fat measurement, calculate body fat percentage, free body fat calculator, body fat analysis, healthy body fat percentage, body fat ranges, athletic body fat, body fat science, body composition analysis, visceral fat calculator, subcutaneous fat measurement, body fat health implications, body fat testing methods, DEXA scan alternatives, hydrostatic weighing, bioelectrical impedance, skinfold measurements"
        canonical="/body-fat"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebApplication", "MedicalWebPage"],
          "name": "Professional Body Fat Calculator & Complete Body Composition Guide",
          "description": "Comprehensive body fat calculator using US Navy method with complete scientific guide covering body fat measurement methods, health implications, and professional body composition analysis.",
          "url": "https://bmicalculator.com/body-fat",
          "applicationCategory": "HealthApplication",
          "medicalAudience": {
            "@type": "MedicalAudience",
            "audienceType": ["General public", "Athletes", "Fitness professionals", "Healthcare providers", "Nutritionists"]
          },
          "about": {
            "@type": "MedicalCondition",
            "name": "Body Fat Assessment and Body Composition Analysis"
          },
          "featureList": [
            "US Navy body fat calculation method",
            "Comprehensive body fat science education",
            "Multiple measurement method comparisons",
            "Age and gender-specific body fat ranges",
            "Athletic body fat guidelines",
            "Health implications of body fat levels",
            "Professional measurement techniques",
            "Body fat vs BMI comparison"
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
            theme === 'white' ? 'text-teal-600 hover:text-teal-700' : 
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
            Professional Body Fat Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
            'bg-gradient-to-r from-green-400 to-emerald-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>Complete Body Fat Percentage Calculator & Scientific Guide</strong> - Professional body composition analysis using US Navy method with comprehensive educational resources covering body fat science, measurement techniques, health implications, and athletic considerations.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-teal-100 text-teal-800 px-3 py-1">US Navy Method</Badge>
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1">Scientific Guide</Badge>
            <Badge className="bg-purple-100 text-purple-800 px-3 py-1">Health Analysis</Badge>
            <Badge className="bg-cyan-100 text-cyan-800 px-3 py-1">Athletic Focus</Badge>
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
                Complete Body Fat Analysis Guide
              </h2>
              <div className="grid md:grid-cols-5 gap-4">
                <Link to="#calculator" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-teal-50 hover:bg-teal-100 text-teal-700' : 'bg-teal-900/20 hover:bg-teal-900/30 text-teal-300'}`}>
                  <Calculator className="h-6 w-6 mx-auto mb-2" />
                  Calculator
                </Link>
                <Link to="#science" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-blue-50 hover:bg-blue-100 text-blue-700' : 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-300'}`}>
                  <Brain className="h-6 w-6 mx-auto mb-2" />
                  Body Fat Science
                </Link>
                <Link to="#methods" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-purple-50 hover:bg-purple-100 text-purple-700' : 'bg-purple-900/20 hover:bg-purple-900/30 text-purple-300'}`}>
                  <Target className="h-6 w-6 mx-auto mb-2" />
                  Methods
                </Link>
                <Link to="#health" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-green-50 hover:bg-green-100 text-green-700' : 'bg-green-900/20 hover:bg-green-900/30 text-green-300'}`}>
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
                <Badge className={`w-fit ${
                  theme === 'white' ? 'bg-teal-100 text-teal-800' :
                  theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
                  'bg-green-900/50 text-green-200'
                }`}>
                  US Navy Method - ±3-4% Accuracy
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
              <div className="mt-6">
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
                        Personalized Recommendations
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
                      onClick={() => toast({ title: "PDF Generation", description: "Professional Body Fat PDF report feature coming soon!" })}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Professional Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Educational Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Body Fat Science Section */}
            <section id="science">
              <h2 className={`text-3xl font-bold mb-8 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                The Science of Body Fat
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {bodyFatScience.map((science, index) => (
                  <Card key={index} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
                    theme === 'white' 
                      ? 'bg-white/80 hover:bg-white/90' 
                      : theme === 'dark'
                      ? 'bg-gray-800/80 hover:bg-gray-800/90'
                      : 'bg-black/80 hover:bg-gray-900/50'
                  }`}>
                    <CardContent className="p-6">
                      <div className={`flex justify-center mb-4 ${
                        theme === 'white' ? 'text-teal-600' : 
                        theme === 'dark' ? 'text-purple-400' : 
                        'text-green-400'
                      }`}>
                        {science.icon}
                      </div>
                      <h3 className={`text-lg font-semibold mb-3 text-center ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {science.title}
                      </h3>
                      <p className={`text-sm mb-4 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {science.description}
                      </p>
                      <div className={`cursor-pointer ${theme === 'white' ? 'text-teal-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}`}
                           onClick={() => toggleSection(`science-${index}`)}>
                        <div className="flex items-center justify-center gap-2">
                          {expandedSections[`science-${index}`] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          <span className="text-sm font-medium">Scientific Details</span>
                        </div>
                      </div>
                      {expandedSections[`science-${index}`] && (
                        <div className={`mt-4 p-4 rounded-lg ${theme === 'white' ? 'bg-teal-50' : theme === 'dark' ? 'bg-purple-900/20' : 'bg-green-900/20'}`}>
                          <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                            {science.details}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Measurement Methods Comparison */}
            <section id="methods">
              <h2 className={`text-3xl font-bold mb-8 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Body Fat Measurement Methods Comparison
              </h2>
              <div className="space-y-6">
                {measurementMethods.map((method, index) => (
                  <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                    theme === 'white' 
                      ? 'bg-white/80' 
                      : theme === 'dark'
                      ? 'bg-gray-800/80'
                      : 'bg-black/80'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-xl flex items-center justify-between ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        <span>{method.method}</span>
                        <Badge className={`${
                          method.method === 'US Navy Method' ? 'bg-blue-100 text-blue-800' :
                          method.method === 'DEXA Scan' ? 'bg-green-100 text-green-800' :
                          method.method === 'Hydrostatic Weighing' ? 'bg-purple-100 text-purple-800' :
                          method.method === 'Skinfold Calipers' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {method.accuracy}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`mb-4 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {method.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className={`font-medium mb-2 flex items-center gap-2 ${theme === 'white' ? 'text-green-700' : 'text-green-400'}`}>
                            <CheckCircle className="h-4 w-4" />
                            Advantages
                          </h4>
                          <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                            {method.pros.map((pro, proIndex) => (
                              <li key={proIndex}>• {pro}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className={`font-medium mb-2 flex items-center gap-2 ${theme === 'white' ? 'text-red-700' : 'text-red-400'}`}>
                            <AlertCircle className="h-4 w-4" />
                            Limitations
                          </h4>
                          <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                            {method.cons.map((con, conIndex) => (
                              <li key={conIndex}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className={`p-3 rounded-lg ${theme === 'white' ? 'bg-blue-50' : 'bg-blue-900/20'}`}>
                        <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
                          How it Works:
                        </h4>
                        <p className={`text-sm ${theme === 'white' ? 'text-blue-600' : 'text-blue-200'}`}>
                          {method.formula}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Health Implications */}
            <section id="health">
              <h2 className={`text-3xl font-bold mb-8 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Health Implications of Body Fat Levels
              </h2>
              <div className="space-y-6">
                {healthImplications.map((health, index) => (
                  <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                    theme === 'white' 
                      ? 'bg-gradient-to-r from-red-50 to-orange-50' 
                      : theme === 'dark'
                      ? 'bg-gradient-to-r from-red-900/30 to-orange-900/30'
                      : 'bg-gradient-to-r from-red-900/30 to-orange-900/30'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {health.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`mb-4 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {health.description}
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${theme === 'white' ? 'bg-green-50' : 'bg-green-900/20'}`}>
                          <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                            Low Risk
                          </h4>
                          <p className={`text-sm ${theme === 'white' ? 'text-green-600' : 'text-green-200'}`}>
                            {health.lowRisk}
                          </p>
                        </div>
                        
                        <div className={`p-3 rounded-lg ${theme === 'white' ? 'bg-yellow-50' : 'bg-yellow-900/20'}`}>
                          <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-yellow-700' : 'text-yellow-300'}`}>
                            Moderate Risk
                          </h4>
                          <p className={`text-sm ${theme === 'white' ? 'text-yellow-600' : 'text-yellow-200'}`}>
                            {health.moderateRisk}
                          </p>
                        </div>
                        
                        <div className={`p-3 rounded-lg ${theme === 'white' ? 'bg-red-50' : 'bg-red-900/20'}`}>
                          <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-red-700' : 'text-red-300'}`}>
                            High Risk
                          </h4>
                          <p className={`text-sm ${theme === 'white' ? 'text-red-600' : 'text-red-200'}`}>
                            {health.highRisk}
                          </p>
                        </div>
                      </div>

                      <div className={`cursor-pointer ${theme === 'white' ? 'text-orange-600' : 'text-orange-400'}`}
                           onClick={() => toggleSection(`health-${index}`)}>
                        <div className="flex items-center gap-2">
                          {expandedSections[`health-${index}`] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          <span className="text-sm font-medium">Scientific Details</span>
                        </div>
                      </div>
                      {expandedSections[`health-${index}`] && (
                        <div className={`mt-4 p-4 rounded-lg ${theme === 'white' ? 'bg-orange-50' : 'bg-orange-900/20'}`}>
                          <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                            {health.details}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Age and Gender Considerations */}
            <section>
              <h2 className={`text-3xl font-bold mb-8 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Age & Gender Body Fat Ranges
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {ageGenderConsiderations.map((demo, index) => (
                  <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                    theme === 'white' 
                      ? 'bg-gradient-to-br from-blue-50 to-purple-50' 
                      : theme === 'dark'
                      ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50'
                      : 'bg-gradient-to-br from-blue-900/50 to-purple-900/50'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-lg ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {demo.demographic}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className={`text-sm font-medium ${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>Excellent:</span>
                          <span className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>{demo.excellent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm font-medium ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>Good:</span>
                          <span className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>{demo.good}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm font-medium ${theme === 'white' ? 'text-yellow-700' : 'text-yellow-300'}`}>Average:</span>
                          <span className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>{demo.average}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm font-medium ${theme === 'white' ? 'text-orange-700' : 'text-orange-300'}`}>Below Average:</span>
                          <span className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>{demo.belowAverage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm font-medium ${theme === 'white' ? 'text-red-700' : 'text-red-300'}`}>Poor:</span>
                          <span className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>{demo.poor}</span>
                        </div>
                      </div>
                      <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {demo.notes}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Athletic Body Fat Ranges */}
            <section>
              <h2 className={`text-3xl font-bold mb-8 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Athletic Body Fat Ranges by Sport
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {athleticBodyFat.map((sport, index) => (
                  <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                    theme === 'white' 
                      ? 'bg-gradient-to-br from-green-50 to-teal-50' 
                      : theme === 'dark'
                      ? 'bg-gradient-to-br from-green-900/50 to-teal-900/50'
                      : 'bg-gradient-to-br from-green-900/50 to-teal-900/50'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-lg ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {sport.sport}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-4">
                        <div>
                          <span className={`text-sm font-medium ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>Male:</span>
                          <span className={`ml-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>{sport.male}</span>
                        </div>
                        <div>
                          <span className={`text-sm font-medium ${theme === 'white' ? 'text-pink-700' : 'text-pink-300'}`}>Female:</span>
                          <span className={`ml-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>{sport.female}</span>
                        </div>
                      </div>
                      <p className={`text-sm mb-3 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {sport.notes}
                      </p>
                      <div className={`p-3 rounded-lg ${theme === 'white' ? 'bg-yellow-50' : 'bg-yellow-900/20'}`}>
                        <h4 className={`font-medium mb-1 flex items-center gap-2 ${theme === 'white' ? 'text-yellow-700' : 'text-yellow-300'}`}>
                          <AlertCircle className="h-4 w-4" />
                          Health Note:
                        </h4>
                        <p className={`text-sm ${theme === 'white' ? 'text-yellow-600' : 'text-yellow-200'}`}>
                          {sport.healthWarning}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Measurement Tips */}
            <section>
              <h2 className={`text-3xl font-bold mb-8 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Accurate Measurement Techniques
              </h2>
              <div className="space-y-6">
                {measurementTips.map((tip, index) => (
                  <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                    theme === 'white' 
                      ? 'bg-white/80' 
                      : theme === 'dark'
                      ? 'bg-gray-800/80'
                      : 'bg-black/80'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-lg ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {tip.measurement}
                      </CardTitle>
                      <Badge className="bg-green-100 text-green-800 w-fit">
                        {tip.accuracy}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                            Proper Technique:
                          </h4>
                          <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                            {tip.technique}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className={`font-medium mb-2 flex items-center gap-2 ${theme === 'white' ? 'text-red-700' : 'text-red-400'}`}>
                            <AlertCircle className="h-4 w-4" />
                            Common Mistakes to Avoid:
                          </h4>
                          <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                            {tip.commonMistakes.map((mistake, mistakeIndex) => (
                              <li key={mistakeIndex}>• {mistake}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Comprehensive FAQ Section */}
        <section id="faq" className="mt-16 max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Expert FAQ: Body Fat & Body Composition
          </h2>
          
          {/* FAQ Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['All', 'Basics', 'Accuracy', 'Health Ranges', 'Health Risks', 'Age Factors', 'Gender Differences'].map((category) => (
              <Badge 
                key={category}
                className={`cursor-pointer px-3 py-2 ${
                  theme === 'white' ? 'bg-teal-100 text-teal-800 hover:bg-teal-200' : 'bg-teal-900/30 text-teal-300 hover:bg-teal-900/50'
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="space-y-6">
            {detailedFAQ.map((faq, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection(`faq-${index}`)}>
                  <CardTitle className={`text-lg flex items-center justify-between ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <span>{faq.question}</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal-100 text-teal-800 text-xs">
                        {faq.category}
                      </Badge>
                      {expandedSections[`faq-${index}`] 
                        ? <ChevronDown className="h-5 w-5" /> 
                        : <ChevronRight className="h-5 w-5" />
                      }
                    </div>
                  </CardTitle>
                </CardHeader>
                {expandedSections[`faq-${index}`] && (
                  <CardContent>
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center mt-16 mb-8">
          <Card className={`backdrop-blur-md border-0 shadow-2xl max-w-3xl mx-auto ${
            theme === 'white' 
              ? 'bg-gradient-to-r from-teal-50 to-blue-50' 
              : theme === 'dark'
              ? 'bg-gradient-to-r from-teal-900/50 to-blue-900/50'
              : 'bg-gradient-to-r from-teal-900/50 to-blue-900/50'
          }`}>
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Start Your Professional Body Composition Journey
              </h2>
              <p className={`mb-6 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Use our comprehensive BMI calculator alongside body fat analysis for complete health assessment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className={`transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl'
                      : theme === 'dark'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                  }`}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate BMI Now
                  </Button>
                </Link>
                <Link to="/bmi-for-athletes">
                  <Button variant="outline" className={`transition-all duration-300 hover:scale-105 ${
                    theme === 'white'
                      ? 'border-teal-300 text-teal-700 hover:bg-teal-50'
                      : theme === 'dark'
                      ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/20'
                      : 'border-green-500/50 text-green-300 hover:bg-green-900/20'
                  }`}>
                    <Activity className="h-4 w-4 mr-2" />
                    Athletic BMI Analysis
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BodyFatPage;