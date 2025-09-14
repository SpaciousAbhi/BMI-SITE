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
  Mail
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

  const navItems = [
    { path: '/', label: 'Calculator' },
    { path: '/history', label: 'History' },
    { path: '/goals', label: 'Goals' },
  ];

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

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  location.pathname === item.path
                    ? theme === 'white'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : theme === 'dark'
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-green-400 border-b-2 border-green-400'
                    : theme === 'white' 
                    ? 'text-gray-600 hover:text-teal-600' 
                    : 'text-gray-300 hover:text-white'
                } pb-1`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`${getAccentColor()} border-current`}>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;