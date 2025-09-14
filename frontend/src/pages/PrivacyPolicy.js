import React from 'react';
import { Shield, Eye, Cookie, UserCheck, Lock, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

const PrivacyPolicy = () => {
  const { theme } = useTheme();

  const sections = [
    {
      icon: UserCheck,
      title: "Information We Collect",
      content: [
        "BMI calculation data (height, weight, age, gender) - stored locally on your device",
        "Browser information and device type for analytics",
        "Usage patterns to improve our service",
        "No personal identification information is collected or stored on our servers"
      ]
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "Provide BMI calculations and health insights",
        "Store your calculation history locally on your device",
        "Improve our calculator's accuracy and features",
        "Display relevant advertisements through Google AdSense"
      ]
    },
    {
      icon: Lock,
      title: "Data Storage & Security",
      content: [
        "All BMI data is stored locally in your browser's localStorage",
        "No sensitive health data is transmitted to our servers",
        "We use HTTPS encryption for all web traffic",
        "Your calculation history remains on your device only"
      ]
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      content: [
        "Google AdSense may use cookies for personalized advertisements",
        "Google Analytics cookies help us understand site usage",
        "You can disable cookies in your browser settings",
        "Essential cookies are needed for the calculator to function properly"
      ]
    },
    {
      icon: Eye,
      title: "Third-Party Services",
      content: [
        "Google AdSense for displaying advertisements",
        "Google Analytics for website traffic analysis",
        "These services have their own privacy policies",
        "We do not share your BMI calculation data with any third parties"
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className={`h-12 w-12 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h1 className={`text-3xl md:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Privacy Policy
              </h1>
            </div>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Your privacy is important to us. This policy explains how we handle your data.
            </p>
            <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Introduction */}
          <Card className={`mb-8 backdrop-blur-md border-0 shadow-xl ${
            theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
          }`}>
            <CardContent className="p-6">
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                At Advanced BMI Calculator, we are committed to protecting your privacy and ensuring the security of your personal health information. 
                This Privacy Policy explains how we collect, use, and protect your information when you use our BMI calculator service.
              </p>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={index} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  theme === 'dark' ? 'bg-white/10 hover:bg-white/15' : 'bg-white/70 hover:bg-white/80'
                }`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-3 text-xl ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, idx) => (
                        <li key={idx} className={`flex items-start gap-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                          }`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Your Rights */}
          <Card className={`mt-8 backdrop-blur-md border-0 shadow-xl ${
            theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
          }`}>
            <CardHeader>
              <CardTitle className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Your Rights & Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <h4 className="font-semibold mb-2">You have the right to:</h4>
                <ul className="space-y-2 ml-4">
                  <li>• Clear your BMI calculation history at any time</li>
                  <li>• Disable cookies in your browser settings</li>
                  <li>• Request information about data collection practices</li>
                  <li>• Contact us with privacy-related questions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className={`mt-8 backdrop-blur-md border-0 shadow-xl ${
            theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
          }`}>
            <CardContent className="p-6">
              <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                Questions About This Policy?
              </h3>
              <p className={`${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us through our <a href="/contact" className="underline hover:no-underline">Contact page</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;