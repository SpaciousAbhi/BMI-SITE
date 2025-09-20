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
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="w-10 h-10 rounded-lg bg-gray-800/80 hover:bg-gray-700/90 text-gray-300 hover:text-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm"
      >
        <ArrowUp className="h-4 w-4" />
        <span className="sr-only">Scroll to top</span>
      </Button>
    </div>
  );
};

export default ScrollToTopButton;