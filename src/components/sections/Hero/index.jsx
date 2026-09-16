import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import resume from '../../../assets/documents/Surya.pdf';
import proPic from './Image-shoulder-extended.png';
import './index.css';

const PROOF_POINTS = [
  {
    label: 'Enterprise GenAI',
    title: 'Agent systems built for production',
    detail: 'From orchestration and APIs to evaluation, delivery, and operational readiness.',
  },
  {
    label: 'Cloud platforms',
    title: 'Backend systems that scale',
    detail: 'Cloud-native services, secure integrations, automation, and observability.',
  },
  {
    label: 'Reliable operations',
    title: 'Delivery with measurable impact',
    detail: 'Testing, incident response, and developer workflows designed to reduce friction.',
  },
];

const IMPACTS = [
  { value: '6+', label: 'years of engineering experience' },
  { value: '70%', label: 'faster RCA investigation' },
  { value: '1–2 hrs', label: 'saved per integration-test run' },
];

const Hero = () => (
  <section className="opening-container" id="home">
    <div className="hero-shell">
      <div className="hero-stage">
        <div className="hero-left-rail">
          <p className="hero-kicker"><span aria-hidden="true" />Hello, I&apos;m Surya</p>
          <h1 className="name-header">Surya Teja <span>Nammi</span></h1>
          <p className="hero-role-display">AI platform <span>&amp;</span> backend engineer</p>
          <p className="hero-current-role"><span>Software Developer 3</span> <i aria-hidden="true" /> <span>Oracle Generative AI</span></p>
          <p className="hero-summary">I build production AI applications and cloud-native services with the testing, security, automation, and operational rigor needed to make them dependable.</p>
          <div className="hero-actions">
            <a href="#projects" className="hero-action hero-action--primary">Explore my work <ArrowDownRight size={18} aria-hidden="true" /></a>
            <a href={resume} target="_blank" rel="noreferrer" className="hero-action hero-action--secondary">View résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>

        <figure className="hero-portrait-stage">
          <div className="hero-portrait-shell">
            <img className="personalpic" src={proPic} alt="Surya Teja Nammi" />
          </div>
          <figcaption className="portrait-caption"><span aria-hidden="true" />Nashville, Tennessee</figcaption>
        </figure>

        <aside className="hero-right-rail" aria-label="Professional focus">
          <p className="rail-eyebrow">Built for production</p>
          <p className="rail-intro">Turning ambitious ideas into reliable systems people can trust.</p>
          <ol className="hero-proof-list">
            {PROOF_POINTS.map((point, index) => (
              <li key={point.label}>
                <span className="proof-index" aria-hidden="true">0{index + 1}</span>
                <div>
                  <p>{point.label}</p>
                  <h2>{point.title}</h2>
                  <span>{point.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <div className="hero-impact-strip" aria-label="Career impact">
        {IMPACTS.map((impact) => (
          <div key={impact.label}>
            <strong>{impact.value}</strong>
            <span>{impact.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="hero-scroll-cue" aria-hidden="true"><span>Scroll to explore</span><i /></div>
  </section>
);

export default Hero;
