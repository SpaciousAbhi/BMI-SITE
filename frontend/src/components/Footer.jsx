import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06] py-14">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:p-8 lg:p-10 mb-10">
          {/* Brand Section */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-white/10">
                <Heart className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                BMI Pro
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Professional BMI calculator providing accurate health insights and personalized recommendations 
              based on WHO and CDC guidelines.
            </p>
          </div>

          {/* Home Page | BMI Calculator Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Home
            </h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm py-1"
              >
                BMI Calculator
              </Link>
            </div>
          </div>

          {/* Body Composition Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Body Composition
            </h3>
            <div className="space-y-2 max-h-52 overflow-y-auto scrollbar-thin pr-1">
              <Link to="/body-fat-calculator" className="block text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm py-1">Body Fat Calculator</Link>
              <Link to="/army-body-fat-calculator" className="block text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm py-1">Army Body Fat</Link>
              <Link to="/lean-body-mass-calculator" className="block text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm py-1">Lean Body Mass</Link>
              <Link to="/ideal-weight-calculator" className="block text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm py-1">Ideal Weight</Link>
              <Link to="/healthy-weight-calculator" className="block text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm py-1">Healthy Weight</Link>
              <Link to="/body-type-calculator" className="block text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm py-1">Body Type</Link>
              <Link to="/body-surface-area-calculator" className="block text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm py-1">Body Surface Area</Link>
            </div>
          </div>

          {/* Nutrition & Diet Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Nutrition & Diet
            </h3>
            <div className="space-y-2 max-h-52 overflow-y-auto scrollbar-thin pr-1">
              <Link to="/calorie-calculator" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm py-1">Calorie Calculator</Link>
              <Link to="/tdee-calculator" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm py-1">TDEE Calculator</Link>
              <Link to="/bmr-calculator" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm py-1">BMR Calculator</Link>
              <Link to="/macro-calculator" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm py-1">Macro Calculator</Link>
              <Link to="/carbohydrate-calculator" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm py-1">Carbohydrate Calculator</Link>
              <Link to="/protein-calculator" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm py-1">Protein Calculator</Link>
              <Link to="/fat-intake-calculator" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm py-1">Fat Intake Calculator</Link>
            </div>
          </div>

          {/* Fitness & Performance Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Fitness
            </h3>
            <div className="space-y-2">
              <Link to="/pace-calculator" className="block text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm py-1">Pace Calculator</Link>
              <Link to="/calories-burned-calculator" className="block text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm py-1">Calories Burned</Link>
              <Link to="/one-rep-max-calculator" className="block text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm py-1">One Rep Max</Link>
              <Link to="/target-heart-rate-calculator" className="block text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm py-1">Target Heart Rate</Link>
            </div>
          </div>

          {/* Legal & Privacy Section */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <div className="space-y-2">
              <Link to="/privacy-policy" className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm py-1">Privacy Policy</Link>
              <Link to="/terms-conditions" className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm py-1">Terms & Conditions</Link>
              <Link to="/contact-us" className="block text-slate-400 hover:text-white transition-colors duration-200 text-sm py-1">Contact Us</Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative pt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <p className="text-slate-500 text-sm text-center">
            © {new Date().getFullYear()} BMI Pro. All rights reserved. Your health, our priority.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;