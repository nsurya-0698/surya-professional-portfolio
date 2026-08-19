import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import './index.css';

const PROJECTS = [
  {
    id: 1,
    title: 'GenAI Chat Application',
    description:
      'An intelligent chat application powered by large language models, real-time conversations, and context-aware responses.',
    technologies: ['Python', 'OpenAI API', 'React.js', 'WebSocket', 'AI/ML'],
    githubLink: 'https://github.com/nsurya-0698/genAI-with-Large-Language-Models',
    category: 'AI/ML',
  },
  {
    id: 2,
    title: 'NxtTrendz E-Commerce',
    description:
      'A full-stack e-commerce platform with authentication, product browsing, cart workflows, and payment-oriented checkout patterns.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    liveLink: 'https://nxttrendz.ccbp.tech/',
    githubLink: 'https://github.com/nsurya-0698/nxttrendz',
    category: 'Full-Stack',
  },
  {
    id: 3,
    title: 'AI-Powered Yoga Instructor',
    description:
      'A virtual yoga instructor concept using AI and computer vision to provide posture feedback and personalized routines.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'React.js', 'Pose Estimation'],
    category: 'AI/ML',
    status: 'In progress',
  },
  {
    id: 4,
    title: 'LLM-Based Health Q&A Bot',
    description:
      'A health and wellness Q&A assistant concept using fine-tuned language models, FastAPI services, and retrieval workflows.',
    technologies: ['Python', 'HuggingFace', 'FastAPI', 'React.js', 'LangChain'],
    category: 'AI/ML',
    status: 'In progress',
  },
  {
    id: 5,
    title: 'Personalized Yoga Plan Generator',
    description:
      'A plan generator concept that adapts yoga routines based on user goals, preferences, and ongoing feedback.',
    technologies: ['Python', 'OpenAI API', 'React.js', 'Node.js'],
    category: 'AI/ML',
    status: 'In progress',
  },
];

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === PROJECTS.length - 1 ? 0 : prevIndex + 1
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsPaused(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === PROJECTS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? PROJECTS.length - 1 : prevIndex - 1
    );
  };

  const currentProject = PROJECTS[currentIndex];
  const hasLiveLink = Boolean(currentProject.liveLink);
  const hasGithubLink = Boolean(currentProject.githubLink);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-heading">
          <span className="section-heading__line" />
          Personal Projects
          <span className="section-heading__line" />
        </h2>

        <div className="projects-content">
          <div className="project-navigation">
            <button
              className="project-nav-button"
              type="button"
              onClick={prevProject}
              aria-label="Previous project"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="project-counter" aria-label={`Project ${currentIndex + 1} of ${PROJECTS.length}`}>
              <span className="project-current-number">{currentIndex + 1}</span>
              <span className="project-separator">/</span>
              <span className="project-total-number">{PROJECTS.length}</span>
            </div>

            <button
              className="project-nav-button"
              type="button"
              onClick={nextProject}
              aria-label="Next project"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="project-card-container">
            <article
              className="project-card"
              ref={cardRef}
              onClick={() => setIsPaused(true)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="project-details">
                <div className="project-header">
                  <h3 className="project-title">{currentProject.title}</h3>
                  <span className="project-category">{currentProject.category}</span>
                </div>

                <p className="project-description">{currentProject.description}</p>

                <div className="project-technologies" aria-label="Technologies used">
                  {currentProject.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {currentProject.status && (
                  <p className="project-status">{currentProject.status}</p>
                )}

                {(hasLiveLink || hasGithubLink) && (
                  <div className="project-links">
                    {hasLiveLink && (
                      <a
                        href={currentProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link project-link--live"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {hasGithubLink && (
                      <a
                        href={currentProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link project-link--github"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          </div>

          <div className="project-indicators">
            {PROJECTS.map((project, index) => (
              <button
                key={project.id}
                className={`project-indicator ${index === currentIndex ? 'active' : ''}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
