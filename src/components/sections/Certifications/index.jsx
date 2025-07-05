import React, { useState } from 'react';
import { CheckCircle, Award, Github } from 'lucide-react';
import certificate from '../../../assets/documents/AWS_Certified_Solutions_Architect.pdf'; // Import resume PDF
import genaiBadge from '../../../assets/icons/genai-badge.svg';
import './index.css';

function Certifications() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardClick2 = () => {
    setIsExpanded2(!isExpanded2);
  };

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-container">
        <h2 className="section-title">
          <div className="title-icon" />
          Certifications
          <Award className="title-icon" />
        </h2>

        <div className={`certificates-slider ${isExpanded || isExpanded2 ? 'paused' : ''}`}>
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
                  <div className="certificate-buttons">
                    <a href={certificate} target="_blank" rel="noreferrer" className="view-certificate">
                      <span>View Certificate</span>
                      <Award className="view-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* New Certification Card */}
            <div
              className={`certificate-card ${isExpanded2 ? 'expanded' : ''}`}
              onClick={handleCardClick2}
            >
              <div className="certificate-content">
                <div className="certificate-image">
                  <div className="aws-badge">
                    <div className="badge-front">
                      <img
                        src={genaiBadge}
                        alt="Generative AI with LLMs Badge"
                        className="badge-image"
                      />
                    </div>
                    <div className="badge-glow"></div>
                    {isExpanded2 && (
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
                  <h3>Generative AI with Large Language Models</h3>
                  <div className="score">
                    <CheckCircle className="score-icon" />
                    <span>DeepLearning.AI & AWS</span>
                  </div>
                  <p>Mastered the fundamentals of generative AI and LLMs, including transformer architecture, fine-tuning techniques, and deployment strategies. Gained practical skills in prompt engineering and model evaluation.</p>
                  <div className="certificate-buttons">
                    <a href="https://www.coursera.org/account/accomplishments/verify/5G0I2YX1E2H4?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course" target="_blank" rel="noreferrer" className="view-certificate">
                      <span>View Certificate</span>
                      <Award className="view-icon" />
                    </a>
                    <a href="https://github.com/nsurya-0698/genAI-with-Large-Language-Models" target="_blank" rel="noreferrer" className="github-button">
                      <span>GitHub</span>
                      <Github className="github-icon" />
                    </a>
                  </div>
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