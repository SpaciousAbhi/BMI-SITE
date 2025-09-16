import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Available themes: white (default), dark, black
  const [theme, setTheme] = useState('dark'); // Default to Dynamic Dark theme
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem('bmi-theme');
    if (saved && ['white', 'dark', 'black'].includes(saved)) {
      setTheme(saved);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return; // Don't update localStorage before hydration
    
    localStorage.setItem('bmi-theme', theme);
    
    // Remove all theme classes first
    document.documentElement.classList.remove('dark', 'black');
    
    // Add appropriate theme class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'black') {
      document.documentElement.classList.add('black');
    }
    // 'white' theme doesn't need a class (default)
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme(prev => {
      // Cycle through: white -> dark -> black -> white
      if (prev === 'white') return 'dark';
      if (prev === 'dark') return 'black';
      return 'white';
    });
  };

  const getThemeConfig = () => {
    const configs = {
      white: {
        name: 'Dynamic White',
        accent: 'teal',
        gradient: 'from-blue-50 via-teal-50 to-cyan-50',
        cardBg: 'bg-white/80',
        cardHover: 'hover:bg-white/90'
      },
      dark: {
        name: 'Dynamic Dark', 
        accent: 'purple',
        gradient: 'from-gray-900 via-purple-900 to-gray-900',
        cardBg: 'bg-gray-800/80',
        cardHover: 'hover:bg-gray-800/90'
      },
      black: {
        name: 'Black OLED',
        accent: 'green',
        gradient: 'from-black via-gray-900 to-black',
        cardBg: 'bg-black/80',
        cardHover: 'hover:bg-gray-900/50'
      }
    };
    return configs[theme];
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getThemeConfig, getBackgroundGradient, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};