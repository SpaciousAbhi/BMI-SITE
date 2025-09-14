import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Heart, Shield, FileText, Mail, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme, getThemeConfig } = useTheme();
  const themeConfig = getThemeConfig();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy', icon: Shield },
      { name: 'Terms of Service', href: '/terms-of-service', icon: FileText },
      { name: 'Contact Us', href: '/contact', icon: Mail },
    ],
    tools: [
      { name: 'BMI Calculator', href: '/' },
      { name: 'BMI History', href: '/history' },
      { name: 'Health Goals', href: '/goals' },
    ],
    resources: [
      { name: 'About BMI', href: '#', external: true },
      { name: 'Health Tips', href: '#', external: true },
      { name: 'Nutrition Guide', href: '#', external: true },
    ]
  };

  return (
    <footer className={`mt-16 backdrop-blur-md border-t transition-all duration-500 glass-effect ${
      theme === 'white' 
        ? 'bg-white/70 border-teal-200/30' 
        : theme === 'dark'
        ? 'bg-gray-900/70 border-purple-500/20'
        : 'bg-black/70 border-green-500/20'
    }`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Enhanced Brand Section */}
          <div className="space-y-4 animate-fade-in">
            <Link to="/" className="flex items-center gap-2 group">
              <Scale className={`h-8 w-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${
                theme === 'white' ? 'text-teal-600' : 
                theme === 'dark' ? 'text-purple-400' : 
                'text-green-400'
              }`} />
              <span className={`text-xl font-bold transition-colors duration-300 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Advanced BMI Calculator Ultra Pro Max by Venom Stone
              </span>
            </Link>
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Advanced BMI calculator with health insights, body fat estimation, and personalized recommendations. 
              Your privacy-focused health companion.
            </p>
            <div className="flex items-center gap-2 animate-pulse-glow">
              <Heart className={`h-4 w-4 ${
                theme === 'white' ? 'text-red-500' : 
                theme === 'dark' ? 'text-red-400' : 
                'text-red-400'
              }`} />
              <span className={`text-sm transition-colors duration-300 ${
                theme === 'white' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Made with care for your health
              </span>
            </div>
          </div>

          {/* Enhanced Legal Links */}
          <div className="space-y-4 animate-slide-in" style={{ animationDelay: '100ms' }}>
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Legal & Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name} className="animate-slide-in" style={{ animationDelay: `${200 + index * 50}ms` }}>
                    <Link
                      to={link.href}
                      className={`flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105 hover:translate-x-1 ${
                        theme === 'white' 
                          ? 'text-gray-600 hover:text-teal-600' 
                          : theme === 'dark'
                          ? 'text-gray-400 hover:text-purple-400'
                          : 'text-gray-400 hover:text-green-400'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Enhanced Tools */}
          <div className="space-y-4 animate-slide-in" style={{ animationDelay: '200ms' }}>
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Tools & Features
            </h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link, index) => (
                <li key={link.name} className="animate-slide-in" style={{ animationDelay: `${300 + index * 50}ms` }}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-all duration-300 hover:scale-105 hover:translate-x-1 ${
                      theme === 'white' 
                        ? 'text-gray-600 hover:text-teal-600' 
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-purple-400'
                        : 'text-gray-400 hover:text-green-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Resources */}
          <div className="space-y-4 animate-slide-in" style={{ animationDelay: '300ms' }}>
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Health Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={link.name} className="animate-slide-in" style={{ animationDelay: `${400 + index * 50}ms` }}>
                  <a
                    href={link.href}
                    className={`flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105 hover:translate-x-1 ${
                      theme === 'white' 
                        ? 'text-gray-600 hover:text-teal-600' 
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-purple-400'
                        : 'text-gray-400 hover:text-green-400'
                    }`}
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.name}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className={`mt-12 pt-8 border-t transition-all duration-300 ${
          theme === 'white' ? 'border-teal-200/30' : 
          theme === 'dark' ? 'border-purple-500/20' : 
          'border-green-500/20'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className={`text-sm transition-colors duration-300 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              © {currentYear} Advanced BMI Calculator Ultra Pro Max by Venom Stone. All rights reserved.
            </div>
            
            <div className={`text-sm text-center transition-colors duration-300 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              <strong className={`${
                theme === 'white' ? 'text-orange-600' : 
                theme === 'dark' ? 'text-yellow-400' : 
                'text-yellow-400'
              }`}>
                Medical Disclaimer:
              </strong>
              {' '}This tool is for educational purposes only. Consult healthcare professionals for medical advice.
            </div>
          </div>
        </div>

        {/* Enhanced AdSense Ready Notice */}
        <div className={`mt-6 text-center text-xs transition-colors duration-300 animate-pulse-glow ${
          theme === 'white' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>This site is optimized for Google AdSense and follows privacy-first practices.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;