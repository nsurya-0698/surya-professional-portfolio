import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for Intersection Observer with performance optimization
 * 
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Threshold for triggering (0-1)
 * @param {string} options.rootMargin - Root margin for the observer
 * @param {Element} options.root - Root element for the observer
 * @returns {Array} [isVisible, ref] - Visibility state and ref to attach to element
 */
export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  
  const { threshold = 0.1, rootMargin = '0px', root = null } = options;

  const handleIntersection = useCallback((entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      root
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleIntersection, threshold, rootMargin, root]);

  return [isVisible, elementRef];
};

/**
 * Custom hook for scroll-triggered animations
 * 
 * @param {Object} options - Animation options
 * @returns {Array} [isInView, ref] - In view state and ref
 */
export const useScrollAnimation = (options = {}) => {
  const [isInView, ref] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  });

  return [isInView, ref];
}; 