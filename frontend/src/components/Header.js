import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Zap, 
  Scale, 
  Menu, 
  X, 
  Calculator, 
  History, 
  Target, 
  Dumbbell,
  Heart,
  BookOpen,
  Shield,
  Mail,
  Utensils,
  Activity,
  ChevronDown,
  Baby,
  Users,
  Globe,
  Brain,
  BarChart3,
  Ruler,
  Droplets,
  HeartPulse,
  Flame,
  Clock,
  TrendingUp,
  FileText,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { useBMI } from '../contexts/BMIContext';

const Header = () => {
  const { theme, toggleTheme, getThemeConfig } = useTheme();
  const {} = useBMI();
  const location = useLocation();
  const themeConfig = getThemeConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // BMI & Body Analysis Calculators
  const bmiCalculators = [
    { path: '/', label: 'BMI Calculator', icon: Calculator, description: 'Calculate Body Mass Index' },
    { path: '/athletes-bmi', label: 'BMI for Athletes', icon: Activity, description: 'Sports-specific BMI analysis' },
    { path: '/pregnancy-bmi', label: 'Pregnancy BMI', icon: Baby, description: 'Safe weight gain during pregnancy' },
    { path: '/senior-bmi', label: 'Senior BMI (65+)', icon: Users, description: 'Age-adjusted BMI for seniors' },
    { path: '/ethnicity-bmi', label: 'Ethnicity-Adjusted BMI', icon: Globe, description: 'Culturally-aware BMI calculations' },
    { path: '/bmi-for-children', label: 'BMI for Children & Teens', icon: User, description: 'Pediatric BMI percentiles' },
    { path: '/smart-bmi', label: 'Smart BMI Calculator', icon: Brain, description: 'AI-powered BMI insights' },
  ];

  // Body Composition Tools
  const bodyCompositionTools = [
    { path: '/body-fat', label: 'Body Fat Calculator', icon: Target, description: 'US Navy Method body fat analysis' },
    { path: '/ideal-weight', label: 'Ideal Weight Calculator', icon: Scale, description: 'Calculate your ideal weight range' },
    { path: '/waist-height-ratio', label: 'Waist-to-Height Ratio', icon: Ruler, description: 'Better than BMI for health risks' },
    { path: '/body-surface-area', label: 'Body Surface Area (BSA)', icon: BarChart3, description: 'Medical-grade BSA calculations' },
  ];

  // Nutrition & Diet Tools
  const nutritionTools = [
    { path: '/calories', label: 'TDEE & BMR Calculator', icon: Zap, description: 'Daily calorie needs calculation' },
    { path: '/macros', label: 'Macro Calculator', icon: Utensils, description: 'Protein, carbs, and fat breakdown' },
    { path: '/protein-calculator', label: 'Protein Calculator', icon: Dumbbell, description: 'Daily protein intake needs' },
    { path: '/water-calculator', label: 'Water Calculator', icon: Droplets, description: 'Daily hydration requirements' },
  ];

  // Fitness & Health Tools
  const fitnessTools = [
    { path: '/heart-rate-calculator', label: 'Heart Rate Calculator', icon: HeartPulse, description: 'Training zones and max HR' },
    { path: '/calories-burned-calculator', label: 'Calories Burned', icon: Flame, description: '200+ activities calorie burn' },
    { path: '/fasting-planner', label: 'Fasting Planner', icon: Clock, description: 'Intermittent fasting schedules' },
  ];

  // Health Management Tools
  const healthTools = [
    { path: '/history', label: 'Progress Tracking', icon: TrendingUp, description: 'Track your health journey' },
    { path: '/goals', label: 'Goal Setting', icon: Target, description: 'Set and achieve health goals' },
    { path: '/workout', label: 'Workout Plans', icon: Dumbbell, description: 'Personalized exercise routines' },
  ];

  // Legal & Support Tools
  const legalSupport = [
    { path: '/contact', label: 'Contact Us', icon: Mail, description: 'Get in touch with our team' },
    { path: '/privacy-policy', label: 'Privacy Policy', icon: Shield, description: 'Privacy and data protection' },
    { path: '/terms-of-service', label: 'Terms of Service', icon: Shield, description: 'Service terms and conditions' },
  ];

  // Health Resources
  const healthResources = [
    { path: '/blog', label: 'Health Blog', icon: BookOpen, description: 'Expert health articles' },
    { path: '/about-bmi', label: 'About BMI', icon: FileText, description: 'Complete BMI guide' },
    { path: '/health-tips', label: 'Health Tips', icon: Heart, description: 'Daily wellness advice' },
    { path: '/nutrition-guide', label: 'Nutrition Guide', icon: BookOpen, description: 'Comprehensive nutrition info' },
  ];

  const calculatorCategories = [
    { title: 'BMI & Body Analysis', items: bmiCalculators, icon: Calculator },
    { title: 'Body Composition', items: bodyCompositionTools, icon: Target },
    { title: 'Nutrition & Diet', items: nutritionTools, icon: Utensils },
    { title: 'Fitness & Health', items: fitnessTools, icon: Heart },
  ];

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const allNavItems = [...bmiCalculators, ...bodyCompositionTools, ...nutritionTools, ...fitnessTools, ...healthTools, ...healthResources];

  const getThemeIcon = () => {
    switch(theme) {
      case 'white': return <Moon className="h-4 w-4" />;
      case 'dark': return <Zap className="h-4 w-4" />;
      case 'black': return <Sun className="h-4 w-4" />;
      default: return <Moon className="h-4 w-4" />;
    }
  };

  const getAccentColor = () => {
    switch(themeConfig.accent) {
      case 'teal': return theme === 'white' ? 'text-teal-600 bg-teal-50' : 'text-teal-400 bg-teal-400/10';
      case 'purple': return 'text-purple-400 bg-purple-400/10';
      case 'green': return 'text-green-400 bg-green-400/10';
      default: return 'text-blue-400 bg-blue-400/10';
    }
  };

  return (
    <header className={`backdrop-blur-md border-b transition-all duration-500 sticky top-0 z-50 glass-effect ${
      theme === 'white' 
        ? 'bg-white/70 border-teal-200/30' 
        : theme === 'dark'
        ? 'bg-gray-900/70 border-purple-500/20'
        : 'bg-black/70 border-green-500/20'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Scale className={`h-6 w-6 transition-all duration-300 group-hover:scale-110 ${
              theme === 'white' 
                ? 'text-teal-600' 
                : theme === 'dark' 
                ? 'text-purple-400' 
                : 'text-green-400'
            }`} />
            <span className={`text-lg font-bold transition-colors duration-300 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Advanced BMI Calculator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            {/* Calculators Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('calculators')}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg ${
                  theme === 'white' 
                    ? 'text-gray-600 hover:text-teal-600 hover:bg-teal-50' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Calculator className="h-4 w-4" />
                Calculators
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  openDropdown === 'calculators' ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Calculators Mega Menu */}
              {openDropdown === 'calculators' && (
                <div className={`absolute top-full left-0 mt-2 w-[900px] p-6 rounded-xl shadow-2xl border backdrop-blur-md z-50 ${
                  theme === 'white' 
                    ? 'bg-white/95 border-teal-200/50' 
                    : theme === 'dark'
                    ? 'bg-gray-900/95 border-purple-500/30'
                    : 'bg-black/95 border-green-500/30'
                }`}>
                  <div className="grid grid-cols-2 gap-6">
                    {calculatorCategories.map((category) => {
                      const CategoryIcon = category.icon;
                      return (
                        <div key={category.title} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className={`h-5 w-5 ${
                              theme === 'white' ? 'text-teal-600' : theme === 'dark' ? 'text-purple-400' : 'text-green-400'
                            }`} />
                            <h3 className={`font-semibold text-sm ${
                              theme === 'white' ? 'text-gray-900' : 'text-white'
                            }`}>
                              {category.title}
                            </h3>
                          </div>
                          <div className="space-y-1">
                            {category.items.map((item) => {
                              const ItemIcon = item.icon;
                              return (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  onClick={handleMenuClose}
                                  className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                                    location.pathname === item.path
                                      ? theme === 'white'
                                        ? 'text-teal-600 bg-teal-50'
                                        : theme === 'dark'
                                        ? 'text-purple-400 bg-purple-400/10'
                                        : 'text-green-400 bg-green-400/10'
                                      : theme === 'white' 
                                      ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                                  }`}
                                >
                                  <ItemIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="text-sm font-medium">{item.label}</div>
                                    <div className={`text-xs ${
                                      theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                                    }`}>
                                      {item.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Health Tools Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('tools')}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg ${
                  theme === 'white' 
                    ? 'text-gray-600 hover:text-teal-600 hover:bg-teal-50' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                Health Tools
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  openDropdown === 'tools' ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Tools Dropdown */}
              {openDropdown === 'tools' && (
                <div className={`absolute top-full left-0 mt-2 w-64 p-4 rounded-xl shadow-2xl border backdrop-blur-md z-50 ${
                  theme === 'white' 
                    ? 'bg-white/95 border-teal-200/50' 
                    : theme === 'dark'
                    ? 'bg-gray-900/95 border-purple-500/30'
                    : 'bg-black/95 border-green-500/30'
                }`}>
                  <div className="space-y-1">
                    {healthTools.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleMenuClose}
                          className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                            location.pathname === item.path
                              ? theme === 'white'
                                ? 'text-teal-600 bg-teal-50'
                                : theme === 'dark'
                                ? 'text-purple-400 bg-purple-400/10'
                                : 'text-green-400 bg-green-400/10'
                              : theme === 'white' 
                              ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <ItemIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className={`text-xs ${
                              theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('resources')}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg ${
                  theme === 'white' 
                    ? 'text-gray-600 hover:text-teal-600 hover:bg-teal-50' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  openDropdown === 'resources' ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Resources Dropdown */}
              {openDropdown === 'resources' && (
                <div className={`absolute top-full left-0 mt-2 w-64 p-4 rounded-xl shadow-2xl border backdrop-blur-md z-50 ${
                  theme === 'white' 
                    ? 'bg-white/95 border-teal-200/50' 
                    : theme === 'dark'
                    ? 'bg-gray-900/95 border-purple-500/30'
                    : 'bg-black/95 border-green-500/30'
                }`}>
                  <div className="space-y-1">
                    {healthResources.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleMenuClose}
                          className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                            location.pathname === item.path
                              ? theme === 'white'
                                ? 'text-teal-600 bg-teal-50'
                                : theme === 'dark'
                                ? 'text-purple-400 bg-purple-400/10'
                                : 'text-green-400 bg-green-400/10'
                              : theme === 'white' 
                              ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <ItemIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className={`text-xs ${
                              theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Legal & Support Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('legal')}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg ${
                  theme === 'white' 
                    ? 'text-gray-600 hover:text-teal-600 hover:bg-teal-50' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Shield className="h-4 w-4" />
                Support
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  openDropdown === 'legal' ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Legal & Support Dropdown */}
              {openDropdown === 'legal' && (
                <div className={`absolute top-full left-0 mt-2 w-64 p-4 rounded-xl shadow-2xl border backdrop-blur-md z-50 ${
                  theme === 'white' 
                    ? 'bg-white/95 border-teal-200/50' 
                    : theme === 'dark'
                    ? 'bg-gray-900/95 border-purple-500/30'
                    : 'bg-black/95 border-green-500/30'
                }`}>
                  <div className="space-y-1">
                    {legalSupport.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleMenuClose}
                          className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                            location.pathname === item.path
                              ? theme === 'white'
                                ? 'text-teal-600 bg-teal-50'
                                : theme === 'dark'
                                ? 'text-purple-400 bg-purple-400/10'
                                : 'text-green-400 bg-green-400/10'
                              : theme === 'white' 
                              ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <ItemIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className={`text-xs ${
                              theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`${getAccentColor()} border-current hidden sm:block`}>
              {themeConfig.name}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className={`transition-all duration-300 hover:scale-105 ${
                theme === 'white'
                  ? 'border-teal-200 hover:border-teal-300 hover:bg-teal-50'
                  : theme === 'dark'
                  ? 'border-purple-400/30 hover:border-purple-400/50 hover:bg-purple-400/10'
                  : 'border-green-400/30 hover:border-green-400/50 hover:bg-green-400/10'
              }`}
            >
              {getThemeIcon()}
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden transition-all duration-300 hover:scale-105 ${
                theme === 'white'
                  ? 'border-teal-200 hover:border-teal-300 hover:bg-teal-50'
                  : theme === 'dark'
                  ? 'border-purple-400/30 hover:border-purple-400/50 hover:bg-purple-400/10'
                  : 'border-green-400/30 hover:border-green-400/50 hover:bg-green-400/10'
              }`}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden border-t transition-all duration-300 ${
            theme === 'white' 
              ? 'border-teal-200/30 bg-white/90' 
              : theme === 'dark'
              ? 'border-purple-500/20 bg-gray-900/90'
              : 'border-green-500/20 bg-black/90'
          }`}>
            <div className="py-4 space-y-1 max-h-96 overflow-y-auto">
              {/* BMI & Body Analysis Section */}
              <div className="px-4 py-2">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  🧮 BMI & Body Analysis
                </h3>
                {bmiCalculators.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleMenuClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                        location.pathname === item.path
                          ? theme === 'white'
                            ? 'text-teal-600 bg-teal-50'
                            : theme === 'dark'
                            ? 'text-purple-400 bg-purple-400/10'
                            : 'text-green-400 bg-green-400/10'
                          : theme === 'white' 
                          ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Body Composition Section */}
              <div className="px-4 py-2">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  ⚖️ Body Composition Tools
                </h3>
                {bodyCompositionTools.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleMenuClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                        location.pathname === item.path
                          ? theme === 'white'
                            ? 'text-teal-600 bg-teal-50'
                            : theme === 'dark'
                            ? 'text-purple-400 bg-purple-400/10'
                            : 'text-green-400 bg-green-400/10'
                          : theme === 'white' 
                          ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Nutrition & Diet Section */}
              <div className="px-4 py-2">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  🍎 Nutrition & Diet Tools
                </h3>
                {nutritionTools.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleMenuClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                        location.pathname === item.path
                          ? theme === 'white'
                            ? 'text-teal-600 bg-teal-50'
                            : theme === 'dark'
                            ? 'text-purple-400 bg-purple-400/10'
                            : 'text-green-400 bg-green-400/10'
                          : theme === 'white' 
                          ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Fitness & Health Section */}
              <div className="px-4 py-2">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  💪 Fitness & Health Tools
                </h3>
                {fitnessTools.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleMenuClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                        location.pathname === item.path
                          ? theme === 'white'
                            ? 'text-teal-600 bg-teal-50'
                            : theme === 'dark'
                            ? 'text-purple-400 bg-purple-400/10'
                            : 'text-green-400 bg-green-400/10'
                          : theme === 'white' 
                          ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Health Management Section */}
              <div className="px-4 py-2">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  📊 Health Management Tools
                </h3>
                {healthTools.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleMenuClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                        location.pathname === item.path
                          ? theme === 'white'
                            ? 'text-teal-600 bg-teal-50'
                            : theme === 'dark'
                            ? 'text-purple-400 bg-purple-400/10'
                            : 'text-green-400 bg-green-400/10'
                          : theme === 'white' 
                          ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Health Resources Section */}
              <div className="px-4 py-2">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  📚 Health Resources
                </h3>
                {healthResources.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleMenuClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                        location.pathname === item.path
                          ? theme === 'white'
                            ? 'text-teal-600 bg-teal-50'
                            : theme === 'dark'
                            ? 'text-purple-400 bg-purple-400/10'
                            : 'text-green-400 bg-green-400/10'
                          : theme === 'white' 
                          ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Legal & Support Section */}
              <div className="px-4 py-2 border-t border-gray-200/30">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  ⚖️ Legal & Support
                </h3>
                <Link
                  to="/contact"
                  onClick={handleMenuClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                    location.pathname === '/contact'
                      ? theme === 'white'
                        ? 'text-teal-600 bg-teal-50'
                        : theme === 'dark'
                        ? 'text-purple-400 bg-purple-400/10'
                        : 'text-green-400 bg-green-400/10'
                      : theme === 'white' 
                      ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Link>
                <Link
                  to="/privacy-policy"
                  onClick={handleMenuClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                    location.pathname === '/privacy-policy'
                      ? theme === 'white'
                        ? 'text-teal-600 bg-teal-50'
                        : theme === 'dark'
                        ? 'text-purple-400 bg-purple-400/10'
                        : 'text-green-400 bg-green-400/10'
                      : theme === 'white' 
                      ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  onClick={handleMenuClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                    location.pathname === '/terms-of-service'
                      ? theme === 'white'
                        ? 'text-teal-600 bg-teal-50'
                        : theme === 'dark'
                        ? 'text-purple-400 bg-purple-400/10'
                        : 'text-green-400 bg-green-400/10'
                      : theme === 'white' 
                      ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;