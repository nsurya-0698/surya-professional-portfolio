import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useIntersectionObserver';
import './Card.css';

/**
 * Card component with animations and multiple variants
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Card variant (default, elevated, outlined, glass)
 * @param {boolean} props.animate - Whether to animate on scroll
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.rest - Additional props
 * @returns {JSX.Element} Card component
 */
const Card = ({
  variant = 'default',
  animate = true,
  children,
  className = '',
  ...rest
}) => {
  const [isInView, cardRef] = useScrollAnimation();
  
  const baseClasses = `card card-${variant}`;
  const classes = `${baseClasses} ${className}`.trim();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={classes}
      variants={animate ? cardVariants : {}}
      initial="hidden"
      animate={animate && isInView ? "visible" : "hidden"}
      whileHover={animate ? "hover" : {}}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Card; 