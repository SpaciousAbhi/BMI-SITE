import React from 'react';
import { FileText, AlertTriangle, Users, Gavel, Shield, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

const TermsOfService = () => {
  const { theme } = useTheme();

  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Advanced BMI Calculator, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our service",
        "We may update these terms from time to time, and continued use constitutes acceptance",
        "You must be at least 13 years old to use this service"
      ]
    },
    {
      icon: Info,
      title: "Service Description",
      content: [
        "Advanced BMI Calculator provides BMI (Body Mass Index) calculation tools and health-related information",
        "Our service includes BMI calculations, body fat estimation, and health recommendations",
        "We provide goal tracking and calculation history features",
        "All calculations are for informational purposes only"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Medical Disclaimer",
      content: [
        "BMI calculations and health information are for educational purposes only",
        "This service is not a substitute for professional medical advice, diagnosis, or treatment",
        "Always consult with a qualified healthcare provider for medical concerns",
        "Individual health conditions may affect the accuracy of BMI calculations"
      ]
    },
    {
      icon: Shield,
      title: "User Responsibilities",
      content: [
        "Provide accurate information for BMI calculations",
        "Use the service in compliance with applicable laws and regulations",
        "Do not attempt to interfere with or disrupt the service",
        "Respect the intellectual property rights of the service"
      ]
    },
    {
      icon: Gavel,
      title: "Limitation of Liability",
      content: [
        "We provide the service 'as is' without warranties of any kind",
        "We are not liable for any damages arising from use of the service",
        "Our liability is limited to the maximum extent permitted by law",
        "Users assume all risks associated with using BMI calculations for health decisions"
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
              <FileText className={`h-12 w-12 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h1 className={`text-3xl md:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Terms of Service
              </h1>
            </div>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Please read these terms carefully before using our BMI calculator service.
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
                Welcome to Advanced BMI Calculator Ultra Pro Max by Venom Stone. These Terms of Service govern your use of our website and BMI calculation services. 
                By using our service, you agree to comply with and be bound by these terms.
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

          {/* Important Notice */}
          <Card className={`mt-8 backdrop-blur-md border-0 shadow-xl ${
            theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 text-xl ${
                theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'
              }`}>
                <AlertTriangle className="h-6 w-6" />
                Important Health Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-700'}`}>
                <strong>Medical Disclaimer:</strong> The BMI calculations and health information provided by this service 
                are for educational and informational purposes only. They should not be used as a substitute for 
                professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or 
                other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className={`mt-8 backdrop-blur-md border-0 shadow-xl ${
            theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
          }`}>
            <CardHeader>
              <CardTitle className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Intellectual Property Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-4">
                  All content, features, and functionality of Advanced BMI Calculator Ultra Pro Max by Venom Stone, including but not limited to:
                </p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li>• Text, graphics, logos, and images</li>
                  <li>• BMI calculation algorithms and formulas</li>
                  <li>• Software, code, and user interface design</li>
                  <li>• Health recommendations and content</li>
                </ul>
                <p>
                  Are owned by Advanced BMI Calculator Ultra Pro Max by Venom Stone and are protected by copyright, trademark, and other 
                  intellectual property laws. You may not reproduce, distribute, or create 
                  derivative works without explicit permission.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className={`mt-8 backdrop-blur-md border-0 shadow-xl ${
            theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
          }`}>
            <CardContent className="p-6">
              <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                Questions About These Terms?
              </h3>
              <p className={`${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>
                If you have any questions about these Terms of Service, 
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

export default TermsOfService;