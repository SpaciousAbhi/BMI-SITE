import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Target, User, Zap, ArrowLeft, Download, X, Utensils, Info, ChevronDown, ChevronRight, Heart, Brain, Activity, TrendingUp, Clock, Dumbbell } from 'lucide-react';
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
  calculateMacros, 
  getDietTypes,
  getMacroRecommendations,
  getFoodSuggestions,
  calculateMealPlan,
  validateMacroInputs
} from '../utils/macroCalculations';

const MacrosPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    calories: '',
    weight: '',
    dietType: 'balanced',
    goal: 'maintain',
    activityLevel: 'moderately_active',
    units: 'metric', // metric or imperial
    meals: 3
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
      calories: '',
      weight: '',
      dietType: 'balanced',
      goal: 'maintain',
      activityLevel: 'moderately_active',
      units: formData.units,
      meals: 3
    });
    setResult(null);
  };

  const calculateMacronutrients = async () => {
    // Validation
    const errors = validateMacroInputs(
      parseFloat(formData.calories), 
      formData.weight ? parseFloat(formData.weight) : null, 
      formData.dietType
    );
    
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors[0],
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      try {
        const macroData = calculateMacros(
          parseFloat(formData.calories),
          formData.dietType,
          formData.weight ? parseFloat(formData.weight) : null,
          formData.units
        );
        
        const recommendations = getMacroRecommendations(
          macroData, 
          formData.goal, 
          formData.activityLevel, 
          25, // default age for recommendations
          'male' // default gender for recommendations
        );
        
        const mealPlan = calculateMealPlan(macroData, parseInt(formData.meals));
        
        const resultData = {
          ...macroData,
          recommendations,
          mealPlan,
          goal: formData.goal,
          activityLevel: formData.activityLevel,
          meals: parseInt(formData.meals),
          weight: formData.weight ? parseFloat(formData.weight) : null,
          units: formData.units
        };
        
        setResult(resultData);
        setLoading(false);
        
        toast({
          title: "Macros Calculated!",
          description: `${macroData.macros.protein.grams}g protein, ${macroData.macros.carbs.grams}g carbs, ${macroData.macros.fat.grams}g fat`,
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

  const getDietTypeInfo = (type) => {
    const dietTypes = getDietTypes();
    return dietTypes.find(d => d.type === type);
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

  // Comprehensive Macronutrient Science Content Data
  const macroScience = [
    {
      title: "Protein Synthesis & Muscle Protein Balance",
      icon: <Dumbbell className="h-5 w-5" />,
      content: "Protein synthesis is the process by which cells build proteins from amino acids, critical for muscle growth, repair, and maintenance. Muscle protein balance is the net difference between muscle protein synthesis (MPS) and muscle protein breakdown (MPB). A positive balance (MPS > MPB) leads to muscle growth, while negative balance results in muscle loss. Research shows that consuming 20-40g of high-quality protein can maximally stimulate MPS for 3-5 hours.",
      keyPoints: [
        "20-40g protein maximally stimulates muscle protein synthesis",
        "MPS remains elevated for 3-5 hours after protein consumption",
        "Leucine (2.5-3g) is the key amino acid trigger for MPS",
        "Resistance training amplifies the protein synthesis response"
      ]
    },
    {
      title: "Carbohydrate Metabolism & Glycogen Storage",
      icon: <Zap className="h-5 w-5" />,
      content: "Carbohydrates are the body's preferred fuel source, stored as glycogen in muscles (300-600g) and liver (80-120g). Glycogen storage capacity affects performance, recovery, and metabolic flexibility. During exercise, muscle glycogen provides immediate energy, while liver glycogen maintains blood glucose. Strategic carb timing can optimize performance, recovery, and body composition.",
      keyPoints: [
        "Muscles store 300-600g glycogen, liver stores 80-120g",
        "Glycogen depletion impairs high-intensity performance after 90+ minutes",
        "Post-workout carbs (0.5-1.2g/kg) optimize glycogen replenishment",
        "Higher carb diets support high-intensity training adaptations"
      ]
    },
    {
      title: "Fat Metabolism & Essential Fatty Acids",
      icon: <Heart className="h-5 w-5" />,
      content: "Dietary fats provide essential fatty acids (omega-3 and omega-6), support hormone production, and enable fat-soluble vitamin absorption. Fat oxidation becomes the primary fuel source during low-intensity exercise and fasted states. Essential fatty acids cannot be synthesized by the body and must be obtained through diet. The ratio of omega-6 to omega-3 fatty acids significantly impacts inflammation and health.",
      keyPoints: [
        "Essential fatty acids must be obtained through diet",
        "Minimum 20-30% of calories from fat needed for hormone production",
        "Omega-3s (EPA/DHA) reduce inflammation and support brain function",
        "Fat oxidation provides unlimited energy during aerobic activities"
      ]
    },
    {
      title: "Macro Timing & Nutrient Partitioning",
      icon: <Clock className="h-5 w-5" />,
      content: "Nutrient timing refers to the strategic consumption of macronutrients around training to optimize performance, recovery, and body composition. Nutrient partitioning describes how the body directs nutrients toward muscle building versus fat storage. Post-workout, the body is primed for nutrient uptake with enhanced insulin sensitivity and increased protein synthesis rates.",
      keyPoints: [
        "Post-workout 'anabolic window' lasts 24-48 hours, not just 30 minutes",
        "Pre-workout carbs enhance performance for sessions >60 minutes",
        "Post-workout protein + carbs optimize recovery and glycogen resynthesis",
        "Evening carbs don't inherently cause fat gain - total calories matter most"
      ]
    }
  ];

  const expandedDietTypes = [
    {
      type: "balanced",
      title: "Balanced Macros",
      emoji: "⚖️",
      protein: 25,
      carbs: 45,
      fat: 30,
      description: "Evidence-based balanced approach suitable for most health and fitness goals",
      scientificBasis: "Based on Acceptable Macronutrient Distribution Ranges (AMDR) from nutrition research",
      benefits: ["Sustainable long-term", "Supports all training types", "Flexible food choices", "Optimal health markers"],
      bestFor: "General health, moderate activity levels, sustainable lifestyle changes",
      considerations: "May not be optimal for specific athletic goals or metabolic conditions"
    },
    {
      type: "high_protein",
      title: "High Protein",
      emoji: "💪",
      protein: 35,
      carbs: 35,
      fat: 30,
      description: "Elevated protein for muscle building, weight loss, and satiety",
      scientificBasis: "Research shows 1.6-2.2g/kg protein optimal for muscle growth and preservation",
      benefits: ["Enhanced muscle protein synthesis", "Increased satiety", "Higher thermic effect", "Better body composition"],
      bestFor: "Muscle building, weight loss, older adults, athletes",
      considerations: "Higher cost, potential kidney stress in predisposed individuals"
    },
    {
      type: "keto",
      title: "Ketogenic",
      emoji: "🥑",
      protein: 25,
      carbs: 5,
      fat: 70,
      description: "Very low carb, high fat approach for metabolic flexibility",
      scientificBasis: "Induces ketosis, alternative metabolic state using ketones for fuel",
      benefits: ["Rapid initial weight loss", "Stable energy levels", "Reduced hunger", "Potential therapeutic benefits"],
      bestFor: "Metabolic syndrome, epilepsy, rapid weight loss, endurance athletes",
      considerations: "Adaptation period, social restrictions, nutrient timing critical"
    },
    {
      type: "low_carb",
      title: "Low Carb",
      emoji: "🥩",
      protein: 30,
      carbs: 20,
      fat: 50,
      description: "Moderate carb restriction with increased protein and fat",
      scientificBasis: "Reduces insulin response while maintaining some glucose availability",
      benefits: ["Improved insulin sensitivity", "Stable blood sugar", "Enhanced fat oxidation", "Good compliance"],
      bestFor: "Pre-diabetes, insulin resistance, moderate weight loss",
      considerations: "May impair high-intensity performance"
    },
    {
      type: "low_fat",
      title: "Low Fat",
      emoji: "🍎",
      protein: 20,
      carbs: 65,
      fat: 15,
      description: "Traditional low-fat approach emphasizing carbohydrates",
      scientificBasis: "Historical approach based on heart disease prevention research",
      benefits: ["High fiber intake", "Lower calorie density", "Good for endurance athletes", "Budget-friendly"],
      bestFor: "Endurance athletes, high training volumes, budget constraints",
      considerations: "Essential fatty acid deficiency risk, hormone disruption"
    },
    {
      type: "zone",
      title: "Zone Diet",
      emoji: "🎯",
      protein: 30,
      carbs: 40,
      fat: 30,
      description: "Anti-inflammatory approach with specific macro ratios",
      scientificBasis: "Aims to control insulin and inflammation through precise macro ratios",
      benefits: ["Reduced inflammation", "Stable energy", "Good compliance", "Balanced approach"],
      bestFor: "Inflammation management, general health, moderate training",
      considerations: "Requires precise tracking, may not optimize performance"
    },
    {
      type: "carb_cycling",
      title: "Carb Cycling",
      emoji: "🔄",
      protein: 30,
      carbs: "Variable",
      fat: "Variable", 
      description: "Strategic alternation between high and low carb days",
      scientificBasis: "Optimizes insulin sensitivity while supporting training and recovery",
      benefits: ["Metabolic flexibility", "Training optimization", "Body composition", "Mental breaks"],
      bestFor: "Advanced dieters, bodybuilders, athletes with periodized training",
      considerations: "Complex planning, requires experience"
    },
    {
      type: "mediterranean",
      title: "Mediterranean",
      emoji: "🫒",
      protein: 20,
      carbs: 45,
      fat: 35,
      description: "Heart-healthy approach emphasizing whole foods and olive oil",
      scientificBasis: "Extensive research on cardiovascular health and longevity",
      benefits: ["Heart health", "Longevity", "Sustainable", "Rich in antioxidants"],
      bestFor: "Long-term health, older adults, cardiovascular risk reduction",
      considerations: "May not optimize athletic performance or body composition goals"
    }
  ];

  const macroTiming = [
    {
      timeframe: "Pre-Workout (1-3 hours)",
      recommendations: {
        protein: "10-20g easily digestible",
        carbs: "20-40g for sessions >60 min",
        fat: "Minimal - delays gastric emptying"
      },
      purpose: "Provide available energy and prevent muscle breakdown",
      examples: ["Greek yogurt with berries", "Banana with protein powder", "Oatmeal with protein"],
      timing: "Larger meals 2-3 hours before, smaller snacks 30-60 minutes before"
    },
    {
      timeframe: "Post-Workout (0-2 hours)", 
      recommendations: {
        protein: "20-40g high-quality complete protein",
        carbs: "0.5-1.2g/kg bodyweight",
        fat: "Can be included, doesn't impair recovery"
      },
      purpose: "Maximize muscle protein synthesis and glycogen replenishment",
      examples: ["Protein shake with banana", "Chicken with rice", "Chocolate milk"],
      timing: "Within 2 hours for optimal benefits, but 24-hour intake matters most"
    },
    {
      timeframe: "Throughout Day",
      recommendations: {
        protein: "20-40g every 3-4 hours",
        carbs: "Time around training and activity",
        fat: "Include with each meal for satiety"
      },
      purpose: "Maintain stable amino acid levels and energy",
      examples: ["Balanced meals every 3-4 hours", "Protein + carbs + fat combinations"],
      timing: "Consistency matters more than perfection"
    }
  ];

  const detailedMacroFAQ = [
    {
      category: "Basics",
      question: "What are macronutrients and why do they matter?",
      answer: "Macronutrients are the three main nutrients that provide calories: protein (4 cal/g), carbohydrates (4 cal/g), and fats (9 cal/g). Each has unique functions - protein builds and repairs tissues, carbs provide quick energy and fuel the brain, fats support hormone production and nutrient absorption. The ratio of these macros affects energy levels, body composition, performance, and health markers. Getting the right balance for your goals and activity level optimizes results."
    },
    {
      category: "Protein",
      question: "How much protein do I really need?",
      answer: "Protein needs vary significantly based on goals and activity. Sedentary adults need 0.8g/kg (0.36g/lb) minimum. Active individuals benefit from 1.2-1.6g/kg (0.54-0.73g/lb). Athletes and those building muscle should consume 1.6-2.2g/kg (0.73-1g/lb). During weight loss, higher protein (2.0-2.4g/kg or 0.9-1.1g/lb) helps preserve muscle mass. Older adults (65+) need 1.2-1.6g/kg to combat sarcopenia. Quality matters - complete proteins with all essential amino acids are superior."
    },
    {
      category: "Carbs",
      question: "Are carbs necessary for muscle building and performance?",
      answer: "Carbs aren't technically essential for survival, but they're crucial for optimal performance and muscle building. Muscle glycogen (stored carbs) fuels high-intensity exercise and provides the energy needed for challenging workouts that stimulate muscle growth. Research shows that low-carb diets can impair power output, training capacity, and recovery. For muscle building, 3-7g/kg (1.4-3.2g/lb) carbs daily supports training intensity and recovery. Athletes may need up to 12g/kg during heavy training phases."
    },
    {
      category: "Fats",
      question: "What's the minimum fat intake for health?",
      answer: "The minimum fat intake is 20-25% of total calories to ensure essential fatty acid needs and hormone production. Going below 15% can disrupt hormone levels (testosterone, growth hormone, thyroid), impair nutrient absorption, and affect cell membrane function. Essential fatty acids (omega-3 and omega-6) must come from food. For optimal health, include sources of EPA/DHA (fish, algae), monounsaturated fats (olive oil, nuts), and avoid trans fats completely."
    },
    {
      category: "Timing",
      question: "Does meal timing and macro timing really matter?",
      answer: "Meal timing has modest effects compared to total daily intake, but it can optimize performance and recovery. The post-workout 'anabolic window' lasts 24-48 hours, not just 30 minutes, so don't stress about immediate post-workout nutrition. However, having protein every 3-4 hours maintains muscle protein synthesis. Pre-workout carbs help performance for sessions >60 minutes. Post-workout protein (20-40g) + carbs (0.5-1.2g/kg) optimize recovery. For most people, eating regularly throughout the day is more important than precise timing."
    },
    {
      category: "Diet Types",
      question: "Which diet approach is best for my goals?",
      answer: "The best diet is one you can stick to long-term that supports your goals. For muscle building: moderate to high protein (25-35%) with adequate carbs (35-45%) for training fuel. For fat loss: higher protein (30-40%) with moderate carbs and fats. Keto can work for weight loss but may impair high-intensity performance. Mediterranean and balanced approaches are excellent for general health. Athletes need higher carbs (45-65%). The key is finding an approach that fits your lifestyle, preferences, and training demands."
    },
    {
      category: "Tracking",
      question: "Do I need to track macros precisely?",
      answer: "Precision depends on your goals and current results. Beginners benefit from tracking initially to learn portion sizes and food composition. Competitive athletes and physique competitors often need precise tracking for optimal results. For general health and fitness, close approximations work well. Focus on hitting protein targets first, then distribute carbs and fats based on preferences and training. Many successful people use hand portions or visual estimates rather than precise weighing. Start strict if needed, then find your minimum effective dose of tracking."
    },
    {
      category: "Adjustments",
      question: "How do I adjust macros when progress stalls?",
      answer: "Stalled progress requires systematic adjustments. For weight loss plateaus: increase protein by 0.2-0.4g/kg, reduce carbs by 50-100g, or add 2-3 cardio sessions. For muscle building stalls: increase total calories by 100-200, emphasize post-workout carbs, ensure adequate sleep and recovery. Consider diet breaks every 6-12 weeks during cuts. Track biometrics (weight, measurements, photos) and adjust based on 2-week trends, not daily fluctuations. Sometimes the issue isn't macros but training, sleep, or adherence."
    },
    {
      category: "Special Needs",
      question: "How do medical conditions affect macro needs?",
      answer: "Medical conditions significantly impact macro requirements. Diabetes requires careful carb management and fiber emphasis. PCOS benefits from lower glycemic carbs and higher protein. Hypothyroidism may need higher calories and iodine-rich foods. Kidney disease requires protein restriction. IBS/IBD may need specific fiber types or elimination diets. Eating disorders require professional guidance focusing on food relationship over macros. Always consult healthcare providers for medical conditions. Generic calculators may not account for metabolic differences in various conditions."
    },
    {
      category: "Age & Gender",
      question: "How do age and gender affect macro needs?",
      answer: "Age and gender create different macro requirements. Women generally need less total calories but similar protein per kg body weight. During menstruation, slight calorie increases may help. Pregnancy dramatically increases needs. Menopause may benefit from higher protein and resistance training. Older adults (65+) need more protein (1.2-1.6g/kg) to combat sarcopenia and may benefit from leucine-rich sources. Children and teens need adequate calories for growth. Men typically have higher overall needs due to greater muscle mass and size."
    },
    {
      category: "Performance",
      question: "How should endurance vs strength athletes adjust macros?",
      answer: "Endurance athletes need higher carbs (6-12g/kg) to fuel training and replenish glycogen. Protein needs are moderate (1.2-1.6g/kg) as muscle building isn't the primary goal. Fat can be 20-35% for general health. Strength/power athletes need higher protein (1.6-2.2g/kg) for muscle building and repair. Carbs should support training intensity (3-7g/kg). Fat can be lower (20-30%) to allow room for protein and carbs. Both need adequate calories to support training demands and recovery."
    },
    {
      category: "Weight Loss",
      question: "What macro ratio is best for weight loss?",
      answer: "For weight loss, prioritize higher protein (30-40% or 1.2-1.6g/lb) to preserve muscle mass and increase satiety. Distribute remaining calories between carbs and fats based on preferences and training. Lower carb (20-30%) works well for sedentary individuals or those with insulin resistance. Higher carb (35-45%) suits active individuals who need training fuel. The key is creating a sustainable calorie deficit while maintaining adequate protein. Extreme low-fat or low-carb approaches are harder to maintain long-term."
    },
    {
      category: "Muscle Building",
      question: "What's the optimal macro split for building muscle?",
      answer: "For muscle building, prioritize protein at 1.6-2.2g/kg (0.73-1g/lb) spread throughout the day. Carbs should be 3-7g/kg (1.4-3.2g/lb) to fuel intense training sessions. Fat can be 20-35% of calories for hormone production and general health. Total calories should be 200-500 above maintenance. Time protein every 3-4 hours and include carbs around workouts. The exact ratios matter less than hitting absolute protein targets and maintaining a calorie surplus with quality training and adequate recovery."
    },
    {
      category: "Supplements",
      question: "Do I need supplements or can I get everything from food?",
      answer: "Most macro needs can be met through whole foods, but supplements can be convenient and cost-effective. Protein powder is useful for meeting high protein targets affordably. Creatine (3-5g daily) enhances power output and muscle building. Fish oil provides EPA/DHA if fish intake is low. Vitamin D, B12, and iron may be needed based on diet restrictions or deficiencies. Pre/post-workout supplements are optional - whole foods work equally well. Focus on food first, use supplements to fill specific gaps or for convenience."
    },
    {
      category: "Long-term",
      question: "How do I maintain results long-term without obsessive tracking?",
      answer: "Long-term success requires transitioning from strict tracking to intuitive habits. Start by learning proper portions for your macro targets. Use hand-based portions (palm = protein, cupped hand = carbs, thumb = fats). Build consistent meal patterns and templates. Practice mindful eating and hunger/satiety cues. Do periodic 'check-ins' with tracking to stay calibrated. Focus on food quality and whole foods. Develop flexible approaches for social situations. Remember that perfect consistency isn't required - aim for 80% adherence over time rather than short-term perfection."
    }
  ];

  const MacroBar = ({ macro, percentage, color }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
          {macro.charAt(0).toUpperCase() + macro.slice(1)}
        </span>
        <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>
          {percentage}%
        </span>
      </div>
      <div className={`w-full rounded-full h-3 ${theme === 'white' ? 'bg-gray-200' : 'bg-gray-700'}`}>
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Professional Macros Calculator | Advanced Macronutrient Calculator 2025 - Scientific Nutrition Planning"
        description="World's most comprehensive macros calculator with scientific protein, carbs, and fat calculations, 8+ diet types analysis, nutrient timing strategies, and expert nutrition guidance for optimal body composition and performance."
        keywords="advanced macros calculator, professional macronutrient calculator, protein calculator, carbs calculator, keto macros calculator, high protein diet calculator, macro timing, nutrient partitioning, muscle building macros, weight loss macros, bodybuilding nutrition, macro cycling, diet optimization 2025"
        canonical="/macros"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "Professional Macros Calculator - Advanced Macronutrient Calculator",
              "description": "Comprehensive macronutrient calculator with scientific protein, carbs, and fat analysis, 8+ diet types, nutrient timing, and expert nutrition guidance.",
              "url": "https://bmicalculator.com/macros",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "8+ Scientific Diet Types",
                "Nutrient Timing Optimization", 
                "Muscle Protein Synthesis Analysis",
                "Meal Planning Integration",
                "Professional Nutrition Guidance"
              ]
            },
            {
              "@type": "MedicalWebPage",
              "name": "Macros Calculator - Professional Nutrition Tool",
              "description": "Evidence-based macronutrient calculator with comprehensive diet analysis and professional recommendations for optimal health and performance.",
              "medicalSpecialty": "Nutrition",
              "audience": {
                "@type": "MedicalAudience",
                "audienceType": "Patient"
              }
            },
            {
              "@type": "HowTo",
              "name": "How to Calculate Perfect Macronutrient Ratios",
              "description": "Step-by-step guide to calculating optimal protein, carbohydrate, and fat ratios for your specific goals.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Determine Your Calorie Needs",
                  "text": "Calculate your daily calorie requirements using our advanced calorie calculator based on your activity level and goals."
                },
                {
                  "@type": "HowToStep", 
                  "name": "Set Your Protein Target",
                  "text": "Determine protein needs based on body weight, activity level, and goals (1.6-2.2g/kg for muscle building)."
                },
                {
                  "@type": "HowToStep",
                  "name": "Choose Your Diet Type",
                  "text": "Select from 8+ evidence-based diet approaches (balanced, keto, high protein, etc.) based on your preferences and goals."
                },
                {
                  "@type": "HowToStep",
                  "name": "Optimize Meal Timing",
                  "text": "Distribute macronutrients across meals with strategic timing around workouts for optimal results."
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How much protein do I need for muscle building?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For muscle building, consume 1.6-2.2g/kg (0.73-1g/lb) of body weight daily. Distribute this across 4-6 meals with 20-40g per meal to optimize muscle protein synthesis."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which macro ratio is best for weight loss?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "For weight loss, prioritize higher protein (30-40%) to preserve muscle and increase satiety. Distribute remaining calories between carbs and fats based on training needs and preferences."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to time my macronutrients around workouts?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While total daily intake matters most, strategic timing can optimize performance and recovery. Include 20-40g protein and 0.5-1.2g/kg carbs within 2 hours post-workout for best results."
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
            theme === 'white' ? 'text-teal-600 hover:text-teal-700' : 
            theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 
            'text-green-400 hover:text-green-300'
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
            Macro Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
            'bg-gradient-to-r from-green-400 to-emerald-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your ideal macronutrient breakdown (protein, carbs, fats) based on your goals and diet type.
          </p>
          
          {/* Diet Types Preview */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {getDietTypes().slice(0, 4).map((diet, index) => (
              <Badge 
                key={diet.type}
                variant="secondary" 
                className={`px-3 py-1 text-xs font-medium transition-all duration-500 transform hover:scale-105 animate-slide-in ${
                  theme === 'white' ? 'bg-teal-100 text-teal-800' :
                  theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
                  'bg-green-900/50 text-green-200'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {diet.emoji} {diet.title}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
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
                <Utensils className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                Macro Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Daily Calories Input */}
              <div className="space-y-3">
                <Label htmlFor="calories" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Zap className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Daily Calories *
                </Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="e.g., 2000 calories"
                  value={formData.calories}
                  onChange={(e) => handleInputChange('calories', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
                <div className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                  💡 Use our Calorie Calculator first to find your daily needs
                </div>
              </div>

              {/* Diet Type Select */}
              <div className="space-y-3">
                <Label className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Diet Type *
                </Label>
                <Select value={formData.dietType} onValueChange={(value) => handleInputChange('dietType', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDietTypes().map((diet) => (
                      <SelectItem key={diet.type} value={diet.type}>
                        <div className="flex items-center gap-2">
                          <span>{diet.emoji}</span>
                          <div>
                            <div className="font-medium">{diet.title}</div>
                            <div className="text-xs text-gray-500">
                              P:{diet.protein}% C:{diet.carbs}% F:{diet.fat}%
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.dietType && (
                  <div className={`text-xs p-2 rounded ${
                    theme === 'white' ? 'bg-blue-50 text-blue-700' : 
                    theme === 'dark' ? 'bg-blue-900/20 text-blue-300' : 
                    'bg-blue-900/20 text-blue-300'
                  }`}>
                    <Info className="h-3 w-3 inline mr-1" />
                    {getDietTypeInfo(formData.dietType)?.description}
                  </div>
                )}
              </div>

              {/* Weight Input (Optional) */}
              <div className="space-y-3">
                <Label htmlFor="weight" className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Body Weight (Optional)
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder={formData.units === 'metric' ? 'e.g., 70 kg' : 'e.g., 154 lbs'}
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={`flex-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.units} onValueChange={(value) => handleInputChange('units', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white'
                        : 'bg-gray-900/50 border-green-500/30 text-white'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">kg</SelectItem>
                      <SelectItem value="imperial">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                  For protein per body weight calculations
                </div>
              </div>

              {/* Meals Per Day */}
              <div className="space-y-3">
                <Label className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Meals Per Day
                </Label>
                <Select value={formData.meals.toString()} onValueChange={(value) => handleInputChange('meals', parseInt(value))}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 meals</SelectItem>
                    <SelectItem value="3">3 meals</SelectItem>
                    <SelectItem value="4">4 meals</SelectItem>
                    <SelectItem value="5">5 meals</SelectItem>
                    <SelectItem value="6">6 meals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={calculateMacronutrients}
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
            <div className="space-y-6">
              <Card className={`backdrop-blur-md border-0 shadow-2xl animate-fade-in ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    Your Macro Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Diet Type Info */}
                  <div className={`text-center p-4 rounded-lg ${
                    theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                  }`}>
                    <Badge className={`text-lg px-4 py-2 mb-2 ${
                      theme === 'white' ? 'bg-teal-100 text-teal-800' : 
                      theme === 'dark' ? 'bg-purple-900/50 text-purple-200' : 
                      'bg-green-900/50 text-green-200'
                    }`}>
                      {result.dietType.emoji} {result.dietType.title}
                    </Badge>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {result.dietType.description}
                    </p>
                  </div>

                  {/* Macro Numbers */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-red-50' : theme === 'dark' ? 'bg-red-900/20' : 'bg-red-900/20'
                    }`}>
                      <div className={`text-3xl font-bold mb-1 ${
                        theme === 'white' ? 'text-red-600' : 'text-red-400'
                      }`}>
                        {result.macros.protein.grams}g
                      </div>
                      <div className={`text-sm mb-1 ${theme === 'white' ? 'text-red-700' : 'text-red-300'}`}>
                        Protein
                      </div>
                      <div className={`text-xs ${theme === 'white' ? 'text-red-600' : 'text-red-400'}`}>
                        {result.macros.protein.calories} cal ({result.macros.protein.percentage}%)
                      </div>
                      {result.weight && result.macros.protein.perKg && (
                        <div className={`text-xs mt-1 ${theme === 'white' ? 'text-red-500' : 'text-red-400'}`}>
                          {result.macros.protein.perKg}g/kg
                        </div>
                      )}
                    </div>
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                    }`}>
                      <div className={`text-3xl font-bold mb-1 ${
                        theme === 'white' ? 'text-blue-600' : 'text-blue-400'
                      }`}>
                        {result.macros.carbs.grams}g
                      </div>
                      <div className={`text-sm mb-1 ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
                        Carbs
                      </div>
                      <div className={`text-xs ${theme === 'white' ? 'text-blue-600' : 'text-blue-400'}`}>
                        {result.macros.carbs.calories} cal ({result.macros.carbs.percentage}%)
                      </div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-yellow-50' : theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-900/20'
                    }`}>
                      <div className={`text-3xl font-bold mb-1 ${
                        theme === 'white' ? 'text-yellow-600' : 'text-yellow-400'
                      }`}>
                        {result.macros.fat.grams}g
                      </div>
                      <div className={`text-sm mb-1 ${theme === 'white' ? 'text-yellow-700' : 'text-yellow-300'}`}>
                        Fats
                      </div>
                      <div className={`text-xs ${theme === 'white' ? 'text-yellow-600' : 'text-yellow-400'}`}>
                        {result.macros.fat.calories} cal ({result.macros.fat.percentage}%)
                      </div>
                    </div>
                  </div>

                  {/* Macro Bars */}
                  <div className="space-y-4">
                    <MacroBar 
                      macro="protein" 
                      percentage={result.macros.protein.percentage} 
                      color="bg-red-500" 
                    />
                    <MacroBar 
                      macro="carbs" 
                      percentage={result.macros.carbs.percentage} 
                      color="bg-blue-500" 
                    />
                    <MacroBar 
                      macro="fats" 
                      percentage={result.macros.fat.percentage} 
                      color="bg-yellow-500" 
                    />
                  </div>

                  {/* Meal Plan */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'white' ? 'bg-green-50' : theme === 'dark' ? 'bg-green-900/20' : 'bg-green-900/20'
                  }`}>
                    <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-green-900' : 'text-green-300'}`}>
                      Per Meal ({result.mealPlan.mealsPerDay} meals/day)
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className={`${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                          Calories: {result.mealPlan.perMeal.calories}
                        </div>
                        <div className={`${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                          Protein: {result.mealPlan.perMeal.protein}g
                        </div>
                      </div>
                      <div>
                        <div className={`${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                          Carbs: {result.mealPlan.perMeal.carbs}g
                        </div>
                        <div className={`${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                          Fats: {result.mealPlan.perMeal.fat}g
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Food Suggestions */}
                  <div className="space-y-4">
                    <h4 className={`font-medium ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Food Suggestions
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-red-50' : theme === 'dark' ? 'bg-red-900/20' : 'bg-red-900/20'
                      }`}>
                        <h5 className={`font-medium mb-2 ${theme === 'white' ? 'text-red-700' : 'text-red-300'}`}>
                          Protein Sources
                        </h5>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-red-600' : 'text-red-400'}`}>
                          {getFoodSuggestions('protein').slice(0, 4).map((food, index) => (
                            <li key={index}>• {food}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                      }`}>
                        <h5 className={`font-medium mb-2 ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
                          Carb Sources
                        </h5>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-blue-600' : 'text-blue-400'}`}>
                          {getFoodSuggestions('carbs').slice(0, 4).map((food, index) => (
                            <li key={index}>• {food}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-yellow-50' : theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-900/20'
                      }`}>
                        <h5 className={`font-medium mb-2 ${theme === 'white' ? 'text-yellow-700' : 'text-yellow-300'}`}>
                          Fat Sources
                        </h5>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-yellow-600' : 'text-yellow-400'}`}>
                          {getFoodSuggestions('fat').slice(0, 4).map((food, index) => (
                            <li key={index}>• {food}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Recommendations
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
                    onClick={() => toast({ title: "PDF Generation", description: "Macros PDF report feature coming soon!" })}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MacrosPage;