import { ExternalLink, Github } from 'lucide-react';
import './index.css';

const PROJECTS = [
  {
    id: 1,
    title: 'GenAI Chat Application',
    description: 'Built a conversational AI application with large language model integration, real-time messaging, and context-aware response workflows.',
    technologies: ['Python', 'OpenAI API', 'React.js', 'WebSocket', 'LLM'],
    githubLink: 'https://github.com/nsurya-0698/genAI-with-Large-Language-Models',
    category: 'AI Engineering',
  },
  {
    id: 2,
    title: 'AI Platform Delivery & Reliability',
    description: 'Developed reusable deployment checks, service probes, integration and canary tests, metrics, alarms, and dashboards for production AI platform readiness.',
    technologies: ['OCI', 'Java', 'Python', 'Integration Testing', 'Observability'],
    category: 'Platform Engineering',
  },
  {
    id: 3,
    title: 'NxtTrendz E-Commerce',
    description: 'Created a responsive e-commerce experience with secure authentication, product discovery, filtering, cart workflows, and protected routes.',
    technologies: ['React.js', 'REST APIs', 'JWT', 'CSS', 'Responsive Design'],
    liveLink: 'https://nxttrendz.ccbp.tech/',
    githubLink: 'https://github.com/nsurya-0698/nxttrendz',
    category: 'Full-Stack',
  },
];

function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-heading">
          <span className="section-heading__line" />
          Selected Work
          <span className="section-heading__line" />
        </h2>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-details">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
                <p className="project-description">{project.description}</p>
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
