import { useEffect, useMemo, useState } from 'react';
import proPic from './Image.png';
import './index.css';

const Hero = () => {
  const headlinePhrases = useMemo(
    () => [
      'Architecting Scalable Cloud & Full-Stack Solutions',
      'Building Secure Cloud-Native Platforms',
      'Designing Enterprise GenAI & API Systems',
    ],
    []
  );

  const [typedHeadline, setTypedHeadline] = useState('\u00A0');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTypedHeadline(headlinePhrases[0]);
      return undefined;
    }

    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const typeNextFrame = () => {
      const currentPhrase = headlinePhrases[phraseIndex];
      const nextText = currentPhrase.slice(0, characterIndex);

      setTypedHeadline(nextText || '\u00A0');

      if (!isDeleting && characterIndex === currentPhrase.length) {
        timeoutId = window.setTimeout(() => {
          isDeleting = true;
          typeNextFrame();
        }, 1800);
        return;
      }

      if (isDeleting && characterIndex === 0) {
        phraseIndex = (phraseIndex + 1) % headlinePhrases.length;
        isDeleting = false;
      }

      characterIndex += isDeleting ? -1 : 1;
      timeoutId = window.setTimeout(typeNextFrame, isDeleting ? 34 : 58);
    };

    timeoutId = window.setTimeout(typeNextFrame, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [headlinePhrases]);

  return (
    <section className="opening-container" id="home">
      <div className="opening-content">
        <p className="intro animate-fade-up">Hi, my name is</p>
        <h1 className="name-header animate-slide-left">Surya Teja Nammi</h1>
        <h2 className="passion-header animate-slide-right" aria-label={typedHeadline.trim() || headlinePhrases[0]}>
          <span className="typewriter-text">{typedHeadline}</span>
          <span className="typewriter-caret" aria-hidden="true" />
        </h2>
        <div className="main-content-wrapper">
          <div className="text-content animate-fade-up">
            <p className="statement">
              AWS-Certified Full Stack Developer with 5+ years of experience building enterprise-grade solutions for healthcare and fintech domains.
              I specialize in Spring Boot microservices, Angular and React applications, and cloud-native architectures on AWS, Azure, and OCI.
            </p>
            <a href="#contact" className="get-in-touch hover-lift animate-glow">
              Let&apos;s Talk
            </a>
          </div>
          <div className="personal-image-container animate-fade-up">
            <img className="personalpic hover-scale animate-float" src={proPic} alt="Professional Headshot" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
