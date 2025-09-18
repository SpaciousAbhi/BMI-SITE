import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Heart, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home Page | BMI Calculator",
      path: "/",
    },
    {
      name: "Additional Calculators",
      subheading: "Body Composition & Weight",
      items: [
        { name: "Body Fat Calculator", path: "/body-fat-calculator" },
        { name: "Army Body Fat Calculator", path: "/army-body-fat-calculator" },
        { name: "Lean Body Mass Calculator", path: "/lean-body-mass-calculator" },
        { name: "Ideal Weight Calculator", path: "/ideal-weight-calculator" },
        { name: "Healthy Weight Calculator", path: "/healthy-weight-calculator" },
        { name: "Body Type Calculator", path: "/body-type-calculator" },
        { name: "Body Surface Area (BSA) Calculator", path: "/body-surface-area-calculator" },
      ],
    },
    {
      name: "Nutrition & Diet Calculators",
      subheading: "Nutrition & Diet",
      items: [
        { name: "Calorie Calculator", path: "/calorie-calculator" },
        { name: "TDEE Calculator", path: "/tdee-calculator" },
        { name: "BMR Calculator", path: "/bmr-calculator" },
        { name: "Macro Calculator", path: "/macro-calculator" },
        { name: "Carbohydrate Calculator", path: "/carbohydrate-calculator" },
        { name: "Protein Calculator", path: "/protein-calculator" },
        { name: "Fat Intake Calculator", path: "/fat-intake-calculator" },
      ],
    },
    {
      name: "Fitness & Performance Calculators",
      subheading: "Fitness & Performance",
      items: [
        { name: "Pace Calculator", path: "/pace-calculator" },
        { name: "Calories Burned Calculator", path: "/calories-burned-calculator" },
        { name: "One Rep Max Calculator", path: "/one-rep-max-calculator" },
        { name: "Target Heart Rate Calculator", path: "/target-heart-rate-calculator" },
      ],
    },
    {
      name: "Pregnancy & Women's Health Calculators",
      subheading: "Pregnancy & Women's Health",
      items: [
        { name: "Pregnancy Calculator", path: "/pregnancy-calculator" },
        { name: "Pregnancy Weight Gain Calculator", path: "/pregnancy-weight-gain-calculator" },
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Conception Calculator", path: "/conception-calculator" },
        { name: "Period Calculator", path: "/period-calculator" },
      ],
    },
    {
      name: "Medical & Health Calculators",
      subheading: "Medical & Health",
      items: [
        { name: "GFR Calculator (kidney function)", path: "/gfr-calculator" },
        { name: "BAC Calculator (blood alcohol content)", path: "/bac-calculator" },
      ],
    },
    {
      name: "Legal & Privacy",
      items: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-conditions" },
        { name: "Contact Us", path: "/contact-us" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-green-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Advanced BMI Calculator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.items ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="nav-link text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 ease-out flex items-center space-x-1"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900 border-gray-700 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 min-w-64">
                      {item.subheading && (
                        <div className="px-3 py-3 text-sm font-semibold text-blue-300 border-b border-gray-700 mb-2 border-l-2 border-blue-400 bg-gray-800/30">
                          {item.subheading}
                        </div>
                      )}
                      {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.path} asChild>
                          <Link
                            to={subItem.path}
                            className="nav-link text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 ease-out cursor-pointer px-3 py-2 mx-1 rounded"
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link text-gray-300 hover:text-white transition-all duration-300 ease-out px-3 py-2 rounded-md ${
                      location.pathname === item.path
                        ? "text-blue-400 bg-gray-800"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-gray-800 p-0">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-lg font-semibold text-white">Menu</h2>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.items ? (
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-white mb-3">
                            {item.name}
                          </h3>
                          {item.subheading && (
                            <div className="text-sm font-semibold text-blue-300 mb-3 border-l-2 border-blue-400 pl-3 bg-gray-800/30 py-2">
                              {item.subheading}
                            </div>
                          )}
                          <div className="space-y-1">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className="nav-link block text-gray-300 hover:text-white transition-all duration-300 ease-out py-2 pl-4 hover:bg-gray-800 rounded-md text-sm"
                                onClick={() => {
                                  setIsOpen(false);
                                  window.scrollTo(0, 0);
                                }}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          className="nav-link block text-gray-300 hover:text-white transition-all duration-300 ease-out py-2 font-medium hover:bg-gray-800 rounded-md px-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;