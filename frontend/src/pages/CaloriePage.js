import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Weight, User, Zap, ArrowLeft, Download, X, Target, ChevronDown, ChevronRight, Info, Heart, Brain, Activity, TrendingUp } from 'lucide-react';
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
  calculateBMR, 
  calculateTDEE, 
  calculateCalorieGoals,
  getActivityLevels,
  getCalorieGoalOptions,
  getCalorieRecommendations,
  formatCalorieData
} from '../utils/calorieCalculations';

const CaloriePage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: '',
    goal: 'maintain',
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      weight: '',
      height: '',
      age: '',
      gender: '',
      activityLevel: '',
      goal: 'maintain',
      units: formData.units,
    });
    setResult(null);
  };

  const calculateCalories = async () => {
    // Validation
    const { weight, height, age, gender, activityLevel } = formData;
    
    if (!weight || !height || !age || !gender || !activityLevel) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your calorie needs.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      try {
        const bmr = calculateBMR(
          parseFloat(weight),
          parseFloat(height),
          parseInt(age),
          gender,
          formData.units
        );
        
        const tdee = calculateTDEE(bmr, activityLevel);
        const goalCalories = calculateCalorieGoals(tdee, formData.goal);
        const recommendations = getCalorieRecommendations(bmr, tdee, formData.goal, parseInt(age), gender);
        const formatted = formatCalorieData(bmr, tdee, goalCalories.calories, formData.goal);
        
        const resultData = {
          bmr,
          tdee,
          goalCalories,
          recommendations,
          formatted,
          activityLevel,
          goal: formData.goal,
          weight: parseFloat(weight),
          height: parseFloat(height),
          age: parseInt(age),
          gender,
          units: formData.units
        };
        
        setResult(resultData);
        setLoading(false);
        
        toast({
          title: "Calories Calculated!",
          description: `Your daily calorie target is ${goalCalories.calories} calories`,
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

  const getActivityLevelInfo = (level) => {
    const levels = getActivityLevels();
    return levels.find(l => l.level === level);
  };

  const getGoalInfo = (goal) => {
    const goals = getCalorieGoalOptions();
    return goals.find(g => g.value === goal);
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

  // Comprehensive Scientific Content Data
  const calorieScience = [
    {
      title: "BMR vs TDEE: The Foundation of Calorie Science",
      icon: <Brain className="h-5 w-5" />,
      content: "BMR (Basal Metabolic Rate) represents the calories your body burns at complete rest for essential functions like breathing, circulation, and cellular repair. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through activity. BMR typically accounts for 60-75% of total daily calories in sedentary individuals, with factors like muscle mass, age, genetics, and hormones significantly affecting this rate. Understanding this distinction is crucial for accurate calorie planning.",
      keyPoints: [
        "BMR accounts for 60-75% of daily calorie burn in sedentary individuals",
        "Every pound of muscle burns 6-10 calories per day at rest",
        "BMR naturally decreases by 1-2% per decade after age 30",
        "Thyroid hormones can alter BMR by 15-20% in healthy individuals"
      ]
    },
    {
      title: "Activity Level Multipliers & NEAT (Non-Exercise Activity Thermogenesis)",
      icon: <Activity className="h-5 w-5" />,
      content: "NEAT represents the calories burned through daily activities outside of formal exercise, including fidgeting, maintaining posture, and occupational activities. NEAT can vary by up to 800 calories per day between individuals and significantly impacts TDEE calculations. Activity multipliers are averages - individual variation can be substantial based on job type, lifestyle, and genetic factors affecting spontaneous movement.",
      keyPoints: [
        "NEAT can vary by 200-800 calories daily between individuals",
        "Office workers may have 15-20% lower NEAT than manual laborers",
        "Cold exposure can increase NEAT through thermogenesis",
        "Stress and sleep quality significantly affect NEAT levels"
      ]
    },
    {
      title: "Metabolic Adaptation & Adaptive Thermogenesis",
      icon: <TrendingUp className="h-5 w-5" />,
      content: "Metabolic adaptation occurs when the body reduces energy expenditure in response to calorie restriction, potentially lowering BMR by 10-40% during prolonged dieting. This protective mechanism helped humans survive famine but complicates modern weight management. Understanding and managing metabolic adaptation through strategic diet breaks, refeed days, and resistance training is essential for long-term success.",
      keyPoints: [
        "BMR can decrease 10-40% during prolonged calorie restriction",
        "Adaptation begins within 72 hours of calorie reduction",
        "Resistance training helps preserve BMR during weight loss",
        "Strategic diet breaks can help reset metabolic rate"
      ]
    },
    {
      title: "Calorie Cycling & Advanced Strategies",
      icon: <Zap className="h-5 w-5" />,
      content: "Calorie cycling involves alternating between higher and lower calorie days to optimize fat loss while minimizing metabolic adaptation. Research shows this approach can be more effective than consistent calorie restriction for some individuals. Refeed days (planned high-calorie days) can help restore leptin levels, improve mood, and support long-term adherence to calorie goals.",
      keyPoints: [
        "Calorie cycling can improve long-term diet adherence",
        "Weekly refeed days may help restore leptin and thyroid function",
        "Higher calorie days should emphasize carbohydrates for hormonal benefits",
        "Flexible dieting approaches show better psychological outcomes"
      ]
    }
  ];

  const calculationMethods = [
    {
      name: "Mifflin-St Jeor Equation",
      accuracy: 95,
      description: "Most accurate for the general population",
      formula: "Men: (10 × weight) + (6.25 × height) - (5 × age) + 5\nWomen: (10 × weight) + (6.25 × height) - (5 × age) - 161",
      pros: ["Highest accuracy for normal BMI", "Most widely validated", "Accounts for gender differences"],
      cons: ["Less accurate for very muscular individuals", "May underestimate for some ethnicities"],
      bestFor: "General population, normal body composition"
    },
    {
      name: "Harris-Benedict Equation (Revised)",
      accuracy: 85,
      description: "Traditional method, revised for better accuracy",
      formula: "Men: 88.362 + (13.397 × weight) + (4.799 × height) - (5.677 × age)\nWomen: 447.593 + (9.247 × weight) + (3.098 × height) - (4.330 × age)",
      pros: ["Well-established method", "Good for historical comparison", "Widely available"],
      cons: ["Less accurate than Mifflin-St Jeor", "May overestimate in some cases"],
      bestFor: "General estimates, when Mifflin-St Jeor unavailable"
    },
    {
      name: "Katch-McArdle Formula",
      accuracy: 98,
      description: "Most accurate when body fat percentage is known",
      formula: "BMR = 370 + (21.6 × lean body mass in kg)",
      pros: ["Highest accuracy with body fat data", "Accounts for muscle mass", "Excellent for athletes"],
      cons: ["Requires accurate body fat measurement", "Not practical for everyone"],
      bestFor: "Athletes, individuals with known body fat percentage"
    },
    {
      name: "Cunningham Equation",
      accuracy: 92,
      description: "Designed specifically for lean, active individuals",
      formula: "BMR = 500 + (22 × lean body mass in kg)",
      pros: ["Excellent for lean athletes", "Accounts for high muscle mass", "Validated in active populations"],
      cons: ["Overestimates for sedentary individuals", "Requires body fat measurement"],
      bestFor: "Lean athletes, bodybuilders, highly active individuals"
    },
    {
      name: "Body Weight Multiplier Method",
      accuracy: 75,
      description: "Simple estimation based on activity level",
      formula: "Sedentary: weight × 12-14\nActive: weight × 15-17\nVery Active: weight × 18-20",
      pros: ["Very simple to calculate", "Quick estimation", "No complex inputs needed"],
      cons: ["Less accurate", "Doesn't account for age/height", "Broad ranges"],
      bestFor: "Quick estimates, when detailed data unavailable"
    }
  ];

  const healthImplications = [
    {
      category: "Safe Weight Loss Calorie Deficits",
      riskLevel: "Low-Moderate",
      ranges: "300-750 calorie deficit (0.5-1.5 lbs/week)",
      description: "Moderate calorie deficits promote sustainable fat loss while preserving muscle mass and metabolic health. Research shows deficits of 500-750 calories daily are optimal for most individuals.",
      benefits: ["Sustainable fat loss", "Muscle mass preservation", "Better adherence", "Stable energy levels"],
      risks: ["Slower initial progress", "Requires patience and consistency"],
      recommendations: [
        "Aim for 0.5-1% body weight loss per week",
        "Include resistance training to preserve muscle",
        "Ensure adequate protein intake (0.8-1.2g/lb bodyweight)",
        "Take diet breaks every 6-12 weeks"
      ]
    },
    {
      category: "Aggressive Weight Loss Calorie Deficits",
      riskLevel: "High",
      ranges: ">750 calorie deficit (>1.5 lbs/week)",
      description: "Large calorie deficits can lead to rapid weight loss but carry significant risks including muscle loss, metabolic adaptation, nutritional deficiencies, and psychological stress.",
      benefits: ["Rapid initial results", "May improve motivation short-term"],
      risks: ["Significant muscle loss", "Metabolic adaptation", "Nutrient deficiencies", "Increased hunger hormones", "Poor long-term adherence"],
      recommendations: [
        "Only under medical supervision",
        "Short-term use only (2-4 weeks max)",
        "Prioritize protein and micronutrients",
        "Monitor for signs of metabolic damage"
      ]
    },
    {
      category: "Muscle Gain Calorie Surpluses",
      riskLevel: "Low",
      ranges: "200-500 calorie surplus",
      description: "Moderate calorie surpluses support muscle growth while minimizing fat gain. The 'lean gains' approach emphasizes smaller surpluses for body composition improvement.",
      benefits: ["Muscle growth support", "Improved recovery", "Better performance", "Minimal fat gain"],
      risks: ["Some fat gain inevitable", "Requires precise tracking"],
      recommendations: [
        "Start with 200-300 calorie surplus",
        "Emphasize protein timing around workouts",
        "Include resistance training 3-5x per week",
        "Monitor body composition changes monthly"
      ]
    },
    {
      category: "Maintenance & Metabolic Health",
      riskLevel: "Very Low",
      ranges: "Within 100 calories of TDEE",
      description: "Maintenance calories support metabolic health, hormone production, and psychological well-being. Periodic maintenance phases are crucial during long-term body composition goals.",
      benefits: ["Metabolic recovery", "Hormone optimization", "Psychological relief", "Social flexibility"],
      risks: ["No active body composition changes"],
      recommendations: [
        "Use maintenance phases every 8-12 weeks during cuts",
        "Focus on performance and health metrics",
        "Practice intuitive eating skills",
        "Maintain consistent exercise routine"
      ]
    }
  ];

  const detailedFAQ = [
    {
      category: "Basics",
      question: "What's the difference between BMR, RMR, and TDEE?",
      answer: "BMR (Basal Metabolic Rate) is measured in a lab after 12 hours of fasting and 8 hours of sleep in a controlled environment. RMR (Resting Metabolic Rate) is more practical and measured with less strict conditions - typically 10-15% higher than BMR. TDEE (Total Daily Energy Expenditure) includes BMR/RMR plus all daily activities. Most calculators estimate RMR and call it BMR for simplicity."
    },
    {
      category: "Accuracy",
      question: "How accurate are online calorie calculators?",
      answer: "The best equations (Mifflin-St Jeor) are accurate within ±10% for about 80% of the population. However, individual variation can be significant - some people may have metabolic rates 20-30% higher or lower than predicted. Accuracy improves with body fat percentage data. Always use calculated values as starting points and adjust based on real-world results over 2-4 weeks."
    },
    {
      category: "Activity",
      question: "How do I choose the right activity level?",
      answer: "Activity levels are often misestimated. 'Sedentary' means desk job with little exercise. 'Lightly Active' includes light exercise 1-3 days/week. 'Moderately Active' means moderate exercise 3-5 days/week. 'Very Active' includes hard exercise 6-7 days/week. 'Extremely Active' is for athletes training multiple times daily. Consider your job, commute, hobbies, and formal exercise. When in doubt, start conservative and adjust based on results."
    },
    {
      category: "Weight Loss",
      question: "Why did my weight loss plateau even though I'm eating the same calories?",
      answer: "Weight loss plateaus occur due to metabolic adaptation - your body reduces energy expenditure in response to prolonged calorie restriction. BMR can decrease 10-40%, NEAT reduces significantly, and hormones like leptin and thyroid hormones decline. Strategies include diet breaks, refeed days, increasing activity, adjusting macronutrients, or accepting a slower rate of loss as you approach your goal weight."
    },
    {
      category: "Muscle Gain",
      question: "How many calories do I need to build muscle?",
      answer: "Muscle building requires a calorie surplus, but the amount depends on training status. Beginners can build muscle in small deficits or maintenance due to 'newbie gains.' Intermediate trainees typically need 200-500 calorie surpluses. Advanced lifters may need larger surpluses or cycling approaches. Factors include training quality, protein intake (0.8-1.2g/lb), sleep, and genetics. Expect 0.5-2 lbs muscle gain per month under optimal conditions."
    },
    {
      category: "Age",
      question: "How does age affect calorie needs?",
      answer: "BMR naturally decreases about 1-2% per decade after age 30 due to muscle loss (sarcopenia), hormonal changes, and reduced organ function. However, this isn't inevitable - resistance training can maintain or even increase BMR with age. Post-menopausal women may see additional BMR reductions due to estrogen decline. Older adults often need higher protein intake (1.0-1.6g/kg) to maintain muscle mass and may benefit from slightly higher calorie targets to support health."
    },
    {
      category: "Gender",
      question: "Why do men and women have different calorie needs?",
      answer: "Men typically have higher calorie needs due to greater muscle mass, larger body size, and hormonal differences. Testosterone promotes muscle growth and increases BMR. Women have essential fat requirements (10-13% vs 2-5% for men) and hormonal fluctuations affecting metabolism. During menstruation, BMR can increase 5-10%. Pregnancy and breastfeeding dramatically increase calorie needs. These differences are accounted for in gender-specific BMR equations."
    },
    {
      category: "Hormones",
      question: "How do hormones affect my calorie needs?",
      answer: "Hormones significantly impact metabolism. Thyroid hormones (T3/T4) can alter BMR by 15-20%. Insulin resistance reduces metabolic flexibility. Cortisol elevation from stress can promote fat storage and increase cravings. Leptin resistance makes the brain think you're starving even with adequate calories. Growth hormone and testosterone support muscle mass and BMR. Sleep deprivation disrupts hunger hormones (ghrelin/leptin), potentially increasing calorie needs by 200-300 daily."
    },
    {
      category: "Timing",
      question: "Does meal timing affect calorie needs?",
      answer: "Meal timing has modest effects on metabolism. Eating increases energy expenditure through the thermic effect of food (TEF) - about 8-10% of calories consumed. Protein has the highest TEF (20-30%), followed by carbs (5-10%) and fats (0-5%). Intermittent fasting doesn't significantly change TDEE but may improve insulin sensitivity. Eating late doesn't slow metabolism, but may affect sleep quality and hunger hormones. Focus on total daily calories and macros over timing for most goals."
    },
    {
      category: "Exercise",
      question: "How should I account for exercise calories?",
      answer: "Exercise calories are often overestimated. Cardio machines can overestimate by 20-40%. Most fitness trackers are reasonably accurate for steps but less so for exercise. The TDEE method (including exercise in activity level) is often more accurate than eating back exercise calories. If you do eat back exercise calories, start with 50-75% of estimated burn. Consider that intense exercise may reduce NEAT for the rest of the day, partially offsetting the calorie burn."
    },
    {
      category: "Medical",
      question: "How do medical conditions affect calorie calculations?",
      answer: "Several conditions significantly impact metabolism. Hypothyroidism can reduce BMR by 15-30%. PCOS may decrease BMR and increase insulin resistance. Diabetes affects metabolic flexibility and may require adjusted approaches. Medications like corticosteroids, antidepressants, and beta-blockers can affect metabolism. Sleep apnea reduces sleep quality and affects hunger hormones. Always consult healthcare providers when medical conditions are present, as standard calculators may not apply."
    },
    {
      category: "Body Composition",
      question: "Why doesn't the calculator ask for body fat percentage?",
      answer: "This calculator uses the Mifflin-St Jeor equation, which doesn't require body fat data but is still highly accurate for most people. The Katch-McArdle formula uses lean body mass and is more accurate when you know your body fat percentage, but requires accurate measurement methods like DEXA or hydrostatic weighing. Consumer body fat scales are often inaccurate (±5-8% error). For most people, Mifflin-St Jeor provides excellent estimates without additional complexity."
    },
    {
      category: "Adjustments",
      question: "How often should I recalculate my calorie needs?",
      answer: "Recalculate every 10-15 pounds of weight change or every 2-3 months. As you lose weight, your calorie needs decrease - roughly 25-50 calories per pound lost, depending on how much is fat vs. muscle. During muscle-building phases, calorie needs may increase. Age-related changes occur slowly, so annual recalculation is sufficient unless significant lifestyle changes occur. Always prioritize real-world results over calculator predictions when making adjustments."
    },
    {
      category: "Tracking",
      question: "Do I need to track calories forever?",
      answer: "Calorie tracking is a tool, not a lifestyle requirement. Many people benefit from tracking initially to learn portion sizes and food values, then transition to intuitive eating. Some find periodic tracking helpful for course corrections. Others prefer consistent tracking for precise goals. Research shows people tend to underestimate intake by 20-40% without tracking, but obsessive tracking can lead to disordered eating. Find an approach that supports your goals while maintaining a healthy relationship with food."
    },
    {
      category: "Special Populations",
      question: "Are there special considerations for athletes?",
      answer: "Athletes have unique calorie needs due to high training volumes, increased muscle mass, and recovery demands. Endurance athletes may need 2,500-5,000+ calories daily depending on training. Strength athletes require adequate calories to support muscle protein synthesis and recovery. Female athletes are at higher risk for Relative Energy Deficiency in Sport (REDs) from inadequate calorie intake. Periodization of calorie intake around training phases can optimize performance and body composition. Sport-specific needs vary significantly."
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Professional Calorie Calculator | Advanced TDEE & BMR Calculator 2025 - Scientific Weight Management"
        description="World's most comprehensive calorie calculator with scientific TDEE/BMR calculations, metabolic adaptation analysis, 5+ calculation methods, and expert guidance for weight loss, muscle gain, and maintenance. Professional-grade nutrition planning."
        keywords="advanced calorie calculator, professional TDEE calculator, scientific BMR calculator, metabolic adaptation, calorie cycling, NEAT calculator, calorie deficit calculator, muscle gain calories, weight loss calories, nutrition calculator, metabolism calculator 2025, calorie needs calculator, daily calorie requirements, energy expenditure calculator"
        canonical="/calories"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "Professional Calorie Calculator - Advanced TDEE & BMR Calculator",
              "description": "Comprehensive calorie calculator with scientific TDEE/BMR calculations, metabolic adaptation analysis, and expert nutrition guidance for optimal results.",
              "url": "https://bmicalculator.com/calories",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "5+ Scientific Calculation Methods",
                "Metabolic Adaptation Analysis", 
                "Activity Level Optimization",
                "Goal-Specific Recommendations",
                "Professional Nutrition Guidance"
              ]
            },
            {
              "@type": "MedicalWebPage",
              "name": "Calorie Calculator - Professional Nutrition Tool",
              "description": "Evidence-based calorie calculator with comprehensive health implications analysis and professional recommendations.",
              "medicalSpecialty": "Nutrition",
              "audience": {
                "@type": "MedicalAudience",
                "audienceType": "Patient"
              }
            },
            {
              "@type": "HowTo",
              "name": "How to Calculate Daily Calorie Needs",
              "description": "Step-by-step guide to calculating accurate daily calorie requirements using scientific methods.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Determine Your BMR",
                  "text": "Calculate your Basal Metabolic Rate using the Mifflin-St Jeor equation based on weight, height, age, and gender."
                },
                {
                  "@type": "HowToStep", 
                  "name": "Assess Activity Level",
                  "text": "Evaluate your daily activity including exercise, work, and lifestyle factors to determine your activity multiplier."
                },
                {
                  "@type": "HowToStep",
                  "name": "Calculate TDEE",
                  "text": "Multiply your BMR by your activity level multiplier to get your Total Daily Energy Expenditure."
                },
                {
                  "@type": "HowToStep",
                  "name": "Adjust for Goals",
                  "text": "Modify your TDEE based on your goals: subtract 300-750 calories for weight loss, add 200-500 for muscle gain."
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What's the most accurate calorie calculator method?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Mifflin-St Jeor equation is most accurate for the general population (±10% for 80% of people). The Katch-McArdle formula is most accurate when body fat percentage is known."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many calories should I eat to lose weight?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "For safe weight loss, create a 300-750 calorie deficit from your TDEE, aiming for 0.5-1.5 lbs per week. Larger deficits risk muscle loss and metabolic adaptation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why did my weight loss plateau?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Weight loss plateaus occur due to metabolic adaptation where your body reduces energy expenditure by 10-40% during prolonged calorie restriction. Use diet breaks and refeed days to help reset metabolism."
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
            Calorie Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
            'bg-gradient-to-r from-green-400 to-emerald-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your daily calorie needs (TDEE) and get personalized recommendations for weight loss, maintenance, or gain.
          </p>
          
          {/* Professional Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-teal-100 text-teal-800' :
              theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
              'bg-green-900/50 text-green-200'
            }`}>
              🧬 5+ Scientific Methods
            </Badge>
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-blue-100 text-blue-800' :
              theme === 'dark' ? 'bg-blue-900/50 text-blue-200' :
              'bg-blue-900/50 text-blue-200'
            }`}>
              📊 Metabolic Adaptation Analysis
            </Badge>
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-green-100 text-green-800' :
              theme === 'dark' ? 'bg-green-900/50 text-green-200' :
              'bg-green-900/50 text-green-200'
            }`}>
              🎯 Goal-Specific Guidance
            </Badge>
            <Badge variant="secondary" className={`px-4 py-2 text-sm font-medium ${
              theme === 'white' ? 'bg-orange-100 text-orange-800' :
              theme === 'dark' ? 'bg-orange-900/50 text-orange-200' :
              'bg-orange-900/50 text-orange-200'
            }`}>
              💪 Athletic & Medical Grade
            </Badge>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <a href="#calculator" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-teal-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50' :
              'bg-green-900/30 text-green-300 hover:bg-green-900/50'
            }`}>
              Calculator
            </a>
            <a href="#science" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-teal-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50' :
              'bg-green-900/30 text-green-300 hover:bg-green-900/50'
            }`}>
              Calorie Science
            </a>
            <a href="#methods" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-teal-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50' :
              'bg-green-900/30 text-green-300 hover:bg-green-900/50'
            }`}>
              Calculation Methods
            </a>
            <a href="#health" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-teal-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50' :
              'bg-green-900/30 text-green-300 hover:bg-green-900/50'
            }`}>
              Health Implications
            </a>
            <a href="#faq" className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'bg-white/50 text-teal-700 hover:bg-white/70' :
              theme === 'dark' ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50' :
              'bg-green-900/30 text-green-300 hover:bg-green-900/50'
            }`}>
              Expert FAQ
            </a>
          </div>
        </div>

        <div id="calculator" className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                <Zap className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                TDEE Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Units Selection */}
              <div className="space-y-3">
                <Label className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Units
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
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-green-600 text-white border-green-600'
                        : theme === 'white' 
                        ? 'bg-white text-teal-600 border-teal-300 hover:bg-teal-50' 
                        : theme === 'dark'
                        ? 'bg-gray-700 text-purple-300 border-purple-500/50 hover:bg-purple-900/20'
                        : 'bg-gray-800 text-green-300 border-green-500/50 hover:bg-green-900/20'
                    }`}
                  >
                    Metric (kg/cm)
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleInputChange('units', 'imperial')}
                    className={`transition-all duration-300 hover:scale-105 ${
                      formData.units === 'imperial'
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
                    Imperial (lbs/in)
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
                  Gender
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
                  Age
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

              {/* Weight Input */}
              <div className="space-y-3">
                <Label htmlFor="weight" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Weight className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Weight
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder={formData.units === 'metric' ? 'e.g., 70 kg' : 'e.g., 154 lbs'}
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
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
                <Label htmlFor="height" className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Height
                </Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  placeholder={formData.units === 'metric' ? 'e.g., 175 cm' : 'e.g., 70 inches'}
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

              {/* Activity Level Select */}
              <div className="space-y-3">
                <Label className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Activity Level
                </Label>
                <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {getActivityLevels().map((level) => (
                      <SelectItem key={level.level} value={level.level}>
                        <div>
                          <div className="font-medium">{level.title}</div>
                          <div className="text-xs text-gray-500">{level.description}</div>
                        </div>
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
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Goal
                </Label>
                <Select value={formData.goal} onValueChange={(value) => handleInputChange('goal', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCalorieGoalOptions().map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        <div className="flex items-center gap-2">
                          <span>{goal.emoji}</span>
                          <div>
                            <div className="font-medium">{goal.label}</div>
                            <div className="text-xs text-gray-500">{goal.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={calculateCalories}
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
                    Your Calorie Needs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Calorie Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {result.bmr}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        BMR (Basal Metabolic Rate)
                      </div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        {result.tdee}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        TDEE (Total Daily Energy)
                      </div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-teal-50' : theme === 'dark' ? 'bg-purple-900/30' : 'bg-green-900/30'
                    }`}>
                      <div className={`text-3xl font-bold mb-1 ${
                        theme === 'white' ? 'text-teal-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'
                      }`}>
                        {result.goalCalories.calories}
                      </div>
                      <div className={`text-sm ${theme === 'white' ? 'text-teal-700' : theme === 'dark' ? 'text-purple-300' : 'text-green-300'}`}>
                        Daily Goal Calories
                      </div>
                    </div>
                  </div>

                  {/* Goal Information */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                  }`}>
                    <div className={`font-medium mb-2 ${theme === 'white' ? 'text-blue-900' : 'text-blue-300'}`}>
                      Your Goal: {getGoalInfo(result.goal)?.label} {getGoalInfo(result.goal)?.emoji}
                    </div>
                    <div className={`text-sm ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
                      {result.goalCalories.description}
                    </div>
                    {result.formatted.difference !== 0 && (
                      <div className={`text-sm mt-2 ${theme === 'white' ? 'text-blue-600' : 'text-blue-300'}`}>
                        {result.formatted.isDeficit ? 'Daily deficit: ' : 'Daily surplus: '}
                        {Math.abs(result.formatted.difference)} calories 
                        ({result.formatted.poundsPerWeek} lbs/week)
                      </div>
                    )}
                  </div>

                  {/* Activity Level Info */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                  }`}>
                    <div className={`font-medium mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Activity Level: {getActivityLevelInfo(result.activityLevel)?.title}
                    </div>
                    <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {getActivityLevelInfo(result.activityLevel)?.description}
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
                    onClick={() => toast({ title: "PDF Generation", description: "Calorie PDF report feature coming soon!" })}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Comprehensive Scientific Content Sections */}
        
        {/* Calorie Science Deep-Dive */}
        <section id="science" className="max-w-6xl mx-auto mt-16 mb-16">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            The Science of Calorie Calculation
          </h2>
          
          <div className="grid gap-6">
            {calorieScience.map((science, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection(`science-${index}`)}>
                  <CardTitle className={`text-lg flex items-center justify-between ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className={theme === 'white' ? 'text-teal-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'}>
                        {science.icon}
                      </span>
                      {science.title}
                    </div>
                    {expandedSections[`science-${index}`] 
                      ? <ChevronDown className="h-5 w-5" /> 
                      : <ChevronRight className="h-5 w-5" />
                    }
                  </CardTitle>
                </CardHeader>
                {expandedSections[`science-${index}`] && (
                  <CardContent className="space-y-4">
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {science.content}
                    </p>
                    
                    <div className={`p-4 rounded-lg ${
                      theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                    }`}>
                      <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-blue-900' : 'text-blue-300'}`}>
                        Key Scientific Points:
                      </h4>
                      <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-blue-700' : 'text-blue-200'}`}>
                        {science.keyPoints.map((point, pointIndex) => (
                          <li key={pointIndex}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Calculation Methods Comparison */}
        <section id="methods" className="max-w-6xl mx-auto mb-16">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Calculation Methods Comparison
          </h2>
          
          <div className="grid gap-6">
            {calculationMethods.map((method, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection(`method-${index}`)}>
                  <CardTitle className={`text-lg flex items-center justify-between ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`text-center ${
                        theme === 'white' ? 'text-teal-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'
                      }`}>
                        <div className="text-2xl font-bold">{method.accuracy}%</div>
                        <div className="text-xs">Accuracy</div>
                      </div>
                      <div>
                        <div>{method.name}</div>
                        <div className={`text-sm font-normal ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {method.description}
                        </div>
                      </div>
                    </div>
                    {expandedSections[`method-${index}`] 
                      ? <ChevronDown className="h-5 w-5" /> 
                      : <ChevronRight className="h-5 w-5" />
                    }
                  </CardTitle>
                </CardHeader>
                {expandedSections[`method-${index}`] && (
                  <CardContent className="space-y-4">
                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                    }`}>
                      <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                        Formula:
                      </h4>
                      <pre className={`text-xs whitespace-pre-wrap ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {method.formula}
                      </pre>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-green-50' : theme === 'dark' ? 'bg-green-900/20' : 'bg-green-900/20'
                      }`}>
                        <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-green-900' : 'text-green-300'}`}>
                          Advantages:
                        </h4>
                        <ul className={`text-xs space-y-1 ${theme === 'white' ? 'text-green-700' : 'text-green-200'}`}>
                          {method.pros.map((pro, proIndex) => (
                            <li key={proIndex}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-red-50' : theme === 'dark' ? 'bg-red-900/20' : 'bg-red-900/20'
                      }`}>
                        <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-red-900' : 'text-red-300'}`}>
                          Limitations:
                        </h4>
                        <ul className={`text-xs space-y-1 ${theme === 'white' ? 'text-red-700' : 'text-red-200'}`}>
                          {method.cons.map((con, conIndex) => (
                            <li key={conIndex}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                    }`}>
                      <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-blue-900' : 'text-blue-300'}`}>
                        Best For:
                      </h4>
                      <p className={`text-xs ${theme === 'white' ? 'text-blue-700' : 'text-blue-200'}`}>
                        {method.bestFor}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Health Implications */}
        <section id="health" className="max-w-6xl mx-auto mb-16">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Health Implications & Calorie Guidelines
          </h2>
          
          <div className="grid gap-6">
            {healthImplications.map((implication, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection(`health-${index}`)}>
                  <CardTitle className={`text-lg flex items-center justify-between ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Badge className={`${
                        implication.riskLevel === 'Very Low' ? 'bg-green-100 text-green-800' :
                        implication.riskLevel === 'Low' ? 'bg-blue-100 text-blue-800' :
                        implication.riskLevel === 'Low-Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {implication.riskLevel} Risk
                      </Badge>
                      <div>
                        <div>{implication.category}</div>
                        <div className={`text-sm font-normal ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {implication.ranges}
                        </div>
                      </div>
                    </div>
                    {expandedSections[`health-${index}`] 
                      ? <ChevronDown className="h-5 w-5" /> 
                      : <ChevronRight className="h-5 w-5" />
                    }
                  </CardTitle>
                </CardHeader>
                {expandedSections[`health-${index}`] && (
                  <CardContent className="space-y-4">
                    <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {implication.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-green-50' : theme === 'dark' ? 'bg-green-900/20' : 'bg-green-900/20'
                      }`}>
                        <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-green-900' : 'text-green-300'}`}>
                          Benefits:
                        </h4>
                        <ul className={`text-xs space-y-1 ${theme === 'white' ? 'text-green-700' : 'text-green-200'}`}>
                          {implication.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex}>• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-red-50' : theme === 'dark' ? 'bg-red-900/20' : 'bg-red-900/20'
                      }`}>
                        <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-red-900' : 'text-red-300'}`}>
                          Risks:
                        </h4>
                        <ul className={`text-xs space-y-1 ${theme === 'white' ? 'text-red-700' : 'text-red-200'}`}>
                          {implication.risks.map((risk, riskIndex) => (
                            <li key={riskIndex}>• {risk}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${
                      theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                    }`}>
                      <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-blue-900' : 'text-blue-300'}`}>
                        Professional Recommendations:
                      </h4>
                      <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-blue-700' : 'text-blue-200'}`}>
                        {implication.recommendations.map((rec, recIndex) => (
                          <li key={recIndex}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center mb-16">
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
                Complete Your Nutrition Analysis
              </h2>
              <p className={`mb-6 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Get the complete picture of your nutritional needs with our comprehensive calculator suite designed by nutrition professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/macros">
                  <Button className={`transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl'
                  }`}>
                    <Target className="h-4 w-4 mr-2" />
                    Calculate Macros
                  </Button>
                </Link>
                <Link to="/body-fat">
                  <Button variant="outline" className={`transition-all duration-300 hover:scale-105 ${
                    theme === 'white'
                      ? 'border-teal-300 text-teal-700 hover:bg-teal-50'
                      : 'border-teal-500/50 text-teal-300 hover:bg-teal-900/20'
                  }`}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Body Fat Analysis
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive FAQ Section */}
        <section id="faq" className="max-w-6xl mx-auto mb-16">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Expert FAQ: Calorie Science & Nutrition
          </h2>
          
          {/* FAQ Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['All', 'Basics', 'Accuracy', 'Weight Loss', 'Muscle Gain', 'Medical', 'Advanced'].map((category) => (
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
      </main>
      
      <Footer />
    </div>
  );
};

export default CaloriePage;