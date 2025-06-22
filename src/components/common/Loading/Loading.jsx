import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

/**
 * Reusable Loading Component
 * Supports different sizes and variants
 */
const Loading = memo(({
  size = 'medium',
  variant = 'spinner',
  text = 'Loading...',
  className = '',
  ...props
}) => {
  const baseClass = 'loading';
  const sizeClass = `loading--${size}`;
  const variantClass = `loading--${variant}`;
  
  const loadingClasses = [
    baseClass,
    sizeClass,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="loading__dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        );
      case 'pulse':
        return <div className="loading__pulse"></div>;
      case 'bars':
        return (
          <div className="loading__bars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        );
      default:
        return (
          <svg className="loading__spinner" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        );
    }
  };

  return (
    <div className={loadingClasses} {...props}>
      {renderSpinner()}
      {text && <span className="loading__text">{text}</span>}
    </div>
  );
});

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'bars']),
  text: PropTypes.string,
  className: PropTypes.string
};

Loading.displayName = 'Loading';

export default Loading; 