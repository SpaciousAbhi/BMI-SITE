import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';

const ContactPage = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      content: "support@venomstone.com",
      description: "Get help with technical issues or questions"
    },
    {
      icon: MessageCircle,
      title: "General Inquiries",
      content: "info@venomstone.com",
      description: "For partnerships and general information"
    },
    {
      icon: Clock,
      title: "Response Time",
      content: "24-48 hours",
      description: "We aim to respond to all inquiries promptly"
    }
  ];

  const categories = [
    { value: "technical", label: "Technical Support" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "privacy", label: "Privacy Concerns" },
    { value: "partnership", label: "Business Partnership" },
    { value: "medical", label: "Medical Questions" },
    { value: "other", label: "Other" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24-48 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className={`h-12 w-12 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h1 className={`text-3xl md:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Contact Us
              </h1>
            </div>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Have questions about Advanced BMI Calculator Ultra Pro Max by Venom Stone? We're here to help!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className={`backdrop-blur-md border-0 shadow-2xl ${
              theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
            }`}>
              <CardHeader>
                <CardTitle className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                      Full Name *
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`transition-all duration-300 focus:scale-105 ${
                        theme === 'dark' 
                          ? 'bg-white/20 border-white/30 text-white placeholder:text-gray-400' 
                          : 'bg-white/50 border-gray-300'
                      }`}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`transition-all duration-300 focus:scale-105 ${
                        theme === 'dark' 
                          ? 'bg-white/20 border-white/30 text-white placeholder:text-gray-400' 
                          : 'bg-white/50 border-gray-300'
                      }`}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                      Category
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className={`transition-all duration-300 hover:scale-105 ${
                        theme === 'dark' 
                          ? 'bg-white/20 border-white/30 text-white' 
                          : 'bg-white/50 border-gray-300'
                      }`}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                      Subject *
                    </Label>
                    <Input
                      type="text"
                      placeholder="Brief description of your message"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`transition-all duration-300 focus:scale-105 ${
                        theme === 'dark' 
                          ? 'bg-white/20 border-white/30 text-white placeholder:text-gray-400' 
                          : 'bg-white/50 border-gray-300'
                      }`}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                      Message *
                    </Label>
                    <Textarea
                      placeholder="Please provide details about your inquiry..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={5}
                      className={`transition-all duration-300 focus:scale-105 resize-none ${
                        theme === 'dark' 
                          ? 'bg-white/20 border-white/30 text-white placeholder:text-gray-400' 
                          : 'bg-white/50 border-gray-300'
                      }`}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card key={index} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
                      theme === 'dark' ? 'bg-white/10 hover:bg-white/15' : 'bg-white/70 hover:bg-white/80'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <IconComponent className={`h-8 w-8 mt-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                          <div>
                            <h3 className={`text-lg font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {info.title}
                            </h3>
                            <p className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                              {info.content}
                            </p>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* FAQ Section */}
              <Card className={`backdrop-blur-md border-0 shadow-xl ${
                theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Is the BMI calculator accurate?</h4>
                        <p className="text-sm">Our calculator uses standard BMI formulas and provides estimates for educational purposes.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Is my data secure?</h4>
                        <p className="text-sm">Yes, all calculations are stored locally on your device and never transmitted to our servers.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Can I use this for medical decisions?</h4>
                        <p className="text-sm">No, please consult with healthcare professionals for medical advice and decisions.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Disclaimer */}
              <Card className={`backdrop-blur-md border-0 shadow-xl ${
                theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className={`h-6 w-6 mt-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <div>
                      <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
                        Medical Disclaimer
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-700'}`}>
                        Advanced BMI Calculator Ultra Pro Max by Venom Stone provides educational information only. Always consult with qualified healthcare 
                        professionals for medical advice, diagnosis, or treatment decisions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;