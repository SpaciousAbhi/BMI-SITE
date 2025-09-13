import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Scale, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { useBMI } from '../contexts/BMIContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { units, toggleUnits } = useBMI();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Calculator' },
    { path: '/history', label: 'History' },
    { path: '/goals', label: 'Goals' },
  ];

  return (
    <header className={`backdrop-blur-md border-b transition-all duration-300 sticky top-0 z-50 ${
      theme === 'dark' 
        ? 'bg-black/20 border-white/10' 
        : 'bg-white/20 border-black/10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Scale className={`h-8 w-8 transform group-hover:scale-110 transition-transform duration-300 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              BMI Pro
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
                    ? theme === 'dark'
                      ? 'text-blue-400 bg-blue-400/10'
                      : 'text-blue-600 bg-blue-600/10'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-black/10'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                  }`} />
                )}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className={`p-2 transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark' 
                  ? 'border-white/30 text-white hover:bg-white/10' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
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
                    ? theme === 'dark'
                      ? 'text-blue-400 bg-blue-400/10'
                      : 'text-blue-600 bg-blue-600/10'
                    : theme === 'dark'
                      ? 'text-gray-300'
                      : 'text-gray-600'
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