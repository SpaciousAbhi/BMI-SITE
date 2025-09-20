import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { 
  Menu, 
  Heart, 
  ChevronDown, 
  Search, 
  X, 
  Calculator,
  Activity,
  Utensils,
  Dumbbell,
  Baby,
  Stethoscope,
  Scale,
  TrendingUp,
  Zap,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const searchRef = useRef(null);

  // Enhanced navigation items with icons and descriptions
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Heart,
      description: "BMI Calculator & Health Hub"
    },
    {
      name: "Body Composition",
      subheading: "Weight Analysis & Physical Assessment",
      icon: Scale,
      items: [
        { 
          name: "Body Fat Calculator", 
          path: "/body-fat-calculator",
          description: "Calculate body fat percentage using skinfold measurements",
          popular: true
        },
        { 
          name: "Army Body Fat Calculator", 
          path: "/army-body-fat-calculator",
          description: "Military standard body fat assessment"
        },
        { 
          name: "Lean Body Mass Calculator", 
          path: "/lean-body-mass-calculator",
          description: "Calculate lean muscle mass and fat-free weight"
        },
        { 
          name: "Ideal Weight Calculator", 
          path: "/ideal-weight-calculator",
          description: "Find your ideal weight range based on height",
          popular: true
        },
        { 
          name: "Healthy Weight Calculator", 
          path: "/healthy-weight-calculator",
          description: "WHO and CDC recommended weight ranges"
        },
        { 
          name: "Body Type Calculator", 
          path: "/body-type-calculator",
          description: "Determine your body type (ectomorph, mesomorph, endomorph)"
        },
        { 
          name: "Body Surface Area Calculator", 
          path: "/body-surface-area-calculator",
          description: "Medical BSA calculation for dosage and treatment"
        },
      ],
    },
    {
      name: "Nutrition & Diet",
      subheading: "Dietary Planning & Nutritional Analysis",
      icon: Utensils,
      items: [
        { 
          name: "Calorie Calculator", 
          path: "/calorie-calculator",
          description: "Daily calorie needs for weight management",
          popular: true
        },
        { 
          name: "TDEE Calculator", 
          path: "/tdee-calculator",
          description: "Total Daily Energy Expenditure calculation",
          popular: true
        },
        { 
          name: "BMR Calculator", 
          path: "/bmr-calculator",
          description: "Basal Metabolic Rate - calories at rest"
        },
        { 
          name: "Macro Calculator", 
          path: "/macro-calculator",
          description: "Protein, carbs, and fat macronutrient breakdown"
        },
        { 
          name: "Carbohydrate Calculator", 
          path: "/carbohydrate-calculator",
          description: "Daily carb requirements for your goals"
        },
        { 
          name: "Protein Calculator", 
          path: "/protein-calculator",
          description: "Optimal protein intake for muscle building"
        },
        { 
          name: "Fat Intake Calculator", 
          path: "/fat-intake-calculator",
          description: "Healthy fat requirements and omega-3 needs"
        },
      ],
    },
    {
      name: "Fitness & Performance",
      subheading: "Athletic Training & Exercise Metrics",
      icon: Dumbbell,
      items: [
        { 
          name: "Pace Calculator", 
          path: "/pace-calculator",
          description: "Running pace and race time predictions"
        },
        { 
          name: "Calories Burned Calculator", 
          path: "/calories-burned-calculator",
          description: "Exercise calorie burn estimation",
          popular: true
        },
        { 
          name: "One Rep Max Calculator", 
          path: "/one-rep-max-calculator",
          description: "Strength training 1RM calculations"
        },
        { 
          name: "Target Heart Rate Calculator", 
          path: "/target-heart-rate-calculator",
          description: "Cardio training zones and heart rate targets"
        },
      ],
    },
    {
      name: "Pregnancy & Women's Health",
      subheading: "Maternal Health & Fertility Tools",
      icon: Baby,
      items: [
        { 
          name: "Pregnancy Calculator", 
          path: "/pregnancy-calculator",
          description: "Gestational age and pregnancy milestones",
          popular: true
        },
        { 
          name: "Pregnancy Weight Gain Calculator", 
          path: "/pregnancy-weight-gain-calculator",
          description: "IOM guidelines for healthy pregnancy weight gain"
        },
        { 
          name: "Due Date Calculator", 
          path: "/due-date-calculator",
          description: "Estimated delivery date using Naegele's rule",
          popular: true
        },
        { 
          name: "Ovulation Calculator", 
          path: "/ovulation-calculator",
          description: "Fertility window and ovulation tracking"
        },
        { 
          name: "Conception Calculator", 
          path: "/conception-calculator",
          description: "Conception date estimation and IVF support"
        },
        { 
          name: "Period Calculator", 
          path: "/period-calculator",
          description: "Menstrual cycle tracking and predictions"
        },
      ],
    },
    {
      name: "Medical & Health",
      subheading: "Medical Assessment Tools",
      icon: Stethoscope,
      items: [
        { 
          name: "GFR Calculator", 
          path: "/gfr-calculator",
          description: "Kidney function assessment (eGFR)",
          popular: true
        },
        { 
          name: "BAC Calculator", 
          path: "/bac-calculator",
          description: "Blood alcohol content estimation"
        },
      ],
    },
    {
      name: "Support",
      subheading: "Legal & Support",
      icon: Activity,
      items: [
        { name: "Privacy Policy", path: "/privacy-policy", description: "Data protection and privacy information" },
        { name: "Terms & Conditions", path: "/terms-conditions", description: "Terms of service and usage guidelines" },
        { name: "Contact Us", path: "/contact-us", description: "Get support and send feedback" },
      ],
    },
  ];

  // Flatten all items for search
  const allCalculators = navItems.reduce((acc, category) => {
    if (category.items) {
      acc.push(...category.items.map(item => ({
        ...item,
        category: category.name
      })));
    } else if (category.path) {
      acc.push({
        ...category,
        category: "Main"
      });
    }
    return acc;
  }, []);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = allCalculators.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered.slice(0, 6)); // Limit to 6 results
    } else {
      setFilteredResults([]);
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchQuery("");
        setFilteredResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Popular calculators for quick access
  const popularCalculators = allCalculators.filter(calc => calc.popular);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Heart className="h-10 w-10 text-green-400 group-hover:text-green-300 transition-all duration-300 group-hover:scale-110" />
              <div className="absolute -inset-1 bg-green-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient-x">
                Advanced BMI Calculator
              </span>
              <span className="text-xs text-gray-400 font-medium">Professional Health Tools</span>
            </div>
          </Link>

          {/* Enhanced Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-full h-11"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setFilteredResults([]);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              
              {/* Search Results Dropdown */}
              {searchOpen && (searchQuery.length > 1 || popularCalculators.length > 0) && (
                <div className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-2xl py-2 max-h-80 overflow-y-auto z-50">
                  {searchQuery.length > 1 ? (
                    <>
                      {filteredResults.length > 0 ? (
                        <>
                          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-800">
                            Search Results ({filteredResults.length})
                          </div>
                          {filteredResults.map((item, index) => (
                            <Link
                              key={index}
                              to={item.path}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                                setFilteredResults([]);
                              }}
                              className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors group"
                            >
                              <Calculator className="h-4 w-4 text-blue-400 mr-3 group-hover:text-blue-300" />
                              <div className="flex-1">
                                <div className="text-white font-medium group-hover:text-blue-300">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-400 mt-1 line-clamp-1">
                                  {item.description}
                                </div>
                                <div className="text-xs text-blue-400 mt-1">
                                  {item.category}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <div className="px-4 py-6 text-center text-gray-400">
                          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No calculators found for "{searchQuery}"</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-800 flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Popular Calculators
                      </div>
                      {popularCalculators.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors group"
                        >
                          <TrendingUp className="h-4 w-4 text-green-400 mr-3 group-hover:text-green-300" />
                          <div className="flex-1">
                            <div className="text-white font-medium group-hover:text-green-300">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-1 line-clamp-1">
                              {item.description}
                            </div>
                          </div>
                          <Zap className="h-3 w-3 text-yellow-400 opacity-75" />
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.items ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="nav-link text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 ease-out flex items-center space-x-2 px-4 py-2 rounded-lg group"
                      >
                        <item.icon className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                        <span>{item.name}</span>
                        <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-200" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900/95 backdrop-blur border-gray-700 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 min-w-80 p-2 rounded-xl shadow-2xl">
                      {item.subheading && (
                        <div className="px-3 py-3 text-sm font-semibold text-blue-300 border-b border-gray-700 mb-2 border-l-2 border-blue-400 bg-gray-800/30 rounded-lg flex items-center">
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.subheading}
                        </div>
                      )}
                      {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.path} asChild className="p-0 m-1">
                          <Link
                            to={subItem.path}
                            className="nav-link flex items-start p-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 ease-out cursor-pointer rounded-lg group relative"
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <Calculator className="h-4 w-4 mt-0.5 mr-3 text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                            <div className="flex-1">
                              <div className="font-medium flex items-center">
                                {subItem.name}
                                {subItem.popular && (
                                  <div className="ml-2 px-1.5 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center">
                                    <Star className="h-2.5 w-2.5 mr-1" />
                                    Popular
                                  </div>
                                )}
                              </div>
                              <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                                {subItem.description}
                              </div>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 ease-out px-4 py-2 rounded-lg group ${
                      location.pathname === item.path
                        ? "text-blue-400 bg-gray-800/50"
                        : ""
                    }`}
                  >
                    <item.icon className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Search & Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black border-gray-800 p-0 w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                    <h2 className="text-lg font-semibold text-white flex items-center">
                      <Menu className="h-5 w-5 mr-2 text-blue-400" />
                      Calculator Menu
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Professional health tools</p>
                  </div>
                  
                  {/* Mobile Search */}
                  <div className="p-4 border-b border-gray-800">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search calculators..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {searchQuery.length > 1 ? (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                          Search Results ({filteredResults.length})
                        </h3>
                        {filteredResults.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="block p-3 bg-gray-800/30 rounded-lg mb-2 hover:bg-gray-800/50 transition-colors"
                            onClick={() => {
                              setIsOpen(false);
                              setSearchQuery("");
                              setFilteredResults([]);
                            }}
                          >
                            <div className="font-medium text-white">{item.name}</div>
                            <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      navItems.map((item) => (
                        <div key={item.name}>
                          {item.items ? (
                            <div className="space-y-3">
                              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                                <item.icon className="h-5 w-5 mr-2 text-blue-400" />
                                {item.name}
                              </h3>
                              {item.subheading && (
                                <div className="text-sm font-semibold text-blue-300 mb-3 border-l-2 border-blue-400 pl-3 bg-gray-800/30 py-2 rounded-r-lg">
                                  {item.subheading}
                                </div>
                              )}
                              <div className="space-y-1 ml-4">
                                {item.items.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className="nav-link flex items-center text-gray-300 hover:text-white transition-all duration-300 ease-out py-2 px-3 hover:bg-gray-800/50 rounded-md text-sm group"
                                    onClick={() => {
                                      setIsOpen(false);
                                      window.scrollTo(0, 0);
                                    }}
                                  >
                                    <Calculator className="h-3 w-3 mr-2 text-gray-400 group-hover:text-blue-400" />
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        {subItem.name}
                                        {subItem.popular && (
                                          <Star className="h-3 w-3 ml-1 text-green-400" />
                                        )}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              to={item.path}
                              className="nav-link flex items-center text-gray-300 hover:text-white transition-all duration-300 ease-out py-3 px-3 font-medium hover:bg-gray-800/50 rounded-lg"
                              onClick={() => setIsOpen(false)}
                            >
                              <item.icon className="h-5 w-5 mr-3 text-blue-400" />
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {searchOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur border-b border-gray-700 p-4 z-40">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400 rounded-lg"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                  setFilteredResults([]);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            {filteredResults.length > 0 && (
              <div className="mt-3 space-y-2">
                {filteredResults.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                      setFilteredResults([]);
                    }}
                    className="block p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;