import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Heart, 
  Target, 
  TrendingUp, 
  Shield, 
  FileText, 
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Calculator,
  Activity,
  Baby,
  Users,
  Globe,
  Brain,
  User,
  Ruler,
  BarChart3,
  Zap,
  Utensils,
  Dumbbell,
  Droplets,
  HeartPulse,
  Flame,
  Clock,
  BookOpen
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme, getThemeConfig } = useTheme();
  const themeConfig = getThemeConfig();
  const currentYear = new Date().getFullYear();

  const getIconColor = () => {
    switch(themeConfig.accent) {
      case 'teal': return theme === 'white' ? 'text-teal-600' : 'text-teal-400';
      case 'purple': return 'text-purple-400';
      case 'green': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  const getHoverColor = () => {
    switch(themeConfig.accent) {
      case 'teal': return theme === 'white' ? 'hover:text-teal-600' : 'hover:text-teal-400';
      case 'purple': return 'hover:text-purple-400';
      case 'green': return 'hover:text-green-400';
      default: return 'hover:text-blue-400';
    }
  };

  const getBorderColor = () => {
    switch(themeConfig.accent) {
      case 'teal': return theme === 'white' ? 'border-teal-200' : 'border-teal-400/20';
      case 'purple': return 'border-purple-400/20';
      case 'green': return 'border-green-400/20';
      default: return 'border-blue-400/20';
    }
  };

  return (
    <footer className={`mt-16 backdrop-blur-md border-t transition-all duration-500 ${
      theme === 'white' 
        ? 'bg-white/80 border-teal-200/50' 
        : theme === 'dark'
        ? 'bg-gray-900/80 border-purple-500/30'
        : 'bg-black/80 border-green-500/30'
    }`}>
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Scale className={`h-6 w-6 transition-all duration-300 group-hover:scale-110 ${getIconColor()}`} />
              <span className={`text-lg font-bold transition-colors duration-300 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Advanced BMI Calculator
              </span>
            </Link>
            <p className={`text-sm leading-relaxed ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Your comprehensive health companion featuring 22+ calculators for accurate BMI calculations, 
              body composition analysis, nutrition planning, and fitness goal tracking.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className={`${theme === 'white' ? 'text-gray-400' : 'text-gray-500'} ${getHoverColor()} transition-all duration-300 hover:scale-110`}
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`${theme === 'white' ? 'text-gray-400' : 'text-gray-500'} ${getHoverColor()} transition-all duration-300 hover:scale-110`}
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`${theme === 'white' ? 'text-gray-400' : 'text-gray-500'} ${getHoverColor()} transition-all duration-300 hover:scale-110`}
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`${theme === 'white' ? 'text-gray-400' : 'text-gray-500'} ${getHoverColor()} transition-all duration-300 hover:scale-110`}
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* BMI & Body Analysis */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              🧮 BMI Analysis
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Calculator className="h-3 w-3" />
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/athletes-bmi" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Activity className="h-3 w-3" />
                  BMI for Athletes
                </Link>
              </li>
              <li>
                <Link 
                  to="/pregnancy-bmi" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Baby className="h-3 w-3" />
                  Pregnancy BMI
                </Link>
              </li>
              <li>
                <Link 
                  to="/senior-bmi" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Users className="h-3 w-3" />
                  Senior BMI
                </Link>
              </li>
              <li>
                <Link 
                  to="/ethnicity-bmi" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Globe className="h-3 w-3" />
                  Ethnicity BMI
                </Link>
              </li>
            </ul>
          </div>

          {/* Body Composition */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              ⚖️ Body Composition
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/body-fat" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Target className="h-3 w-3" />
                  Body Fat Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/ideal-weight" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Scale className="h-3 w-3" />
                  Ideal Weight
                </Link>
              </li>
              <li>
                <Link 
                  to="/waist-height-ratio" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Ruler className="h-3 w-3" />
                  Waist-Height Ratio
                </Link>
              </li>
              <li>
                <Link 
                  to="/body-surface-area" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <BarChart3 className="h-3 w-3" />
                  Body Surface Area
                </Link>
              </li>
            </ul>
          </div>

          {/* Nutrition & Diet */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              🍎 Nutrition & Diet
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/calories" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Zap className="h-3 w-3" />
                  TDEE & BMR
                </Link>
              </li>
              <li>
                <Link 
                  to="/macros" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Utensils className="h-3 w-3" />
                  Macro Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/protein-calculator" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Dumbbell className="h-3 w-3" />
                  Protein Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/water-calculator" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Droplets className="h-3 w-3" />
                  Water Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Fitness & Health */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              💪 Fitness & Health
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/heart-rate-calculator" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <HeartPulse className="h-3 w-3" />
                  Heart Rate Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/calories-burned-calculator" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Flame className="h-3 w-3" />
                  Calories Burned
                </Link>
              </li>
              <li>
                <Link 
                  to="/fasting-planner" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Clock className="h-3 w-3" />
                  Fasting Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Health Management */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              📊 Health Management
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/history" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <TrendingUp className="h-3 w-3" />
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link 
                  to="/goals" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Target className="h-3 w-3" />
                  Goal Setting
                </Link>
              </li>
              <li>
                <Link 
                  to="/workout" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Dumbbell className="h-3 w-3" />
                  Workout Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Health Resources */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              📚 Health Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/blog" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <BookOpen className="h-3 w-3" />
                  Health Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/about-bmi" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <FileText className="h-3 w-3" />
                  About BMI
                </Link>
              </li>
              <li>
                <Link 
                  to="/health-tips" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Heart className="h-3 w-3" />
                  Health Tips
                </Link>
              </li>
              <li>
                <Link 
                  to="/nutrition-guide" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <BookOpen className="h-3 w-3" />
                  Nutrition Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              ⚖️ Legal & Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/contact" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Mail className="h-3 w-3" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Shield className="h-3 w-3" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-of-service" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Shield className="h-3 w-3" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={`my-8 border-t ${getBorderColor()}`}></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className={`text-sm ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            © {currentYear} Advanced BMI Calculator. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className={`${
              theme === 'white' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              22+ Professional Health Calculators
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              theme === 'white' 
                ? 'bg-teal-100 text-teal-800' 
                : theme === 'dark'
                ? 'bg-purple-400/20 text-purple-300'
                : 'bg-green-400/20 text-green-300'
            }`}>
              100% Free
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;