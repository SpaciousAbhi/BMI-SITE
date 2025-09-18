import React from "react";
import { Link } from "react-router-dom";
import { Heart, Shield, FileText, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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

          {/* Body Calculators Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-green-400" />
              Body Calculators
            </h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="nav-link block text-gray-400 hover:text-green-400 transition-all duration-300 ease-out text-sm"
              >
                BMI Calculator
              </Link>
              <Link
                to="/body-fat-calculator"
                className="nav-link block text-gray-400 hover:text-green-400 transition-all duration-300 ease-out text-sm"
              >
                Body Fat Calculator
              </Link>
              <Link
                to="/army-body-fat-calculator"
                className="nav-link block text-gray-400 hover:text-green-400 transition-all duration-300 ease-out text-sm"
              >
                Army Body Fat Calculator
              </Link>
              <Link
                to="/lean-body-mass-calculator"
                className="nav-link block text-gray-400 hover:text-green-400 transition-all duration-300 ease-out text-sm"
              >
                Lean Body Mass Calculator
              </Link>
            </div>
          </div>

          {/* More Calculators Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-blue-400" />
              Weight & Health
            </h3>
            <div className="space-y-2">
              <Link
                to="/ideal-weight-calculator"
                className="nav-link block text-gray-400 hover:text-blue-400 transition-all duration-300 ease-out text-sm"
              >
                Ideal Weight Calculator
              </Link>
              <Link
                to="/healthy-weight-calculator"
                className="nav-link block text-gray-400 hover:text-blue-400 transition-all duration-300 ease-out text-sm"
              >
                Healthy Weight Calculator
              </Link>
              <Link
                to="/body-type-calculator"
                className="nav-link block text-gray-400 hover:text-blue-400 transition-all duration-300 ease-out text-sm"
              >
                Body Type Calculator
              </Link>
              <Link
                to="/body-surface-area-calculator"
                className="nav-link block text-gray-400 hover:text-blue-400 transition-all duration-300 ease-out text-sm"
              >
                Body Surface Area Calculator
              </Link>
            </div>
          </div>

          {/* Legal & Privacy Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-400" />
              Legal & Privacy
            </h3>
            <div className="space-y-2">
              <Link
                to="/privacy-policy"
                className="nav-link block text-gray-400 hover:text-blue-400 transition-all duration-300 ease-out text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="nav-link block text-gray-400 hover:text-blue-400 transition-all duration-300 ease-out text-sm"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/contact-us"
                className="nav-link block text-gray-400 hover:text-blue-400 transition-all duration-300 ease-out text-sm"
              >
                Contact Us
              </Link>
            </div>
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