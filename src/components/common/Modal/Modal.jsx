import React, { forwardRef, memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './Modal.css';

/**
 * Reusable Modal Component
 * Supports backdrop, keyboard navigation, and accessibility
 */
const Modal = forwardRef(({
  children,
  isOpen = false,
  onClose,
  title,
  size = 'medium',
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = '',
  ...props
}, ref) => {
  const handleBackdropClick = useCallback((event) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose?.();
    }
  }, [closeOnBackdrop, onClose]);

  const handleKeyDown = useCallback((event) => {
    if (closeOnEscape && event.key === 'Escape') {
      onClose?.();
    }
  }, [closeOnEscape, onClose]);

  // Handle escape key
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, handleKeyDown]);

  // Focus management
  useEffect(() => {
    if (isOpen && ref?.current) {
      ref.current.focus();
    }
  }, [isOpen, ref]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        ref={ref}
        className={`modal modal--${size} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        {...props}
      >
        {title && (
          <div className="modal__header">
            <h2 id="modal-title" className="modal__title">
              {title}
            </h2>
            {onClose && (
              <button
                type="button"
                className="modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
});

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  closeOnBackdrop: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  className: PropTypes.string
};

Modal.displayName = 'Modal';

export default memo(Modal); 