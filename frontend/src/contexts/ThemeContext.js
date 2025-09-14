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
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('bmi-theme');
    return saved || 'white';
  });

  useEffect(() => {
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
  }, [theme]);

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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getThemeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};