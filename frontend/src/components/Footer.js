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
  Youtube
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
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
              Your comprehensive health companion for accurate BMI calculations, 
              personalized insights, and fitness goal tracking.
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

          {/* Tools Section */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Tools
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Scale className="h-4 w-4" />
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/body-fat" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Target className="h-4 w-4" />
                  Body Fat Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/calories" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Heart className="h-4 w-4" />
                  Calorie Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/macros" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Target className="h-4 w-4" />
                  Macro Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/pregnancy-bmi" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1`}
                >
                  Pregnancy BMI
                </Link>
              </li>
              <li>
                <Link 
                  to="/senior-bmi" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1`}
                >
                  Senior BMI (65+)
                </Link>
              </li>
              <li>
                <Link 
                  to="/ethnicity-bmi" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1`}
                >
                  🌍 Ethnicity-Adjusted BMI
                </Link>
              </li>
              <li>
                <Link 
                  to="/history" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <TrendingUp className="h-4 w-4" />
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
                  <Target className="h-4 w-4" />
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
                  <Heart className="h-4 w-4" />
                  Workout Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Health Resources Section */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Health Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about-bmi" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1`}
                >
                  About BMI
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1`}
                >
                  Health Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/health-tips" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1`}
                >
                  Health Tips
                </Link>
              </li>
              <li>
                <Link 
                  to="/nutrition-guide" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1`}
                >
                  Nutrition Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Shield className="h-4 w-4" />
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
                  <FileText className="h-4 w-4" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                  } ${getHoverColor()} transition-all duration-300 hover:translate-x-1 flex items-center gap-2`}
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
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
          
          <div className={`text-xs ${
            theme === 'white' ? 'text-gray-500' : 'text-gray-500'
          } text-center md:text-right`}>
            <p className="mb-1">
              ⚠️ Disclaimer: This tool provides estimates only.
            </p>
            <p>
              Consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;