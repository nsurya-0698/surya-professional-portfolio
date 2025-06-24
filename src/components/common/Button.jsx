import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

/**
 * Button component with multiple variants and accessibility features
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, outline, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.rest - Additional props
 * @returns {JSX.Element} Button component
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className = '',
  ...rest
}) => {
  const baseClasses = `btn btn-${variant} btn-${size}`;
  const classes = `${baseClasses} ${className}`.trim();

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      {...rest}
    >
      {loading && (
        <motion.div
          className="btn-loader"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span className={loading ? 'btn-content-loading' : 'btn-content'}>
        {children}
      </span>
    </motion.button>
  );
};

export default Button; 