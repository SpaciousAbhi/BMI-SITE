import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '../hooks/use-toast';
import { 
  Calculator, 
  Dumbbell, 
  Target, 
  Clock, 
  ChevronDown, 
  ChevronRight,
  Utensils,
  Zap,
  Award,
  Users,
  Activity,
  User,
  Calendar,
  ArrowLeft,
  Info,
  Heart,
  Brain,
  TrendingUp,
  Shield
} from 'lucide-react';
import { 
  calculateProteinIntake, 
  getActivityLevels, 
  getGoalTypes, 
  getProteinRecommendations,
  getProteinHealthBenefits
} from '../utils/proteinCalculations';

const ProteinCalculatorPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'lbs',
    age: '',
    gender: 'male',
    activityLevel: 'moderately_active',
    goal: 'maintenance'
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
      activityLevel: 'moderately_active',
      goal: 'maintenance'
    });
    setResult(null);
  };

  const calculateProtein = async () => {
    // Validation
    const { weight, age, gender, activityLevel, goal } = formData;
    
    if (!weight || !age) {
      toast({
        title: "Missing Information",
        description: "Please fill in weight and age to calculate your protein needs.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      try {
        const proteinResult = calculateProteinIntake(
          parseFloat(weight),
          formData.weightUnit,
          activityLevel,
          goal,
          parseInt(age),
          gender
        );

        const recommendations = getProteinRecommendations(proteinResult, activityLevel, goal, parseInt(age), gender);
        const healthBenefits = getProteinHealthBenefits(goal, activityLevel);
        
        const resultData = {
          ...proteinResult,
          recommendations,
          healthBenefits,
          formData
        };
        
        setResult(resultData);
        setLoading(false);
        
        toast({
          title: "Protein Needs Calculated!",
          description: `Your daily protein target is ${proteinResult.totalGrams}g`,
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
        return 'bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50';
    }
  };

  // Comprehensive Scientific Content Data
  const proteinScience = [
    {
      title: "Muscle Protein Synthesis & Leucine Threshold",
      icon: <Dumbbell className="h-5 w-5" />,
      content: "Muscle protein synthesis (MPS) is maximally stimulated by approximately 2.5-3g of leucine per meal, typically found in 20-30g of high-quality protein. This leucine threshold effect means that consuming larger amounts of protein in a single meal doesn't proportionally increase MPS, making meal distribution crucial for optimization. The anabolic window remains elevated for 3-5 hours post-meal, requiring strategic timing for continuous muscle protein accretion.",
      keyPoints: [
        "Leucine acts as the primary mTOR pathway trigger for muscle protein synthesis",
        "20-30g protein per meal optimally stimulates MPS in most individuals",
        "Protein timing every 3-4 hours maintains elevated amino acid levels",
        "Post-exercise MPS remains elevated for 24-48 hours with adequate protein",
        "Older adults may require 30-40g protein per meal for optimal leucine threshold"
      ]
    },
    {
      title: "Complete vs Incomplete Proteins & Amino Acid Profiles",
      icon: <Shield className="h-5 w-5" />,
      content: "Complete proteins contain all nine essential amino acids in adequate proportions for human needs, while incomplete proteins lack one or more essential amino acids. Protein quality is measured using various scoring systems including PDCAAS (Protein Digestibility Corrected Amino Acid Score) and DIAAS (Digestible Indispensable Amino Acid Score). Animal proteins typically score higher, but strategic plant protein combinations can achieve complete amino acid profiles.",
      keyPoints: [
        "Essential amino acids cannot be synthesized by the body and must be consumed",
        "Animal proteins (meat, dairy, eggs) are naturally complete proteins",
        "Plant protein combining (rice + beans) creates complete amino acid profiles",
        "Whey protein has the highest biological value and absorption rate",
        "Quinoa, hemp, and chia seeds are rare plant-based complete proteins"
      ]
    },
    {
      title: "Protein Turnover & Nitrogen Balance",
      icon: <TrendingUp className="h-5 w-5" />,
      content: "Protein turnover is the continuous process of protein breakdown (catabolism) and synthesis (anabolism). Healthy adults typically turn over 300-400g of protein daily, regardless of intake. Positive nitrogen balance indicates net protein synthesis (muscle growth), while negative balance suggests protein breakdown exceeds synthesis. This dynamic process requires consistent protein intake to maintain optimal balance and support tissue repair.",
      keyPoints: [
        "Daily protein turnover is 3-4x higher than typical protein intake",
        "Positive nitrogen balance is required for muscle growth and recovery",
        "Protein quality affects nitrogen retention and utilization efficiency",
        "Stress, illness, and intense training increase protein turnover rates",
        "Timing protein intake around exercise optimizes nitrogen balance"
      ]
    },
    {
      title: "Age-Related Protein Metabolism & Sarcopenia Prevention",
      icon: <Clock className="h-5 w-5" />,
      content: "Aging is associated with anabolic resistance - a reduced sensitivity to protein intake for muscle protein synthesis. Adults over 65 may require 1.2-1.6g/kg body weight to maintain muscle mass, significantly higher than younger adults. Sarcopenia (age-related muscle loss) begins around age 30, accelerating after 50. Higher protein intake combined with resistance training effectively counters muscle loss and maintains functional capacity in older adults.",
      keyPoints: [
        "Anabolic resistance increases protein requirements with age",
        "Sarcopenia results in 3-8% muscle loss per decade after age 30",
        "Older adults require 1.2-1.6g/kg body weight minimum for muscle maintenance",
        "Leucine supplementation may help overcome anabolic resistance",
        "Resistance training amplifies protein utilization at any age"
      ]
    }
  ];

  const calculationMethods = [
    {
      name: "RDA Method (Recommended Dietary Allowance)",
      accuracy: 70,
      description: "Minimum requirement for sedentary adults",
      formula: "0.8g per kg body weight (0.36g per lb)",
      pros: ["Government approved standard", "Prevents deficiency diseases", "Simple calculation"],
      cons: ["Too low for active individuals", "Doesn't optimize body composition", "Doesn't account for goals"],
      bestFor: "Sedentary individuals, minimum health maintenance"
    },
    {
      name: "Activity-Adjusted Method",
      accuracy: 85,
      description: "Adjusts protein based on activity level and goals",
      formula: "Sedentary: 1.0-1.2g/kg\nActive: 1.4-1.8g/kg\nAthlete: 1.6-2.2g/kg",
      pros: ["Accounts for activity level", "Supports muscle maintenance", "Evidence-based ranges"],
      cons: ["Broad ranges", "Doesn't consider individual factors", "May not optimize specific goals"],
      bestFor: "General population with varying activity levels"
    },
    {
      name: "Goal-Specific Method",
      accuracy: 92,
      description: "Tailors protein to specific fitness and body composition goals",
      formula: "Fat Loss: 1.6-2.4g/kg\nMuscle Gain: 1.8-2.8g/kg\nMaintenance: 1.4-1.8g/kg",
      pros: ["Goal optimization", "Body composition focus", "Research-backed ranges"],
      cons: ["Requires goal clarity", "Higher intakes may be costly", "Individual variation exists"],
      bestFor: "Individuals with specific fitness goals"
    },
    {
      name: "Lean Body Mass Method",
      accuracy: 95,
      description: "Most accurate when body fat percentage is known",
      formula: "1.8-2.2g per kg of lean body mass",
      pros: ["Highest accuracy", "Accounts for body composition", "Minimizes overestimation in overweight individuals"],
      cons: ["Requires body fat measurement", "More complex calculation", "Not practical for everyone"],
      bestFor: "Athletes, individuals with known body composition"
    },
    {
      name: "Calorie Percentage Method",
      accuracy: 75,
      description: "Simple percentage of total daily calories",
      formula: "15-30% of total daily calories from protein",
      pros: ["Easy to track with calorie counting", "Automatically adjusts with calorie changes", "Flexible approach"],
      cons: ["Less precise than weight-based methods", "Can vary significantly with calorie intake", "May not meet minimum needs on low calories"],
      bestFor: "Calorie counters, flexible dieters"
    }
  ];

  const healthImplications = [
    {
      category: "Optimal Protein Intake (1.6-2.2g/kg)",
      riskLevel: "Very Low",
      ranges: "Body composition optimization, athletic performance",
      description: "Research-backed protein ranges that support muscle protein synthesis, satiety, and metabolic health. This range optimizes body composition while maintaining excellent safety profiles in healthy individuals.",
      benefits: ["Enhanced muscle protein synthesis", "Improved satiety and appetite control", "Better body composition", "Faster recovery from exercise", "Maintained metabolic rate during calorie restriction"],
      risks: ["Minimal risks in healthy individuals", "Requires adequate hydration"],
      recommendations: [
        "Distribute protein evenly across 3-4 meals for optimal MPS",
        "Include complete protein sources at each meal",
        "Time protein intake around resistance training sessions",
        "Maintain adequate water intake (35ml per kg body weight minimum)"
      ]
    },
    {
      category: "High Protein Intake (2.4-3.5g/kg)",
      riskLevel: "Low-Moderate",
      ranges: "Aggressive fat loss, competitive athletes",
      description: "Very high protein intakes used in specific contexts like contest preparation or extreme fat loss phases. Generally safe for healthy individuals but requires careful monitoring of overall nutritional balance and kidney function.",
      benefits: ["Maximum muscle preservation during severe calorie restriction", "Highest thermic effect", "Superior satiety", "May support very high training volumes"],
      risks: ["Potential kidney stress in predisposed individuals", "Displacement of other macronutrients", "Digestive issues", "Higher cost"],
      recommendations: [
        "Monitor kidney function with regular blood tests",
        "Ensure adequate fiber and micronutrient intake",
        "Use only during specific training phases (8-16 weeks max)",
        "Work with qualified nutrition professional"
      ]
    },
    {
      category: "Low Protein Intake (<1.2g/kg)",
      riskLevel: "Moderate-High",
      ranges: "Below optimal for active individuals",
      description: "Protein intakes below 1.2g/kg may be adequate for sedentary individuals but are suboptimal for anyone engaged in regular exercise, aging adults, or those with body composition goals.",
      benefits: ["Lower food costs", "Easier for some plant-based diets", "May reduce some chronic disease markers"],
      risks: ["Muscle loss over time", "Poor recovery from exercise", "Reduced metabolic rate", "Increased hunger and cravings", "Compromised immune function"],
      recommendations: [
        "Gradually increase protein intake to at least 1.4g/kg",
        "Focus on high-quality complete protein sources",
        "Consider protein supplementation if whole food intake is difficult",
        "Monitor body composition and strength levels closely"
      ]
    },
    {
      category: "Excessive Protein Intake (>4.0g/kg)",
      riskLevel: "High",
      ranges: "Potentially harmful long-term",
      description: "Protein intakes above 4.0g/kg body weight provide no additional benefits and may carry health risks. This level often occurs with excessive supplementation or extreme dietary approaches without proper guidance.",
      benefits: ["No additional benefits beyond optimal ranges"],
      risks: ["Potential kidney damage", "Dehydration", "Nutrient deficiencies", "Digestive distress", "Unnecessary financial burden", "Displacement of essential fats and carbohydrates"],
      recommendations: [
        "Reduce intake to evidence-based ranges (1.6-2.8g/kg)",
        "Focus on protein distribution and timing rather than total amount",
        "Reassess nutritional approach with qualified professional",
        "Monitor health markers if intake has been excessive long-term"
      ]
    }
  ];

  const detailedFAQ = [
    {
      category: "Basics",
      question: "How much protein do I really need per day?",
      answer: "Protein needs vary significantly based on activity level, goals, age, and body composition. The RDA of 0.8g/kg (0.36g/lb) is a minimum to prevent deficiency in sedentary adults. For optimal health and body composition: sedentary adults need 1.2-1.4g/kg, recreational athletes need 1.4-1.8g/kg, serious athletes need 1.6-2.2g/kg, and those in fat loss phases may benefit from 1.8-2.4g/kg. Always calculate based on body weight or lean body mass for accuracy."
    },
    {
      category: "Timing",
      question: "Does protein timing matter or just total daily intake?",
      answer: "Both matter, but total daily intake is more important than precise timing. Muscle protein synthesis is maximally stimulated by 20-30g of high-quality protein per meal, with benefits lasting 3-5 hours. Eating protein every 3-4 hours optimizes this process. Post-workout protein within 2 hours is beneficial but not critical if total daily intake is adequate. For muscle growth, aim for 3-4 protein-rich meals per day rather than trying to hit precise timing windows."
    },
    {
      category: "Sources",
      question: "Are plant proteins as good as animal proteins?",
      answer: "Animal proteins are generally superior due to complete amino acid profiles and higher digestibility scores (PDCAAS/DIAAS). However, well-planned plant protein diets can be equally effective. The key is combining complementary plant proteins (rice + beans, quinoa + hemp) and consuming 10-15% more total protein to account for lower digestibility. Soy, quinoa, hemp, and chia are complete plant proteins. Plant-based athletes often need 1.8-2.4g/kg compared to 1.6-2.2g/kg for omnivores."
    },
    {
      category: "Muscle Building",
      question: "How much protein do I need to build muscle effectively?",
      answer: "For muscle building, aim for 1.8-2.8g per kg body weight (0.8-1.3g per lb), with higher intakes for advanced trainees or during aggressive training phases. More important than total amount is consistent intake: eat 25-40g protein every 3-4 hours, including post-workout. The muscle-building response plateaus around 2.2g/kg in most people. Combine adequate protein with progressive resistance training - protein alone won't build muscle without appropriate stimulation. Beginners can build muscle on lower intakes, while advanced trainees benefit from higher amounts."
    },
    {
      category: "Weight Loss",
      question: "Why is protein intake higher during fat loss phases?",
      answer: "Higher protein during fat loss (1.8-2.4g/kg) serves multiple purposes: it preserves muscle mass during calorie restriction, has the highest thermic effect (burning 20-30% of protein calories during digestion), provides superior satiety to reduce hunger, and maintains metabolic rate better than lower protein intakes. During aggressive fat loss, protein needs can increase to 2.4-3.5g/kg to maximally preserve lean tissue. This is especially important for athletes or those with significant muscle mass to maintain."
    },
    {
      category: "Age Factors",
      question: "Do protein needs change with age?",
      answer: "Yes, protein needs generally increase with age due to anabolic resistance - reduced sensitivity to protein for muscle building. Adults over 50 should aim for 1.2-1.6g/kg minimum, with active older adults needing 1.6-2.0g/kg. Meal distribution becomes more important: older adults may need 30-40g protein per meal to maximally stimulate muscle protein synthesis compared to 20-25g for younger adults. This helps combat sarcopenia (age-related muscle loss) and maintains functional capacity. Combined with resistance training, higher protein intake significantly improves aging outcomes."
    },
    {
      category: "Digestion",
      question: "Can my body only absorb 20-30g of protein per meal?",
      answer: "This is a common myth. Your body can absorb virtually all dietary protein consumed, but muscle protein synthesis (MPS) plateaus around 20-30g per meal in young adults (30-40g in older adults). Consuming more protein in one meal won't waste it - excess amino acids are used for other bodily functions, converted to glucose, or stored as fat if calories are excessive. However, for optimal MPS throughout the day, distributing protein across multiple meals is more effective than consuming large amounts infrequently."
    },
    {
      category: "Supplements",
      question: "Are protein supplements necessary or are whole foods better?",
      answer: "Whole foods are generally superior due to complete nutrient profiles, fiber, and natural food matrices that may enhance absorption. However, protein supplements are convenient, cost-effective, and have excellent amino acid profiles. Whey protein has the highest biological value and absorption rate. Supplements are particularly useful post-workout, for meeting high protein targets, or when whole food access is limited. Aim for 80% of protein from whole foods, using supplements to fill gaps. Quality matters - look for third-party tested products with minimal additives."
    },
    {
      category: "Kidneys",
      question: "Will high protein intake damage my kidneys?",
      answer: "In healthy individuals, high protein intake (up to 3.5g/kg) does not cause kidney damage, according to extensive research. Your kidneys easily handle normal protein loads and adapt to higher intakes. However, individuals with existing kidney disease should limit protein intake under medical supervision. High protein does increase kidney workload and requires adequate hydration (35-40ml per kg body weight). If you have risk factors for kidney disease (diabetes, hypertension, family history), consult your doctor before consuming very high protein amounts (>2.5g/kg) long-term."
    },
    {
      category: "Athletes",
      question: "Do endurance athletes need as much protein as strength athletes?",
      answer: "Endurance athletes need substantial protein (1.4-1.8g/kg) but generally less than strength athletes (1.8-2.8g/kg). Endurance exercise increases protein oxidation for fuel and creates muscle damage requiring repair. Marathon runners, cyclists, and triathletes should prioritize protein intake post-exercise and throughout the day. Ultra-endurance athletes may need protein similar to strength athletes due to extreme muscle damage. The key difference is timing: endurance athletes benefit from some protein during long sessions (>2-3 hours) to minimize muscle breakdown."
    },
    {
      category: "Medical Conditions",
      question: "How do medical conditions affect protein requirements?",
      answer: "Several conditions significantly alter protein needs. Diabetes may benefit from higher protein for blood sugar control and satiety. Liver disease often requires protein restriction under medical supervision. Inflammatory conditions increase protein turnover, raising requirements. Cancer and other wasting diseases dramatically increase needs. Post-surgery or injury recovery requires 1.5-2.0x normal intake. Digestive disorders may require specialized protein forms. Always work with healthcare providers when medical conditions are present, as individual needs vary greatly and some conditions contraindicate high protein intakes."
    },
    {
      category: "Pregnancy",
      question: "How much protein do pregnant and breastfeeding women need?",
      answer: "Pregnancy increases protein needs progressively: first trimester requires normal intake, second trimester adds ~25g daily, and third trimester adds ~25g daily, totaling about 1.2-1.4g/kg plus 25g. Breastfeeding requires an additional 25g daily above pre-pregnancy needs. Focus on high-quality complete proteins for fetal development. Plant-based pregnant women should emphasize protein combining and may need 10-15% higher intakes. Always consult healthcare providers during pregnancy, as individual needs vary and some protein sources should be limited (certain fish, raw foods)."
    },
    {
      category: "Budget",
      question: "What are the most cost-effective protein sources?",
      answer: "Most cost-effective complete proteins include eggs, chicken thighs, canned tuna, Greek yogurt, cottage cheese, and whey protein powder. Plant-based options like dried legumes (lentils, chickpeas, black beans), peanut butter, and tofu offer excellent protein per dollar when combined properly. Buying in bulk, choosing less popular cuts of meat, and using frozen proteins can significantly reduce costs. Protein powder often provides the best cost per gram of protein. Mix expensive complete proteins with cheaper incomplete ones (rice + beans) to optimize both cost and amino acid profiles."
    },
    {
      category: "Body Composition",
      question: "Can eating too much protein make me gain fat?",
      answer: "Protein has the least likelihood of converting to fat due to its high thermic effect (20-30% of calories burned during digestion) and role in muscle maintenance. However, excessive calories from any source, including protein, can lead to fat gain. Protein's satiety effects usually prevent overconsumption. Studies show protein intakes up to 3.0g/kg don't cause fat gain when calories are controlled. In fact, higher protein often improves body composition by preserving muscle during weight loss and increasing metabolic rate. Focus on total calorie balance rather than worrying about protein causing fat gain."
    },
    {
      category: "Performance",
      question: "How does protein intake affect athletic performance?",
      answer: "Adequate protein is crucial for athletic performance through multiple mechanisms: maintains and builds muscle mass for power output, speeds recovery between training sessions, provides amino acids for energy during prolonged exercise, supports immune function under training stress, and helps maintain optimal body composition. Insufficient protein leads to poor recovery, muscle loss, increased injury risk, and declining performance over time. However, excessive protein (>3.0g/kg) doesn't further improve performance and may displace important carbohydrates for fuel. Optimal protein supports consistent high-quality training, which drives performance improvements."
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Professional Protein Calculator | Advanced Daily Protein Intake Calculator 2025 - Muscle Building & Weight Loss"
        description="World's most comprehensive protein calculator with scientific calculations, muscle protein synthesis analysis, 5+ calculation methods, and expert guidance for muscle building, weight loss, and athletic performance. Professional-grade nutrition planning."
        keywords="advanced protein calculator, professional daily protein calculator, muscle protein synthesis calculator, protein intake calculator, muscle building protein, weight loss protein, athletic protein needs, protein requirements calculator, optimal protein intake, leucine threshold calculator, anabolic resistance protein 2025"
        canonical="/protein-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "Professional Protein Calculator - Advanced Daily Protein Intake Calculator",
              "description": "Comprehensive protein calculator with scientific analysis, muscle protein synthesis optimization, and expert nutrition guidance for optimal results.",
              "url": "https://bmicalculator.com/protein-calculator",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "5+ Scientific Calculation Methods",
                "Muscle Protein Synthesis Analysis", 
                "Goal-Specific Recommendations",
                "Age-Adjusted Requirements",
                "Professional Nutrition Guidance"
              ]
            },
            {
              "@type": "MedicalWebPage",
              "name": "Protein Calculator - Professional Nutrition Tool",
              "description": "Evidence-based protein calculator with comprehensive health implications analysis and professional recommendations.",
              "medicalSpecialty": "Nutrition",
              "audience": {
                "@type": "MedicalAudience",
                "audienceType": "Patient"
              }
            },
            {
              "@type": "HowTo",
              "name": "How to Calculate Daily Protein Requirements",
              "description": "Step-by-step guide to calculating accurate daily protein requirements using scientific methods.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Determine Your Base Protein Needs",
                  "text": "Calculate your minimum protein requirements based on body weight, activity level, and demographic factors."
                },
                {
                  "@type": "HowToStep", 
                  "name": "Assess Your Goals",
                  "text": "Adjust protein intake based on specific goals: muscle building (1.8-2.8g/kg), fat loss (1.8-2.4g/kg), or maintenance (1.4-1.8g/kg)."
                },
                {
                  "@type": "HowToStep",
                  "name": "Optimize Distribution",
                  "text": "Distribute protein across 3-4 meals with 20-30g per meal to maximize muscle protein synthesis throughout the day."
                },
                {
                  "@type": "HowToStep",
                  "name": "Monitor and Adjust",
                  "text": "Track body composition changes and adjust protein intake based on progress toward your specific goals."
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How much protein do I need per day?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Protein needs vary based on goals and activity. Sedentary adults need 1.2-1.4g/kg, recreational athletes need 1.4-1.8g/kg, serious athletes need 1.6-2.2g/kg, and fat loss phases may require 1.8-2.4g/kg body weight."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does protein timing matter for muscle building?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "Both timing and total daily intake matter. Muscle protein synthesis is optimized by consuming 20-30g protein every 3-4 hours. Post-workout protein within 2 hours is beneficial but total daily intake is more important."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will high protein intake damage my kidneys?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In healthy individuals, high protein intake up to 3.5g/kg does not cause kidney damage according to research. Adequate hydration is important, and those with existing kidney conditions should consult medical professionals."
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
            theme === 'white' ? 'text-emerald-600 hover:text-emerald-700' : 
            theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 
            'text-emerald-400 hover:text-emerald-300'
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
            Professional Protein Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-emerald-400 to-cyan-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-emerald-400 to-cyan-500' :
            'bg-gradient-to-r from-emerald-400 to-cyan-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your optimal daily protein intake with scientific precision. Get personalized recommendations for muscle building, weight loss, and athletic performance.
          </p>
          
          {/* Professional Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-emerald-100 text-emerald-800' :
              theme === 'dark' ? 'bg-emerald-900/50 text-emerald-200' :
              'bg-emerald-900/50 text-emerald-200'
            }`}>
              🧬 Muscle Protein Synthesis Science
            </Badge>
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-blue-100 text-blue-800' :
              theme === 'dark' ? 'bg-blue-900/50 text-blue-200' :
              'bg-blue-900/50 text-blue-200'
            }`}>
              🎯 5+ Calculation Methods
            </Badge>
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-purple-100 text-purple-800' :
              theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
              'bg-purple-900/50 text-purple-200'
            }`}>
              ⚡ Goal Optimization
            </Badge>
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-orange-100 text-orange-800' :
              theme === 'dark' ? 'bg-orange-900/50 text-orange-200' :
              'bg-orange-900/50 text-orange-200'
            }`}>
              🏆 Athletic & Medical Grade
            </Badge>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <a href="#calculator" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-emerald-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50' :
              'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50'
            }`}>
              Calculator
            </a>
            <a href="#science" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-emerald-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50' :
              'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50'
            }`}>
              Protein Science
            </a>
            <a href="#methods" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-emerald-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50' :
              'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50'
            }`}>
              Calculation Methods
            </a>
            <a href="#health" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-emerald-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50' :
              'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50'
            }`}>
              Health Implications
            </a>
            <a href="#faq" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-emerald-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50' :
              'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50'
            }`}>
              Expert FAQ
            </a>
          </div>
        </div>

        <div id="calculator" className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
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
                <Dumbbell className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-emerald-600' : 
                  theme === 'dark' ? 'text-emerald-400' : 
                  'text-emerald-400'
                }`} />
                Protein Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Weight Input */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <User className={`h-4 w-4 ${
                    theme === 'white' ? 'text-emerald-600' : 
                    theme === 'dark' ? 'text-emerald-400' : 
                    'text-emerald-400'
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
                        ? 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500' 
                        : theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-emerald-400'
                        : 'bg-gray-800 border-gray-600 text-white focus:border-emerald-400'
                    }`}
                  />
                  <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 ${
                      theme === 'white' 
                        ? 'border-gray-300 focus:border-emerald-500' 
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
                    theme === 'white' ? 'text-emerald-600' : 
                    theme === 'dark' ? 'text-emerald-400' : 
                    'text-emerald-400'
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
                      ? 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500' 
                      : theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-emerald-400'
                      : 'bg-gray-800 border-gray-600 text-white focus:border-emerald-400'
                  }`}
                />
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
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className={`transition-all duration-300 ${
                    theme === 'white' 
                      ? 'border-gray-300 focus:border-emerald-500' 
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
                    theme === 'white' ? 'text-emerald-600' : 
                    theme === 'dark' ? 'text-emerald-400' : 
                    'text-emerald-400'
                  }`} />
                  Activity Level
                </Label>
                <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                  <SelectTrigger className={`transition-all duration-300 ${
                    theme === 'white' 
                      ? 'border-gray-300 focus:border-emerald-500' 
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

              {/* Goal Select */}
              <div className="space-y-3">
                <Label className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Target className={`h-4 w-4 ${
                    theme === 'white' ? 'text-emerald-600' : 
                    theme === 'dark' ? 'text-emerald-400' : 
                    'text-emerald-400'
                  }`} />
                  Primary Goal
                </Label>
                <Select value={formData.goal} onValueChange={(value) => handleInputChange('goal', value)}>
                  <SelectTrigger className={`transition-all duration-300 ${
                    theme === 'white' 
                      ? 'border-gray-300 focus:border-emerald-500' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  }`}>
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

              {/* Calculate Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateProtein}
                  disabled={loading || !formData.weight || !formData.age}
                  className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white'
                      ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white'
                      : theme === 'dark'
                      ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white'
                      : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white'
                  }`}
                >
                  {loading ? (
                    <Zap className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Calculator className="h-5 w-5 mr-2" />
                  )}
                  {loading ? 'Calculating...' : 'Calculate Protein'}
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
              ? 'bg-white/80 border-emerald-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 border-emerald-500/20'
              : 'bg-black/80 border-emerald-500/20'
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
                Your Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Main Results */}
                  <div className={`p-6 rounded-xl transition-all duration-500 ${
                    theme === 'white' 
                      ? 'bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200' 
                      : 'bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30'
                  }`}>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className={`text-3xl font-bold transition-colors duration-500 ${
                          theme === 'white' ? 'text-emerald-600' : 'text-emerald-400'
                        }`}>
                          {result.totalGrams}g
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          Daily Protein
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold transition-colors duration-500 ${
                          theme === 'white' ? 'text-cyan-600' : 'text-cyan-400'
                        }`}>
                          {result.perPound}g
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          Per {formData.weightUnit === 'lbs' ? 'Pound' : 'Kilogram'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold transition-colors duration-500 ${
                          theme === 'white' ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                          {result.calories}
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          Protein Calories
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className={`font-semibold mb-2 transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          Optimal Meal Distribution
                        </h4>
                        <p className={`text-sm transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          Distribute across {result.meals?.meals || 4} meals with approximately {result.meals?.perMeal || Math.round(result.totalGrams / 4)}g per meal for optimal muscle protein synthesis.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold mb-2 transition-colors duration-500 ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          Key Recommendations
                        </h4>
                        <div className="space-y-1">
                          {result.recommendations?.slice(0, 3).map((rec, index) => (
                            <div key={index} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                              theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              <span className={`transition-colors duration-500 ${
                                theme === 'white' ? 'text-emerald-500' : 'text-emerald-400'
                              } mt-1`}>•</span>
                              {rec}
                            </div>
                          )) || [
                            <div key={0} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                              theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              <span className={`transition-colors duration-500 ${
                                theme === 'white' ? 'text-emerald-500' : 'text-emerald-400'
                              } mt-1`}>•</span>
                              Focus on complete protein sources like lean meats, fish, eggs, and dairy
                            </div>,
                            <div key={1} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                              theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              <span className={`transition-colors duration-500 ${
                                theme === 'white' ? 'text-emerald-500' : 'text-emerald-400'
                              } mt-1`}>•</span>
                              Include protein within 2 hours post-workout for optimal recovery
                            </div>,
                            <div key={2} className={`text-sm flex items-start gap-2 transition-colors duration-500 ${
                              theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              <span className={`transition-colors duration-500 ${
                                theme === 'white' ? 'text-emerald-500' : 'text-emerald-400'
                              } mt-1`}>•</span>
                              Stay consistent with daily protein intake for best results
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
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your details to calculate optimal protein intake</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Protein Science Section */}
        <section id="science" className="mt-16 mb-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              The Science of Protein Requirements
            </h2>
            <p className={`text-lg max-w-3xl mx-auto transition-colors duration-500 ${
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
                    ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-emerald-500/20'
                    : 'bg-gray-900/90 hover:bg-gray-900/95 border border-emerald-500/20'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg transition-colors duration-500 ${
                      theme === 'white' ? 'bg-emerald-100 text-emerald-600' :
                      theme === 'dark' ? 'bg-emerald-900/50 text-emerald-400' :
                      'bg-emerald-900/50 text-emerald-400'
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
                          theme === 'white' ? 'bg-emerald-500' :
                          theme === 'dark' ? 'bg-emerald-400' :
                          'bg-emerald-400'
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
              Protein Calculation Methods Comparison
            </h2>
            <p className={`text-lg max-w-3xl mx-auto transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Compare different scientific approaches to determining optimal protein intake
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
                    ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-emerald-500/20'
                    : 'bg-gray-900/90 hover:bg-gray-900/95 border border-emerald-500/20'
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
                              <Award 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.round(method.accuracy / 20) 
                                    ? theme === 'white' ? 'text-yellow-500 fill-current' : 'text-yellow-400 fill-current'
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
              Health Implications of Protein Intake
            </h2>
            <p className={`text-lg max-w-3xl mx-auto transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Understanding the health effects of different protein intake levels
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
                    ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-emerald-500/20'
                    : 'bg-gray-900/90 hover:bg-gray-900/95 border border-emerald-500/20'
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
                        theme === 'white' ? 'text-emerald-600' : 'text-emerald-400'
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
              Expert Protein FAQ
            </h2>
            <p className={`text-lg max-w-3xl mx-auto transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Comprehensive answers to the most common protein intake questions
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
                    ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-emerald-500/20'
                    : 'bg-gray-900/90 hover:bg-gray-900/95 border border-emerald-500/20'
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
                            theme === 'white' ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-900/50 text-emerald-300'
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

export default ProteinCalculatorPage;