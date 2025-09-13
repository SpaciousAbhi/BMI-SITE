import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Heart, Shield, FileText, Mail, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
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
    <footer className={`mt-16 backdrop-blur-md border-t transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-black/20 border-white/10' 
        : 'bg-white/30 border-black/10'
    }`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
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
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Advanced BMI calculator with health insights, body fat estimation, and personalized recommendations. 
              Your privacy-focused health companion.
            </p>
            <div className="flex items-center gap-2">
              <Heart className={`h-4 w-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`} />
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Made with care for your health
              </span>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Legal & Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`flex items-center gap-2 text-sm hover:text-blue-500 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600'
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

          {/* Tools */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Tools & Features
            </h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-sm hover:text-blue-500 transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Health Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`flex items-center gap-2 text-sm hover:text-blue-500 transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600'
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

        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t ${
          theme === 'dark' ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentYear} BMI Pro. All rights reserved.
            </div>
            
            <div className={`text-sm text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <strong className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>
                Medical Disclaimer:
              </strong>
              {' '}This tool is for educational purposes only. Consult healthcare professionals for medical advice.
            </div>
          </div>
        </div>

        {/* AdSense Ready Notice */}
        <div className={`mt-6 text-center text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
          <p>This site is optimized for Google AdSense and follows privacy-first practices.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;