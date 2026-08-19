import { ExternalLink, Github } from 'lucide-react';
import './index.css';

const PROJECTS = [
  {
    id: 1,
    title: 'GenAI Chat Application',
    description: 'Built a conversational AI application with large language model integration, real-time messaging, and context-aware response workflows.',
    outcome: 'A working end-to-end GenAI experience that demonstrates model integration, streaming interaction, and practical application design.',
    technologies: ['Python', 'OpenAI API', 'React.js', 'WebSocket', 'LLM'],
    githubLink: 'https://github.com/nsurya-0698/genAI-with-Large-Language-Models',
    category: 'AI Engineering',
  },
  {
    id: 2,
    title: 'AI Platform Delivery & Reliability',
    description: 'Developed reusable deployment checks, service probes, integration and canary tests, metrics, alarms, and dashboards for production AI platform readiness.',
    outcome: 'Stronger release confidence, faster operational diagnosis, and reusable production-readiness patterns for an enterprise AI platform.',
    technologies: ['OCI', 'Java', 'Python', 'Integration Testing', 'Observability'],
    category: 'Platform Engineering',
  },
  {
    id: 3,
    title: 'NxtTrendz E-Commerce',
    description: 'Created a responsive e-commerce experience with secure authentication, product discovery, filtering, cart workflows, and protected routes.',
    outcome: 'A complete customer journey across authentication, discovery, product details, and cart management on desktop and mobile.',
    technologies: ['React.js', 'REST APIs', 'JWT', 'CSS', 'Responsive Design'],
    liveLink: 'https://nxttrendz.ccbp.tech/',
    githubLink: 'https://github.com/nsurya-0698/nxttrendz',
    category: 'Full-Stack',
  },
];

function Projects() {
  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    card.style.setProperty('--pointer-x', `${x}px`);
    card.style.setProperty('--pointer-y', `${y}px`);
    card.style.setProperty('--tilt-x', `${((y / bounds.height) - 0.5) * -3}deg`);
    card.style.setProperty('--tilt-y', `${((x / bounds.width) - 0.5) * 3}deg`);
  };

  const resetPointer = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-heading">
          <span className="section-heading__line" />
          Selected Work
          <span className="section-heading__line" />
        </h2>
        <p className="projects-intro">Selected systems that show how I connect product delivery with backend depth, platform readiness, and reliable operations.</p>
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <article className="project-card" key={project.id} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
              <span className="project-card__spotlight" aria-hidden="true" />
              <div className="project-details">
                <div className="project-header">
                  <span className="project-number">0{index + 1}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-outcome"><span>Outcome</span><p>{project.outcome}</p></div>
                <div className="project-technologies" aria-label="Technologies used">
                  {project.technologies.map((technology) => <span key={technology} className="tech-tag">{technology}</span>)}
                </div>
                {(project.liveLink || project.githubLink) && (
                  <div className="project-links">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link project-link--live">
                        <ExternalLink size={16} /><span>Live Demo</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link project-link--github">
                        <Github size={16} /><span>Code</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
