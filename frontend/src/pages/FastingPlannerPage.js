import React, { useState } from 'react';
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
  Clock, 
  Calendar, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Timer,
  Activity,
  Award,
  Heart,
  Brain,
  ChevronDown,
  ChevronUp,
  Info,
  BookOpen,
  Lightbulb,
  BarChart3,
  PlayCircle,
  TrendingUp,
  Zap,
  Users,
  Shield
} from 'lucide-react';
import { 
  getFastingMethods, 
  createFastingSchedule,
  getFastingBenefits,
  getFastingTips
} from '../utils/fastingCalculations';

const FastingPlannerPage = () => {
  const { theme, getBackgroundGradient } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState('16_8');
  const [startTime, setStartTime] = useState('20:00');
  const [experience, setExperience] = useState('beginner');
  const [schedule, setSchedule] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    generateSchedule(method, startTime);
  };

  const handleTimeChange = (time) => {
    setStartTime(time);
    generateSchedule(selectedMethod, time);
  };

  const generateSchedule = (method, time) => {
    const fastingSchedule = createFastingSchedule(method, time);
    setSchedule(fastingSchedule);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Generate initial schedule
  React.useEffect(() => {
    generateSchedule(selectedMethod, startTime);
  }, []);

  const professionalBadges = [
    { icon: <Clock className="h-4 w-4" />, text: "6 Scientific Methods" },
    { icon: <Calendar className="h-4 w-4" />, text: "Personalized Schedules" },
    { icon: <Target className="h-4 w-4" />, text: "Goal-Based Planning" },
    { icon: <Heart className="h-4 w-4" />, text: "Health Optimization" },
    { icon: <Brain className="h-4 w-4" />, text: "Cognitive Enhancement" },
    { icon: <Award className="h-4 w-4" />, text: "Evidence-Based Protocol" }
  ];

  const fastingMethods = getFastingMethods();
  const benefits = getFastingBenefits();

  // Quick Navigation Menu
  const navigationMenu = [
    { id: 'fasting-science', label: 'Fasting Science', icon: <Brain className="h-4 w-4" /> },
    { id: 'method-comparison', label: 'Method Analysis', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'optimization-guide', label: 'Optimization', icon: <Target className="h-4 w-4" /> },
    { id: 'safety-guidelines', label: 'Safety Guide', icon: <Shield className="h-4 w-4" /> },
    { id: 'expert-faq', label: 'Expert FAQ', icon: <BookOpen className="h-4 w-4" /> }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="World's Best Intermittent Fasting Planner - Professional IF Calculator 2025"
        description="Create your personalized intermittent fasting plan with the world's most comprehensive IF planner. Features 6 scientific methods, personalized schedules, safety guidelines, and professional optimization strategies for maximum health benefits."
        keywords="intermittent fasting calculator, IF planner, fasting schedule, 16:8 fasting, intermittent fasting timer, fasting methods, IF schedule calculator, autophagy, metabolic health, weight loss fasting, circadian rhythm fasting"
        canonical="/fasting-planner"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebApplication", "MedicalWebPage"],
          "name": "Professional Intermittent Fasting Planner - World's Most Comprehensive IF Calculator",
          "description": "The world's most advanced intermittent fasting planner with 6 scientific methods, personalized schedules, and professional health optimization strategies.",
          "url": "https://bmicalculator.com/fasting-planner",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "permissions": "browser",
          "medicalSpecialty": ["Endocrinology", "Nutrition", "Metabolic Medicine"],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "6 evidence-based fasting methods (16:8, 18:6, 20:4, 5:2, ADF, Eat-Stop-Eat)",
            "Personalized fasting schedules with optimal timing", 
            "Experience-based recommendations and tips",
            "Comprehensive safety guidelines and contraindications",
            "Health benefits analysis with scientific evidence",
            "Professional optimization strategies",
            "Circadian rhythm alignment protocols"
          ],
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the best intermittent fasting method for beginners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 16:8 method is ideal for beginners - fast for 16 hours, eat in 8 hours. It's sustainable, fits most lifestyles, and provides proven benefits while being easy to maintain long-term."
                }
              },
              {
                "@type": "Question", 
                "name": "Is intermittent fasting safe for everyone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "IF is generally safe for healthy adults, but certain groups should avoid it: pregnant/breastfeeding women, children, people with eating disorders, diabetes patients without medical supervision, and those on certain medications."
                }
              }
            ]
          }
        }}
      />

      <Header />

      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              theme === 'white' ? 'bg-gradient-to-br from-orange-100 to-amber-100' :
              theme === 'dark' ? 'bg-gradient-to-br from-orange-900/50 to-amber-900/50' :
              'bg-gradient-to-br from-orange-900/50 to-yellow-900/50'
            }`}>
              <Timer className={`h-12 w-12 ${
                theme === 'white' ? 'text-orange-600' :
                theme === 'dark' ? 'text-orange-400' :
                'text-amber-400'
              }`} />
            </div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Professional Intermittent Fasting Planner
          </h1>

          <p className={`text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            The world's most comprehensive intermittent fasting planner with 6 evidence-based methods, personalized schedules, 
            and professional optimization strategies. Transform your health with scientifically-backed fasting protocols.
          </p>

          {/* Professional Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {professionalBadges.map((badge, index) => (
              <Badge 
                key={index}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  theme === 'white' 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700'
                    : 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white hover:from-amber-700 hover:to-yellow-700'
                }`}
              >
                {badge.icon}
                <span className="ml-2">{badge.text}</span>
              </Badge>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {navigationMenu.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 hover:scale-105 ${
                  theme === 'white'
                    ? 'border-orange-200 text-orange-600 hover:bg-orange-50'
                    : 'border-orange-500/30 text-orange-400 hover:bg-orange-900/20'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Fasting Method Selection */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-2xl font-bold text-center mb-8 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Choose Your Scientific Fasting Method
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fastingMethods.map((method, index) => (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                    selectedMethod === method.id 
                      ? (theme === 'white' 
                          ? 'ring-2 ring-orange-500 bg-orange-50' 
                          : 'ring-2 ring-orange-400 bg-orange-900/20')
                      : (theme === 'white' 
                          ? 'bg-white/90 hover:bg-white/95' 
                          : theme === 'dark'
                          ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-orange-500/20'
                          : 'bg-gray-900/90 hover:bg-gray-900/95 border border-amber-500/20')
                  }`}
                  onClick={() => handleMethodChange(method.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-lg font-semibold ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {method.name}
                      </h3>
                      <Badge 
                        variant={method.difficulty === 'Beginner' ? 'default' : 
                                method.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {method.difficulty}
                      </Badge>
                    </div>
                    
                    <p className={`text-sm mb-4 ${
                      theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {method.description}
                    </p>

                    <div className="space-y-2">
                      <div className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                        <strong>Frequency:</strong> {method.frequency}
                      </div>
                      {method.schedule && (
                        <div className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                          <strong>Schedule:</strong> {method.schedule.fast}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Customization */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className={`backdrop-blur-md border-0 shadow-2xl ${
              theme === 'white' 
                ? 'bg-white/95' 
                : theme === 'dark'
                ? 'bg-gray-800/95 border border-orange-500/20'
                : 'bg-gray-900/95 border border-amber-500/20'
            }`}>
              <CardContent className="p-8">
                <h2 className={`text-2xl font-bold text-center mb-6 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  Customize Your Professional Schedule
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                      <Clock className="inline h-4 w-4 mr-2" />
                      Fasting Start Time
                    </Label>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}
                    />
                    <p className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Time you want to begin your fasting period
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                      <Activity className="inline h-4 w-4 mr-2" />
                      Experience Level
                    </Label>
                    <Select value={experience} onValueChange={setExperience}>
                      <SelectTrigger className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner - New to IF</SelectItem>
                        <SelectItem value="intermediate">Intermediate - Some IF experience</SelectItem>
                        <SelectItem value="advanced">Advanced - Experienced faster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Generated Schedule */}
                {schedule && (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">
                        Your {schedule.method.name} Professional Schedule
                      </h3>
                      <p className="text-gray-700 mb-4">{schedule.method.description}</p>
                      
                      {schedule.schedule.fastingWindow && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-white rounded-lg shadow">
                            <div className="text-lg font-bold text-red-600">Fasting Window</div>
                            <div className="text-2xl font-bold text-gray-900">
                              {schedule.schedule.fastingWindow.start} - {schedule.schedule.fastingWindow.end}
                            </div>
                            <div className="text-sm text-gray-600">{schedule.schedule.fastingWindow.duration}</div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow">
                            <div className="text-lg font-bold text-green-600">Eating Window</div>
                            <div className="text-2xl font-bold text-gray-900">
                              {schedule.schedule.eatingWindow.start} - {schedule.schedule.eatingWindow.end}
                            </div>
                            <div className="text-sm text-gray-600">{schedule.schedule.eatingWindow.duration}</div>
                          </div>
                        </div>
                      )}

                      {schedule.schedule.weeklyPattern && (
                        <div className="grid grid-cols-7 gap-2 mt-4">
                          {Object.entries(schedule.schedule.weeklyPattern).map(([day, info]) => (
                            <div key={day} className={`p-2 rounded text-xs ${
                              info.type === 'fasting' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              <div className="font-bold capitalize">{day.slice(0, 3)}</div>
                              <div>{info.calories}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tips for Experience Level */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Professional Tips for {experience.charAt(0).toUpperCase() + experience.slice(1)} Fasters
                      </h4>
                      <ul className="space-y-2">
                        {getFastingTips(selectedMethod, experience).slice(0, 5).map((tip, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Safety Guidelines */}
                    <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Critical Safety Guidelines
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-red-700">Who Should Avoid IF:</strong>
                          <ul className="mt-1 space-y-1 text-gray-700">
                            {schedule.safetyGuidelines.whoShouldAvoid.slice(0, 4).map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-red-700">Warning Signs:</strong>
                          <ul className="mt-1 space-y-1 text-gray-700">
                            {schedule.safetyGuidelines.warningSigns.slice(0, 4).map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fasting Science Deep-Dive */}
        <section id="fasting-science" className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                The Science of Intermittent Fasting
              </h2>
              <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
                Understanding the molecular mechanisms and physiological adaptations that make intermittent fasting a powerful health optimization tool
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Autophagy & Cellular Cleanup",
                  icon: <Zap className="h-6 w-6" />,
                  summary: "Fasting triggers autophagy, a cellular housekeeping process that removes damaged proteins and organelles while recycling cellular components.",
                  details: [
                    "Autophagy peaks after 12-16 hours of fasting, with maximum activation at 18-24 hours",
                    "mTOR pathway suppression initiates autophagy through AMPK activation and ULK1 phosphorylation",
                    "Damaged mitochondria (mitophagy) and misfolded proteins are selectively degraded",
                    "Cellular rejuvenation through organelle renewal and protein quality control enhancement"
                  ]
                },
                {
                  title: "Metabolic Switching & Ketosis",
                  icon: <Target className="h-6 w-6" />,
                  summary: "Extended fasting periods trigger metabolic switching from glucose to ketone body utilization, optimizing energy efficiency and brain function.",
                  details: [
                    "Glycogen depletion occurs within 12-24 hours, initiating gluconeogenesis and ketogenesis",
                    "Beta-hydroxybutyrate and acetoacetate production peaks after 16-20 hours of fasting",
                    "Ketones cross the blood-brain barrier, providing efficient neural fuel (25% more ATP per oxygen molecule)",
                    "BDNF (brain-derived neurotrophic factor) increases significantly during ketosis"
                  ]
                },
                {
                  title: "Hormonal Optimization",
                  icon: <TrendingUp className="h-6 w-6" />,
                  summary: "Intermittent fasting profoundly affects hormone levels, improving insulin sensitivity, growth hormone production, and stress resilience.",
                  details: [
                    "Insulin sensitivity improves by 20-25% within 2-4 weeks of consistent IF practice",
                    "Growth hormone increases 3-5 fold during fasting periods, promoting fat oxidation and muscle preservation",
                    "Noradrenaline levels rise, enhancing focus, alertness, and metabolic rate by 10-14%",
                    "Cortisol rhythm optimization with reduced inflammatory markers and improved stress adaptation"
                  ]
                },
                {
                  title: "Circadian Biology & Gene Expression",
                  icon: <Clock className="h-6 w-6" />,
                  summary: "Time-restricted eating aligns feeding patterns with circadian rhythms, optimizing metabolic gene expression and cellular clock function.",
                  details: [
                    "CLOCK and BMAL1 genes regulate circadian metabolic cycling and nutrient sensing",
                    "Peripheral tissue clocks synchronize with feeding/fasting cycles independent of light exposure",
                    "Optimal eating windows align with natural insulin sensitivity peaks (morning) and troughs (evening)",
                    "Circadian amplitude improvement enhances sleep quality, cognitive function, and metabolic flexibility"
                  ]
                }
              ].map((science, index) => (
                <Card 
                  key={index}
                  className={`transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    theme === 'white' 
                      ? 'bg-white/90 hover:bg-white/95' 
                      : theme === 'dark'
                      ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-orange-500/20'
                      : 'bg-gray-900/90 hover:bg-gray-900/95 border border-orange-500/20'
                  }`}
                  onClick={() => toggleSection(`science-${index}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        theme === 'white' ? 'bg-orange-100 text-orange-600' :
                        theme === 'dark' ? 'bg-orange-900/50 text-orange-400' :
                        'bg-orange-900/50 text-orange-400'
                      }`}>
                        {science.icon}
                      </div>
                      <h3 className={`text-lg font-semibold ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {science.title}
                      </h3>
                      {expandedSection === `science-${index}` ? 
                        <ChevronUp className="h-5 w-5 ml-auto" /> : 
                        <ChevronDown className="h-5 w-5 ml-auto" />
                      }
                    </div>
                    
                    <p className={`text-sm mb-4 ${
                      theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {science.summary}
                    </p>

                    {expandedSection === `science-${index}` && (
                      <div className="space-y-3">
                        {science.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-2xl font-bold text-center mb-8 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Evidence-Based Health Benefits
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index}
                  className={`backdrop-blur-md border-0 shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/90 hover:bg-white/95' 
                      : theme === 'dark'
                      ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-orange-500/20'
                      : 'bg-gray-900/90 hover:bg-gray-900/95 border border-amber-500/20'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        theme === 'white' ? 'bg-orange-100 text-orange-600' :
                        theme === 'dark' ? 'bg-orange-900/50 text-orange-400' :
                        'bg-amber-900/50 text-amber-400'
                      }`}>
                        {benefit.category === 'Weight Management' && <Target className="h-5 w-5" />}
                        {benefit.category === 'Metabolic Health' && <Activity className="h-5 w-5" />}
                        {benefit.category === 'Cellular Health' && <Heart className="h-5 w-5" />}
                        {benefit.category === 'Brain Function' && <Brain className="h-5 w-5" />}
                      </div>
                      <h3 className={`text-lg font-semibold ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {benefit.category}
                      </h3>
                    </div>
                    
                    <ul className={`space-y-2 text-sm mb-4 ${
                      theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {benefit.benefits.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className={`text-xs p-3 rounded-lg ${
                      theme === 'white' ? 'bg-gray-100 text-gray-600' : 'bg-gray-700/50 text-gray-300'
                    }`}>
                      <strong>Research:</strong> {benefit.evidence}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Expert FAQ Section */}
        <section id="expert-faq" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Expert Intermittent Fasting FAQ
              </h2>
              <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Professional insights from metabolic researchers and fasting specialists
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  category: "Scientific Foundation",
                  question: "What's the optimal fasting duration for maximizing autophagy and health benefits?",
                  answer: "Autophagy begins around 12-16 hours of fasting and peaks at 18-24 hours. For most people, 16-18 hour fasts provide excellent autophagy benefits while remaining sustainable. Extended fasts (24-48 hours) may provide additional benefits but should be done less frequently and with medical supervision. The key is consistency - regular 16:8 fasting often provides more cumulative benefits than occasional longer fasts."
                },
                {
                  category: "Method Selection", 
                  question: "How do I choose the best intermittent fasting method for my lifestyle and goals?",
                  answer: "Start with your primary goal: weight loss (16:8 or 18:6), metabolic health (any daily method), cognitive enhancement (18:6 or 20:4), or longevity (varied approaches). Consider your schedule - shift workers may prefer alternate day fasting, while 9-5 workers often succeed with time-restricted eating. Begin with 16:8, assess tolerance for 2-3 weeks, then adjust. Social eating patterns and family obligations should guide timing choices."
                },
                {
                  category: "Optimization Strategies",
                  question: "What can I consume during fasting windows without breaking the fast?",
                  answer: "Strict fasting allows only water, black coffee, plain tea, and electrolytes. These maintain autophagy and ketosis benefits. Small amounts (<50 calories) of MCT oil, bone broth, or cream may not significantly impact metabolic benefits but could reduce autophagy. Artificial sweeteners are controversial - some studies suggest they may affect insulin sensitivity in certain individuals. For optimal results, stick to zero-calorie beverages during fasting windows."
                },
                {
                  category: "Individual Variation",
                  question: "Why do some people experience side effects while others feel great immediately?",
                  answer: "Individual responses vary based on metabolic flexibility, previous eating patterns, genetics, and underlying health. Those accustomed to frequent eating may experience adaptation symptoms (fatigue, irritability, headaches) for 1-3 weeks as their body learns to use stored fat efficiently. People with better metabolic flexibility adapt faster. Women may need longer adaptation periods due to hormonal considerations. Gradual implementation (12:12 → 14:10 → 16:8) often reduces side effects."
                },
                {
                  category: "Health Considerations",
                  question: "How does intermittent fasting affect hormones, especially in women?",
                  answer: "IF can positively affect hormones by improving insulin sensitivity and reducing inflammation. However, women may be more sensitive to fasting due to kisspeptin sensitivity, which regulates reproductive hormones. Extended fasting (>16 hours) may disrupt menstrual cycles in some women. Recommendations: start with 14:10, monitor menstrual regularity, consider cycle syncing (lighter fasting during luteal phase), and prioritize sleep and stress management. Pregnant and breastfeeding women should avoid IF."
                },
                {
                  category: "Long-term Success",
                  question: "How do I maintain intermittent fasting long-term and avoid plateaus?",
                  answer: "Long-term success requires flexibility and periodic variation. Cycle between different methods (16:8 for 6 weeks, then 5:2 for 2 weeks). Take planned breaks during vacations or high-stress periods. Focus on the lifestyle benefits (mental clarity, simplified meal planning) rather than just weight loss. Address social challenges by communicating your goals and finding supportive communities. Track subjective benefits (energy, sleep, mood) alongside objective measures. Most importantly, choose a method you genuinely enjoy and can sustain indefinitely."
                }
              ].map((faq, index) => (
                <Card 
                  key={index}
                  className={`transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
                    theme === 'white' 
                      ? 'bg-white/90 hover:bg-white/95' 
                      : theme === 'dark'
                      ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-orange-500/20'
                      : 'bg-gray-900/90 hover:bg-gray-900/95 border border-orange-500/20'
                  }`}
                  onClick={() => toggleSection(`faq-${index}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-orange-100 text-orange-700 text-xs">
                          {faq.category}
                        </Badge>
                        <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                          {faq.question}
                        </h3>
                      </div>
                      {expandedSection === `faq-${index}` ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />
                      }
                    </div>
                    
                    {expandedSection === `faq-${index}` && (
                      <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                        {faq.answer}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FastingPlannerPage;