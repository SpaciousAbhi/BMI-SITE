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
  Brain
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

  // Generate initial schedule
  React.useEffect(() => {
    generateSchedule(selectedMethod, startTime);
  }, []);

  const professionalBadges = [
    { icon: <Clock className="h-4 w-4" />, text: "6 Fasting Methods" },
    { icon: <Calendar className="h-4 w-4" />, text: "Personalized Schedules" },
    { icon: <Target className="h-4 w-4" />, text: "Goal-Based Planning" },
    { icon: <Heart className="h-4 w-4" />, text: "Health Optimization" }
  ];

  const fastingMethods = getFastingMethods();
  const benefits = getFastingBenefits();

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Free Intermittent Fasting Planner - IF Schedule Calculator 2025 | Fasting Timer"
        description="Create your personalized intermittent fasting schedule with our comprehensive IF planner. Choose from 16:8, 18:6, 20:4, 5:2, and more fasting methods with optimal timing and health guidance."
        keywords="intermittent fasting calculator, IF planner, fasting schedule, 16:8 fasting, intermittent fasting timer, fasting methods, IF schedule calculator"
        canonical="/fasting-planner"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Intermittent Fasting Planner - IF Schedule Calculator",
          "description": "Professional intermittent fasting planner to create personalized fasting schedules and optimize health benefits.",
          "url": "https://bmicalculator.com/fasting-planner",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "permissions": "browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "6 fasting methods",
            "Personalized schedules", 
            "Health benefits guide",
            "Safety guidelines",
            "Experience-based tips"
          ]
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
            Intermittent Fasting Planner
          </h1>

          <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Create your personalized intermittent fasting schedule with our comprehensive IF planner. 
            Choose from proven fasting methods and get optimal timing for maximum health benefits.
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
        </div>

        {/* Fasting Method Selection */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-2xl font-bold text-center mb-8 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Choose Your Fasting Method
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
                  Customize Your Schedule
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
                        Your {schedule.method.name} Schedule
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
                        Tips for {experience.charAt(0).toUpperCase() + experience.slice(1)} Fasters
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
                        Important Safety Guidelines
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

        {/* Benefits Section */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-2xl font-bold text-center mb-8 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Science-Backed Benefits of Intermittent Fasting
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
      </main>

      <Footer />
    </div>
  );
};

export default FastingPlannerPage;