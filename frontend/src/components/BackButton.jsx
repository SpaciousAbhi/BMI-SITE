import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show back button on home page
  if (location.pathname === '/') {
    return null;
  }

  const handleGoBack = () => {
    // Check if there's browser history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to home page if no history
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Button
        onClick={handleGoBack}
        variant="ghost"
        size="sm"
        className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm"
      >
        <ArrowLeft className="h-4 w-4 group-hover:text-blue-400 transition-colors duration-300 group-hover:-translate-x-1 transform" />
        <span className="font-medium">Back</span>
      </Button>
    </div>
  );
};

export default BackButton;