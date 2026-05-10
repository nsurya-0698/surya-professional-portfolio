import { forwardRef, memo } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import './Card.css';

/**
 * Reusable Card Component
 * Supports different variants, animations, and hover effects
 */
const Card = forwardRef(({
  children,
  variant = 'default',
  elevation = 'medium',
  animate = true,
  className = '',
  onClick,
  ...props
}, ref) => {
  const [cardRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const baseClass = 'card';
  const variantClass = `card--${variant}`;
  const elevationClass = `card--elevation-${elevation}`;
  const animateClass = animate && isVisible ? 'card--animate' : '';
  
  const cardClasses = [
    baseClass,
    variantClass,
    elevationClass,
    animateClass,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      ref={(node) => {
        cardRef.current = node;
        if (ref) {
          if (typeof ref === 'function') {
            ref(node);
          } else {
            ref.current = node;
          }
        }
      }}
      className={cardClasses}
      onClick={handleClick}
      {...props}
    >
      <div className="card__content">
        {children}
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default memo(Card);
