import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Zap, Scale } from 'lucide-react';
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
            <Scale className={`h-8 w-8 transform group-hover:scale-110 transition-all duration-300 ${
              theme === 'white' ? 'text-teal-600' : 
              theme === 'dark' ? 'text-purple-400' : 
              'text-green-400'
            }`} />
            <span className={`text-xl font-bold transition-colors duration-300 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Advanced BMI Calculator by Venom Stone
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.path
                    ? getAccentColor()
                    : theme === 'white'
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-teal-50/50'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-purple-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-green-500/10'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                    theme === 'white' ? 'bg-teal-500' : 
                    theme === 'dark' ? 'bg-purple-400' : 
                    'bg-green-400'
                  }`} />
                )}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Enhanced Theme Toggle */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium transition-colors duration-300 ${
                theme === 'white' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {themeConfig.name}
              </span>
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className={`p-2 transform hover:scale-105 transition-all duration-300 ${
                  theme === 'white' 
                    ? 'border-teal-200 text-teal-600 hover:bg-teal-50' 
                    : theme === 'dark'
                    ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                    : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                }`}
                title={`Switch to ${theme === 'white' ? 'Dark' : theme === 'dark' ? 'Black' : 'White'} theme`}
              >
                {getThemeIcon()}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <nav className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                  location.pathname === item.path
                    ? getAccentColor()
                    : theme === 'white'
                    ? 'text-gray-600'
                    : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;