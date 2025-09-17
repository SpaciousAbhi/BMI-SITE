import React from "react";
import { Link } from "react-router-dom";
import { Heart, Shield, FileText, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-green-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Advanced BMI Calculator
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Professional BMI calculator providing accurate health insights and personalized recommendations 
              based on WHO and CDC guidelines. Your trusted partner in health assessment.
            </p>
          </div>

          {/* Legal & Privacy Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-400" />
              Legal & Privacy
            </h3>
            <div className="space-y-3">
              <Link
                to="/privacy-policy"
                className="nav-link flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300 ease-out"
              >
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="nav-link flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300 ease-out"
              >
                <FileText className="h-4 w-4 mr-2" />
                Terms & Conditions
              </Link>
              <Link
                to="/contact-us"
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Us
              </Link>
            </div>
          </div>

          {/* Health Disclaimer */}
          <div>
            <h3 className="text-white font-semibold mb-4">Health Information</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              This BMI calculator is for informational purposes only and should not replace professional medical advice. 
              Always consult with healthcare professionals for personalized health assessments.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Advanced BMI Calculator. All rights reserved. Your health, our priority.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;