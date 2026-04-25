import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we've scrolled down more than 10px and past a small threshold (80px)
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    {
      name: "Body Composition",
      subheading: "Body Composition & Weight",
      items: [
        { name: "Body Fat Calculator", path: "/body-fat-calculator" },
        { name: "Army Body Fat Calculator", path: "/army-body-fat-calculator" },
        { name: "Lean Body Mass Calculator", path: "/lean-body-mass-calculator" },
        { name: "Ideal Weight Calculator", path: "/ideal-weight-calculator" },
        { name: "Healthy Weight Calculator", path: "/healthy-weight-calculator" },
        { name: "Body Type Calculator", path: "/body-type-calculator" },
        { name: "Body Surface Area (BSA)", path: "/body-surface-area-calculator" },
      ],
    },
    {
      name: "Nutrition & Diet",
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
      name: "Fitness",
      subheading: "Fitness & Performance",
      items: [
        { name: "Pace Calculator", path: "/pace-calculator" },
        { name: "Calories Burned", path: "/calories-burned-calculator" },
        { name: "One Rep Max", path: "/one-rep-max-calculator" },
        { name: "Target Heart Rate", path: "/target-heart-rate-calculator" },
      ],
    },
    {
      name: "Legal",
      items: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-conditions" },
        { name: "Contact Us", path: "/contact-us" },
      ],
    },
  ];

  // Check if current path belongs to a dropdown group
  const isGroupActive = (group) => {
    return group.items?.some(item => location.pathname === item.path);
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#030712]/70 backdrop-blur-3xl supports-[backdrop-filter]:bg-[#030712]/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-6 group">
            <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300">
              <Heart className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tight hidden sm:block whitespace-nowrap filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              BMI Pro
            </span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent sm:hidden filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              BMI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.items ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`text-sm font-semibold flex items-center gap-1 px-4 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
                          isGroupActive(item) 
                            ? 'text-white bg-white/10 shadow-[0_4px_15px_rgba(255,255,255,0.05)] border border-white/10' 
                            : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/5 hover:shadow-lg'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[260px] bg-[#030712]/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-xl">
                      {item.subheading && (
                        <div className="px-3 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] font-extrabold text-cyan-400/80 border-b border-white/[0.05] mb-2">
                          {item.subheading}
                        </div>
                      )}
                      {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.path} asChild>
                          <Link
                            to={subItem.path}
                            className={`cursor-pointer rounded-lg mx-1 my-0.5 transition-all duration-200 hover:bg-white/5 focus:bg-white/5 ${
                              location.pathname === subItem.path ? 'text-cyan-400 bg-white/[0.03] font-medium' : 'text-slate-300'
                            }`}
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
                    className={`text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
                      location.pathname === item.path
                        ? "text-white bg-white/10 shadow-[0_4px_15px_rgba(255,255,255,0.05)] border border-white/10"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/5 hover:shadow-lg"
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
            <SheetTrigger asChild className="xl:hidden">
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-950/95 backdrop-blur-2xl border-white/[0.06] p-0 sm:max-w-sm w-full">
              <div className="flex flex-col h-full">
                {/* Header Sub-Header */}
                <div className="p-6 border-b border-white/[0.06]">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Navigation</h2>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.items ? (
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                            {item.name}
                          </h3>
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`block text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
                                location.pathname === subItem.path
                                  ? 'text-cyan-400 bg-white/5'
                                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                              }`}
                              onClick={() => {
                                setIsOpen(false);
                                window.scrollTo(0, 0);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          className="block text-slate-300 hover:text-white transition-colors duration-200 py-2 px-2 font-medium rounded-lg hover:bg-white/5"
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
    </motion.header>
  );
};

export default Header;