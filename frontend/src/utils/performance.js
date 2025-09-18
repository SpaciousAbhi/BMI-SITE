// Performance optimization utilities for 2025
import React from 'react';

// Debounce function for input optimization
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading hook for images
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [hasBeenSeen, setHasBeenSeen] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasBeenSeen) {
        setIsIntersecting(true);
        setHasBeenSeen(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasBeenSeen, options]);

  return [ref, isIntersecting];
};

// Progressive image loading
export const useProgressiveImage = (src, placeholder) => {
  const [imgSrc, setImgSrc] = React.useState(placeholder);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return [imgSrc, isLoading];
};

// Form validation optimization
export const validateFormFields = (fields, required = []) => {
  const errors = {};
  
  required.forEach(field => {
    if (!fields[field] || fields[field].toString().trim() === '') {
      errors[field] = `${field} is required`;
    }
  });

  // Custom validation rules
  if (fields.age && (fields.age < 13 || fields.age > 120)) {
    errors.age = 'Age must be between 13 and 120';
  }

  if (fields.weight && fields.weight <= 0) {
    errors.weight = 'Weight must be greater than 0';
  }

  if (fields.height && fields.height <= 0) {
    errors.height = 'Height must be greater than 0';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Accessibility helpers
export const announceToScreenReader = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  document.body.appendChild(announcement);
  announcement.textContent = message;
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Enhanced calculation with progress tracking
export const calculateWithProgress = async (calculationFn, onProgress) => {
  const steps = [
    { label: 'Validating inputs...', weight: 20 },
    { label: 'Converting units...', weight: 30 },
    { label: 'Applying formulas...', weight: 40 },
    { label: 'Analyzing results...', weight: 70 },
    { label: 'Generating recommendations...', weight: 90 },
    { label: 'Complete!', weight: 100 }
  ];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    onProgress?.(step.weight, step.label);
    
    // Simulate realistic calculation time
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 200));
  }

  return calculationFn();
};

// Responsive design helpers
export const useResponsive = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(true);

  React.useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    checkResponsive();
    window.addEventListener('resize', throttle(checkResponsive, 100));

    return () => {
      window.removeEventListener('resize', checkResponsive);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};

// Local storage with expiration
export const setStorageWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getStorageWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  
  const item = JSON.parse(itemStr);
  const now = new Date();
  
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  
  return item.value;
};

// Enhanced error handling
export const withErrorBoundary = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Calculator Error:', error, errorInfo);
      
      // Track error for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          description: error.message,
          fatal: false
        });
      }
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="p-6 bg-red-900/20 border border-red-800/50 rounded-xl text-center">
            <h3 className="text-lg font-semibold text-red-300 mb-2">
              Calculation Error
            </h3>
            <p className="text-gray-300 mb-4">
              Something went wrong with the calculation. Please try again.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};