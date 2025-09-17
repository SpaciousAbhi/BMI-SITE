import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay scroll to top to work better with page transitions
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100); // Small delay to allow transition to start

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

export default ScrollToTop;