import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Users } from 'lucide-react';
import './index.css';

const APPRECIATIONS = [
  { id: 1, name: 'Katie Ruiz and Patrick Thomas', role: 'Senior Manager and Lead Engineer', company: 'Quest Diagnostics', feedback: 'Surya’s dedication on the Elisa project has been outstanding. His prompt responses, self-motivation, and ability to stay on top of every detail have been a huge asset. Both Patrick and I truly value his contributions and appreciate the quality he brings to the team.', category: 'Reliability & Ownership' },
  { id: 2, name: 'Keith Chan', role: 'Director of IT', company: 'Optum Global Solutions', feedback: 'Surya’s ability to understand business requirements and translate them into technical solutions is remarkable. He is proactive in learning new technologies, shares his knowledge generously, and brings strong AI/ML and full-stack engineering expertise to the team.', category: 'Technical Excellence' },
  { id: 3, name: 'Sandeep Chinamanagonda', role: 'Senior Teammate, GenAI Chat', company: 'Oracle', feedback: 'What made our collaboration particularly meaningful is how quickly it evolved from a mentoring dynamic into genuine peer collaboration. That transition happened faster with Surya than with almost any engineer I have worked alongside.', category: 'Rapid Growth & Ownership' },
  { id: 4, name: 'Prudhvi Vajja', role: 'Engineering Teammate, AI Apps', company: 'Oracle', feedback: 'Overall, Surya is someone who can pick up a problem, learn what is needed, and drive it to completion.', category: 'Execution & Reliability' },
];

const getSlidePosition = (index, activeIndex) => {
  const offset = (index - activeIndex + APPRECIATIONS.length) % APPRECIATIONS.length;
  if (offset === 0) return 'is-active';
  if (offset === 1) return 'is-next';
  if (offset === APPRECIATIONS.length - 1) return 'is-previous';
  return 'is-hidden';
};

const Appreciations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef(null);
  const showNext = () => setActiveIndex((current) => (current + 1) % APPRECIATIONS.length);
  const showPrevious = () => setActiveIndex((current) => (current - 1 + APPRECIATIONS.length) % APPRECIATIONS.length);

  useEffect(() => {
    if (isPaused) return undefined;
    const intervalId = window.setInterval(showNext, 5500);
    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const handlePointerUp = (event) => {
    if (pointerStartX.current === null) return;
    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(distance) < 42) return;
    if (distance < 0) showNext(); else showPrevious();
  };

  return (
    <section id="appreciations" className="appreciations-section">
      <div className="appreciations-container">
        <h2 className="section-heading"><span className="section-heading__line" /><Users size={24} className="section-heading__icon" aria-hidden="true" />Professional Feedback<span className="section-heading__line" /></h2>
        <div className="appreciations-carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={(event) => !event.currentTarget.contains(event.relatedTarget) && setIsPaused(false)} onPointerDown={(event) => { pointerStartX.current = event.clientX; setIsPaused(true); }} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStartX.current = null; setIsPaused(false); }}>
          <div className="appreciations-stage">
            {APPRECIATIONS.map((appreciation, index) => {
              const position = getSlidePosition(index, activeIndex);
              return (
                <article className={`appreciation-card ${position}`} key={appreciation.id} aria-hidden={position !== 'is-active'}>
                  <Quote className="quote-icon" size={32} aria-hidden="true" />
                  <p className="feedback-text">&ldquo;{appreciation.feedback}&rdquo;</p>
                  <div className="person-info"><div className="person-details"><h3 className="person-name">{appreciation.name}</h3><p className="person-role">{appreciation.role}</p><p className="person-company">{appreciation.company}</p></div><div className="category-badge">{appreciation.category}</div></div>
                </article>
              );
            })}
          </div>
          <div className="appreciations-controls">
            <button type="button" className="appreciation-arrow" onClick={showPrevious} aria-label="Previous professional feedback"><ChevronLeft aria-hidden="true" /></button>
            <div className="appreciation-indicators" aria-label={`Feedback ${activeIndex + 1} of ${APPRECIATIONS.length}`}>{APPRECIATIONS.map((appreciation, index) => <button key={appreciation.id} type="button" className={`appreciation-indicator ${index === activeIndex ? 'is-active' : ''}`} onClick={() => setActiveIndex(index)} aria-label={`Show feedback from ${appreciation.name}`} />)}</div>
            <button type="button" className="appreciation-arrow" onClick={showNext} aria-label="Next professional feedback"><ChevronRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appreciations;
