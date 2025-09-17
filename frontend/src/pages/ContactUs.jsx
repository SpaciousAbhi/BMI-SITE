import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Mail, MessageCircle, Phone, MapPin, Send, Clock, Shield, Users, Headphones, FileQuestion } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create email content
      const emailSubject = formData.subject || `Contact Form Submission - ${formData.category || 'General Inquiry'}`;
      const emailBody = `
New Contact Form Submission from BMI Calculator Website

Name: ${formData.name}
Email: ${formData.email}
Category: ${formData.category || 'Not specified'}
Subject: ${formData.subject || 'Not provided'}

Message:
${formData.message}

---
Submitted: ${new Date().toLocaleString('en-IN')}
Source: BMI Calculator Contact Form
`;

      // Create mailto link (this will open user's email client)
      const mailtoLink = `mailto:venomstonenetwork@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      toast({
        title: "Email Client Opened!",
        description: "Your email client has been opened with the pre-filled message. Please send the email to complete your inquiry.",
      });

      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          category: "",
          message: ""
        });
      }, 2000);

    } catch (error) {
      console.error('Error opening email client:', error);
      toast({
        title: "Error Opening Email",
        description: "Unable to open email client. Please email us directly at venomstonenetwork@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-green-500/10">
              <MessageCircle className="h-16 w-16 text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Get in touch with Venom Stone Network for support, feedback, or collaboration
          </p>
          <p className="text-gray-400">
            We're here to help with your BMI calculator questions and health information needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl text-white">
                  <Send className="h-6 w-6 text-blue-400" />
                  <span>Send us a Message</span>
                </CardTitle>
                <p className="text-gray-400 text-sm mt-2">
                  Fill out the form below and we'll get back to you within 24 hours during business days.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Brief subject line"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Inquiry Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-blue-400">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                          <SelectItem value="privacy">Privacy & Data Concerns</SelectItem>
                          <SelectItem value="business">Business Partnership</SelectItem>
                          <SelectItem value="medical">Medical Disclaimer Questions</SelectItem>
                          <SelectItem value="accessibility">Accessibility Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Your Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your inquiry in detail. For technical issues, include your browser type and device information..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white min-h-[150px] focus:border-blue-400"
                      required
                    />
                    <p className="text-xs text-gray-400">
                      Minimum 10 characters. For urgent health concerns, please consult a healthcare professional directly.
                    </p>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                    <p className="text-blue-300 text-sm">
                      <Shield className="h-4 w-4 inline mr-1" />
                      <strong>Privacy Notice:</strong> Your contact information will be used solely to respond to your inquiry. 
                      We do not share your information with third parties. See our Privacy Policy for details.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-400 text-center">
                    We typically respond within 24 hours during business days (Monday-Friday, IST).
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Primary Contact Details */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-white">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span>Get in Touch</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Email Support</p>
                    <a 
                      href="mailto:venomstonenetwork@gmail.com"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      venomstonenetwork@gmail.com
                    </a>
                    <p className="text-gray-400 text-xs mt-1">Primary contact for all inquiries</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Phone Support</p>
                    <p className="text-gray-400 text-sm">Coming Soon</p>
                    <p className="text-gray-400 text-xs">Phone support will be available in future updates</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-400 text-sm">India</p>
                    <p className="text-gray-400 text-xs">Operating under Indian jurisdiction</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-white">
                  <Clock className="h-5 w-5 text-green-400" />
                  <span>Response Times</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">General Inquiries</span>
                    <span className="text-white text-sm">24-48 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Technical Support</span>
                    <span className="text-white text-sm">12-24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Privacy Concerns</span>
                    <span className="text-white text-sm">24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Urgent Issues</span>
                    <span className="text-green-300 text-sm">Same day</span>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <p className="text-xs text-blue-300">
                    <Clock className="h-3 w-3 inline mr-1" />
                    All times are in Indian Standard Time (IST)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Support Categories */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl text-white">
                  <Headphones className="h-5 w-5 text-green-400" />
                  <span>Support Areas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">BMI Calculator Technical Issues</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Health Information Questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Privacy & Data Protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Accessibility Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Website Performance</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Access */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 mb-3">
                  <FileQuestion className="h-5 w-5 text-blue-400" />
                  <h4 className="text-white font-semibold">Quick Help</h4>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Looking for immediate answers? Check out our comprehensive FAQ section covering 
                  BMI calculations, health insights, and common technical questions.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => {
                    // Scroll to FAQ section on home page
                    window.location.href = '/#faq';
                  }}
                >
                  <FileQuestion className="h-4 w-4 mr-2" />
                  View FAQ
                </Button>
              </CardContent>
            </Card>

            {/* Professional Credentials */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="h-5 w-5 text-green-400" />
                  <h4 className="text-white font-semibold">About Our Team</h4>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Venom Stone Network is committed to providing accurate, reliable health calculation tools 
                  based on established medical guidelines and WHO standards.
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Following WHO BMI guidelines</li>
                  <li>• DPDP Act 2023 compliant</li>
                  <li>• Regular health data updates</li>
                  <li>• Privacy-focused development</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="pt-6 text-center">
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Privacy Protected</h4>
              <p className="text-gray-400 text-sm">
                All communications are confidential and processed according to our Privacy Policy and DPDP Act requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="pt-6 text-center">
              <Clock className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Fast Responses</h4>
              <p className="text-gray-400 text-sm">
                Our team prioritizes quick, helpful responses to ensure you get the support you need when you need it.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Expert Support</h4>
              <p className="text-gray-400 text-sm">
                Get assistance from our knowledgeable team familiar with BMI calculations and health information systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;