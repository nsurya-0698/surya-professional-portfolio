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

const Hero = () => (
  <section className="opening-container" id="home">
    <div className="hero-aurora hero-aurora--one" aria-hidden="true" />
    <div className="hero-aurora hero-aurora--two" aria-hidden="true" />
    <div className="opening-content">
      <div className="hero-copy">
        <p className="hero-kicker"><span className="hero-kicker__pulse" aria-hidden="true" />AI Platform & Backend Engineer</p>
        <h1 className="name-header">Surya Teja Nammi</h1>
        <h2 className="passion-header">Building reliable <span>AI & cloud platforms</span> that ship.</h2>
        <p className="statement">I engineer production AI applications, cloud-native services, and the delivery systems around them—from APIs and deployment automation to testing, security, and observability.</p>
        <div className="hero-actions">
          <a href="#projects" className="hero-action hero-action--primary">Explore my work <ArrowDownRight size={18} aria-hidden="true" /></a>
          <a href={resume} target="_blank" rel="noreferrer" className="hero-action hero-action--secondary">View résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <p className="hero-proof">Enterprise GenAI • Cloud platforms • Production engineering</p>
      </div>
      <div className="hero-visual" aria-label="Professional portrait of Surya Teja Nammi">
        <div className="portrait-aura" aria-hidden="true" />
        <div className="portrait-float"><img className="personalpic" src={proPic} alt="Surya Teja Nammi" /></div>
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

export default Hero;
