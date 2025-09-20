import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down 400px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 group border-0 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <ArrowUp className="h-5 w-5 group-hover:text-white group-hover:-translate-y-0.5 transform transition-all duration-300 relative z-10" />
        <span className="sr-only">Scroll to top</span>
      </Button>
    </div>
  );
};

export default ScrollToTopButton;