import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import './index.css';

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "GenAI Chat Application",
      description: "An intelligent chat application powered by large language models, featuring real-time conversations and context-aware responses. Built with Python, OpenAI API, and React.js.",
      technologies: ["Python", "OpenAI API", "React.js", "WebSocket", "AI/ML"],
      liveLink: "#",
      githubLink: "https://github.com/nsurya-0698/genAI-with-Large-Language-Models",
      category: "AI/ML"
    },
    {
      id: 2,
      title: "NxtTrendz E-Commerce",
      description: "A full-stack e-commerce platform built with React.js and Node.js. Features include user authentication, product catalog, shopping cart, and payment integration.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      liveLink: "https://nxttrendz.ccbp.tech/",
      githubLink: "https://github.com/nsurya-0698/nxttrendz",
      category: "Full-Stack"
    },
    {
      id: 3,
      title: "AI-Powered Yoga Instructor",
      description: "A virtual yoga instructor that uses AI and computer vision to provide real-time feedback and personalized routines. Under Progress.",
      technologies: ["Python", "TensorFlow", "OpenCV", "React.js", "LLM", "Pose Estimation", "WebRTC"],
      liveLink: "#",
      githubLink: "#",
      category: "AI/ML"
    },
    {
      id: 4,
      title: "LLM-Based Health Q&A Bot",
      description: "A chatbot that answers health and wellness questions using a fine-tuned large language model. Under Progress.",
      technologies: ["Python", "HuggingFace Transformers", "FastAPI", "React.js", "LLM", "LangChain"],
      liveLink: "#",
      githubLink: "#",
      category: "AI/ML"
    },
    {
      id: 5,
      title: "Personalized Yoga Plan Generator (LLM)",
      description: "Generates personalized yoga plans based on user goals and feedback, powered by LLMs. Under Progress.",
      technologies: ["Python", "OpenAI API", "React.js", "LLM", "Node.js"],
      liveLink: "#",
      githubLink: "#",
      category: "AI/ML"
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change project every 3 seconds
    return () => clearInterval(interval);
  }, [projects.length]);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">
          <div className="title-icon" />
          Projects
          <div className="title-icon" />
        </h2>

        <div className="projects-content">
          <div className="project-navigation">
            <button 
              className="nav-button prev" 
              onClick={prevProject}
              aria-label="Previous Project"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="project-counter">
              <span className="current-number">{currentIndex + 1}</span>
              <span className="separator">/</span>
              <span className="total-number">{projects.length}</span>
            </div>

            <button 
              className="nav-button next" 
              onClick={nextProject}
              aria-label="Next Project"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="project-card-container">
            <div className="project-card">
              <div className="project-details">
                <div className="project-header">
                  <h3 className="project-title">{currentProject.title}</h3>
                  <span className="project-category">{currentProject.category}</span>
                </div>
                
                <p className="project-description">{currentProject.description}</p>
                
                <div className="project-technologies">
                  {currentProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
          </span>
                  ))}
                </div>
                {currentProject.liveLink === "#" && currentProject.githubLink === "#" && (
                  <div className="project-status" style={{marginTop: '18px', color: '#ffb347', fontWeight: 600}}>
                    Under Progress
        </div>
                )}
                <div className="project-links" style={{marginTop: '24px'}}>
        <a
                    href={currentProject.liveLink} 
          target="_blank"
          rel="noopener noreferrer"
                    className="project-link live"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
            </a>
            <a
                    href={currentProject.githubLink} 
              target="_blank"
              rel="noopener noreferrer"
                    className="project-link github"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="project-indicators">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
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

/* <a className="link-color" href="https://nxttrendz.netlify.app/" target="_blank" rel="noopener noreferrer">
                        <img className="project-image" src={require('./Main-project-image.png').default} alt="ProjectImage"/>
                    </a>
                </div>
                <div className="main-project-content">
                    <p className="featured-project-header">Featured Project</p>
                    <p><b>nxtTrendz</b></p>
                    <p className="project-exp">An E-commerce website where you can find all you need from grocories and fashion. 
                            A one way stop to get all your daily needs done which makes your life easier.<br/>
                            id:rahul  password:rahul@2021</p>
                    <span>
                        <a className="link-color" href="https://github.com/naveenM6/NxtTrendz" target="_blank" rel="noopener noreferrer">
                            {<FiGithub className='trendz-links'/>} 
                        </a>
                        <a className="link-color" href="https://nxttrendz.netlify.app/" target="_blank" rel="noopener noreferrer">
                            {<FiExternalLink className='trendz-links'/>}
                        </a>
                    </span> */
