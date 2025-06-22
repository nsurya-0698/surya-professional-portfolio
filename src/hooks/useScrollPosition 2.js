import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking scroll position with performance optimization
 * Uses passive event listeners and throttling for better performance
 * 
 * @returns {number} Current scroll Y position
 */
export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
};

/**
 * Custom hook for scroll direction detection
 * 
 * @returns {Object} Object containing scroll direction and position
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const scrollY = useScrollPosition();

  useEffect(() => {
    if (scrollY > prevScrollY) {
      setScrollDirection('down');
    } else if (scrollY < prevScrollY) {
      setScrollDirection('up');
    }
    setPrevScrollY(scrollY);
  }, [scrollY, prevScrollY]);

  return { scrollDirection, scrollY };
}; 