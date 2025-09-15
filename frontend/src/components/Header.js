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
  Activity
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

  const toolsNavItems = [
    { path: '/', label: 'BMI Calculator', icon: Calculator },
    { path: '/body-fat', label: 'Body Fat Calculator', icon: Target },
    { path: '/calories', label: 'Calorie Calculator', icon: Zap },
    { path: '/macros', label: 'Macro Calculator', icon: Utensils },
    { path: '/pregnancy-bmi', label: 'Pregnancy BMI Calculator', icon: Heart },
    { path: '/senior-bmi', label: 'Senior BMI Calculator (65+)', icon: Shield },
    { path: '/ethnicity-bmi', label: 'Ethnicity-Adjusted BMI 🌍', icon: Activity },
    { path: '/history', label: 'Progress Tracking', icon: History },
    { path: '/goals', label: 'Goal Setting', icon: Activity },
    { path: '/workout', label: 'Workout Plans', icon: Dumbbell },
  ];

  const healthResourcesItems = [
    { path: '/about-bmi', label: 'About BMI', icon: BookOpen },
    { path: '/health-tips', label: 'Health Tips', icon: Heart },
    { path: '/nutrition-guide', label: 'Nutrition Guide', icon: BookOpen },
    { path: '/blog', label: 'Health Blog', icon: BookOpen },
  ];

  const legalItems = [
    { path: '/privacy-policy', label: 'Privacy Policy', icon: Shield },
    { path: '/terms-of-service', label: 'Terms of Service', icon: Shield },
    { path: '/contact', label: 'Contact Us', icon: Mail },
  ];

  const allNavItems = [...toolsNavItems, ...healthResourcesItems, ...legalItems];

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
          <nav className="hidden lg:flex items-center gap-6">
            {toolsNavItems.slice(0, 4).map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg ${
                    location.pathname === item.path
                      ? theme === 'white'
                        ? 'text-teal-600 bg-teal-50'
                        : theme === 'dark'
                        ? 'text-purple-400 bg-purple-400/10'
                        : 'text-green-400 bg-green-400/10'
                      : theme === 'white' 
                      ? 'text-gray-600 hover:text-teal-600 hover:bg-teal-50' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
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
              {/* Tools Section */}
              <div className="px-4 py-2">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Tools
                </h3>
                {toolsNavItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
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
                  Health Resources
                </h3>
                {healthResourcesItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
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

              {/* Legal Section */}
              <div className="px-4 py-2">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Legal
                </h3>
                {legalItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;