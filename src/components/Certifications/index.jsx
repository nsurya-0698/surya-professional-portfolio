import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import certificate from './AWS_Certified _Solutions Architect Associate.pdf'; // Import resume PDF
import { Award } from 'lucide-react';
import './index.css';

function Certifications() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-container">
        <h2 className="section-title">
          <div className="title-icon" />
          Certifications
          <Award className="title-icon" />
        </h2>

        <div className={`certificates-slider ${isExpanded ? 'paused' : ''}`}>
          <div className="slider-track">
            <div
              className={`certificate-card ${isExpanded ? 'expanded' : ''}`}
              onClick={handleCardClick}
            >
              <div className="certificate-content">
                <div className="certificate-image">
                  <div className="aws-badge">
                    <div className="badge-front">
                      <img
                        src="https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
                        alt="AWS Solutions Architect Badge"
                        className="badge-image"
                      />
                    </div>
                    <div className="badge-glow"></div>
                    {isExpanded && (
                      <div className="confetti-container">
                        {[...Array(30)].map((_, i) => (
                          <div
                            key={i}
                            className="confetti"
                            style={{
                              '--delay': `${Math.random() * 2}s`,
                              '--x': `${Math.random() * 200 - 100}px`,
                              '--y': `${Math.random() * 200 - 100}px`,
                              '--rotation': `${Math.random() * 360}deg`,
                              '--color': `hsl(${Math.random() * 360}, 70%, 50%)`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="certificate-details">
                  <h3>AWS Certified Solutions Architect – Associate</h3>
                  <div className="score">
                    <CheckCircle className="score-icon" />
                    <span>Score: 965/1000</span>
                  </div>
                  <p>Validated expertise in designing distributed systems and applications using AWS technologies. Demonstrated proficiency in AWS services, architectural best practices, and building secure and reliable applications.</p>
                  <a href={certificate} target="_blank" rel="noreferrer" className="view-certificate">
                    <span>View Certificate</span>
                    <Award className="view-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certifications;