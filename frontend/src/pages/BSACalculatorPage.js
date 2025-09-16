import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Activity, User, ArrowLeft, Download, X, Info, Heart, Brain, Stethoscope, TrendingUp, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Star, Zap, Users, Scale, Target } from 'lucide-react';
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
import { formatBSAResults } from '../utils/bsaCalculations';

const BSACalculatorPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    weight: '',
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
      weight: '',
      height: '',
      age: '',
      gender: '',
      units: 'metric'
    });
    setResult(null);
  };

  const calculateBSA = () => {
    if (!formData.weight || !formData.height || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your body surface area.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      
      const results = formatBSAResults(weight, height, age, formData.gender, formData.units);
      setResult(results);
      
      toast({
        title: "BSA Calculated!",
        description: `Your body surface area: ${results.summary.primaryBSA} m² (${results.summary.category})`,
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Normal':
      case 'Normal for Age':
        return theme === 'white' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-green-900/30 text-green-300 border-green-700';
      case 'Small':
      case 'Very Small':
        return theme === 'white' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-blue-900/30 text-blue-300 border-blue-700';
      case 'Large':
      case 'Large for Age':
        return theme === 'white' ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-orange-900/30 text-orange-300 border-orange-700';
      default:
        return theme === 'white' ? 'bg-gray-50 text-gray-800 border-gray-200' : 'bg-gray-900/30 text-gray-300 border-gray-700';
    }
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-teal-900';
      default:
        return 'bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50';
    }
  };

  // World-Class Educational Content
  const bsaScience = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Metabolic Scaling and Allometric Relationships",
      description: "BSA represents the mathematical relationship between body size and metabolic rate, crucial for physiological function normalization.",
      details: "BSA is based on allometric scaling laws discovered by Max Kleiber in 1932, showing that metabolic rate scales to the 3/4 power of body mass. This relationship holds across species from mice to elephants. BSA provides a more accurate estimate of metabolic capacity than weight alone, explaining why drug dosing, cardiac output, and other physiological parameters are often indexed to BSA rather than body weight."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Cardiovascular Normalization Standard",
      description: "BSA is the gold standard for indexing cardiac output, stroke volume, and other cardiovascular parameters across different body sizes.",
      details: "Normal cardiac index (cardiac output/BSA) is 2.5-4.0 L/min/m², regardless of body size. This allows comparison of cardiac function between a 50kg patient and a 100kg patient. BSA indexing reveals that heart disease may be present even when absolute cardiac output appears normal, making it essential for accurate cardiovascular assessment and treatment decisions."
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Pharmaceutical Dosing Precision",
      description: "BSA-based dosing is more accurate than weight-based dosing for many medications, particularly in oncology and pediatrics.",
      details: "Chemotherapy dosing is almost exclusively BSA-based because drug clearance correlates better with BSA than weight. Studies show BSA-based dosing reduces inter-patient variability in drug exposure by 30-50% compared to weight-based dosing. This is particularly important for drugs with narrow therapeutic windows where small changes in dose can mean the difference between therapeutic success and toxicity."
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Clinical Research and Population Studies",
      description: "BSA normalization enables meaningful comparison of physiological data across diverse populations and research studies.",
      details: "BSA adjustment allows researchers to compare metabolic rates, organ function, and drug responses across different populations regardless of size differences. This is crucial for pediatric research, where children's physiology must be compared to adult norms, and for international studies involving populations with different average body sizes. BSA normalization is required by regulatory agencies for many clinical trials."
    }
  ];

  const formulaComparison = [
    {
      name: "DuBois & DuBois (1916)",
      description: "The original and most widely used BSA formula, considered the gold standard in clinical practice.",
      formula: "BSA = 0.007184 × (Weight^0.425) × (Height^0.725)",
      accuracy: "±5-8%",
      advantages: [
        "Most extensively validated",
        "Widely accepted standard",
        "Good for average adult populations",
        "Historical continuity in research"
      ],
      limitations: [
        "Less accurate for very obese individuals",
        "Developed using limited population data",
        "May overestimate BSA in elderly"
      ],
      bestFor: "General adult population, clinical practice, research continuity",
      development: "Developed by Eugene DuBois using data from 9 patients, validated over 100+ years of clinical use"
    },
    {
      name: "Mosteller (1987)",
      description: "Simplified formula designed for easy calculation, popular in emergency medicine and bedside calculations.",
      formula: "BSA = √[(Weight × Height) / 3600] (metric)",
      accuracy: "±5-10%",
      advantages: [
        "Extremely simple calculation",
        "No complex exponents",
        "Easy mental math",
        "Good correlation with DuBois"
      ],
      limitations: [
        "Less precise than other formulas",
        "May be less accurate at extremes",
        "Limited validation studies"
      ],
      bestFor: "Emergency medicine, bedside calculations, educational purposes",
      development: "Designed as a simplification of complex formulas for practical clinical use"
    },
    {
      name: "Haycock et al. (1978)",
      description: "Developed specifically for children and validated across pediatric populations, most accurate for young patients.",
      formula: "BSA = 0.024265 × (Weight^0.5378) × (Height^0.3964)",
      accuracy: "±3-6% (pediatric)",
      advantages: [
        "Most accurate for children",
        "Extensive pediatric validation",
        "Good for growth studies",
        "Accounts for pediatric proportions"
      ],
      limitations: [
        "May be less accurate for adults",
        "Complex calculation",
        "Less familiar to clinicians"
      ],
      bestFor: "Pediatric medicine, growth assessment, child-specific dosing",
      development: "Derived from measurements of 81 children, validated in pediatric populations"
    },
    {
      name: "Gehan & George (1970)",
      description: "Developed for cancer research with extensive validation in oncology patients receiving chemotherapy.",
      formula: "BSA = 0.0235 × (Weight^0.51456) × (Height^0.42246)",
      accuracy: "±4-7%",
      advantages: [
        "Excellent for oncology",
        "Validated in diverse populations",
        "Good across weight ranges",
        "Cancer research standard"
      ],
      limitations: [
        "Less familiar outside oncology",
        "Complex calculation",
        "Limited pediatric data"
      ],
      bestFor: "Oncology, chemotherapy dosing, cancer research",
      development: "Based on data from 401 patients, specifically validated for chemotherapy dosing"
    },
    {
      name: "Boyd (1935)",
      description: "Alternative formula with good accuracy across diverse populations, used in specialized applications.",
      formula: "Complex formula involving logarithmic calculations",
      accuracy: "±6-9%",
      advantages: [
        "Good across populations",
        "Historical significance",
        "Alternative validation"
      ],
      limitations: [
        "Very complex calculation",
        "Rarely used in practice",
        "Requires specialized calculations"
      ],
      bestFor: "Research applications, specialized calculations",
      development: "Mathematical derivation with population validation"
    }
  ];

  const medicalApplications = [
    {
      category: "Oncology and Chemotherapy",
      importance: "Critical for safe and effective cancer treatment",
      applications: [
        "Chemotherapy dose calculation for over 90% of cancer drugs",
        "Radiation therapy planning and dose distribution",
        "Bone marrow transplant conditioning regimen dosing",
        "Immunotherapy dosing protocols",
        "Cancer research trial enrollment and dosing"
      ],
      clinicalNote: "BSA-based dosing in oncology reduces inter-patient drug exposure variability by 40-60% compared to weight-based dosing",
      safetyImportance: "Critical - incorrect BSA calculation can result in under-dosing (treatment failure) or overdosing (life-threatening toxicity)"
    },
    {
      category: "Cardiology",
      importance: "Essential for accurate cardiac function assessment",
      applications: [
        "Cardiac index calculation (normal: 2.5-4.0 L/min/m²)",
        "Stroke volume index assessment",
        "Valve area calculations and stenosis severity",
        "Echocardiogram interpretation and reporting",
        "Heart transplant evaluation criteria"
      ],
      clinicalNote: "BSA indexing allows comparison of cardiac function across different body sizes, critical for diagnosing heart disease",
      safetyImportance: "Important - BSA indexing may reveal hidden cardiac dysfunction in large or small patients"
    },
    {
      category: "Pediatrics",
      importance: "Fundamental for all pediatric medical calculations",
      applications: [
        "Medication dosing for children and infants",
        "Growth assessment and nutritional planning",
        "Pediatric reference ranges for lab values",
        "Congenital heart disease evaluation",
        "Pediatric research and clinical trials"
      ],
      clinicalNote: "Children have higher BSA-to-weight ratios than adults, making BSA-based dosing more accurate than weight-based",
      safetyImportance: "Critical - pediatric patients are at higher risk for medication errors due to size variations"
    },
    {
      category: "Burn and Trauma Medicine",
      importance: "Life-saving calculations for severe injuries",
      applications: [
        "Burn surface area assessment using Rule of Nines",
        "Fluid resuscitation volume calculations",
        "Burn center transfer criteria",
        "Skin graft planning and donor site selection",
        "Nutritional requirements in burn patients"
      ],
      clinicalNote: "BSA is used to calculate both burn percentage and fluid replacement needs in major burn injuries",
      safetyImportance: "Critical - incorrect fluid resuscitation based on BSA can be life-threatening"
    },
    {
      category: "Nephrology",
      importance: "Kidney function assessment and dialysis planning",
      applications: [
        "Glomerular filtration rate (GFR) indexing",
        "Dialysis adequacy calculations (Kt/V)",
        "Kidney transplant evaluation",
        "Drug dosing in renal impairment",
        "Research in kidney disease"
      ],
      clinicalNote: "BSA normalization allows comparison of kidney function across different body sizes",
      safetyImportance: "Important - affects medication dosing and dialysis prescription in kidney disease"
    },
    {
      category: "Anesthesiology",
      importance: "Safe anesthesia dosing and monitoring",
      applications: [
        "Anesthetic drug dosing calculations",
        "Minimum alveolar concentration (MAC) adjustments",
        "Fluid management during surgery",
        "Post-operative monitoring parameters",
        "Pediatric anesthesia protocols"
      ],
      clinicalNote: "BSA-based dosing improves anesthetic safety and reduces complications",
      safetyImportance: "Important - improves safety margins and reduces anesthetic complications"
    }
  ];

  const clinicalRanges = [
    {
      population: "Adults (18-65 years)",
      normalRange: "1.6-2.0 m²",
      considerations: "Standard reference range for most clinical applications",
      notes: "Average adult BSA is approximately 1.73 m², used as standard for many medical calculations"
    },
    {
      population: "Elderly (65+ years)",
      normalRange: "1.4-1.8 m²",
      considerations: "Age-related changes in body composition affect BSA",
      notes: "Muscle mass decline and fat redistribution may affect BSA accuracy in very elderly patients"
    },
    {
      population: "Children (2-18 years)",
      normalRange: "0.5-1.8 m² (age-dependent)",
      considerations: "Rapid changes during growth spurts require frequent recalculation",
      notes: "Pediatric BSA changes dramatically with age - newborns ~0.25 m², teenagers approach adult values"
    },
    {
      population: "Infants (0-2 years)",
      normalRange: "0.15-0.6 m²",
      considerations: "Highest BSA-to-weight ratio, critical for medication dosing",
      notes: "Premature infants may have BSA as low as 0.1 m², requiring specialized calculations"
    },
    {
      population: "Athletes",
      normalRange: "1.8-2.4 m²",
      considerations: "Higher muscle mass increases BSA relative to height/weight",
      notes: "May require adjusted reference ranges for certain physiological parameters"
    },
    {
      population: "Obese Individuals",
      normalRange: "2.0-3.0+ m²",
      considerations: "Standard formulas may overestimate BSA in severe obesity",
      notes: "Some recommend adjusted formulas or dosing caps for extremely obese patients"
    }
  ];

  const measurementAccuracy = [
    {
      parameter: "Weight Measurement",
      technique: "Use calibrated digital scale, minimal clothing, empty bladder, same time of day",
      accuracy: "±0.1 kg for medical-grade scales",
      tips: [
        "Weigh at same time daily (preferably morning)",
        "Remove shoes and heavy clothing",
        "Use same scale consistently",
        "Ensure scale is on hard, level surface"
      ],
      impact: "1 kg error in weight = ~0.02 m² error in BSA"
    },
    {
      parameter: "Height Measurement",
      technique: "Wall-mounted stadiometer, shoes removed, heels together, head in Frankfurt plane",
      accuracy: "±0.5 cm for proper technique",
      tips: [
        "Remove shoes and hair accessories",
        "Stand against wall with heels together",
        "Keep head level (ear opening at eye level)",
        "Measure during same time of day"
      ],
      impact: "1 cm error in height = ~0.01 m² error in BSA"
    }
  ];

  const expertFAQ = [
    {
      question: "Why is BSA more accurate than body weight for drug dosing?",
      answer: "BSA correlates better with organ function, blood volume, and metabolic rate than body weight alone. These physiological parameters determine how drugs are distributed, metabolized, and eliminated from the body. Studies show BSA-based dosing reduces inter-patient variability in drug exposure by 30-50% compared to weight-based dosing, particularly important for drugs with narrow therapeutic windows like chemotherapy.",
      category: "Medical Applications"
    },
    {
      question: "Which BSA formula should I trust - they give different results?",
      answer: "All major formulas (DuBois, Mosteller, Haycock, Gehan-George) are validated and accurate within 5-10%. DuBois is most widely used and accepted as the standard. Mosteller is simplest for bedside calculations. Haycock is most accurate for children. Gehan-George is preferred in oncology. Differences between formulas are typically <0.1 m², which rarely affects clinical decisions.",
      category: "Calculations"  
    },
    {
      question: "Is BSA calculation accurate for very obese or very thin people?",
      answer: "Standard BSA formulas become less accurate at extreme body sizes. For BMI >40, some formulas may overestimate BSA, potentially leading to overdosing. Conversely, for very thin individuals (BMI <16), formulas may underestimate BSA. Some institutions use modified formulas or dosing caps for extreme body sizes. Clinical judgment and monitoring become more important in these cases.",
      category: "Accuracy Limitations"
    },
    {
      question: "How often should BSA be recalculated during treatment?",
      answer: "For adults in stable condition, monthly recalculation is usually sufficient. For children, especially during growth spurts, recalculation every 2-4 weeks may be needed. During major weight changes (>5-10%), immediate recalculation is recommended. Cancer patients may need more frequent assessment if experiencing significant weight loss during treatment.",
      category: "Clinical Practice"
    },
    {
      question: "Can I use BSA calculators for pediatric patients?",
      answer: "Yes, but pediatric BSA requires special consideration. Children have different body proportions than adults, and BSA changes rapidly during growth. The Haycock formula is most accurate for children. Premature infants and neonates may need specialized calculations. Always use age-appropriate reference ranges and consider consulting pediatric specialists for complex cases.",
      category: "Pediatric Considerations"
    },
    {
      question: "Why do different medical specialties prefer different BSA formulas?",
      answer: "Different formulas were developed and validated in different populations. Oncologists prefer Gehan-George because it was validated in cancer patients. Pediatricians use Haycock because it's most accurate for children. Emergency physicians like Mosteller for its simplicity. The key is using the same formula consistently within a practice or institution for comparative purposes.",
      category: "Formula Selection"
    },
    {
      question: "Is BSA calculation necessary for all medications?",
      answer: "No, BSA-based dosing is primarily used for: chemotherapy drugs, some antibiotics, immunosuppressants, certain cardiac medications, and drugs with narrow therapeutic windows. Most common medications use weight-based or fixed dosing. BSA dosing is most critical when drug toxicity is high and therapeutic window is narrow.",
      category: "Drug Dosing"
    },
    {
      question: "How does age affect BSA accuracy and interpretation?",
      answer: "BSA formulas are most accurate for average-sized adults. In elderly patients, muscle mass loss and fat redistribution may affect accuracy. Children have higher BSA-to-weight ratios, making BSA-based dosing more accurate than weight-based. Neonates and infants require special consideration due to different body proportions and rapid growth rates.",
      category: "Age Factors"
    },
    {
      question: "Can BSA predict my risk for medical complications?",
      answer: "BSA itself doesn't predict disease risk - it's a normalization factor for other measurements. However, BSA helps identify when physiological parameters are abnormal. For example, a cardiac index below 2.5 L/min/m² indicates cardiac dysfunction regardless of body size. BSA allows meaningful comparison of organ function across different body sizes.",
      category: "Health Assessment"
    },
    {
      question: "Should athletes or bodybuilders use different BSA calculations?",
      answer: "Standard BSA formulas work reasonably well for athletic populations, though they may slightly underestimate BSA in very muscular individuals. The difference is usually clinically insignificant. More important is recognizing that athletes may have different normal ranges for BSA-indexed parameters like cardiac index due to physiological adaptations to training.",
      category: "Athletic Considerations"
    },
    {
      question: "What's the difference between BSA and BMI for health assessment?",
      answer: "BSA and BMI serve different purposes. BMI assesses weight status and disease risk related to excess weight. BSA normalizes physiological functions and drug dosing across different body sizes. BSA doesn't indicate if someone is overweight - a 300lb person may have normal cardiac function when indexed to their BSA. BSA is about function normalization, BMI is about weight-related health risks.",
      category: "Comparison with BMI"
    },
    {
      question: "How accurate do weight and height measurements need to be for BSA calculation?",
      answer: "For clinical accuracy, weight should be measured to ±0.5 kg and height to ±1 cm. Small measurement errors have minimal impact on BSA - a 1 kg weight error typically changes BSA by only ~0.02 m². However, for chemotherapy dosing where precision is critical, the most accurate measurements possible should be used. Consistency in measurement technique is more important than absolute precision.",
      category: "Measurement Accuracy"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Body Surface Area Calculator 2025 - Medical BSA Calculator | Professional Drug Dosing & Clinical Tool"
        description="Professional body surface area (BSA) calculator using 5 medical formulas (DuBois, Mosteller, Haycock, Gehan-George, Boyd). Essential for chemotherapy dosing, cardiac assessment, and clinical research. Complete medical guide with expert analysis and clinical applications."
        keywords="body surface area calculator, BSA calculator, medical BSA, drug dosing calculator, chemotherapy dosing, DuBois formula, Mosteller formula, Haycock formula, Gehan George formula, cardiac index calculator, burn assessment calculator, pediatric BSA, oncology dosing, medical calculator, clinical BSA calculation, BSA normalization, pharmaceutical dosing, body surface area formula"
        canonical="/body-surface-area"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebApplication", "MedicalWebPage"],
          "name": "Professional Body Surface Area Calculator & Complete Medical Guide",
          "description": "Comprehensive BSA calculator using 5 medical formulas with complete guide covering drug dosing, cardiac assessment, clinical applications, and medical specialties.",
          "url": "https://bmicalculator.com/body-surface-area",
          "applicationCategory": "HealthApplication",
          "medicalAudience": {
            "@type": "MedicalAudience", 
            "audienceType": ["Healthcare providers", "Oncologists", "Cardiologists", "Pediatricians", "Pharmacists", "Medical researchers", "Nurses"]
          },
          "about": {
            "@type": "MedicalCondition",
            "name": "Body Surface Area Calculation for Medical Applications"
          },
          "featureList": [
            "5 validated BSA formulas (DuBois, Mosteller, Haycock, Gehan-George, Boyd)",
            "Medical specialty applications (oncology, cardiology, pediatrics)",
            "Drug dosing and chemotherapy calculations",
            "Cardiac index and cardiovascular assessment",
            "Clinical research and population studies",
            "Burn assessment and trauma medicine",
            "Expert medical FAQ with 12 detailed questions",
            "Professional measurement accuracy guidelines"
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
            theme === 'dark' ? 'text-teal-400 hover:text-teal-300' : 
            'text-teal-400 hover:text-teal-300'
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
            Professional BSA Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-teal-400 to-blue-500' :
            'bg-gradient-to-r from-teal-400 to-green-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>Medical-Grade Body Surface Area Calculator</strong> - Professional BSA calculation using 5 validated formulas essential for chemotherapy dosing, cardiac assessment, and clinical research. Complete medical guide with expert analysis and clinical applications.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-teal-100 text-teal-800 px-4 py-2">5 Medical Formulas</Badge>
            <Badge className="bg-cyan-100 text-cyan-800 px-4 py-2">Drug Dosing Standard</Badge>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">Clinical Research Grade</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">Medical Professional Tool</Badge>
          </div>

          {/* Medical Disclaimer */}
          <div className={`max-w-4xl mx-auto p-6 rounded-lg border mb-8 ${
            theme === 'white' ? 'bg-amber-50 border-amber-200' : 'bg-amber-900/20 border-amber-800'
          }`}>
            <div className="flex items-start gap-4">
              <AlertCircle className={`h-6 w-6 mt-1 ${
                theme === 'white' ? 'text-amber-600' : 'text-amber-400'
              }`} />
              <div>
                <h3 className={`font-bold text-lg mb-2 ${
                  theme === 'white' ? 'text-amber-800' : 'text-amber-300'
                }`}>
                  Medical Professional Disclaimer
                </h3>
                <p className={`${
                  theme === 'white' ? 'text-amber-700' : 'text-amber-200'
                }`}>
                  This BSA calculator is for educational and informational purposes. All medical dosing calculations should be verified by qualified healthcare professionals. Never use for actual medication dosing without proper medical supervision and validation.
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
                Complete Medical BSA Analysis Guide
              </h2>
              <div className="grid md:grid-cols-5 gap-4">
                <Link to="#calculator" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-teal-50 hover:bg-teal-100 text-teal-700' : 'bg-teal-900/20 hover:bg-teal-900/30 text-teal-300'}`}>
                  <Calculator className="h-6 w-6 mx-auto mb-2" />
                  Calculator
                </Link>
                <Link to="#science" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700' : 'bg-cyan-900/20 hover:bg-cyan-900/30 text-cyan-300'}`}>
                  <Brain className="h-6 w-6 mx-auto mb-2" />
                  Medical Science
                </Link>
                <Link to="#formulas" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-blue-50 hover:bg-blue-100 text-blue-700' : 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-300'}`}>
                  <Activity className="h-6 w-6 mx-auto mb-2" />
                  Formula Analysis
                </Link>
                <Link to="#applications" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-green-50 hover:bg-green-100 text-green-700' : 'bg-green-900/20 hover:bg-green-900/30 text-green-300'}`}>
                  <Stethoscope className="h-6 w-6 mx-auto mb-2" />
                  Clinical Uses
                </Link>
                <Link to="#faq" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-purple-50 hover:bg-purple-100 text-purple-700' : 'bg-purple-900/20 hover:bg-purple-900/30 text-purple-300'}`}>
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
                ? 'bg-gray-800/80 hover:bg-gray-800/90 border-teal-500/20'
                : 'bg-black/80 hover:bg-gray-900/50 border-teal-500/20'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  <Activity className={`h-6 w-6 transition-colors duration-500 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-teal-400' : 
                    'text-teal-400'
                  }`} />
                  BSA Calculator
                </CardTitle>
                <Badge className={`w-fit ${
                  theme === 'white' ? 'bg-teal-100 text-teal-800' :
                  theme === 'dark' ? 'bg-teal-900/50 text-teal-200' :
                  'bg-teal-900/50 text-teal-200'
                }`}>
                  Medical Grade
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Units Selection */}
                <div className="space-y-3">
                  <Label className={`font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Measurement System
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      onClick={() => handleInputChange('units', 'metric')}
                      className={`transition-all duration-300 hover:scale-105 ${
                        formData.units === 'metric'
                          ? theme === 'white' 
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : theme === 'dark'
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-teal-600 text-white border-teal-600'
                          : theme === 'white' 
                          ? 'bg-white text-teal-600 border-teal-300 hover:bg-teal-50' 
                          : theme === 'dark'
                          ? 'bg-gray-700 text-teal-300 border-teal-500/50 hover:bg-teal-900/20'
                          : 'bg-gray-800 text-teal-300 border-teal-500/50 hover:bg-teal-900/20'
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
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : theme === 'dark'
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-teal-600 text-white border-teal-600'
                          : theme === 'white' 
                          ? 'bg-white text-teal-600 border-teal-300 hover:bg-teal-50' 
                          : theme === 'dark'
                          ? 'bg-gray-700 text-teal-300 border-teal-500/50 hover:bg-teal-900/20'
                          : 'bg-gray-800 text-teal-300 border-teal-500/50 hover:bg-teal-900/20'
                      }`}
                    >
                      Imperial (lbs, in)
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
                      theme === 'dark' ? 'text-teal-400' : 
                      'text-teal-400'
                    }`} />
                    Gender *
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-teal-500/30 text-white'
                        : 'bg-gray-900/50 border-teal-500/30 text-white'
                    }`}>
                      <SelectValue placeholder="Select gender" />
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
                    Age (years) *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-teal-500/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20'
                        : 'bg-gray-900/50 border-teal-500/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20'
                    }`}
                  />
                  <p className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Used for age-appropriate reference ranges
                  </p>
                </div>

                {/* Weight Input */}
                <div className="space-y-3">
                  <Label htmlFor="weight" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    <Scale className={`h-4 w-4 ${
                      theme === 'white' ? 'text-teal-600' : 
                      theme === 'dark' ? 'text-teal-400' : 
                      'text-teal-400'
                    }`} />
                    Weight * ({formData.units === 'metric' ? 'kg' : 'lbs'})
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder={formData.units === 'metric' ? '70' : '154'}
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-teal-500/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20'
                        : 'bg-gray-900/50 border-teal-500/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20'
                    }`}
                  />
                </div>

                {/* Height Input */}
                <div className="space-y-3">
                  <Label htmlFor="height" className={`font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Height * ({formData.units === 'metric' ? 'cm' : 'inches'})
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder={formData.units === 'metric' ? '170' : '67'}
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-teal-500/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20'
                        : 'bg-gray-900/50 border-teal-500/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20'
                    }`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={calculateBSA}
                    disabled={loading}
                    className={`flex-1 h-12 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg' 
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white shadow-lg'
                        : 'bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Calculating...
                      </div>
                    ) : (
                      'Calculate BSA'
                    )}
                  </Button>
                  
                  <Button
                    onClick={clearForm}
                    variant="outline"  
                    className={`h-12 px-4 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'border-teal-300 text-teal-600 hover:bg-teal-50' 
                        : theme === 'dark'
                        ? 'border-teal-500/50 text-teal-300 hover:bg-teal-900/20'
                        : 'border-teal-500/50 text-teal-300 hover:bg-teal-900/20'
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
                    ? 'bg-white/80 border-teal-200/20' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80 border-teal-500/20'
                    : 'bg-black/80 border-teal-500/20'
                }`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Your Body Surface Area Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Primary Result */}
                    <div className="text-center space-y-4">
                      <div className={`text-5xl font-bold transition-colors duration-500 ${
                        theme === 'white' ? 'text-teal-600' : 
                        theme === 'dark' ? 'text-teal-400' : 
                        'text-teal-400'
                      }`}>
                        {result.summary?.primaryBSA || result.primary || 'N/A'} m²
                      </div>
                      <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Average BSA (Multiple Formulas)
                      </p>
                      
                      {/* Category Badge */}
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${getCategoryColor(result.summary?.category || result.category || 'Normal')}`}>
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-bold text-lg">{result.summary?.category || result.category || 'Normal'}</span>
                      </div>

                      {/* Normal Range */}
                      <div className={`p-4 rounded-lg border ${
                        theme === 'white' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800/50 border-gray-700'
                      }`}>
                        <p className={`text-sm font-medium ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          Normal Range for Your Demographics
                        </p>
                        <p className={`text-xl font-bold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                          {result.summary?.normalRange || result.normalRange || '1.6-2.0 m²'}
                        </p>
                      </div>
                    </div>

                    {/* Formula Results */}
                    <div className="space-y-4">
                      <h4 className={`font-semibold text-lg ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Formula Results:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(result.formulas || {}).map(([formulaName, value]) => (
                          <div key={formulaName} className={`p-4 rounded-lg border ${
                            theme === 'white' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800/50 border-gray-700'
                          }`}>
                            <div className={`text-sm font-medium ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                              {formulaName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </div>
                            <div className={`text-xl font-bold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                              {value} m²
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Medical Applications Preview */}
                    {result.medicalApplications && (
                      <div className="space-y-4">
                        <h4 className={`font-semibold text-lg ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                          Key Medical Applications:
                        </h4>
                        <div className="grid gap-3">
                          {Object.entries(result.medicalApplications).slice(0, 3).map(([key, app]) => (
                            <div key={key} className={`p-3 rounded-lg border ${
                              theme === 'white' ? 'bg-teal-50 border-teal-200' : 'bg-teal-900/20 border-teal-800'
                            }`}>
                              <h5 className={`font-medium ${
                                theme === 'white' ? 'text-teal-800' : 'text-teal-300'
                              }`}>
                                {app.title || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </h5>
                              <p className={`text-sm ${
                                theme === 'white' ? 'text-teal-700' : 'text-teal-200'
                              }`}>
                                {app.description || app.normalRange || 'Clinical application'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommended Formula */}
                    <div className={`p-4 rounded-lg border ${
                      theme === 'white' ? 'bg-blue-50 border-blue-200' : 'bg-blue-900/20 border-blue-800'
                    }`}>
                      <h4 className={`font-semibold mb-2 ${
                        theme === 'white' ? 'text-blue-800' : 'text-blue-300'
                      }`}>
                        Recommended Formula:
                      </h4>
                      <p className={`text-sm ${
                        theme === 'white' ? 'text-blue-700' : 'text-blue-200'
                      }`}>
                        <strong>DuBois & DuBois (1916)</strong> - Most widely accepted standard in clinical practice and research
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className={`backdrop-blur-md border-0 shadow-xl ${
                theme === 'white' 
                  ? 'bg-white/80 border-teal-200/20' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80 border-teal-500/20'
                  : 'bg-black/80 border-teal-500/20'
              }`}>
                <CardContent className="p-12 text-center">
                  <Activity className={`h-16 w-16 mx-auto mb-4 ${
                    theme === 'white' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    Calculate Your BSA
                  </h3>
                  <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Enter your measurements to get professional BSA analysis using 5 medical formulas
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content Sections */}
        <div className="max-w-6xl mx-auto mt-16 space-y-12">
          {/* BSA Science */}
          <section id="science" className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                The Medical Science of Body Surface Area
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Understanding why BSA is fundamental to modern medicine and clinical practice
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {bsaScience.map((section, index) => (
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
                        theme === 'white' ? 'bg-teal-100' : 
                        theme === 'dark' ? 'bg-teal-900/30' : 
                        'bg-teal-900/30'
                      }`}>
                        <div className={`${
                          theme === 'white' ? 'text-teal-600' : 
                          theme === 'dark' ? 'text-teal-400' : 
                          'text-teal-400'
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
                        theme === 'white' ? 'text-teal-600 hover:text-teal-700' : 'text-teal-400 hover:text-teal-300'
                      }`}>
                        Learn more about the medical science
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
                Complete BSA Formula Analysis
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Comprehensive comparison of all 5 major BSA formulas used in medical practice worldwide
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
                        theme === 'white' ? 'bg-teal-100 text-teal-800 border-teal-200' : 
                        'bg-teal-900/30 text-teal-300 border-teal-700'
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

                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-purple-50' : 'bg-purple-900/20'
                    }`}>
                      <h4 className={`font-medium mb-1 ${
                        theme === 'white' ? 'text-purple-800' : 'text-purple-300'
                      }`}>
                        Development History:
                      </h4>
                      <p className={`text-sm ${
                        theme === 'white' ? 'text-purple-700' : 'text-purple-200'
                      }`}>
                        {formula.development}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Medical Applications */}
          <section id="applications" className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Clinical Applications Across Medical Specialties
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                How BSA is used across different medical specialties for diagnosis, treatment, and research
              </p>
            </div>

            <div className="grid gap-6">
              {medicalApplications.map((specialty, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                  theme === 'white' 
                    ? 'bg-white/80' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80'
                    : 'bg-black/80'
                }`}>
                  <CardHeader>
                    <CardTitle className={`text-xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      {specialty.category}
                    </CardTitle>
                    <Badge className={`w-fit ${
                      specialty.safetyImportance.startsWith('Critical')
                        ? theme === 'white' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-red-900/30 text-red-300 border-red-700'
                        : theme === 'white' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-yellow-900/30 text-yellow-300 border-yellow-700'
                    }`}>
                      {specialty.importance}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Clinical Applications:
                      </h4>
                      <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {specialty.applications.map((app, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Star className="h-3 w-3 mt-1 flex-shrink-0 text-teal-500" />
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-teal-50' : 'bg-teal-900/20'
                    }`}>
                      <h4 className={`font-medium mb-1 ${
                        theme === 'white' ? 'text-teal-800' : 'text-teal-300'
                      }`}>
                        Clinical Note:
                      </h4>
                      <p className={`text-sm ${
                        theme === 'white' ? 'text-teal-700' : 'text-teal-200'
                      }`}>
                        {specialty.clinicalNote}
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg border ${
                      specialty.safetyImportance.startsWith('Critical')
                        ? theme === 'white' ? 'bg-red-50 border-red-200' : 'bg-red-900/20 border-red-800'
                        : theme === 'white' ? 'bg-yellow-50 border-yellow-200' : 'bg-yellow-900/20 border-yellow-800'
                    }`}>
                      <h4 className={`font-medium mb-1 ${
                        specialty.safetyImportance.startsWith('Critical')
                          ? theme === 'white' ? 'text-red-800' : 'text-red-300'
                          : theme === 'white' ? 'text-yellow-800' : 'text-yellow-300'
                      }`}>
                        Safety Importance:
                      </h4>
                      <p className={`text-sm ${
                        specialty.safetyImportance.startsWith('Critical')
                          ? theme === 'white' ? 'text-red-700' : 'text-red-200'
                          : theme === 'white' ? 'text-yellow-700' : 'text-yellow-200'
                      }`}>
                        {specialty.safetyImportance}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Clinical Ranges */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Clinical BSA Reference Ranges
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Normal BSA ranges across different populations and age groups for clinical interpretation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {clinicalRanges.map((range, index) => (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                  theme === 'white' 
                    ? 'bg-white/80' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80'
                    : 'bg-black/80'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      {range.population}
                    </CardTitle>
                    <Badge className={`w-fit ${
                      theme === 'white' ? 'bg-teal-100 text-teal-800' : 'bg-teal-900/30 text-teal-300'
                    }`}>
                      {range.normalRange}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className={`font-medium ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                        Clinical Considerations:
                      </h4>
                      <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {range.considerations}
                      </p>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-blue-50' : 'bg-blue-900/20'
                    }`}>
                      <p className={`text-sm ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
                        <strong>Clinical Note:</strong> {range.notes}
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
                Expert FAQ: Body Surface Area in Medicine
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Comprehensive answers to the most common questions about BSA calculations and medical applications
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
                        theme === 'white' ? 'bg-teal-100 text-teal-800' : 'bg-teal-900/30 text-teal-300'
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
                Related Health Assessment Tools
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Comprehensive health evaluation tools to complement your BSA assessment
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
                  Calculate Body Mass Index for general health assessment
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
                <User className={`h-8 w-8 mb-3 ${
                  theme === 'white' ? 'text-purple-600' : 'text-purple-400'
                }`} />
                <h4 className={`font-semibold mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                  Body Fat Calculator
                </h4>
                <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Measure body composition with US Navy method
                </p>
              </Link>
            </div>
          </Section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BSACalculatorPage;