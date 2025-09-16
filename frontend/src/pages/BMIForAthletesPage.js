import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Target, TrendingUp, Calculator, Dumbbell, Award, Heart, Brain, Zap, Scale, Users, ChevronDown, ChevronRight, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BMIForAthletesPage = () => {
  const { theme } = useTheme();
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedSport, setSelectedSport] = useState('all');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-red-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50';
    }
  };

  const scientificReasons = [
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Muscle vs Fat Density",
      description: "Muscle tissue is approximately 18% denser than fat tissue. Elite athletes with high muscle mass can have BMIs of 30+ while maintaining body fat percentages as low as 6-12%.",
      details: "Scientific studies show muscle density ranges from 1.04-1.06 g/cm³ while fat density is only 0.90 g/cm³. This 15-18% difference means muscular athletes weigh significantly more per unit volume, artificially inflating BMI calculations."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Bone Density Impact",
      description: "Athletes, particularly those in weight-bearing sports, develop significantly higher bone mineral density, adding substantial weight without compromising health.",
      details: "Research indicates athletes can have 10-20% higher bone mineral density than sedentary individuals. Sports like gymnastics, weightlifting, and running can increase BMD by 15-25% above normal ranges."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Metabolic Advantages",
      description: "Higher muscle mass in athletes correlates with increased metabolic rate, better insulin sensitivity, and superior cardiovascular health markers despite elevated BMI.",
      details: "Each pound of muscle burns 6-7 calories at rest vs 2-3 for fat. Athletes with 'overweight' BMIs often have superior metabolic profiles including lower resting heart rates, better VO2 max, and enhanced glucose tolerance."
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Hormonal Optimization",
      description: "Athletic training optimizes hormonal profiles including testosterone, growth hormone, and insulin sensitivity, regardless of BMI classification.",
      details: "Studies show athletes maintain optimal hormone levels even with BMIs in the 'overweight' range. Higher muscle mass supports healthy testosterone production and improved growth hormone release during recovery."
    }
  ];

  const comprehensiveSports = [
    {
      category: "Endurance Sports",
      sports: [
        { name: "Marathon Running", bmi: "18.5-21.0", bodyFat: "M: 5-11%, F: 12-19%", notes: "Ultra-low body fat for heat dissipation and energy efficiency" },
        { name: "Cycling (Road)", bmi: "19.0-22.0", bodyFat: "M: 6-12%, F: 14-20%", notes: "Low weight for climbing, moderate muscle mass for power" },
        { name: "Swimming (Distance)", bmi: "20.0-23.0", bodyFat: "M: 7-13%, F: 15-22%", notes: "Higher body fat for buoyancy and insulation" },
        { name: "Triathlon", bmi: "19.5-22.5", bodyFat: "M: 6-12%, F: 13-20%", notes: "Balanced composition for multiple disciplines" }
      ]
    },
    {
      category: "Power & Strength Sports",
      sports: [
        { name: "Powerlifting", bmi: "27.0-35.0+", bodyFat: "M: 12-20%, F: 18-28%", notes: "Maximum muscle mass prioritized over low body fat" },
        { name: "Olympic Weightlifting", bmi: "24.0-30.0", bodyFat: "M: 8-16%, F: 16-24%", notes: "High muscle mass with moderate body fat for stability" },
        { name: "Bodybuilding", bmi: "25.0-32.0", bodyFat: "M: 4-8%, F: 10-16%", notes: "Maximum muscle with minimal fat for competition" },
        { name: "Strongman", bmi: "30.0-40.0+", bodyFat: "M: 15-25%, F: 20-30%", notes: "Maximum strength prioritized, higher body fat acceptable" }
      ]
    },
    {
      category: "Team Sports",
      sports: [
        { name: "American Football", bmi: "24.0-35.0", bodyFat: "M: 8-18%, F: 16-26%", notes: "Position-dependent; linemen vs skill positions vary greatly" },
        { name: "Rugby", bmi: "23.0-30.0", bodyFat: "M: 9-16%, F: 18-25%", notes: "High muscle mass for contact, endurance for continuous play" },
        { name: "Basketball", bmi: "22.0-26.0", bodyFat: "M: 7-14%, F: 15-22%", notes: "Height advantage affects BMI; lean muscle for agility" },
        { name: "Ice Hockey", bmi: "23.0-27.0", bodyFat: "M: 8-15%, F: 16-23%", notes: "Power and endurance balance with protective muscle mass" }
      ]
    },
    {
      category: "Aesthetic & Skill Sports",
      sports: [
        { name: "Gymnastics", bmi: "18.0-22.0", bodyFat: "M: 4-10%, F: 10-16%", notes: "Low body weight crucial for aerial maneuvers and strength-to-weight ratio" },
        { name: "Figure Skating", bmi: "18.5-21.5", bodyFat: "M: 6-12%, F: 12-18%", notes: "Lean for jumps while maintaining strength for lifts and spins" },
        { name: "Diving", bmi: "19.0-22.0", bodyFat: "M: 5-11%, F: 12-18%", notes: "Low body fat for rotation speed and precise body control" },
        { name: "Ballet/Dance", bmi: "17.5-20.0", bodyFat: "M: 4-10%, F: 10-16%", notes: "Extremely lean aesthetic requirements with functional strength" }
      ]
    },
    {
      category: "Combat Sports",
      sports: [
        { name: "Boxing", bmi: "21.0-26.0", bodyFat: "M: 6-12%, F: 14-20%", notes: "Weight class dependent; lean muscle for speed and power" },
        { name: "Mixed Martial Arts", bmi: "22.0-27.0", bodyFat: "M: 7-14%, F: 15-22%", notes: "Balanced strength, endurance, and flexibility requirements" },
        { name: "Wrestling", bmi: "22.0-28.0", bodyFat: "M: 5-12%, F: 12-20%", notes: "High strength-to-weight ratio within weight classes" },
        { name: "Judo", bmi: "23.0-27.0", bodyFat: "M: 8-15%, F: 16-23%", notes: "Functional strength with moderate body fat for protection" }
      ]
    }
  ];

  const measurementAlternatives = [
    {
      method: "DEXA Scan",
      accuracy: "Gold Standard (±1-2%)",
      cost: "$100-300",
      description: "Dual-energy X-ray absorptiometry provides precise body composition including bone density, muscle mass, and fat distribution.",
      pros: ["Most accurate available", "Differentiates visceral fat", "Measures bone density", "Reproducible results"],
      cons: ["Expensive", "Requires specialized facility", "Small radiation exposure", "Not portable"],
      bestFor: "Professional athletes, detailed body composition analysis"
    },
    {
      method: "Hydrostatic Weighing",
      accuracy: "Excellent (±2-3%)",
      cost: "$50-150",
      description: "Underwater weighing based on body density principles. Gold standard for decades before DEXA.",
      pros: ["Highly accurate", "Well-established method", "Accounts for air in lungs", "Research validated"],
      cons: ["Requires submersion", "Time-consuming", "Claustrophobic for some", "Limited availability"],
      bestFor: "Research settings, athletes comfortable with water submersion"
    },
    {
      method: "BodPod (Air Displacement)",
      accuracy: "Very Good (±2-4%)",
      cost: "$75-200",
      description: "Air displacement plethysmography measures body volume to calculate density and body fat percentage.",
      pros: ["Non-invasive", "Quick (5 minutes)", "No water required", "Comfortable"],
      cons: ["Expensive equipment", "Affected by body hair", "Limited availability", "Clothing restrictions"],  
      bestFor: "Athletes who want accuracy without water immersion"
    },
    {
      method: "Bioelectrical Impedance (BIA)",
      accuracy: "Moderate (±3-5%)",
      cost: "$25-100",
      description: "Electrical current passes through body; fat tissue has higher electrical resistance than muscle.",
      pros: ["Portable", "Inexpensive", "Quick results", "Widely available"],
      cons: ["Affected by hydration", "Less accurate for athletes", "Varies with food intake", "Position sensitive"],
      bestFor: "General fitness tracking, not precise athlete assessment"
    },
    {
      method: "Skinfold Calipers",
      accuracy: "Good if done properly (±3-5%)",
      cost: "$20-50",
      description: "Measures subcutaneous fat thickness at specific body sites using precision calipers.",
      pros: ["Inexpensive", "Portable", "No technology required", "Tracks changes well"],
      cons: ["Technique dependent", "Doesn't measure visceral fat", "Less accurate for very lean/obese", "Requires skilled technician"],
      bestFor: "Regular monitoring by experienced practitioners, budget-conscious assessments"
    }
  ];

  const performanceMetrics = [
    {
      sport: "Powerlifting",
      optimalBMI: "28-35",
      performanceFactors: ["Maximum strength output", "Leverages and body mechanics", "Weight class considerations"],
      healthConsiderations: "Higher BMI may be performance-optimal but requires cardiovascular monitoring",
      example: "Elite powerlifters often maintain BMI 30+ with excellent metabolic health markers"
    },
    {
      sport: "Marathon Running", 
      optimalBMI: "18.5-21",
      performanceFactors: ["Heat dissipation efficiency", "Energy cost of transport", "Oxygen consumption per kg"],
      healthConsiderations: "Very low BMI may compromise immune function and bone health",
      example: "Elite marathoners average BMI 19-20 with exceptional cardiovascular health"
    },
    {
      sport: "Swimming",
      optimalBMI: "20-24",
      performanceFactors: ["Buoyancy optimization", "Stroke efficiency", "Thermoregulation in water"],
      healthConsiderations: "Moderate body fat aids buoyancy and temperature regulation",
      example: "Distance swimmers maintain higher body fat than other endurance athletes for performance"
    },
    {
      sport: "Basketball",
      optimalBMI: "22-26",
      performanceFactors: ["Vertical jump ability", "Agility and speed", "Contact resilience"],
      healthConsiderations: "Height skews BMI; focus on body fat percentage more relevant",
      example: "NBA players average BMI 24-25 despite being extremely fit due to height and muscle mass"
    }
  ];

  const detailedFAQ = [
    {
      question: "Why is BMI not accurate for athletes and muscular individuals?",
      answer: "BMI fails for athletes because it cannot distinguish between muscle and fat mass. Since muscle tissue is approximately 18% denser than fat, athletes with high muscle mass register elevated BMI scores despite having very low body fat percentages. A bodybuilder with 8% body fat might have a BMI of 30+ (classified as 'obese') while being in peak physical condition.",
      category: "Science"
    },
    {
      question: "What BMI range is considered normal for different types of athletes?",
      answer: "Athletic BMI ranges vary significantly by sport: Endurance athletes (18.5-22), Team sports (22-27), Strength athletes (25-35+), Combat sports (21-28), Aesthetic sports (18-22). These ranges reflect the specific body composition requirements for optimal performance in each discipline.",
      category: "Ranges"
    },
    {
      question: "Should athletes focus on BMI or body fat percentage?",
      answer: "Athletes should prioritize body fat percentage over BMI. Body fat percentage provides a more accurate assessment of health and performance readiness. Male athletes typically range from 6-15% body fat, while female athletes range from 12-22%, depending on their sport and individual genetics.",
      category: "Measurement"
    },
    {
      question: "Can bodybuilders be classified as 'obese' by BMI while being healthy?",
      answer: "Yes, competitive bodybuilders frequently have BMIs in the 'obese' range (30+) while maintaining body fat percentages as low as 4-8%. Their extensive muscle mass creates the weight that drives up BMI, but their metabolic health markers (blood pressure, cholesterol, insulin sensitivity) are typically excellent.",
      category: "Bodybuilding"
    },
    {
      question: "How does bone density affect BMI in athletes?",
      answer: "Athletes, especially those in weight-bearing sports, develop 10-20% higher bone mineral density than sedentary individuals. This increased bone mass adds significant weight without negative health implications, contributing to elevated BMI scores while actually indicating superior skeletal health.",
      category: "Science"
    },
    {
      question: "What body composition is optimal for endurance vs strength athletes?",
      answer: "Endurance athletes optimize for low body fat (5-12% men, 12-20% women) and minimal muscle mass to reduce oxygen cost. Strength athletes prioritize maximum muscle mass (often 15-25% higher than average) with moderate body fat levels that don't impair performance but support recovery and hormone production.",
      category: "Sport-Specific"
    },
    {
      question: "How do weight-class sports affect BMI interpretation?",
      answer: "Weight-class sports (boxing, wrestling, weightlifting) create unique BMI patterns. Athletes maximize muscle mass within their weight limit, often resulting in very low body fat (5-10%) with moderate BMI (22-28) that represents peak power-to-weight ratios within competitive constraints.",
      category: "Weight Classes"
    },
    {
      question: "What are the health risks of very low BMI in athletes?",
      answer: "Extremely low BMI (<18.5) in athletes can indicate insufficient energy availability, leading to hormonal disruption, bone loss, immune suppression, and increased injury risk. Even lean-sport athletes should maintain BMI above 18.5 with adequate body fat for hormonal health.",
      category: "Health Risks"
    },
    {
      question: "How does age affect optimal BMI ranges for athletes?",
      answer: "Optimal athletic BMI ranges shift with age. Youth athletes (under 18) should focus on healthy development rather than extreme leanness. Masters athletes (35+) may benefit from slightly higher BMI ranges (20-26) to support bone health, hormone production, and recovery capacity.",
      category: "Age Factors"
    },
    {
      question: "What's the difference between athletic muscle and 'bulky' muscle for BMI?",
      answer: "Athletic muscle is typically dense, functional, and well-vascularized, contributing to elevated BMI with excellent health markers. 'Bulky' muscle from certain training methods may be less dense and functional, but still registers as elevated BMI. The health implications depend on overall conditioning and cardiovascular fitness.",
      category: "Muscle Types"
    },
    {
      question: "How should team sport athletes interpret position-specific BMI differences?",
      answer: "Team sport BMI varies dramatically by position. Football linemen (BMI 30-40) require maximum size and strength, while skill position players (BMI 22-28) prioritize speed and agility. Each position has optimal BMI ranges that support specific performance requirements.",
      category: "Position-Specific"
    },
    {
      question: "What body fat testing methods are most accurate for athletes?",
      answer: "For athletes, DEXA scan (±1-2% error) is the gold standard, followed by hydrostatic weighing (±2-3%) and BodPod (±2-4%). Avoid bioelectrical impedance for athletes as hydration variables create significant errors. Professional athletes should use DEXA for precise monitoring.",
      category: "Testing Methods"
    },
    {
      question: "How does gender affect athletic BMI interpretation?",
      answer: "Female athletes typically have 6-12% higher essential body fat than males due to reproductive hormone requirements. This means female athletes maintain higher BMI ranges while being equally fit. Additionally, female athletes are more susceptible to low energy availability syndromes with extremely low BMI.",
      category: "Gender Differences"
    },
    {
      question: "Can 'overweight' BMI actually be healthier for some athletes?",
      answer: "Yes, moderate 'overweight' BMI (25-29.9) can be optimal for certain athletes. Strength athletes, contact sport players, and masters athletes may experience better performance, injury resistance, and hormonal health with BMI in this range, provided body fat percentage remains appropriate.",
      category: "Health Optimization"
    },
    {
      question: "How should retired athletes manage BMI transitions?",
      answer: "Retired athletes face unique challenges as muscle mass decreases and body fat may increase while BMI appears stable. They should focus on maintaining muscle mass through resistance training, monitoring body fat percentage rather than just BMI, and adjusting caloric intake for reduced training volume.",
      category: "Retirement Transition"
    }
  ];

  const filteredSports = selectedSport === 'all' 
    ? comprehensiveSports 
    : comprehensiveSports.filter(category => 
        category.category.toLowerCase().includes(selectedSport.toLowerCase())
      );

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="BMI Calculator for Athletes 2025 - Complete Athletic BMI Guide & Body Composition Analysis"
        description="Comprehensive BMI calculator and guide for athletes. Understand why BMI fails for muscular individuals, get sport-specific BMI ranges, body fat calculations, and professional athletic body composition analysis. Free expert athletic BMI assessment."
        keywords="BMI calculator for athletes, athlete BMI analysis, sports BMI calculator, muscular BMI calculator, athletic body composition, athlete body fat calculator, BMI for bodybuilders, powerlifter BMI, endurance athlete BMI, team sports BMI, athletic BMI ranges, muscle mass BMI, sports nutrition BMI, fitness BMI calculator, athletic performance BMI, professional athlete BMI, BMI limitations athletes, body composition athletes, athletic health metrics, sports medicine BMI"
        canonical="/bmi-for-athletes"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebApplication", "MedicalWebPage"],
          "name": "BMI Calculator for Athletes - Complete Athletic BMI Analysis",
          "description": "Professional BMI calculator and comprehensive guide designed specifically for athletes and muscular individuals with sport-specific analysis and advanced body composition insights.",
          "url": "https://bmicalculator.com/bmi-for-athletes",
          "applicationCategory": "HealthApplication",
          "medicalAudience": {
            "@type": "MedicalAudience", 
            "audienceType": ["Athletes", "Sports professionals", "Fitness enthusiasts", "Coaches", "Sports medicine practitioners"]
          },
          "about": {
            "@type": "MedicalCondition",
            "name": "Athletic Body Composition Assessment"
          },
          "featureList": [
            "Sport-specific BMI analysis for 20+ athletic disciplines",
            "Scientific explanation of BMI limitations for muscular individuals", 
            "Advanced body composition assessment methods",
            "Athletic performance vs health metrics correlation",
            "Professional body fat calculation integration",
            "Evidence-based athletic BMI ranges and recommendations"
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
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            BMI Calculator for Athletes
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-orange-400 to-red-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-orange-400 to-red-500' :
            'bg-gradient-to-r from-orange-400 to-red-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>Professional Athletic BMI Analysis & Body Composition Guide</strong> - The complete resource for understanding BMI limitations in athletes, sport-specific body composition requirements, and advanced measurement alternatives for optimal athletic performance.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-orange-100 text-orange-800 px-3 py-1">20+ Sports Covered</Badge>
            <Badge className="bg-red-100 text-red-800 px-3 py-1">Scientific Evidence-Based</Badge>
            <Badge className="bg-pink-100 text-pink-800 px-3 py-1">Professional Grade Analysis</Badge>
            <Badge className="bg-purple-100 text-purple-800 px-3 py-1">Body Composition Expert</Badge>
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
                Quick Navigation
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <Link to="#science" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-orange-50 hover:bg-orange-100 text-orange-700' : 'bg-orange-900/20 hover:bg-orange-900/30 text-orange-300'}`}>
                  <Brain className="h-6 w-6 mx-auto mb-2" />
                  BMI Science
                </Link>
                <Link to="#sports" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-red-50 hover:bg-red-100 text-red-700' : 'bg-red-900/20 hover:bg-red-900/30 text-red-300'}`}>
                  <Dumbbell className="h-6 w-6 mx-auto mb-2" />
                  Sport Ranges
                </Link>
                <Link to="#methods" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-pink-50 hover:bg-pink-100 text-pink-700' : 'bg-pink-900/20 hover:bg-pink-900/30 text-pink-300'}`}>
                  <Target className="h-6 w-6 mx-auto mb-2" />
                  Testing Methods
                </Link>
                <Link to="#faq" className={`p-3 rounded-lg text-center transition-colors ${theme === 'white' ? 'bg-purple-50 hover:bg-purple-100 text-purple-700' : 'bg-purple-900/20 hover:bg-purple-900/30 text-purple-300'}`}>
                  <Info className="h-6 w-6 mx-auto mb-2" />
                  Expert FAQ
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scientific Foundation Section */}
        <section id="science" className="mb-16 max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            The Science: Why BMI Fails for Athletes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {scientificReasons.map((reason, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
                theme === 'white' 
                  ? 'bg-white/80 hover:bg-white/90 border-orange-200/20' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80 hover:bg-gray-800/90 border-orange-500/20'
                  : 'bg-black/80 hover:bg-gray-900/50 border-orange-500/20'
              }`}>
                <CardContent className="p-8">
                  <div className={`flex justify-center mb-6 transition-colors duration-300 ${
                    theme === 'white' ? 'text-orange-600' : 'text-orange-400'
                  }`}>
                    {reason.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 text-center ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {reason.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {reason.description}
                  </p>
                  <div className={`cursor-pointer ${theme === 'white' ? 'text-orange-600' : 'text-orange-400'}`}
                       onClick={() => toggleSection(`science-${index}`)}>
                    <div className="flex items-center justify-center gap-2">
                      {expandedSections[`science-${index}`] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      <span className="text-sm font-medium">View Scientific Details</span>
                    </div>
                  </div>
                  {expandedSections[`science-${index}`] && (
                    <div className={`mt-4 p-4 rounded-lg ${theme === 'white' ? 'bg-orange-50' : 'bg-orange-900/20'}`}>
                      <p className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                        {reason.details}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comprehensive Sports Categories */}
        <section id="sports" className="mb-16 max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Sport-Specific BMI & Body Composition Ranges
          </h2>
          
          {/* Sport Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              onClick={() => setSelectedSport('all')}
              className={`${selectedSport === 'all' 
                ? 'bg-orange-600 text-white' 
                : theme === 'white' ? 'bg-white text-orange-600 border border-orange-300' : 'bg-gray-700 text-orange-300 border border-orange-500/50'
              }`}
            >
              All Sports
            </Button>
            {comprehensiveSports.map((category, index) => (
              <Button
                key={index}
                onClick={() => setSelectedSport(category.category)}
                className={`${selectedSport === category.category 
                  ? 'bg-orange-600 text-white' 
                  : theme === 'white' ? 'bg-white text-orange-600 border border-orange-300' : 'bg-gray-700 text-orange-300 border border-orange-500/50'
                }`}
              >
                {category.category}
              </Button>
            ))}
          </div>

          {filteredSports.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                {category.category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.sports.map((sport, sportIndex) => (
                  <Card key={sportIndex} className={`backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    theme === 'white' 
                      ? 'bg-gradient-to-br from-orange-50 to-red-50' 
                      : theme === 'dark'
                      ? 'bg-gradient-to-br from-orange-900/50 to-red-900/50'
                      : 'bg-gradient-to-br from-orange-900/50 to-red-900/50'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`text-lg ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {sport.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className={`font-semibold ${theme === 'white' ? 'text-orange-700' : 'text-orange-300'}`}>
                            BMI Range: 
                          </span>
                          <span className={`ml-2 font-medium ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                            {sport.bmi}
                          </span>
                        </div>
                        <div>
                          <span className={`font-semibold ${theme === 'white' ? 'text-orange-700' : 'text-orange-300'}`}>
                            Body Fat: 
                          </span>
                          <span className={`ml-2 font-medium ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                            {sport.bodyFat}
                          </span>
                        </div>
                        <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                          {sport.notes}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Advanced Measurement Methods */}
        <section id="methods" className="mb-16 max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Advanced Body Composition Measurement Methods
          </h2>
          <p className={`text-center mb-12 max-w-3xl mx-auto ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
            For athletes, accurate body composition assessment is crucial. Here are the most reliable methods for measuring body fat percentage and muscle mass distribution.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {measurementAlternatives.map((method, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-xl ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    {method.method}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-800">{method.accuracy}</Badge>
                    <Badge className="bg-blue-100 text-blue-800">{method.cost}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {method.description}
                  </p>
                  
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

                  <div className={`p-3 rounded-lg ${theme === 'white' ? 'bg-blue-50' : 'bg-blue-900/20'}`}>
                    <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
                      Best For:
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-blue-600' : 'text-blue-200'}`}>
                      {method.bestFor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Performance vs Health Metrics */}
        <section className="mb-16 max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Performance vs Health: BMI Optimization by Sport
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                theme === 'white' 
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50' 
                  : theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50'
                  : 'bg-gradient-to-br from-blue-900/50 to-purple-900/50'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    {metric.sport}
                  </CardTitle>
                  <Badge className="bg-purple-100 text-purple-800 w-fit">
                    Optimal BMI: {metric.optimalBMI}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Performance Factors:
                    </h4>
                    <ul className={`text-sm space-y-1 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {metric.performanceFactors.map((factor, factorIndex) => (
                        <li key={factorIndex}>• {factor}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${theme === 'white' ? 'bg-yellow-50' : 'bg-yellow-900/20'}`}>
                    <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-yellow-700' : 'text-yellow-300'}`}>
                      Health Considerations:
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-yellow-600' : 'text-yellow-200'}`}>
                      {metric.healthConsiderations}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'white' ? 'bg-green-50' : 'bg-green-900/20'}`}>
                    <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                      Real-World Example:
                    </h4>
                    <p className={`text-sm ${theme === 'white' ? 'text-green-600' : 'text-green-200'}`}>
                      {metric.example}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <Card className={`backdrop-blur-md border-0 shadow-2xl max-w-3xl mx-auto ${
            theme === 'white' 
              ? 'bg-gradient-to-r from-orange-50 to-red-50' 
              : theme === 'dark'
              ? 'bg-gradient-to-r from-orange-900/50 to-red-900/50'
              : 'bg-gradient-to-r from-orange-900/50 to-red-900/50'
          }`}>
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Get Your Professional Athletic Body Composition Analysis
              </h2>
              <p className={`mb-6 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Use our comprehensive calculators with sport-specific analysis and professional-grade body fat estimation for accurate athletic assessment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className={`transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl'
                  }`}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Athletic BMI
                  </Button>
                </Link>
                <Link to="/body-fat">
                  <Button variant="outline" className={`transition-all duration-300 hover:scale-105 ${
                    theme === 'white'
                      ? 'border-orange-300 text-orange-700 hover:bg-orange-50'
                      : 'border-orange-500/50 text-orange-300 hover:bg-orange-900/20'
                  }`}>
                    <Target className="h-4 w-4 mr-2" />
                    Professional Body Fat Analysis
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive FAQ Section */}
        <section id="faq" className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Expert FAQ: Athletic BMI & Body Composition
          </h2>
          
          {/* FAQ Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['All', 'Science', 'Ranges', 'Measurement', 'Sport-Specific', 'Health Risks'].map((category) => (
              <Badge 
                key={category}
                className={`cursor-pointer px-3 py-2 ${
                  theme === 'white' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' : 'bg-orange-900/30 text-orange-300 hover:bg-orange-900/50'
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
                      <Badge className="bg-orange-100 text-orange-800 text-xs">
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

export default BMIForAthletesPage;