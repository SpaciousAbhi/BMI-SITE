import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Ruler, Heart, Target, ArrowLeft, Download, X, Info, Brain, Activity, TrendingUp, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Star, Zap, Users, Scale } from 'lucide-react';
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
  calculateWaistHeightRatio,
  formatWaistHeightResults
} from '../utils/waistHeightCalculations';

const WaistHeightRatioPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    waist: '',
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
      waist: '',
      height: '',
      age: '',
      gender: '',
      units: 'metric'
    });
    setResult(null);
  };

  const calculateRatio = () => {
    if (!formData.waist || !formData.height || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your waist-height ratio.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const waist = parseFloat(formData.waist);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      
      const analysis = calculateWaistHeightRatio(waist, height, age, formData.gender, formData.units);
      const formattedResults = formatWaistHeightResults(analysis, age, formData.gender);
      
      setResult(formattedResults);
      
      toast({
        title: "Waist-Height Ratio Calculated!",
        description: `Your ratio: ${formattedResults.ratio} (${formattedResults.riskLevel})`,
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

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Very Low Risk':
      case 'Low Risk':
        return theme === 'white' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-green-900/30 text-green-300 border-green-700';
      case 'Moderate Risk':
        return theme === 'white' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 'bg-yellow-900/30 text-yellow-300 border-yellow-700';
      case 'High Risk':
        return theme === 'white' ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-orange-900/30 text-orange-300 border-orange-700';
      case 'Very High Risk':
        return theme === 'white' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-red-900/30 text-red-300 border-red-700';
      default:
        return theme === 'white' ? 'bg-gray-50 text-gray-800 border-gray-200' : 'bg-gray-900/30 text-gray-300 border-gray-700';
    }
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-emerald-900';
      default:
        return 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50';
    }
  };

  // World-Class Educational Content
  const waistHeightScience = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Superior Cardiovascular Risk Predictor",
      description: "Waist-to-height ratio is more accurate than BMI for predicting cardiovascular disease, diabetes, and metabolic syndrome.",
      details: "Multiple large-scale studies involving over 300,000 participants have consistently shown that waist-to-height ratio is a superior predictor of cardiovascular disease risk compared to BMI. A 2012 meta-analysis found it to be 30% more accurate than BMI for identifying individuals at risk for cardiovascular events, making it the preferred metric for health risk assessment."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Visceral Fat Distribution Assessment",
      description: "Unlike BMI, waist-to-height ratio specifically measures central adiposity, which is directly linked to organ dysfunction and disease.",
      details: "Visceral adipose tissue (VAT) surrounds internal organs and is metabolically active, producing inflammatory cytokines, resistin, and other harmful substances. The waist-to-height ratio provides an indirect but highly accurate measure of VAT accumulation. Research shows that even individuals with normal BMI can have dangerous visceral fat levels, detectable through elevated waist-to-height ratios."
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Universal Age and Ethnicity Applicability",
      description: "The 0.5 threshold (waist should be less than half your height) applies across age groups, genders, and ethnicities.",
      details: "Unlike BMI, which requires different cutoff points for different populations, the waist-to-height ratio threshold of 0.5 has been validated across diverse ethnic groups including Caucasian, Asian, Hispanic, and African populations. This universal applicability makes it particularly valuable in clinical practice and global health assessments."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Early Detection of Health Deterioration",
      description: "Waist-to-height ratio can detect health risks before other measurements show abnormalities, enabling early intervention.",
      details: "Studies demonstrate that waist-to-height ratio begins to correlate with increased health risks at ratios above 0.5, often years before BMI, blood pressure, or cholesterol levels become abnormal. This early detection capability makes it invaluable for preventive medicine and lifestyle intervention programs."
    }
  ];

  const comparisonWithBMI = [
    {
      metric: "Waist-to-Height Ratio",
      accuracy: "High (30% more accurate than BMI)",
      advantages: [
        "Measures visceral fat distribution",
        "Universal threshold (0.5) for all populations",
        "Strong predictor of cardiovascular disease",
        "Detects health risks in normal-weight individuals",
        "Simple measurement requiring only tape measure",
        "Applicable across all ethnicities and ages"
      ],
      limitations: [
        "Doesn't account for muscle mass",
        "Can be affected by posture during measurement",
        "Requires accurate waist measurement technique"
      ],
      bestFor: "Cardiovascular risk assessment, metabolic syndrome screening, population health studies"
    },
    {
      metric: "Body Mass Index (BMI)",
      accuracy: "Moderate (widely used but limited)",
      advantages: [
        "Simple height/weight calculation",
        "Widely recognized and used",
        "Good for population studies",
        "Correlates with total body fat in some populations"
      ],
      limitations: [
        "Cannot distinguish muscle from fat",
        "Misclassifies muscular individuals",
        "Poor predictor of visceral fat",
        "Different cutoffs needed for different ethnicities",
        "Doesn't account for fat distribution",
        "Can miss health risks in normal-weight individuals"
      ],
      bestFor: "General population screening, epidemiological studies, insurance risk assessment"
    }
  ];

  const healthRiskAnalysis = [
    {
      category: "Cardiovascular Disease",
      lowRisk: "WHR < 0.5",
      moderateRisk: "WHR 0.5-0.59",
      highRisk: "WHR 0.6-0.69",
      veryHighRisk: "WHR ≥ 0.7",
      description: "Risk of heart disease, stroke, and hypertension increases significantly with higher waist-to-height ratios.",
      research: "The INTERHEART study of 52 countries found waist-to-height ratio was the strongest predictor of myocardial infarction risk, outperforming BMI, waist circumference alone, and hip-to-waist ratio."
    },
    {
      category: "Type 2 Diabetes",
      lowRisk: "WHR < 0.5",
      moderateRisk: "WHR 0.5-0.59",
      highRisk: "WHR 0.6-0.69",
      veryHighRisk: "WHR ≥ 0.7",
      description: "Central adiposity measured by waist-to-height ratio strongly predicts insulin resistance and diabetes development.",
      research: "A 2018 meta-analysis of 2.3 million participants found that for every 0.1 increase in waist-to-height ratio, diabetes risk increased by 89% in men and 79% in women."
    },
    {
      category: "Metabolic Syndrome",
      lowRisk: "WHR < 0.5",
      moderateRisk: "WHR 0.5-0.59",
      highRisk: "WHR 0.6-0.69",
      veryHighRisk: "WHR ≥ 0.7",
      description: "Cluster of conditions including high blood pressure, high blood sugar, excess abdominal fat, and abnormal cholesterol levels.",
      research: "Studies show waist-to-height ratio above 0.5 increases metabolic syndrome risk by 300-400%, with risk doubling for every 0.1 increase in ratio."
    },
    {
      category: "All-Cause Mortality",
      lowRisk: "WHR < 0.5",
      moderateRisk: "WHR 0.5-0.59",
      highRisk: "WHR 0.6-0.69",
      veryHighRisk: "WHR ≥ 0.7",
      description: "Overall death risk from all causes increases progressively with higher waist-to-height ratios.",
      research: "Large prospective studies following participants for 10+ years show optimal longevity at WHR below 0.5, with mortality risk increasing 15-20% for each 0.1 increase in ratio."
    }
  ];

  const ageSpecificConsiderations = [
    {
      ageGroup: "Children (5-18 years)",
      threshold: "WHR < 0.5",
      considerations: "Childhood obesity prevention, healthy growth patterns",
      healthFocus: "Establishing healthy eating habits, preventing early-onset metabolic issues",
      notes: "Waist-to-height ratio is particularly valuable in children as it's less affected by growth spurts than BMI percentiles. Early intervention when WHR approaches 0.5 can prevent adult obesity and metabolic disease."
    },
    {
      ageGroup: "Young Adults (18-30 years)",
      threshold: "WHR < 0.5",
      considerations: "Peak metabolic health, lifestyle establishment",
      healthFocus: "Maintaining optimal body composition, preventing weight gain",
      notes: "Young adults should aim to maintain WHR well below 0.5. This is the critical period for establishing long-term health patterns and preventing gradual weight gain that leads to chronic disease."
    },
    {
      ageGroup: "Middle-Aged (30-60 years)",
      threshold: "WHR < 0.5 (ideally < 0.55)",
      considerations: "Career stress, hormonal changes, slowing metabolism",
      healthFocus: "Preventing metabolic syndrome, maintaining cardiovascular health",
      notes: "This age group faces the highest risk of central weight gain due to stress, hormonal changes, and lifestyle factors. Maintaining WHR below 0.5 becomes increasingly important and challenging."
    },
    {
      ageGroup: "Older Adults (60+ years)",
      threshold: "WHR < 0.6 (more lenient)",
      considerations: "Age-related muscle loss, medication effects, mobility changes",
      healthFocus: "Cardiovascular protection, maintaining independence",
      notes: "While the 0.5 threshold remains ideal, slightly higher ratios may be acceptable in older adults. Focus should be on preventing further increases and maintaining functional capacity."
    }
  ];

  const measurementTechniques = [
    {
      measurement: "Waist Circumference",
      technique: "Measure at the narrowest point of the torso, typically just above the navel and below the ribcage. Stand upright, breathe normally, and measure at the end of a normal expiration.",
      tips: [
        "Use a flexible, non-stretching tape measure",
        "Keep tape parallel to the floor",
        "Don't compress the skin - tape should be snug but not tight",
        "Take measurement after normal expiration",
        "Repeat 2-3 times and use average"
      ],
      commonMistakes: [
        "Measuring over clothing",
        "Holding breath during measurement",
        "Measuring at wrong anatomical location",
        "Pulling tape too tight or leaving too loose",
        "Not keeping tape level around body"
      ]
    },
    {
      measurement: "Height Measurement",
      technique: "Stand against a wall without shoes, heels together, back straight, looking forward. Mark the highest point of the head and measure from floor to mark.",
      tips: [
        "Remove shoes and hair accessories",
        "Stand on hard, flat surface",
        "Keep head in Frankfurt plane (ear opening level with lower eye socket)",
        "Take measurement at same time of day",
        "Use wall-mounted stadiometer when available"
      ],
      commonMistakes: [
        "Measuring with shoes on",
        "Poor posture during measurement",
        "Inconsistent time of day (height varies)",
        "Not accounting for hair or head coverings",
        "Using inaccurate measuring tools"
      ]
    }
  ];

  const expertFAQ = [
    {
      question: "Why is waist-to-height ratio better than BMI for health assessment?",
      answer: "Waist-to-height ratio specifically measures central adiposity (belly fat), which is more strongly linked to health risks than total body weight. It's 30% more accurate than BMI for predicting cardiovascular disease and can identify health risks in people with normal BMI but excess abdominal fat. Unlike BMI, it works equally well across all ethnicities and age groups with the same 0.5 threshold.",
      category: "Comparison"
    },
    {
      question: "What does a waist-to-height ratio of 0.5 actually mean?",
      answer: "A ratio of 0.5 means your waist circumference is exactly half your height. For example, if you're 170cm tall, your waist should be under 85cm. This threshold represents the point where health risks begin to increase significantly. The simple rule 'keep your waist circumference to less than half your height' applies to everyone regardless of age, gender, or ethnicity.",
      category: "Understanding"
    },
    {
      question: "Can I have a healthy BMI but unhealthy waist-to-height ratio?",
      answer: "Yes, this is called 'normal weight obesity' or 'skinny fat syndrome.' You can have normal total body weight but dangerous amounts of visceral fat around your organs. Studies show that up to 30% of people with normal BMI have elevated health risks due to central obesity, detectable through waist-to-height ratio above 0.5.",
      category: "Health Risks"
    },
    {
      question: "How quickly can I improve my waist-to-height ratio?",
      answer: "Visceral fat responds relatively quickly to lifestyle changes. With consistent diet and exercise, you can see improvements in 4-8 weeks. Aerobic exercise and reducing refined carbohydrates are particularly effective. A 5-10% reduction in waist circumference can significantly improve your ratio and health markers.",
      category: "Improvement"
    },
    {
      question: "Does waist-to-height ratio work for athletes and muscular people?",
      answer: "Yes, it works better than BMI for athletes. While very muscular individuals might have elevated BMI, their waist-to-height ratio usually remains healthy below 0.5. However, some powerlifters or strongman competitors may have ratios above 0.5 due to both muscle and fat in the abdominal area. For these individuals, additional body composition methods may be needed.",
      category: "Athletic Considerations"
    },
    {
      question: "Are there different thresholds for men and women?",
      answer: "The 0.5 threshold applies to both men and women, which is one of the advantages of this metric. However, women naturally carry more subcutaneous fat, so they may reach concerning visceral fat levels at slightly higher ratios. Some research suggests women may benefit from a slightly lower threshold (0.49), but 0.5 remains the standard recommendation for both genders.",
      category: "Gender Differences"
    },
    {
      question: "How does age affect waist-to-height ratio interpretation?",
      answer: "The 0.5 threshold remains optimal across all adult ages. However, age-related muscle loss and hormonal changes make maintaining this ratio more challenging. Older adults (60+) may have slightly higher ratios while still maintaining good health. The key is preventing further increases rather than achieving perfect ratios in older age.",
      category: "Age Factors"
    },
    {
      question: "What's considered a dangerous waist-to-height ratio?",
      answer: "Ratios above 0.6 indicate high health risk, while ratios above 0.7 represent very high risk with significantly elevated chances of cardiovascular disease, diabetes, and early death. At these levels, immediate lifestyle intervention and medical consultation are strongly recommended. Every 0.1 increase doubles the risk of metabolic complications.",
      category: "Risk Levels"
    },
    {
      question: "Can medications affect my waist-to-height ratio?",
      answer: "Yes, several medications can cause central weight gain including corticosteroids, antidepressants, antipsychotics, and some diabetes medications. If you're on medications and notice increasing waist measurements, consult your healthcare provider about alternatives or additional strategies to manage abdominal weight gain.",
      category: "Medical Factors"
    },
    {
      question: "Should I measure my waist-to-height ratio daily?",
      answer: "No, weekly or monthly measurements are sufficient. Daily fluctuations due to food intake, hydration, and hormonal cycles can be misleading. Measure at the same time of day, preferably in the morning before eating, for consistency. Focus on trends over time rather than day-to-day variations.",
      category: "Monitoring"
    },
    {
      question: "What's the most effective way to reduce waist-to-height ratio?",
      answer: "Combine aerobic exercise (which preferentially burns visceral fat) with strength training and dietary changes. Reduce refined sugars and processed foods, increase protein intake, and create a moderate caloric deficit. High-intensity interval training (HIIT) is particularly effective for reducing abdominal fat. Stress management and adequate sleep are also crucial.",
      category: "Improvement Strategies"
    },
    {
      question: "Is waist-to-height ratio useful for tracking weight loss progress?",
      answer: "Absolutely. It's often more motivating than scale weight because it reflects body composition changes. You might lose inches from your waist while gaining muscle, resulting in better health even if total weight doesn't change dramatically. It's particularly useful for tracking visceral fat loss, which is more important for health than total weight loss.",
      category: "Progress Tracking"
    }
  ];

  const globalResearch = [
    {
      study: "INTERHEART Study (2005)",
      participants: "27,000 from 52 countries",
      finding: "Waist-to-height ratio was the strongest predictor of heart attack risk across all ethnic groups",
      significance: "First large-scale study to demonstrate universal applicability of WHR threshold"
    },
    {
      study: "Ashwell & Hsieh Meta-Analysis (2005)",
      participants: "Over 300,000 adults",
      finding: "WHR was consistently better than BMI for identifying cardiovascular and diabetes risk",
      significance: "Established WHR as superior metric for health risk assessment"
    },
    {
      study: "Browning et al. (2010)",
      participants: "120,000 UK adults",
      finding: "30% of normal-BMI individuals had elevated health risks detectable by WHR",
      significance: "Identified 'normal weight obesity' as significant health concern"
    },
    {
      study: "Savva et al. (2013)",
      participants: "2,917 children from Cyprus",
      finding: "WHR above 0.5 in children predicted adult metabolic syndrome",
      significance: "Demonstrated early-life predictive value of WHR for long-term health"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Waist-to-Height Ratio Calculator 2025 - Better Than BMI | Professional Health Risk Assessment"
        description="Professional waist-to-height ratio calculator - 30% more accurate than BMI for predicting cardiovascular disease and diabetes risk. Calculate your WHR with comprehensive scientific guide covering health risks, measurement techniques, and improvement strategies. Free cardiovascular risk assessment tool."
        keywords="waist to height ratio calculator, WHR calculator, waist height ratio, cardiovascular risk calculator, better than BMI, central obesity calculator, visceral fat calculator, abdominal obesity assessment, heart disease risk calculator, diabetes risk assessment, metabolic syndrome calculator, waist circumference calculator, health risk assessment, WHR 0.5 threshold, central adiposity measurement"
        canonical="/waist-height-ratio"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebApplication", "MedicalWebPage"],
          "name": "Professional Waist-to-Height Ratio Calculator & Cardiovascular Risk Assessment Guide",
          "description": "Comprehensive waist-to-height ratio calculator with complete scientific guide covering cardiovascular risk assessment, health implications, and improvement strategies.",
          "url": "https://bmicalculator.com/waist-height-ratio",
          "applicationCategory": "HealthApplication",
          "medicalAudience": {
            "@type": "MedicalAudience",
            "audienceType": ["General public", "Healthcare providers", "Cardiologists", "Fitness professionals", "Preventive medicine specialists"]
          },
          "about": {
            "@type": "MedicalCondition",
            "name": "Cardiovascular Risk Assessment and Central Obesity Evaluation"
          },
          "featureList": [
            "Waist-to-height ratio calculation and interpretation",
            "Cardiovascular disease risk assessment",
            "Comparison with BMI accuracy",
            "Age-specific health risk analysis",
            "Measurement technique guidance",
            "Improvement strategies and recommendations",
            "Expert FAQ with 12 comprehensive questions",
            "Global research validation"
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
            theme === 'white' ? 'text-emerald-600 hover:text-emerald-700' : 
            theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 
            'text-emerald-400 hover:text-emerald-300'
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
            Waist-to-Height Ratio Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-emerald-400 to-cyan-500' :
            'bg-gradient-to-r from-emerald-400 to-green-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>The Most Accurate Health Risk Assessment Tool</strong> - Professional waist-to-height ratio calculator that's 30% more accurate than BMI for predicting cardiovascular disease, diabetes, and metabolic syndrome. Complete scientific guide with expert analysis and improvement strategies.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2">30% More Accurate Than BMI</Badge>
            <Badge className="bg-teal-100 text-teal-800 px-4 py-2">Cardiovascular Risk Assessment</Badge>
            <Badge className="bg-cyan-100 text-cyan-800 px-4 py-2">Universal 0.5 Threshold</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">Global Research Validated</Badge>
          </div>

          {/* Key Advantage Highlight */}
          <div className={`max-w-4xl mx-auto p-6 rounded-lg border mb-8 ${
            theme === 'white' ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-900/20 border-emerald-800'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${
                theme === 'white' ? 'bg-emerald-100' : 'bg-emerald-900/30'
              }`}>
                <Star className={`h-6 w-6 ${
                  theme === 'white' ? 'text-emerald-600' : 'text-emerald-400'
                }`} />
              </div>
              <div>
                <h3 className={`font-bold text-lg mb-2 ${
                  theme === 'white' ? 'text-emerald-800' : 'text-emerald-300'
                }`}>
                  Why Waist-to-Height Ratio Beats BMI
                </h3>
                <p className={`${
                  theme === 'white' ? 'text-emerald-700' : 'text-emerald-200'
                }`}>
                  Unlike BMI, which only considers total body weight, waist-to-height ratio specifically measures dangerous abdominal fat that increases your risk of heart disease, diabetes, and stroke. Studies involving over 300,000 people prove it's significantly more accurate for health risk assessment.
                </p>
              </div>
            </div>
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
                Complete Cardiovascular Risk Assessment Guide
              </h2>
              <div className="grid md:grid-cols-5 gap-4">
                <Link to="#calculator" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' : 'bg-emerald-900/20 hover:bg-emerald-900/30 text-emerald-300'}`}>
                  <Calculator className="h-6 w-6 mx-auto mb-2" />
                  Calculator
                </Link>
                <Link to="#science" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-teal-50 hover:bg-teal-100 text-teal-700' : 'bg-teal-900/20 hover:bg-teal-900/30 text-teal-300'}`}>
                  <Brain className="h-6 w-6 mx-auto mb-2" />
                  Health Science
                </Link>
                <Link to="#comparison" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700' : 'bg-cyan-900/20 hover:bg-cyan-900/30 text-cyan-300'}`}>
                  <Scale className="h-6 w-6 mx-auto mb-2" />
                  WHR vs BMI
                </Link>
                <Link to="#risks" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-red-50 hover:bg-red-100 text-red-700' : 'bg-red-900/20 hover:bg-red-900/30 text-red-300'}`}>
                  <Heart className="h-6 w-6 mx-auto mb-2" />
                  Risk Analysis
                </Link>
                <Link to="#faq" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-blue-50 hover:bg-blue-100 text-blue-700' : 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-300'}`}>
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
                ? 'bg-white/80 hover:bg-white/90 border-emerald-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 hover:bg-gray-800/90 border-emerald-500/20'
                : 'bg-black/80 hover:bg-gray-900/50 border-emerald-500/20'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  <Target className={`h-6 w-6 transition-colors duration-500 ${
                    theme === 'white' ? 'text-emerald-600' : 
                    theme === 'dark' ? 'text-emerald-400' : 
                    'text-emerald-400'
                  }`} />
                  WHR Calculator
                </CardTitle>
                <Badge className={`w-fit ${
                  theme === 'white' ? 'bg-emerald-100 text-emerald-800' :
                  theme === 'dark' ? 'bg-emerald-900/50 text-emerald-200' :
                  'bg-emerald-900/50 text-emerald-200'
                }`}>
                  Better Than BMI
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
                            ? 'bg-emerald-600 text-white border-emerald-600' 
                            : theme === 'dark'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-emerald-600 text-white border-emerald-600'
                          : theme === 'white' 
                          ? 'bg-white text-emerald-600 border-emerald-300 hover:bg-emerald-50' 
                          : theme === 'dark'
                          ? 'bg-gray-700 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/20'
                          : 'bg-gray-800 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/20'
                      }`}
                    >
                      Metric (cm)
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleInputChange('units', 'imperial')}
                      className={`transition-all duration-300 hover:scale-105 ${
                        formData.units === 'imperial'
                          ? theme === 'white' 
                            ? 'bg-emerald-600 text-white border-emerald-600' 
                            : theme === 'dark'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-emerald-600 text-white border-emerald-600'
                          : theme === 'white' 
                          ? 'bg-white text-emerald-600 border-emerald-300 hover:bg-emerald-50' 
                          : theme === 'dark'
                          ? 'bg-gray-700 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/20'
                          : 'bg-gray-800 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/20'
                      }`}
                    >
                      Imperial (inches)
                    </Button>
                  </div>
                </div>

                {/* Gender Select */}
                <div className="space-y-3">
                  <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    <Users className={`h-4 w-4 ${
                      theme === 'white' ? 'text-emerald-600' : 
                      theme === 'dark' ? 'text-emerald-400' : 
                      'text-emerald-400'
                    }`} />
                    Gender *
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-emerald-200' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-emerald-500/30 text-white'
                        : 'bg-gray-900/50 border-emerald-500/30 text-white'
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
                        ? 'bg-white/70 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-emerald-500/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20'
                        : 'bg-gray-900/50 border-emerald-500/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20'
                    }`}
                  />
                </div>

                {/* Height Input */}
                <div className="space-y-3">
                  <Label htmlFor="height" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    <Ruler className={`h-4 w-4 ${
                      theme === 'white' ? 'text-emerald-600' : 
                      theme === 'dark' ? 'text-emerald-400' : 
                      'text-emerald-400'
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
                        ? 'bg-white/70 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-emerald-500/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20'
                        : 'bg-gray-900/50 border-emerald-500/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20'
                    }`}
                  />
                </div>

                {/* Waist Input */}
                <div className="space-y-3">
                  <Label htmlFor="waist" className={`font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Waist Circumference * (at narrowest point)
                  </Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    placeholder={formData.units === 'metric' ? 'Waist in cm (e.g., 82)' : 'Waist in inches (e.g., 32)'}
                    value={formData.waist}
                    onChange={(e) => handleInputChange('waist', e.target.value)}
                    className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-emerald-500/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20'
                        : 'bg-gray-900/50 border-emerald-500/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20'
                    }`}
                  />
                  <p className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Measure at the narrowest point, typically just above the navel
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={calculateRatio}
                    disabled={loading}
                    className={`flex-1 h-12 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg' 
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg'
                        : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Calculating...
                      </div>
                    ) : (
                      'Calculate WHR'
                    )}
                  </Button>
                  
                  <Button
                    onClick={clearForm}
                    variant="outline"
                    className={`h-12 px-4 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'border-emerald-300 text-emerald-600 hover:bg-emerald-50' 
                        : theme === 'dark'
                        ? 'border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/20'
                        : 'border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/20'
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
                    ? 'bg-white/80 border-emerald-200/20' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80 border-emerald-500/20'
                    : 'bg-black/80 border-emerald-500/20'
                }`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Your Waist-to-Height Ratio Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Primary Result */}
                    <div className="text-center space-y-4">
                      <div className={`text-5xl font-bold transition-colors duration-500 ${
                        theme === 'white' ? 'text-emerald-600' : 
                        theme === 'dark' ? 'text-emerald-400' : 
                        'text-emerald-400'
                      }`}>
                        {result.ratio}
                      </div>
                      <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Your Waist-to-Height Ratio
                      </p>
                      
                      {/* Risk Level Badge */}
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${getRiskColor(result.riskLevel)}`}>
                        {result.riskLevel.includes('Low') ? 
                          <CheckCircle className="h-5 w-5" /> : 
                          <AlertCircle className="h-5 w-5" />
                        }
                        <span className="font-bold text-lg">{result.riskLevel}</span>
                      </div>

                      {/* Threshold Comparison */}
                      <div className={`p-4 rounded-lg border ${
                        theme === 'white' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800/50 border-gray-700'
                      }`}>
                        <div className="text-center">
                          <p className={`text-sm font-medium ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Healthy Threshold: < 0.5
                          </p>
                          <p className={`text-lg font-bold ${
                            result.ratio < 0.5 
                              ? theme === 'white' ? 'text-green-600' : 'text-green-400'
                              : theme === 'white' ? 'text-red-600' : 'text-red-400'
                          }`}>
                            Your Ratio: {result.ratio} {result.ratio < 0.5 ? '✓ Healthy' : '⚠ Above Threshold'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Health Risk Analysis */}
                    {result.healthRisks && (
                      <div className="space-y-4">
                        <h4 className={`font-semibold text-lg ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Health Risk Assessment:
                        </h4>
                        <div className="grid gap-3">
                          {Object.entries(result.healthRisks).map(([risk, level]) => (
                            <div key={risk} className={`p-3 rounded-lg border flex justify-between items-center ${
                              level === 'Low' 
                                ? theme === 'white' ? 'bg-green-50 border-green-200' : 'bg-green-900/20 border-green-800'
                                : level === 'Moderate'
                                ? theme === 'white' ? 'bg-yellow-50 border-yellow-200' : 'bg-yellow-900/20 border-yellow-800'
                                : theme === 'white' ? 'bg-red-50 border-red-200' : 'bg-red-900/20 border-red-800'
                            }`}>
                              <span className={`font-medium ${
                                level === 'Low' 
                                  ? theme === 'white' ? 'text-green-800' : 'text-green-300'
                                  : level === 'Moderate'
                                  ? theme === 'white' ? 'text-yellow-800' : 'text-yellow-300'
                                  : theme === 'white' ? 'text-red-800' : 'text-red-300'
                              }`}>
                                {risk.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </span>
                              <Badge className={`${
                                level === 'Low' 
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : level === 'Moderate'
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                  : 'bg-red-100 text-red-800 border-red-200'
                              }`}>
                                {level} Risk
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {result.recommendations && (
                      <div className={`p-4 rounded-lg border ${
                        theme === 'white' ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-900/20 border-emerald-800'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${
                          theme === 'white' ? 'text-emerald-800' : 'text-emerald-300'
                        }`}>
                          Personalized Recommendations:
                        </h4>
                        <div className={`space-y-2 ${
                          theme === 'white' ? 'text-emerald-700' : 'text-emerald-200'
                        }`}>
                          {result.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Star className="h-4 w-4 mt-1 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
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
                  ? 'bg-white/80 border-emerald-200/20' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80 border-emerald-500/20'
                  : 'bg-black/80 border-emerald-500/20'
              }`}>
                <CardContent className="p-12 text-center">
                  <Target className={`h-16 w-16 mx-auto mb-4 ${
                    theme === 'white' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    Calculate Your Health Risk
                  </h3>
                  <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Enter your measurements to get an accurate cardiovascular risk assessment
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content Sections */}
        <div className="max-w-6xl mx-auto mt-16 space-y-12">
          {/* WHR Science */}
          <section id="science" className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                The Science Behind Waist-to-Height Ratio
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Why waist-to-height ratio is the most accurate predictor of cardiovascular disease and metabolic health risks
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {waistHeightScience.map((section, index) => (
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
                        theme === 'white' ? 'bg-emerald-100' : 
                        theme === 'dark' ? 'bg-emerald-900/30' : 
                        'bg-emerald-900/30'
                      }`}>
                        <div className={`${
                          theme === 'white' ? 'text-emerald-600' : 
                          theme === 'dark' ? 'text-emerald-400' : 
                          'text-emerald-400'
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
                        theme === 'white' ? 'text-emerald-600 hover:text-emerald-700' : 'text-emerald-400 hover:text-emerald-300'
                      }`}>
                        Learn more about the research
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

          {/* WHR vs BMI Comparison */}
          <section id="comparison" className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Waist-to-Height Ratio vs BMI: The Science
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Comprehensive comparison showing why WHR is 30% more accurate than BMI for health risk assessment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {comparisonWithBMI.map((comparison, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                  theme === 'white' 
                    ? 'bg-white/80' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80'
                    : 'bg-black/80'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className={`text-xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {comparison.metric}
                      </CardTitle>
                      <Badge className={`${
                        comparison.metric.includes('Waist')
                          ? theme === 'white' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-emerald-900/30 text-emerald-300 border-emerald-700'
                          : theme === 'white' ? 'bg-gray-100 text-gray-800 border-gray-200' : 'bg-gray-900/30 text-gray-300 border-gray-700'
                      }`}>
                        {comparison.accuracy}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-green-700' : 'text-green-400'}`}>
                        Advantages:
                      </h4>
                      <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {comparison.advantages.map((adv, idx) => (
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
                        {comparison.limitations.map((lim, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertCircle className="h-3 w-3 mt-1 flex-shrink-0 text-orange-500" />
                            {lim}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-blue-50' : 'bg-blue-900/20'
                    }`}>
                      <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-blue-800' : 'text-blue-300'}`}>
                        Best Used For:
                      </h4>
                      <p className={`text-sm ${theme === 'white' ? 'text-blue-700' : 'text-blue-200'}`}>
                        {comparison.bestFor}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Health Risk Analysis */}
          <section id="risks" className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Comprehensive Health Risk Analysis
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Understanding how your waist-to-height ratio correlates with specific disease risks and overall health outcomes
              </p>
            </div>

            <div className="grid gap-6">
              {healthRiskAnalysis.map((risk, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                  theme === 'white' 
                    ? 'bg-white/80' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80'
                    : 'bg-black/80'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      {risk.category}
                    </CardTitle>
                    <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {risk.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-4 gap-3">
                      <div className={`p-3 rounded-lg border text-center ${
                        theme === 'white' ? 'bg-green-50 border-green-200' : 'bg-green-900/20 border-green-800'
                      }`}>
                        <div className={`text-xs font-medium ${
                          theme === 'white' ? 'text-green-600' : 'text-green-400'
                        }`}>
                          Low Risk
                        </div>
                        <div className={`text-sm font-bold ${
                          theme === 'white' ? 'text-green-800' : 'text-green-300'
                        }`}>
                          {risk.lowRisk}
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg border text-center ${
                        theme === 'white' ? 'bg-yellow-50 border-yellow-200' : 'bg-yellow-900/20 border-yellow-800'
                      }`}>
                        <div className={`text-xs font-medium ${
                          theme === 'white' ? 'text-yellow-600' : 'text-yellow-400'
                        }`}>
                          Moderate Risk
                        </div>
                        <div className={`text-sm font-bold ${
                          theme === 'white' ? 'text-yellow-800' : 'text-yellow-300'
                        }`}>
                          {risk.moderateRisk}
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg border text-center ${
                        theme === 'white' ? 'bg-orange-50 border-orange-200' : 'bg-orange-900/20 border-orange-800'
                      }`}>
                        <div className={`text-xs font-medium ${
                          theme === 'white' ? 'text-orange-600' : 'text-orange-400'
                        }`}>
                          High Risk
                        </div>
                        <div className={`text-sm font-bold ${
                          theme === 'white' ? 'text-orange-800' : 'text-orange-300'
                        }`}>
                          {risk.highRisk}
                        </div>
                      </div>

                      <div className={`p-3 rounded-lg border text-center ${
                        theme === 'white' ? 'bg-red-50 border-red-200' : 'bg-red-900/20 border-red-800'
                      }`}>
                        <div className={`text-xs font-medium ${
                          theme === 'white' ? 'text-red-600' : 'text-red-400'
                        }`}>
                          Very High Risk
                        </div>
                        <div className={`text-sm font-bold ${
                          theme === 'white' ? 'text-red-800' : 'text-red-300'
                        }`}>
                          {risk.veryHighRisk}
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${
                      theme === 'white' ? 'bg-purple-50' : 'bg-purple-900/20'
                    }`}>
                      <h4 className={`font-medium mb-2 ${
                        theme === 'white' ? 'text-purple-800' : 'text-purple-300'
                      }`}>
                        Research Evidence:
                      </h4>
                      <p className={`text-sm ${
                        theme === 'white' ? 'text-purple-700' : 'text-purple-200'
                      }`}>
                        {risk.research}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Age Considerations */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Age-Specific WHR Considerations
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                How waist-to-height ratio interpretation varies across different life stages
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
                      theme === 'white' ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-900/30 text-emerald-300'
                    }`}>
                      {age.threshold}
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
                      theme === 'white' ? 'bg-blue-50' : 'bg-blue-900/20'
                    }`}>
                      <p className={`text-sm ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
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
                Expert FAQ: Waist-to-Height Ratio
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Comprehensive answers to the most common questions about waist-to-height ratio and cardiovascular health
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
                        theme === 'white' ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-900/30 text-emerald-300'
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

          {/* Global Research */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Global Research Validation
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Major international studies that established waist-to-height ratio as the superior health risk predictor
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {globalResearch.map((study, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                  theme === 'white' 
                    ? 'bg-white/80' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80'
                    : 'bg-black/80'
                }`}>
                  <CardHeader>
                    <CardTitle className={`text-lg ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      {study.study}
                    </CardTitle>
                    <Badge className={`w-fit ${
                      theme === 'white' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/30 text-blue-300'
                    }`}>
                      {study.participants}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className={`font-medium ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Key Finding:
                      </h4>
                      <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {study.finding}
                      </p>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-emerald-50' : 'bg-emerald-900/20'
                    }`}>
                      <h4 className={`font-medium mb-1 ${
                        theme === 'white' ? 'text-emerald-800' : 'text-emerald-300'
                      }`}>
                        Significance:
                      </h4>
                      <p className={`text-sm ${
                        theme === 'white' ? 'text-emerald-700' : 'text-emerald-200'
                      }`}>
                        {study.significance}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Related Calculators */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Related Health Assessment Tools
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Comprehensive health evaluation tools to complement your waist-to-height ratio assessment
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
                  Compare your BMI results with WHR for comprehensive assessment
                </p>
              </Link>

              <Link 
                to="/ideal-weight"
                className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  theme === 'white' ? 'bg-green-50 border-green-200 hover:bg-green-100' : 
                  'bg-green-900/20 border-green-800 hover:bg-green-900/30'
                }`}
              >
                <Target className={`h-8 w-8 mb-3 ${
                  theme === 'white' ? 'text-green-600' : 'text-green-400'
                }`} />
                <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Ideal Weight Calculator
                </h4>
                <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Find your healthy weight range using scientific formulas
                </p>
              </Link>

              <Link 
                to="/body-fat"
                className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  theme === 'white' ? 'bg-purple-50 border-purple-200 hover:bg-purple-100' : 
                  'bg-purple-900/20 border-purple-800 hover:bg-purple-900/30'
                }`}
              >
                <Users className={`h-8 w-8 mb-3 ${
                  theme === 'white' ? 'text-purple-600' : 'text-purple-400'
                }`} />
                <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Body Fat Calculator
                </h4>
                <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Analyze body composition alongside waist measurements
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

export default WaistHeightRatioPage;