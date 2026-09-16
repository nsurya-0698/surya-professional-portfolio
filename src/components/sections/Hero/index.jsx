import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import resume from '../../../assets/documents/Surya.pdf';
import proPic from './Image-shoulder-extended.png';
import './index.css';

const CAPABILITIES = ['Enterprise GenAI', 'Cloud platforms', 'Reliable operations'];

const clamp = (value, minimum = 0, maximum = 1) => Math.min(Math.max(value, minimum), maximum);

const Hero = () => {
  const heroRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const resetStory = () => {
      hero.style.setProperty('--intro-opacity', '1');
      hero.style.setProperty('--story-opacity', '0');
      hero.style.setProperty('--intro-shift', '0px');
      hero.style.setProperty('--story-shift', '16px');
      hero.style.setProperty('--portrait-rotation', '0deg');
      hero.style.setProperty('--portrait-shift', '0px');
      hero.style.setProperty('--portrait-scale', '1');
      hero.style.setProperty('--portrait-drift-state', 'running');
    };

    if (reduceMotion) {
      resetStory();
      hero.style.setProperty('--portrait-drift-state', 'paused');
      return undefined;
    }

    let animationFrameId = null;
    let isHeroVisible = true;

    const updateStory = () => {
      animationFrameId = null;
      if (!isHeroVisible) return;

      const bounds = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const availableTravel = Math.max(bounds.height - viewportHeight * 0.56, 1);
      const scrollProgress = clamp((viewportHeight * 0.08 - bounds.top) / availableTravel);
      const introExitProgress = clamp(scrollProgress / 0.28);
      const storyProgress = clamp((scrollProgress - 0.44) / 0.38);
      const portraitProgress = clamp((scrollProgress - 0.18) / 0.62);

      hero.style.setProperty('--intro-opacity', `${(1 - introExitProgress).toFixed(3)}`);
      hero.style.setProperty('--story-opacity', `${storyProgress.toFixed(3)}`);
      hero.style.setProperty('--intro-shift', `${(-introExitProgress * 14).toFixed(2)}px`);
      hero.style.setProperty('--story-shift', `${((1 - storyProgress) * 18).toFixed(2)}px`);
      hero.style.setProperty('--portrait-rotation', `${(-portraitProgress * 8).toFixed(2)}deg`);
      hero.style.setProperty('--portrait-shift', `${(-portraitProgress * 14).toFixed(2)}px`);
      hero.style.setProperty('--portrait-scale', `${(1 + portraitProgress * 0.025).toFixed(3)}`);
      hero.style.setProperty('--portrait-drift-state', portraitProgress > 0.08 ? 'paused' : 'running');
    };

    const requestUpdate = () => {
      if (animationFrameId === null) animationFrameId = window.requestAnimationFrame(updateStory);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible) requestUpdate();
    }, { threshold: 0 });

    observer.observe(hero);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
    };
  }, [reduceMotion]);

  return (
    <section className="opening-container" id="home" ref={heroRef}>
      <div className="hero-shell">
        <div className="hero-stage">
          <div className="hero-left-rail">
            <p className="hero-kicker"><span aria-hidden="true" />Hello, I&apos;m Surya</p>
            <h1 className="name-header">Surya Teja <span>Nammi</span></h1>
            <div className="hero-copy-stage">
              <div className="hero-copy-layer hero-copy-layer--intro">
                <p className="hero-role-display">AI platform <span>&amp;</span> backend engineer</p>
                <p className="hero-current-role"><span>Software Developer 3</span> <i aria-hidden="true" /> <span>Oracle Generative AI</span></p>
              </div>
              <div className="hero-copy-layer hero-copy-layer--story" aria-hidden="true">
                <p className="story-eyebrow">From idea to production</p>
                <p className="story-headline">Engineering the systems that make AI useful.</p>
              </div>
            </div>
            <div className="hero-actions">
              <a href="#projects" className="hero-action hero-action--primary">Explore my work <ArrowDownRight size={18} aria-hidden="true" /></a>
              <a href={resume} target="_blank" rel="noreferrer" className="hero-action hero-action--secondary">View résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>

          <figure className="hero-portrait-stage">
            <div className="hero-portrait-shell">
              <img className="personalpic" src={proPic} alt="Surya Teja Nammi" />
            </div>
          </figure>

          <aside className="hero-right-rail" aria-label="Professional focus">
            <div className="hero-rail-stage">
              <div className="hero-rail-layer hero-rail-layer--intro">
                <p className="rail-eyebrow">Currently building</p>
                <p className="rail-intro">Production AI platforms at Oracle.</p>
              </div>
              <div className="hero-rail-layer hero-rail-layer--story" aria-hidden="true">
                <p className="rail-eyebrow">Capabilities</p>
                <ul className="capability-list">
                  {CAPABILITIES.map((capability, index) => <li key={capability}><span>0{index + 1}</span>{capability}</li>)}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true"><span>Scroll to reveal</span><i /></div>
    </section>
  );
};

export default Hero;
