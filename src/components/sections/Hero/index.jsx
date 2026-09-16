import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import resume from '../../../assets/documents/Surya.pdf';
import proPic from './Image-cutout-native.png';
import './index.css';

const TYPEWRITER_LINES = [
  'Building reliable AI & cloud platforms that ship.',
  'Engineering production-ready GenAI experiences.',
  'Turning complex systems into dependable products.',
  'Automating cloud delivery with confidence.',
];

const Hero = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setTypedText(TYPEWRITER_LINES[0]);
      setLineIndex(0);
      setIsDeleting(false);
      return undefined;
    }

    const currentLine = TYPEWRITER_LINES[lineIndex];
    let delay = isDeleting ? 27 : 52;

    if (!isDeleting && typedText === currentLine) delay = 1750;
    if (isDeleting && typedText === '') delay = 320;

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && typedText === currentLine) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && typedText === '') {
        setLineIndex((currentIndex) => (currentIndex + 1) % TYPEWRITER_LINES.length);
        setIsDeleting(false);
        return;
      }

      setTypedText(currentLine.slice(0, typedText.length + (isDeleting ? -1 : 1)));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, lineIndex, reduceMotion, typedText]);

  return (
    <section className="opening-container" id="home">
      <div className="editorial-rule editorial-rule--top" aria-hidden="true" />
      <div className="opening-content">
        <div className="hero-copy">
          <p className="hero-kicker"><span className="hero-kicker__pulse" aria-hidden="true" />Hello, I&apos;m Surya</p>
          <h1 className="name-header"><span>Surya</span><span>Teja Nammi</span></h1>
          <p className="hero-role-display" aria-label="AI platform and backend engineer">AI platform<br /><span>&amp; backend</span><br />engineer</p>
          <p className="passion-header typewriter-header">
            <span className="sr-only">AI platform and backend engineering focus.</span>
            <span className="typewriter-text" aria-hidden="true">{typedText}</span><span className="typewriter-cursor" aria-hidden="true" />
          </p>
          <div className="hero-actions">
            <a href="#projects" className="hero-action hero-action--primary">Explore my work <ArrowDownRight size={18} aria-hidden="true" /></a>
            <a href={resume} target="_blank" rel="noreferrer" className="hero-action hero-action--secondary">View résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>

        <figure className="hero-visual">
          <span className="portrait-index" aria-hidden="true">01</span>
          <span className="portrait-rail" aria-hidden="true" />
          <img className="personalpic" src={proPic} alt="Surya Teja Nammi" />
          <figcaption className="portrait-caption"><span aria-hidden="true" />Nashville, Tennessee</figcaption>
        </figure>

        <aside className="hero-editorial-note" aria-label="Engineering focus">
          <p className="editorial-note__eyebrow">Turning ideas into reliable systems</p>
          <p className="statement">I engineer production AI applications, cloud-native services, and the delivery systems around them—from APIs and deployment automation to testing, security, and observability.</p>
          <dl className="editorial-proof">
            <div><dt>01</dt><dd>Enterprise GenAI<br />agent systems</dd></div>
            <div><dt>02</dt><dd>Cloud-native<br />backend platforms</dd></div>
            <div><dt>03</dt><dd>Reliable delivery<br />and operations</dd></div>
          </dl>
        </aside>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true"><span>Scroll to explore</span><i /></div>
      <div className="editorial-rule editorial-rule--bottom" aria-hidden="true" />
    </section>
  );
};

export default Hero;
