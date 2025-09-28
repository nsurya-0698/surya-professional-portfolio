import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import './index.css';

const Appreciations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRef = useRef(null);

  const appreciations = [
    {
        id: 1,
        name: "Katie Ruiz and Patrick Thomas",
        role: "Sr.Manager and Lead Engineer",
        company: "Quest Diagnostics",
        feedback: "Surya’s dedication on the Elisa project has been outstanding. His prompt responses, self-motivation, and ability to stay on top of every detail have been a huge asset. Both Patrick and I truly value his contributions and appreciate the quality he brings to the team.",
        rating: 5,
        category: "Reliability & Ownership"
    },
    {
      id: 2,
      name: "Keith chan",
      role: "Director of IT",
      company: "Optum Global Solutions",
      feedback: "Surya's ability to understand business requirements and translate them into technical solutions is remarkable. He's always available for discussions and provides valuable insights that help shape our product roadmap. His technical expertise in AI/ML and full-stack development is impressive. He's proactive in learning new technologies and shares his knowledge generously with the team.",
      rating: 5,
      category: "Technical Excellence"
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === appreciations.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change appreciation every 4 seconds
    return () => clearInterval(interval);
  }, [appreciations.length, isPaused]);

  // Resume auto-scroll on click outside the card
  useEffect(() => {
    function handleDocumentClick(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsPaused(false);
      }
    }
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  const nextAppreciation = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === appreciations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevAppreciation = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? appreciations.length - 1 : prevIndex - 1
    );
  };

  const handleCardClick = () => {
    setIsPaused(true);
  };

  const handleCardMouseEnter = () => {
    setIsPaused(true);
  };

  const handleCardMouseLeave = () => {
    setIsPaused(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`star ${index < rating ? 'filled' : 'empty'}`}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  const currentAppreciation = appreciations[currentIndex];

  return (
    <section id="appreciations" className="appreciations-section">
      <div className="appreciations-container">
        <h2 className="section-title">
          <div className="title-icon" />
          <Users size={24} className="title-icon-svg" />
          Appreciations & Feedback
          <div className="title-icon" />
        </h2>

        <div className="appreciations-content">
          <div className="appreciation-navigation">
            <button 
              className="nav-button prev" 
              onClick={prevAppreciation}
              aria-label="Previous Appreciation"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="appreciation-counter">
              <span className="current-number">{currentIndex + 1}</span>
              <span className="separator">/</span>
              <span className="total-number">{appreciations.length}</span>
            </div>

            <button 
              className="nav-button next" 
              onClick={nextAppreciation}
              aria-label="Next Appreciation"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="appreciation-card-container">
            <div
              className="appreciation-card"
              ref={cardRef}
              onClick={handleCardClick}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              style={{ cursor: 'pointer' }}
            >
              <div className="quote-icon">
                <Quote size={32} />
              </div>
              
              <div className="appreciation-content">
                <div className="feedback-text">
                  "{currentAppreciation.feedback}"
                </div>
                
                <div className="rating-container">
                  <div className="stars">
                    {renderStars(currentAppreciation.rating)}
                  </div>
                  <span className="rating-text">{currentAppreciation.rating}/5</span>
                </div>
                
                <div className="person-info">
                  <div className="person-details">
                    <h4 className="person-name">{currentAppreciation.name}</h4>
                    <p className="person-role">{currentAppreciation.role}</p>
                    <p className="person-company">{currentAppreciation.company}</p>
                  </div>
                  
                  <div className="category-badge">
                    {currentAppreciation.category}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="appreciation-indicators">
            {appreciations.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to appreciation ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appreciations;
