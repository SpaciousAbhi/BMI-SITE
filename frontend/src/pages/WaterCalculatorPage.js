import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '../hooks/use-toast';
import { 
  Droplets, 
  Calculator, 
  Clock, 
  ThermometerSun,
  Activity,
  User,
  Calendar,
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Info,
  Heart,
  Brain,
  TrendingUp,
  Shield
} from 'lucide-react';
import { 
  calculateWaterIntake, 
  getActivityLevels, 
  getClimateTypes,
  getDehydrationSigns,
  getHydrationTips
} from '../utils/waterCalculations';

const WaterCalculatorPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'lbs',
    age: '',
    gender: 'male',
    activityLevel: 'moderate',
    climate: 'temperate',
    pregnancy: false,
    breastfeeding: false
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      weight: '',
      weightUnit: 'lbs',
      age: '',
      gender: 'male',
      activityLevel: 'moderate',
      climate: 'temperate',
      pregnancy: false,
      breastfeeding: false
    });
    setResult(null);
  };

  const calculateWater = async () => {
    // Validation
    const { weight, age } = formData;
    
    if (!weight || !age) {
      toast({
        title: "Missing Information",
        description: "Please fill in weight and age to calculate your water needs.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      try {
        const waterResult = calculateWaterIntake(
          parseFloat(weight),
          formData.weightUnit,
          formData.activityLevel,
          formData.climate,
          parseInt(age),
          formData.gender,
          formData.pregnancy,
          formData.breastfeeding
        );

        const hydrationTips = getHydrationTips(formData.activityLevel, formData.climate, parseInt(age));
        const dehydrationSigns = getDehydrationSigns();
        
        const resultData = {
          ...waterResult,
          hydrationTips,
          dehydrationSigns,
          formData
        };
        
        setResult(resultData);
        setLoading(false);
        
        toast({
          title: "Hydration Needs Calculated!",
          description: `Your daily water target is ${waterResult.liters}L (${waterResult.ounces} oz)`,
        });
      } catch (error) {
        setLoading(false);
        toast({
          title: "Calculation Error",
          description: "Please check your inputs and try again.",
          variant: "destructive",
        });
      }
    }, 800);
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50';
    }
  };

  // Comprehensive Scientific Content Data
  const hydrationScience = [
    {
      title: "Cellular Hydration & Osmotic Balance",
      icon: <Brain className="h-5 w-5" />,
      content: "Water comprises 60-70% of adult body weight and is essential for maintaining cellular osmotic pressure, nutrient transport, and waste removal. Intracellular fluid (ICF) accounts for 2/3 of total body water, while extracellular fluid (ECF) makes up the remaining 1/3. Proper hydration maintains the delicate balance between sodium and potassium concentrations across cell membranes, crucial for nerve transmission, muscle contraction, and cellular metabolism.",
      keyPoints: [
        "Adult body water content ranges from 50-70% depending on age, gender, and body composition",
        "Intracellular fluid maintains higher potassium and lower sodium concentrations",
        "Even 2% dehydration can impair cognitive function and physical performance",
        "Water moves freely across cell membranes to maintain osmotic equilibrium",
        "Electrolyte balance is as important as total water volume for optimal function"
      ]
    },
    {
      title: "Thermoregulation & Sweat Rate Variability",
      icon: <ThermometerSun className="h-5 w-5" />,
      content: "Humans maintain core body temperature through sophisticated thermoregulatory mechanisms, primarily evaporative cooling via sweating. Sweat rates vary dramatically between individuals (0.5-3.0 L/hour) based on fitness level, acclimatization, genetics, and environmental conditions. Heat acclimatization over 10-14 days can double sweat rate capacity while reducing sodium losses, significantly affecting daily water requirements.",
      keyPoints: [
        "Sweat rates can vary 6-fold between individuals during identical conditions",
        "Heat-acclimatized individuals can produce 2-3L sweat per hour sustainably",
        "Each gram of sweat evaporation removes 2.4 kJ of heat energy from the body",
        "Humidity above 75% significantly impairs evaporative cooling efficiency",
        "Dehydration >3% body weight impairs thermoregulation and increases heat illness risk"
      ]
    },
    {
      title: "Kidney Function & Water Conservation",
      icon: <Shield className="h-5 w-5" />,
      content: "The kidneys are remarkable water conservation organs, filtering 180L of plasma daily while producing only 1-2L of urine. Antidiuretic hormone (ADH) regulates water reabsorption in response to plasma osmolality changes as small as 1%. The kidneys can concentrate urine up to 1200 mOsm/kg, allowing survival with minimal water intake, but optimal function requires adequate hydration to maintain glomerular filtration rate and prevent kidney stone formation.",
      keyPoints: [
        "Kidneys filter entire plasma volume 60+ times daily to maintain homeostasis",
        "ADH release increases exponentially with small increases in plasma osmolality",
        "Maximum urine concentration ability decreases with age and chronic dehydration",
        "Optimal kidney function requires minimum 500ml urine production daily",
        "Chronic mild dehydration increases risk of kidney stones and urinary tract infections"
      ]
    },
    {
      title: "Exercise Hydration & Performance Optimization",
      icon: <Activity className="h-5 w-5" />,
      content: "Exercise dramatically increases water turnover through sweat production, respiratory water loss, and increased metabolic demand. Performance begins declining at 2% body weight loss from dehydration, with further decrements in strength, power, and endurance at higher deficits. Optimal exercise hydration strategies involve pre-loading, during-exercise replacement, and post-exercise rehydration at 150% of fluid losses to account for ongoing sweat production.",
      keyPoints: [
        "Exercise performance declines linearly with dehydration levels >2% body weight",
        "Sweat sodium losses range from 200-2000mg/L varying widely between individuals",
        "Pre-exercise hydration should begin 2-3 hours before activity onset",
        "During exercise, aim to replace 80-100% of sweat losses when possible",
        "Post-exercise rehydration requires 150% fluid replacement of losses incurred"
      ]
    }
  ];

  const calculationMethods = [
    {
      name: "Body Weight Method",
      accuracy: 80,
      description: "Simple calculation based on body weight",
      formula: "30-35ml per kg body weight (0.5-0.6 oz per lb)",
      pros: ["Simple and widely applicable", "Good baseline for sedentary individuals", "Easy to remember and calculate"],
      cons: ["Doesn't account for activity or climate", "May underestimate needs for active individuals", "Ignores individual variation"],
      bestFor: "General population baseline, sedentary individuals"
    },
    {
      name: "Activity-Adjusted Method",
      accuracy: 85,
      description: "Adjusts water needs based on activity level",
      formula: "Base needs + 350-700ml per hour of exercise",
      pros: ["Accounts for increased needs during exercise", "More accurate for active individuals", "Prevents exercise-related dehydration"],
      cons: ["Requires activity level estimation", "Doesn't consider sweat rate differences", "May not account for climate"],
      bestFor: "Recreational athletes, regular exercisers"
    },
    {
      name: "Climate-Adjusted Method",
      accuracy: 88,
      description: "Considers environmental temperature and humidity",
      formula: "Base needs + 12-16ml/kg per °C above 25°C",
      pros: ["Accounts for increased losses in heat", "Prevents heat-related illness", "Considers humidity effects"],
      cons: ["Requires weather data", "Individual heat tolerance varies", "Complex for daily use"],
      bestFor: "Hot climate residents, outdoor workers"
    },
    {
      name: "Comprehensive Method",
      accuracy: 92,
      description: "Integrates weight, activity, climate, and individual factors",
      formula: "Base + Activity + Climate + Special conditions",
      pros: ["Most accurate approach", "Accounts for multiple variables", "Individualized recommendations"],
      cons: ["Complex calculation", "Requires detailed information", "May over-complicate for some users"],
      bestFor: "Athletes, individuals with specific health needs"
    },
    {
      name: "Urine Color Method",
      accuracy: 75,
      description: "Uses urine color as hydration indicator",
      formula: "Drink to maintain pale yellow urine (1-3 on scale)",
      pros: ["Real-time hydration feedback", "No calculations required", "Practical for daily monitoring"],
      cons: ["Affected by medications and foods", "Subjective interpretation", "Lags behind actual hydration status"],
      bestFor: "Daily hydration monitoring, practical assessment"
    }
  ];

  const healthImplications = [
    {
      category: "Optimal Hydration (35-40ml/kg + adjustments)",
      riskLevel: "Very Low",
      ranges: "Supports peak performance and health",
      description: "Adequate hydration maintains cellular function, supports physical and cognitive performance, aids in temperature regulation, and promotes optimal kidney function. This range supports normal physiological processes while providing buffer for environmental and activity stresses.",
      benefits: ["Peak physical and cognitive performance", "Optimal kidney function and waste removal", "Effective temperature regulation", "Healthy skin and joint lubrication", "Reduced kidney stone risk"],
      risks: ["Minimal risks for healthy individuals", "Rare water intoxication if excessive"],
      recommendations: [
        "Distribute water intake throughout the day rather than large boluses",
        "Increase intake during hot weather, illness, or intense exercise",
        "Monitor urine color as practical hydration indicator",
        "Include electrolytes during prolonged sweating or very high intake"
      ]
    },
    {
      category: "Mild Dehydration (2-5% body weight loss)",
      riskLevel: "Low-Moderate",
      ranges: "Noticeable performance and mood effects",
      description: "Mild dehydration commonly occurs in daily life and significantly impacts physical performance, cognitive function, and mood. Even 2% body weight loss from fluid can reduce performance by 10-15% and impair concentration, alertness, and short-term memory.",
      benefits: ["None - represents suboptimal hydration status"],
      risks: ["Reduced physical performance", "Impaired cognitive function", "Mood changes and irritability", "Increased perceived exertion", "Higher core body temperature"],
      recommendations: [
        "Increase fluid intake immediately upon recognition",
        "Focus on regular drinking patterns rather than thirst-driven intake",
        "Monitor urine output and color for early detection",
        "Consider environmental and activity factors increasing needs"
      ]
    },
    {
      category: "Moderate Dehydration (5-10% body weight loss)",
      riskLevel: "Moderate-High",
      ranges: "Significant health and performance impairment",
      description: "Moderate dehydration represents a serious health concern requiring immediate attention. At this level, thermoregulation is compromised, cardiovascular strain increases significantly, and risk of heat-related illness rises substantially.",
      benefits: ["None - represents dangerous dehydration level"],
      risks: ["Severely impaired thermoregulation", "Increased cardiovascular strain", "Risk of heat exhaustion", "Decreased blood volume and pressure", "Potential kidney dysfunction"],
      recommendations: [
        "Seek immediate rehydration and consider medical attention",
        "Rehydrate gradually to avoid rapid fluid shifts",
        "Include electrolytes to support proper rehydration",
        "Monitor for signs of heat illness and cardiovascular stress"
      ]
    },
    {
      category: "Severe Dehydration (>10% body weight loss)",
      riskLevel: "Very High",
      ranges: "Medical emergency requiring immediate intervention",
      description: "Severe dehydration is a life-threatening condition requiring immediate medical intervention. At this level, circulatory shock, organ failure, and death can occur without prompt treatment.",
      benefits: ["None - represents life-threatening condition"],
      risks: ["Circulatory shock and cardiovascular collapse", "Acute kidney injury", "Heat stroke and hyperthermia", "Altered mental status", "Potential death without treatment"],
      recommendations: [
        "Immediate medical attention required",
        "IV fluid replacement typically necessary",
        "Monitor vital signs and mental status",
        "Address underlying causes of fluid loss"
      ]
    }
  ];

  const detailedFAQ = [
    {
      category: "Basics",
      question: "How much water should I drink per day?",
      answer: "Water needs vary significantly based on body weight, activity level, climate, and individual factors. A good starting point is 35ml per kg body weight (0.5-0.6 oz per lb), but this should increase with exercise, hot weather, or illness. For a 70kg (154lb) person, this equals about 2.5L (84 oz) daily as a baseline. Active individuals in hot climates may need 3-5L (100-170 oz) or more. Monitor your urine color - pale yellow indicates good hydration."
    },
    {
      category: "Timing",
      question: "When is the best time to drink water throughout the day?",
      answer: "Optimal hydration timing involves consistent intake throughout the day rather than large volumes at once. Start with 300-500ml upon waking to replace overnight losses. Drink 200-300ml before meals to aid digestion. During exercise, aim for 150-250ml every 15-20 minutes. Avoid excessive intake within 2 hours of bedtime to prevent sleep disruption. The key is steady, consistent intake rather than trying to 'catch up' with large amounts."
    },
    {
      category: "Exercise",
      question: "How much extra water do I need when exercising?",
      answer: "Exercise water needs depend on sweat rate, duration, and environmental conditions. As a general rule, add 350-700ml per hour of exercise to your baseline needs. For precise needs, weigh yourself before and after exercise - each kg (2.2 lbs) of weight loss represents 1L of fluid that should be replaced. During exercise lasting >1 hour, include electrolytes. Pre-hydrate with 400-600ml 2-3 hours before exercise, and aim to replace 80-100% of sweat losses during activity when possible."
    },
    {
      category: "Climate",
      question: "How does hot weather affect my water needs?",
      answer: "Hot weather significantly increases water needs through increased sweat production and respiratory losses. For every degree Celsius above 25°C (77°F), add approximately 12-16ml per kg body weight. In very hot conditions (>35°C/95°F), needs can double or triple. Humidity above 75% further impairs cooling efficiency. Acclimatization over 10-14 days helps, but increased intake is still necessary. Monitor urine color more frequently in heat, and don't rely solely on thirst as it lags behind actual needs."
    },
    {
      category: "Health Conditions",
      question: "Do medical conditions affect my water needs?",
      answer: "Yes, several conditions significantly alter water requirements. Fever increases needs by 10-15% per degree of temperature elevation. Diabetes, particularly with poor control, increases urine losses. Kidney stones, urinary tract infections, and some medications require increased intake. Heart failure or kidney disease may require fluid restrictions - always follow medical advice. Pregnancy and breastfeeding increase needs by 300ml and 500-700ml daily respectively. Vomiting, diarrhea, or excessive sweating require immediate replacement."
    },
    {
      category: "Signs",
      question: "What are the signs of dehydration I should watch for?",
      answer: "Early dehydration signs include: dark yellow urine, thirst, dry mouth, fatigue, headache, and decreased urine output. Moderate dehydration adds: dizziness, rapid heartbeat, reduced skin elasticity (pinch test), and irritability. Severe dehydration symptoms include: very dark or no urine, extreme thirst, confusion, fainting, and rapid/weak pulse. Urine color is the most practical daily indicator - aim for pale yellow. If you're rarely urinating or urine is dark amber, increase intake immediately and consider medical attention for severe symptoms."
    },
    {
      category: "Sources",
      question: "Does all fluid count toward my daily water intake?",
      answer: "Most beverages contribute to hydration, but water is ideal. Coffee and tea provide fluid despite mild diuretic effects - the hydration benefit outweighs water losses. Milk, juice, and sports drinks count but come with calories/sugar considerations. Alcohol is dehydrating and shouldn't count toward daily intake. Foods contribute ~20% of daily fluid intake - fruits, vegetables, soups, and yogurt are good sources. For optimal health, aim for 80% of fluid intake from plain water, with other beverages making up the remainder."
    },
    {
      category: "Quality",
      question: "Does water quality affect hydration effectiveness?",
      answer: "Water quality affects taste and safety more than hydration effectiveness, but some factors matter. Electrolyte content can enhance hydration - naturally mineral-rich waters or added electrolytes help during heavy sweating. Very soft water (low minerals) may be less hydrating than moderate mineral content. Temperature preference varies, but cool water (10-15°C/50-59°F) is often more palatable and may be consumed in larger quantities. Contaminated water poses health risks - use filtered or bottled water when quality is questionable."
    },
    {
      category: "Over-hydration",
      question: "Can I drink too much water? What is water intoxication?",
      answer: "Yes, excessive water intake can cause water intoxication (hyponatremia) where blood sodium becomes dangerously diluted. This typically requires consuming >1L per hour for several hours without electrolyte replacement. Risk factors include: prolonged endurance exercise with only water replacement, certain medications, and underlying health conditions. Symptoms include headache, nausea, confusion, and seizures in severe cases. For most people, drinking >4-5L daily without increased losses is excessive. Include electrolytes during very high intake periods or prolonged sweating."
    },
    {
      category: "Age Factors",
      question: "How do water needs change with age?",
      answer: "Aging affects hydration in several ways. Older adults have reduced thirst sensation, making dehydration more likely. Total body water decreases with age due to muscle loss and increased fat percentage. Kidney concentration ability declines, requiring more water for waste removal. Many medications affect fluid balance. Infants and children have higher water turnover rates relative to body size. Older adults should drink regularly regardless of thirst, monitor urine color closely, and increase intake during illness or medication changes."
    },
    {
      category: "Performance",
      question: "How does hydration affect athletic performance?",
      answer: "Hydration profoundly impacts athletic performance. Even 2% dehydration reduces performance by 10-15%, affecting strength, power, endurance, and skill execution. Dehydration increases perceived exertion, making exercise feel harder at the same intensity. Thermoregulation becomes impaired, increasing overheating risk. Cognitive function declines, affecting decision-making and reaction time. Optimal hydration strategies involve: pre-loading 2-3 hours before, replacing 80-100% of losses during exercise, and 150% replacement post-exercise to account for ongoing losses."
    },
    {
      category: "Weight Loss",
      question: "Can drinking more water help with weight loss?",
      answer: "Yes, adequate hydration supports weight loss through several mechanisms. Water increases satiety when consumed before meals, potentially reducing calorie intake by 75-200 calories per meal. Proper hydration supports optimal metabolism and may increase energy expenditure slightly. Often, thirst is mistaken for hunger, leading to unnecessary calorie consumption. Water has zero calories, making it an ideal replacement for high-calorie beverages. However, water alone won't cause weight loss - it supports overall dietary and lifestyle strategies for healthy weight management."
    },
    {
      category: "Pregnancy",
      question: "How much water do pregnant and breastfeeding women need?",
      answer: "Pregnancy increases water needs to support increased blood volume, fetal development, and amniotic fluid production. Pregnant women should add approximately 300ml (10 oz) to their pre-pregnancy intake, totaling about 2.3-2.7L daily. Breastfeeding dramatically increases needs - add 500-700ml daily above pre-pregnancy levels. Morning sickness may require smaller, more frequent intake. Adequate hydration supports maternal health, prevents constipation, and ensures optimal milk production. Monitor urine color and increase intake during hot weather or exercise. Always consult healthcare providers for personalized recommendations."
    },
    {
      category: "Travel",
      question: "How should I adjust water intake when traveling?",
      answer: "Travel often increases dehydration risk through climate changes, altered routines, and cabin pressure effects during flights. Air travel is particularly dehydrating due to low cabin humidity (10-20% vs 30-60% normally). Drink 200-250ml water per hour of flight time, avoid excessive alcohol/caffeine, and continue hydrating post-flight. When traveling to different climates, adjust intake accordingly - hot destinations require gradual increase over 3-5 days for acclimatization. Time zone changes can disrupt normal drinking patterns, so set reminders. Research water quality at destinations and use bottled/filtered water when necessary."
    },
    {
      category: "Monitoring",
      question: "What's the best way to monitor my hydration status daily?",
      answer: "The most practical daily hydration monitoring method is urine color assessment. Aim for pale yellow (lemonade color) - darker indicates dehydration, while completely clear may suggest over-hydration. Frequency matters too - urinating every 2-4 hours during waking hours is normal. Thirst is a late indicator, so don't rely solely on it. Morning weight can help detect significant dehydration (>1-2% loss suggests inadequate replacement from previous day). Other signs include energy levels, skin elasticity, and overall well-being. Keep a water bottle visible as a reminder to drink regularly throughout the day."
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Professional Water Calculator | Advanced Daily Hydration Calculator 2025 - Optimal Water Intake"
        description="World's most comprehensive water intake calculator with scientific hydration analysis, climate adjustments, 5+ calculation methods, and expert guidance for optimal health and performance. Professional-grade hydration planning."
        keywords="advanced water calculator, professional hydration calculator, daily water intake calculator, optimal water needs, hydration calculator, water intake requirements, climate-adjusted hydration, exercise hydration calculator, dehydration prevention, water intake optimization 2025"
        canonical="/water-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "Professional Water Calculator - Advanced Daily Hydration Calculator",
              "description": "Comprehensive water intake calculator with scientific hydration analysis, climate adjustments, and expert health guidance for optimal results.",
              "url": "https://bmicalculator.com/water-calculator",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "5+ Scientific Calculation Methods",
                "Climate-Adjusted Hydration Analysis", 
                "Exercise & Activity Optimization",
                "Dehydration Prevention Guidance",
                "Professional Health Recommendations"
              ]
            },
            {
              "@type": "MedicalWebPage",
              "name": "Water Calculator - Professional Hydration Tool",
              "description": "Evidence-based water intake calculator with comprehensive health implications analysis and professional recommendations.",
              "medicalSpecialty": "Nutrition",
              "audience": {
                "@type": "MedicalAudience",
                "audienceType": "Patient"
              }
            },
            {
              "@type": "HowTo",
              "name": "How to Calculate Daily Water Requirements",
              "description": "Step-by-step guide to calculating accurate daily water requirements using scientific methods.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Calculate Base Water Needs",
                  "text": "Start with 35ml per kg body weight (0.5-0.6 oz per lb) as your baseline daily water requirement."
                },
                {
                  "@type": "HowToStep", 
                  "name": "Adjust for Activity",
                  "text": "Add 350-700ml per hour of exercise or physical activity to account for increased sweat losses."
                },
                {
                  "@type": "HowToStep",
                  "name": "Consider Climate",
                  "text": "Increase intake by 12-16ml/kg for each degree Celsius above 25°C (77°F) in hot weather conditions."
                },
                {
                  "@type": "HowToStep",
                  "name": "Monitor and Adjust",
                  "text": "Use urine color as a practical indicator - aim for pale yellow and adjust intake based on environmental and activity changes."
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How much water should I drink per day?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Water needs vary based on body weight, activity, and climate. Start with 35ml per kg body weight (0.5-0.6 oz per lb) as baseline, increasing for exercise, hot weather, or individual factors. A 70kg person needs about 2.5L daily minimum."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the signs of dehydration?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "Early signs include dark yellow urine, thirst, dry mouth, fatigue, and headache. Moderate dehydration adds dizziness, rapid heartbeat, and irritability. Severe dehydration causes confusion, fainting, and requires immediate medical attention."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does exercise affect water needs?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Exercise increases water needs through sweat production. Add 350-700ml per hour of exercise to baseline needs. Weigh yourself before and after exercise - each kg lost represents 1L of fluid to replace."
                  }
                }
              ]
            }
          ]
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className={`inline-flex items-center gap-2 text-sm font-medium transition-colors hover:scale-105 ${
            theme === 'white' ? 'text-cyan-600 hover:text-cyan-700' : 
            theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 
            'text-cyan-400 hover:text-cyan-300'
          }`}>
            <ArrowLeft className="h-4 w-4" />
            Back to BMI Calculator
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Professional Water Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' :
            'bg-gradient-to-r from-cyan-400 to-blue-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your optimal daily water intake with scientific precision. Get personalized hydration recommendations for peak performance and health.
          </p>
          
          {/* Professional Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-cyan-100 text-cyan-800' :
              theme === 'dark' ? 'bg-cyan-900/50 text-cyan-200' :
              'bg-cyan-900/50 text-cyan-200'
            }`}>
              💧 Cellular Hydration Science
            </Badge>
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-blue-100 text-blue-800' :
              theme === 'dark' ? 'bg-blue-900/50 text-blue-200' :
              'bg-blue-900/50 text-blue-200'
            }`}>
              🌡️ Climate Optimization
            </Badge>
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-teal-100 text-teal-800' :
              theme === 'dark' ? 'bg-teal-900/50 text-teal-200' :
              'bg-teal-900/50 text-teal-200'
            }`}>
              🏃 Exercise Performance
            </Badge>
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-indigo-100 text-indigo-800' :
              theme === 'dark' ? 'bg-indigo-900/50 text-indigo-200' :
              'bg-indigo-900/50 text-indigo-200'
            }`}>
              🧬 Medical & Athletic Grade
            </Badge>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <a href="#calculator" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-cyan-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50' :
              'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50'
            }`}>
              Calculator
            </a>
            <a href="#science" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-cyan-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50' :
              'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50'
            }`}>
              Hydration Science
            </a>
            <a href="#methods" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-cyan-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50' :
              'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50'
            }`}>
              Calculation Methods
            </a>
            <a href="#health" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-cyan-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50' :
              'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50'
            }`}>
              Health Implications
            </a>
            <a href="#faq" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-cyan-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50' :
              'bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50'
            }`}>
              Expert FAQ
            </a>
          </div>
        </div>

        <div id="calculator" className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card className={`backdrop-blur-md border-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 glass-effect animate-scale-in ${
            theme === 'white' 
              ? 'bg-white/80 hover:bg-white/90 border-cyan-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 hover:bg-gray-800/90 border-cyan-500/20'
              : 'bg-black/80 hover:bg-gray-900/50 border-cyan-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <Droplets className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-cyan-600' : 
                  theme === 'dark' ? 'text-cyan-400' : 
                  'text-cyan-400'
                }`} />
                Water Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Weight Input */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <User className={`h-4 w-4 ${
                    theme === 'white' ? 'text-cyan-600' : 
                    theme === 'dark' ? 'text-cyan-400' : 
                    'text-cyan-400'
                  }`} />
                  Weight
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Enter weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={`transition-all duration-300 ${
                      theme === 'white' 
                        ? 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500' 
                        : theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-400'
                        : 'bg-gray-800 border-gray-600 text-white focus:border-cyan-400'
                    }`}
                  />
                  <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 ${
                      theme === 'white' 
                        ? 'border-gray-300 focus:border-cyan-500' 
                        : 'bg-gray-700 border-gray-600 text-white'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Age Input */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Calendar className={`h-4 w-4 ${
                    theme === 'white' ? 'text-cyan-600' : 
                    theme === 'dark' ? 'text-cyan-400' : 
                    'text-cyan-400'
                  }`} />
                  Age
                </Label>
                <Input
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`transition-all duration-300 ${
                    theme === 'white' 
                      ? 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500' 
                      : theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-400'
                      : 'bg-gray-800 border-gray-600 text-white focus:border-cyan-400'
                  }`}
                />
              </div>

              {/* Gender Select */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <User className={`h-4 w-4 ${
                    theme === 'white' ? 'text-cyan-600' : 
                    theme === 'dark' ? 'text-cyan-400' : 
                    'text-cyan-400'
                  }`} />
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className={`transition-all duration-300 ${
                    theme === 'white' 
                      ? 'border-gray-300 focus:border-cyan-500' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Activity Level Select */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Activity className={`h-4 w-4 ${
                    theme === 'white' ? 'text-cyan-600' : 
                    theme === 'dark' ? 'text-cyan-400' : 
                    'text-cyan-400'
                  }`} />
                  Activity Level
                </Label>
                <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                  <SelectTrigger className={`transition-all duration-300 ${
                    theme === 'white' 
                      ? 'border-gray-300 focus:border-cyan-500' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  }`}>
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

              {/* Climate Select */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <ThermometerSun className={`h-4 w-4 ${
                    theme === 'white' ? 'text-cyan-600' : 
                    theme === 'dark' ? 'text-cyan-400' : 
                    'text-cyan-400'
                  }`} />
                  Climate/Environment
                </Label>
                <Select value={formData.climate} onValueChange={(value) => handleInputChange('climate', value)}>
                  <SelectTrigger className={`transition-all duration-300 ${
                    theme === 'white' 
                      ? 'border-gray-300 focus:border-cyan-500' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getClimateTypes().map(climate => (
                      <SelectItem key={climate.value} value={climate.value}>
                        {climate.label} - {climate.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Special Conditions (for females) */}
              {formData.gender === 'female' && (
                <div className="space-y-3">
                  <Label className={`font-medium transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Special Conditions
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pregnancy"
                        checked={formData.pregnancy}
                        onCheckedChange={(checked) => handleInputChange('pregnancy', checked)}
                      />
                      <Label htmlFor="pregnancy" className={`text-sm transition-colors duration-500 ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        Pregnant
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="breastfeeding"
                        checked={formData.breastfeeding}
                        onCheckedChange={(checked) => handleInputChange('breastfeeding', checked)}
                      />
                      <Label htmlFor="breastfeeding" className={`text-sm transition-colors duration-500 ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        Breastfeeding
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculate Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateWater}
                  disabled={loading || !formData.weight || !formData.age}
                  className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white'
                      : theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white'
                  }`}
                >
                  {loading ? (
                    <Zap className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Calculator className="h-5 w-5 mr-2" />
                  )}
                  {loading ? 'Calculating...' : 'Calculate Water Needs'}
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
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className={`backdrop-blur-md border-0 shadow-2xl transition-all duration-500 glass-effect ${
            theme === 'white' 
              ? 'bg-white/80 border-cyan-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 border-cyan-500/20'
              : 'bg-black/80 border-cyan-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <Droplets className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-cyan-600' : 
                  theme === 'dark' ? 'text-cyan-400' : 
                  'text-cyan-400'
                }`} />
                Your Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Main Results */}
                  <div className={`p-6 rounded-xl transition-all duration-500 ${
                    theme === 'white' 
                      ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200' 
                      : 'bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30'
                  }`}>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className={`text-3xl font-bold transition-colors duration-500 ${
                          theme === 'white' ? 'text-cyan-600' : 'text-cyan-400'
                        }`}>
                          {result.liters}L
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          Liters
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold transition-colors duration-500 ${
                          theme === 'white' ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                          {result.ounces} oz
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          Fluid Ounces
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold transition-colors duration-500 ${
                          theme === 'white' ? 'text-teal-600' : 'text-teal-400'
                        }`}>
                          {result.cups}
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          Cups (8oz)
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold transition-colors duration-500 ${
                          theme === 'white' ? 'text-indigo-600' : 'text-indigo-400'
                        }`}>
                          {result.hourlyIntake}ml
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          Per Hour
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className={`font-semibold mb-2 transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          Optimal Timing Distribution
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className={`transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            <strong>Upon Waking:</strong> {Math.round(result.breakdown?.uponWaking || result.liters * 1000 * 0.15)}ml
                          </div>
                          <div className={`transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            <strong>Before Meals:</strong> {Math.round(result.breakdown?.beforeMeals || result.liters * 1000 * 0.25)}ml
                          </div>
                          <div className={`transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            <strong>During Exercise:</strong> {Math.round(result.breakdown?.duringExercise || result.liters * 1000 * 0.30)}ml
                          </div>
                          <div className={`transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            <strong>Throughout Day:</strong> {Math.round(result.breakdown?.throughoutDay || result.liters * 1000 * 0.30)}ml
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold mb-2 transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          Key Hydration Tips
                        </h4>
                        <div className="space-y-1">
                          {result.hydrationTips?.slice(0, 3).map((tip, index) => (
                            <div key={index} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                              theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 transition-colors duration-500 ${
                                theme === 'white' ? 'text-cyan-500' : 'text-cyan-400'
                              }`} />
                              {tip}
                            </div>
                          )) || [
                            <div key={0} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                              theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 transition-colors duration-500 ${
                                theme === 'white' ? 'text-cyan-500' : 'text-cyan-400'
                              }`} />
                              Distribute water intake throughout the day for optimal absorption
                            </div>,
                            <div key={1} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                              theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 transition-colors duration-500 ${
                                theme === 'white' ? 'text-cyan-500' : 'text-cyan-400'
                              }`} />
                              Monitor urine color - aim for pale yellow as indicator
                            </div>,
                            <div key={2} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                              theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 transition-colors duration-500 ${
                                theme === 'white' ? 'text-cyan-500' : 'text-cyan-400'
                              }`} />
                              Increase intake during hot weather and exercise
                            </div>
                          ]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`text-center py-12 transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  <Droplets className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your details to calculate optimal water intake</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Hydration Science Section */}
        <section id="science" className="mt-16 mb-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              The Science of Optimal Hydration
            </h2>
            <p className={`text-lg max-w-3xl mx-auto transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Understanding the physiological foundations of hydration for optimal health and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {hydrationScience.map((section, index) => (
              <Card 
                key={index} 
                className={`backdrop-blur-md border-0 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${
                  theme === 'white' 
                    ? 'bg-white/90 hover:bg-white/95' 
                    : theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-cyan-500/20'
                    : 'bg-gray-900/90 hover:bg-gray-900/95 border border-cyan-500/20'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg transition-colors duration-500 ${
                      theme === 'white' ? 'bg-cyan-100 text-cyan-600' :
                      theme === 'dark' ? 'bg-cyan-900/50 text-cyan-400' :
                      'bg-cyan-900/50 text-cyan-400'
                    }`}>
                      {section.icon}
                    </div>
                    <h3 className={`text-xl font-semibold transition-colors duration-500 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {section.title}
                    </h3>
                  </div>
                  
                  <p className={`text-sm leading-relaxed mb-4 transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {section.content}
                  </p>

                  <div className="space-y-2">
                    {section.keyPoints.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-colors duration-500 ${
                          theme === 'white' ? 'bg-cyan-500' :
                          theme === 'dark' ? 'bg-cyan-400' :
                          'bg-cyan-400'
                        }`} />
                        <p className={`text-sm transition-colors duration-500 ${
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

        {/* Calculation Methods Section */}
        <section id="methods" className="mb-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Water Calculation Methods Comparison
            </h2>
            <p className={`text-lg max-w-3xl mx-auto transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Compare different scientific approaches to determining optimal water intake
            </p>
          </div>

          <div className="space-y-6">
            {calculationMethods.map((method, index) => (
              <Card 
                key={index}
                className={`backdrop-blur-md border-0 shadow-xl transition-all duration-500 hover:scale-[1.01] ${
                  theme === 'white' 
                    ? 'bg-white/90 hover:bg-white/95' 
                    : theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-cyan-500/20'
                    : 'bg-gray-900/90 hover:bg-gray-900/95 border border-cyan-500/20'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-xl font-semibold transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {method.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <span className={`text-sm font-medium transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            Accuracy:
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Droplets 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.round(method.accuracy / 20) 
                                    ? theme === 'white' ? 'text-blue-500 fill-current' : 'text-blue-400 fill-current'
                                    : theme === 'white' ? 'text-gray-300' : 'text-gray-600'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className={`text-sm font-medium transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            {method.accuracy}%
                          </span>
                        </div>
                      </div>
                      <p className={`text-sm mb-3 transition-colors duration-500 ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className={`font-semibold mb-2 text-green-600 transition-colors duration-500`}>
                        Formula
                      </h4>
                      <p className={`text-sm font-mono p-3 rounded transition-colors duration-500 ${
                        theme === 'white' 
                          ? 'bg-gray-50 text-gray-800' 
                          : 'bg-gray-700/50 text-gray-200'
                      }`}>
                        {method.formula}
                      </p>
                      
                      <h4 className={`font-semibold mb-2 mt-4 text-green-600 transition-colors duration-500`}>
                        Best For
                      </h4>
                      <p className={`text-sm transition-colors duration-500 ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        {method.bestFor}
                      </p>
                    </div>

                    <div>
                      <h4 className={`font-semibold mb-2 text-blue-600 transition-colors duration-500`}>
                        Advantages
                      </h4>
                      <ul className="space-y-1 mb-4">
                        {method.pros.map((pro, proIndex) => (
                          <li key={proIndex} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            <span className="text-green-500 mt-1">+</span>
                            {pro}
                          </li>
                        ))}
                      </ul>

                      <h4 className={`font-semibold mb-2 text-orange-600 transition-colors duration-500`}>
                        Limitations
                      </h4>
                      <ul className="space-y-1">
                        {method.cons.map((con, conIndex) => (
                          <li key={conIndex} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            <span className="text-orange-500 mt-1">-</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Health Implications Section */}
        <section id="health" className="mb-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Health Implications of Hydration Levels
            </h2>
            <p className={`text-lg max-w-3xl mx-auto transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Understanding the health effects of different hydration levels
            </p>
          </div>

          <div className="space-y-6">
            {healthImplications.map((implication, index) => (
              <Card 
                key={index}
                className={`backdrop-blur-md border-0 shadow-xl transition-all duration-500 hover:scale-[1.01] ${
                  theme === 'white' 
                    ? 'bg-white/90 hover:bg-white/95' 
                    : theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-cyan-500/20'
                    : 'bg-gray-900/90 hover:bg-gray-900/95 border border-cyan-500/20'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-xl font-semibold transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {implication.category}
                        </h3>
                        <Badge variant="secondary" className={`
                          ${implication.riskLevel === 'Very Low' 
                            ? 'bg-green-100 text-green-800' 
                            : implication.riskLevel === 'Low-Moderate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : implication.riskLevel === 'Moderate-High'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-red-100 text-red-800'
                          }
                        `}>
                          {implication.riskLevel} Risk
                        </Badge>
                      </div>
                      <p className={`text-sm mb-3 font-medium transition-colors duration-500 ${
                        theme === 'white' ? 'text-cyan-600' : 'text-cyan-400'
                      }`}>
                        {implication.ranges}
                      </p>
                      <p className={`text-sm mb-4 transition-colors duration-500 ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        {implication.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className={`font-semibold mb-2 text-green-600 transition-colors duration-500`}>
                        Benefits
                      </h4>
                      <ul className="space-y-1 mb-4">
                        {implication.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            <span className="text-green-500 mt-1">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>

                      <h4 className={`font-semibold mb-2 text-orange-600 transition-colors duration-500`}>
                        Risks & Considerations
                      </h4>
                      <ul className="space-y-1">
                        {implication.risks.map((risk, riskIndex) => (
                          <li key={riskIndex} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            <span className="text-orange-500 mt-1">⚠</span>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className={`font-semibold mb-2 text-blue-600 transition-colors duration-500`}>
                        Recommendations
                      </h4>
                      <ul className="space-y-1">
                        {implication.recommendations.map((rec, recIndex) => (
                          <li key={recIndex} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            <span className="text-blue-500 mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Expert Hydration FAQ
            </h2>
            <p className={`text-lg max-w-3xl mx-auto transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Comprehensive answers to the most common hydration questions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {detailedFAQ.map((faq, index) => (
              <Card
                key={index}
                className={`backdrop-blur-md border-0 shadow-lg transition-all duration-500 ${
                  theme === 'white' 
                    ? 'bg-white/90 hover:bg-white/95' 
                    : theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-cyan-500/20'
                    : 'bg-gray-900/90 hover:bg-gray-900/95 border border-cyan-500/20'
                }`}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleSection(`faq-${index}`)}
                    className={`w-full p-6 text-left transition-all duration-300 hover:bg-black/5 ${
                      theme === 'dark' ? 'hover:bg-white/5' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Badge 
                          variant="secondary" 
                          className={`px-2 py-1 text-xs transition-colors duration-500 ${
                            theme === 'white' ? 'bg-cyan-100 text-cyan-700' : 'bg-cyan-900/50 text-cyan-300'
                          }`}
                        >
                          {faq.category}
                        </Badge>
                        <h3 className={`text-lg font-semibold transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                      {expandedSections[`faq-${index}`] ? (
                        <ChevronDown className={`h-5 w-5 transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                        }`} />
                      ) : (
                        <ChevronRight className={`h-5 w-5 transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                  </button>
                  {expandedSections[`faq-${index}`] && (
                    <div className="px-6 pb-6">
                      <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WaterCalculatorPage;