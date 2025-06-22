import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for Intersection Observer API
 * Provides a simple interface for detecting when elements enter/exit viewport
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = false
  } = options;

  const callback = useCallback((entries) => {
    const [entry] = entries;
    
    if (entry.isIntersecting) {
      setIsIntersecting(true);
      if (!hasIntersected) {
        setHasIntersected(true);
      }
    } else {
      setIsIntersecting(false);
    }
  }, [hasIntersected]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      threshold,
      root,
      rootMargin
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, threshold, root, rootMargin]);

  // Reset intersection state if triggerOnce is false
  useEffect(() => {
    if (!triggerOnce && !isIntersecting) {
      setHasIntersected(false);
    }
  }, [isIntersecting, triggerOnce]);

  return [elementRef, isIntersecting, hasIntersected];
}; 