import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CloudCog, Cpu, Layers3, ShieldCheck } from 'lucide-react';
import resume from '../../../assets/documents/Surya.pdf';
import proPic from './Image-cutout-native.png';
import './index.css';

const SNAPSHOT = [
  { icon: Cpu, label: 'AI Platforms', detail: 'GenAI • Agent systems' },
  { icon: Layers3, label: 'Backend Systems', detail: 'Java • Python • APIs' },
  { icon: CloudCog, label: 'Multi-Cloud', detail: 'OCI • AWS • Azure' },
  { icon: ShieldCheck, label: 'Reliability', detail: 'Testing • Observability • Ops' },
];

const TYPEWRITER_LINES = [
  'Building reliable AI & cloud platforms that ship.',
  'Engineering production-ready GenAI experiences.',
  'Turning complex systems into dependable products.',
  'Automating cloud delivery with confidence.',
];

const updatePortraitTilt = (event) => {
  if (event.pointerType === 'touch') return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
  event.currentTarget.style.setProperty('--portrait-rotate-x', `${(-y * 5).toFixed(2)}deg`);
  event.currentTarget.style.setProperty('--portrait-rotate-y', `${(x * 7).toFixed(2)}deg`);
  event.currentTarget.style.setProperty('--portrait-shift-x', `${(x * 10).toFixed(2)}px`);
  event.currentTarget.style.setProperty('--portrait-shift-y', `${(y * 7).toFixed(2)}px`);
};

const resetPortraitTilt = (event) => {
  event.currentTarget.style.setProperty('--portrait-rotate-x', '0deg');
  event.currentTarget.style.setProperty('--portrait-rotate-y', '0deg');
  event.currentTarget.style.setProperty('--portrait-shift-x', '0px');
  event.currentTarget.style.setProperty('--portrait-shift-y', '0px');
};

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
    <div className="hero-aurora hero-aurora--one" aria-hidden="true" />
    <div className="hero-aurora hero-aurora--two" aria-hidden="true" />
    <div className="opening-content">
      <div className="hero-copy">
        <p className="hero-kicker"><span className="hero-kicker__pulse" aria-hidden="true" />AI Platform & Backend Engineer</p>
        <h1 className="name-header">Surya Teja Nammi</h1>
        <h2 className="passion-header typewriter-header" aria-label={TYPEWRITER_LINES[0]}><span className="typewriter-text" aria-hidden="true">{typedText}</span><span className="typewriter-cursor" aria-hidden="true" /></h2>
        <p className="statement">I engineer production AI applications, cloud-native services, and the delivery systems around them—from APIs and deployment automation to testing, security, and observability.</p>
        <div className="hero-actions">
          <a href="#projects" className="hero-action hero-action--primary">Explore my work <ArrowDownRight size={18} aria-hidden="true" /></a>
          <a href={resume} target="_blank" rel="noreferrer" className="hero-action hero-action--secondary">View résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <p className="hero-proof">Enterprise GenAI • Cloud platforms • Production engineering</p>
      </div>
      <div className="hero-visual" aria-label="Professional portrait of Surya Teja Nammi" onPointerMove={updatePortraitTilt} onPointerLeave={resetPortraitTilt}>
        <div className="portrait-aura" aria-hidden="true" />
        <div className="portrait-sweep" aria-hidden="true" />
        <div className="portrait-float"><div className="portrait-tilt"><img className="personalpic" src={proPic} alt="Surya Teja Nammi" /></div></div>
        <div className="hero-status hero-status--top"><span>Current focus</span><strong>Enterprise GenAI</strong></div>
        <div className="hero-status hero-status--bottom"><span className="hero-status__dot" aria-hidden="true" />Production-minded engineering</div>
      </div>
    </div>
    <div className="recruiter-snapshot" aria-label="Engineering expertise snapshot">
      {SNAPSHOT.map(({ icon: Icon, label, detail }) => (
        <div className="snapshot-item" key={label}>
          <span className="snapshot-icon" aria-hidden="true"><Icon size={19} /></span>
          <span><strong>{label}</strong><small>{detail}</small></span>
        </div>
      ))}
    </div>
  </section>
  );
};

export default Hero;
