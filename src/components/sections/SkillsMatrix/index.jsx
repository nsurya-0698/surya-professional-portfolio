import React, { useEffect, useRef, useState } from 'react';
import './index.css';

const skills = [
  { name: 'Java', confidence: 95 },
  { name: 'Python', confidence: 90 },
  { name: 'React', confidence: 92 },
  { name: 'AWS', confidence: 88 },
  { name: 'Spring Boot', confidence: 93 },
  { name: 'Node.js', confidence: 85 },
  { name: 'Docker', confidence: 87 },
  { name: 'Kubernetes', confidence: 80 },
  { name: 'SQL', confidence: 89 },
  { name: 'JavaScript', confidence: 94 },
  { name: 'AI/LLM Research', confidence: 70 },
];

const SkillsMatrix = () => {
  const scrollRef = useRef(null);
  const [svgSize, setSvgSize] = useState(100);
  const [radius, setRadius] = useState(42);
  const [strokeWidth, setStrokeWidth] = useState(10);

  useEffect(() => {
    const updateSvgSize = () => {
      const width = window.innerWidth;
      let newSize = 100;
      let newRadius = 42;
      let newStrokeWidth = 10;

      if (width <= 360) {
        newSize = 45;
        newRadius = 19;
        newStrokeWidth = 4;
      } else if (width <= 480) {
        newSize = 50;
        newRadius = 21;
        newStrokeWidth = 5;
      } else if (width <= 600) {
        newSize = 60;
        newRadius = 25;
        newStrokeWidth = 6;
      } else if (width <= 768) {
        newSize = 70;
        newRadius = 29;
        newStrokeWidth = 7;
      } else if (width <= 900) {
        newSize = 80;
        newRadius = 33;
        newStrokeWidth = 8;
      } else if (width <= 1200) {
        newSize = 90;
        newRadius = 37;
        newStrokeWidth = 9;
      }

      setSvgSize(newSize);
      setRadius(newRadius);
      setStrokeWidth(newStrokeWidth);
    };

    updateSvgSize();
    window.addEventListener('resize', updateSvgSize);

    return () => window.removeEventListener('resize', updateSvgSize);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrame;
    let scrollAmount = 0;
    let isHovered = false;

    const scrollStep = () => {
      if (!isHovered) {
        scrollAmount += 1;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
      animationFrame = requestAnimationFrame(scrollStep);
    };

    animationFrame = requestAnimationFrame(scrollStep);

    scrollContainer.addEventListener('mouseenter', () => { isHovered = true; });
    scrollContainer.addEventListener('mouseleave', () => { isHovered = false; });

    return () => {
      cancelAnimationFrame(animationFrame);
      scrollContainer.removeEventListener('mouseenter', () => { isHovered = true; });
      scrollContainer.removeEventListener('mouseleave', () => { isHovered = false; });
    };
  }, []);

  // Duplicate skills for seamless infinite scroll
  const skillList = [...skills, ...skills];

  return (
    <section className="skills-matrix-section">
      <h2 className="skills-matrix-title">
        <span className="title-icon" />
        Top Skills
        <span className="title-icon" />
      </h2>
      <div className="skills-matrix-scroll" ref={scrollRef}>
        <div className="skills-matrix-list">
          {skillList.map((skill, idx) => (
            <div className="skill-ring-container" key={idx}>
              <svg className="skill-ring" width={svgSize} height={svgSize}>
                <circle
                  className="skill-ring-bg"
                  cx={svgSize / 2} cy={svgSize / 2} r={radius}
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <circle
                  className="skill-ring-fg"
                  cx={svgSize / 2} cy={svgSize / 2} r={radius}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={2 * Math.PI * radius}
                  strokeDashoffset={2 * Math.PI * radius * (1 - skill.confidence / 100)}
                  style={{ transition: 'stroke-dashoffset 1s' }}
                />
                <text 
                  x={svgSize / 2} 
                  y={svgSize / 2 + (svgSize <= 60 ? 2 : 4)} 
                  textAnchor="middle" 
                  className="skill-percent"
                >
                  {skill.confidence}%
                </text>
              </svg>
              <div className="skill-name">
                {skill.name}
                {skill.isLearning && <span className="learning-label"> (Learning)</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix; 