import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Heart, 
  Shield, 
  FileText, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Send,
  CheckCircle,
  Star,
  Award,
  Zap,
  Users,
  TrendingUp,
  Calculator,
  Scale,
  Utensils,
  Dumbbell,
  Baby,
  Stethoscope,
  Activity,
  ChevronUp,
  ExternalLink,
  Globe
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(true);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setIsLoading(false);
      setEmail("");
      // Reset success message after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculatorCategories = [
    {
      name: "Body Composition",
      icon: Scale,
      color: "blue",
      calculators: [
        { name: "Body Fat Calculator", path: "/body-fat-calculator", popular: true },
        { name: "Army Body Fat Calculator", path: "/army-body-fat-calculator" },
        { name: "Lean Body Mass Calculator", path: "/lean-body-mass-calculator" },
        { name: "Ideal Weight Calculator", path: "/ideal-weight-calculator", popular: true },
        { name: "Healthy Weight Calculator", path: "/healthy-weight-calculator" },
        { name: "Body Type Calculator", path: "/body-type-calculator" },
        { name: "Body Surface Area Calculator", path: "/body-surface-area-calculator" },
      ]
    },
    {
      name: "Nutrition & Diet",
      icon: Utensils,
      color: "orange",
      calculators: [
        { name: "Calorie Calculator", path: "/calorie-calculator", popular: true },
        { name: "TDEE Calculator", path: "/tdee-calculator", popular: true },
        { name: "BMR Calculator", path: "/bmr-calculator" },
        { name: "Macro Calculator", path: "/macro-calculator" },
        { name: "Carbohydrate Calculator", path: "/carbohydrate-calculator" },
        { name: "Protein Calculator", path: "/protein-calculator" },
        { name: "Fat Intake Calculator", path: "/fat-intake-calculator" },
      ]
    },
    {
      name: "Fitness & Performance",
      icon: Dumbbell,
      color: "purple",
      calculators: [
        { name: "Pace Calculator", path: "/pace-calculator" },
        { name: "Calories Burned Calculator", path: "/calories-burned-calculator", popular: true },
        { name: "One Rep Max Calculator", path: "/one-rep-max-calculator" },
        { name: "Target Heart Rate Calculator", path: "/target-heart-rate-calculator" },
      ]
    },
    {
      name: "Pregnancy & Women's Health",
      icon: Baby,
      color: "pink",
      calculators: [
        { name: "Pregnancy Calculator", path: "/pregnancy-calculator", popular: true },
        { name: "Pregnancy Weight Gain Calculator", path: "/pregnancy-weight-gain-calculator" },
        { name: "Due Date Calculator", path: "/due-date-calculator", popular: true },
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Conception Calculator", path: "/conception-calculator" },
        { name: "Period Calculator", path: "/period-calculator" },
      ]
    },
    {
      name: "Medical & Health",
      icon: Stethoscope,
      color: "red",
      calculators: [
        { name: "GFR Calculator", path: "/gfr-calculator", popular: true },
        { name: "BAC Calculator", path: "/bac-calculator" },
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com", color: "text-blue-400 hover:text-blue-300" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com", color: "text-sky-400 hover:text-sky-300" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com", color: "text-pink-400 hover:text-pink-300" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com", color: "text-red-400 hover:text-red-300" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com", color: "text-blue-500 hover:text-blue-400" },
  ];

  const trustBadges = [
    { icon: Award, text: "Medical Grade Accuracy", color: "text-yellow-400" },
    { icon: Shield, text: "Privacy Protected", color: "text-green-400" },
    { icon: Users, text: "1M+ Users Worldwide", color: "text-blue-400" },
    { icon: Zap, text: "Instant Results", color: "text-purple-400" },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "text-blue-400 hover:text-blue-300 border-blue-400/30 hover:border-blue-400/50",
      orange: "text-orange-400 hover:text-orange-300 border-orange-400/30 hover:border-orange-400/50",
      purple: "text-purple-400 hover:text-purple-300 border-purple-400/30 hover:border-purple-400/50",
      pink: "text-pink-400 hover:text-pink-300 border-pink-400/30 hover:border-pink-400/50",
      red: "text-red-400 hover:text-red-300 border-red-400/30 hover:border-red-400/50",
      green: "text-green-400 hover:text-green-300 border-green-400/30 hover:border-green-400/50",
    };
    return colors[color] || colors.blue;
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900/50 to-black border-t border-gray-800 relative">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="absolute -top-6 right-8 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-3"
          size="icon"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section - Brand, Newsletter, Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Enhanced Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Heart className="h-8 w-8 text-green-400" />
                <div className="absolute -inset-1 bg-green-400/20 rounded-full blur animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                  Advanced BMI Calculator
                </span>
                <p className="text-sm text-gray-400 mt-1">Professional Health Tools Suite</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner in health assessment and wellness planning. We provide professional-grade calculators 
              following WHO, CDC, and medical guidelines for accurate health insights.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge, index) => (
                <div key={index} className={`flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors group`}>
                  <badge.icon className={`h-4 w-4 ${badge.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs text-gray-300 font-medium">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold flex items-center">
                <Globe className="h-4 w-4 mr-2 text-blue-400" />
                Follow Us
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 group`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Newsletter Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                Health Newsletter
              </h3>
              <p className="text-gray-400 text-sm">
                Get weekly health tips, calculator updates, and wellness insights delivered to your inbox.
              </p>
            </div>

            {subscribed ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-green-400 font-semibold mb-2">Successfully Subscribed!</h4>
                <p className="text-green-300 text-sm">Thank you for joining our health community.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg h-12"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Subscribe Now</span>
                    </>
                  )}
                </Button>
              </form>
            )}

            <div className="text-xs text-gray-500 text-center">
              <Shield className="h-3 w-3 inline mr-1" />
              We respect your privacy. Unsubscribe anytime.
            </div>
          </div>

          {/* Enhanced Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-400" />
              Get in Touch
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors group">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 group-hover:text-blue-300" />
                <div>
                  <p className="text-gray-300 font-medium">Email Support</p>
                  <a href="mailto:venomstonenetwork@gmail.com" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                    venomstonenetwork@gmail.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 font-medium">Global Service</p>
                  <p className="text-sm text-gray-400">Available worldwide</p>
                  <p className="text-xs text-gray-500 mt-1">24/7 calculator access</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <TrendingUp className="h-5 w-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 font-medium">Business Inquiries</p>
                  <p className="text-sm text-gray-400">Partnership & API access</p>
                  <p className="text-xs text-gray-500 mt-1">Enterprise solutions available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Categories Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
              <Calculator className="h-6 w-6 mr-3 text-blue-400" />
              Professional Calculator Suite
            </h3>
            <p className="text-gray-400">Comprehensive health assessment tools following medical standards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {calculatorCategories.map((category, index) => (
              <div key={index} className={`bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 group`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg bg-${category.color}-500/10 border border-${category.color}-500/20 group-hover:border-${category.color}-500/40 transition-colors`}>
                    <category.icon className={`h-5 w-5 ${getColorClasses(category.color).split(' ')[0]}`} />
                  </div>
                  <h4 className="font-semibold text-white text-sm">{category.name}</h4>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {category.calculators.map((calc, calcIndex) => (
                    <Link
                      key={calcIndex}
                      to={calc.path}
                      className={`block text-gray-400 hover:text-white text-xs py-1.5 px-2 rounded transition-all duration-200 hover:bg-gray-700/50 group/item ${getColorClasses(category.color).replace('text-', 'hover:text-').replace('border-', '')}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex-1">{calc.name}</span>
                        {calc.popular && (
                          <Star className="h-3 w-3 text-yellow-400 ml-1 opacity-75" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Privacy Section */}
        <div className="mb-12">
          <div className="bg-gray-800/20 rounded-xl p-8 border border-gray-700/30">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-center">
              <Shield className="h-5 w-5 mr-2 text-blue-400" />
              Legal & Privacy Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/privacy-policy"
                className="flex items-center space-x-3 p-4 bg-gray-800/40 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <Shield className="h-6 w-6 text-blue-400 group-hover:text-blue-300" />
                <div>
                  <h4 className="text-white font-medium group-hover:text-blue-300">Privacy Policy</h4>
                  <p className="text-xs text-gray-400 mt-1">DPDP Act 2023 compliant data protection</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-400 ml-auto" />
              </Link>

              <Link
                to="/terms-conditions"
                className="flex items-center space-x-3 p-4 bg-gray-800/40 rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group"
              >
                <FileText className="h-6 w-6 text-green-400 group-hover:text-green-300" />
                <div>
                  <h4 className="text-white font-medium group-hover:text-green-300">Terms & Conditions</h4>
                  <p className="text-xs text-gray-400 mt-1">Usage guidelines and medical disclaimers</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-400 ml-auto" />
              </Link>

              <Link
                to="/contact-us"
                className="flex items-center space-x-3 p-4 bg-gray-800/40 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <MessageCircle className="h-6 w-6 text-purple-400 group-hover:text-purple-300" />
                <div>
                  <h4 className="text-white font-medium group-hover:text-purple-300">Contact Support</h4>
                  <p className="text-xs text-gray-400 mt-1">Get help and send feedback</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-400 ml-auto" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025{" "}
                <span className="text-white font-medium">Advanced BMI Calculator</span>
                {" "}by{" "}
                <span className="text-blue-400">Venom Stone Network</span>
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-xs text-gray-500">
                <span>Medical accuracy</span>
                <span>•</span>
                <span>Privacy protected</span>
                <span>•</span>
                <span>1M+ users</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              <span>Professional health tools</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;