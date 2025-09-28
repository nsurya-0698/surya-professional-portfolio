import React, { Suspense, lazy } from 'react';
import { VscGithubAlt } from 'react-icons/vsc';
import { FiLinkedin } from 'react-icons/fi';

// Import our modern architecture components
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';

// Import styles
import './styles/variables.css';
import './App.css';

// Lazy load components for better performance
const Header = lazy(() => import('./components/sections/Header'));
const Hero = lazy(() => import('./components/sections/Hero'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Appreciations = lazy(() => import('./components/sections/Appreciations'));
const BackgroundMusic = lazy(() => import('./components/interactive/BackgroundMusic'));
const SkillsMatrix = lazy(() => import('./components/sections/SkillsMatrix'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

/**
 * Modern App Component
 * Demonstrates:
 * - Theme management with Context API
 * - Error boundaries for production-ready error handling
 * - Code splitting with lazy loading
 * - Performance optimization with Suspense
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="App">
          <BackgroundMusic />
          <div className="main-container">
            {/* Social Icons Sidebar */}
            <div className="social-icons-container">
              <a 
                href="https://github.com/nsurya-0698" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <VscGithubAlt className="social-icons git" />
              </a>
              <a 
                href="https://www.linkedin.com/in/tejanammi/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <FiLinkedin className="social-icons linkedin" />
              </a>
              <span className="v-line"></span>
            </div>

            {/* Main Content */}
            <div className="content-container">
              <Suspense fallback={<LoadingSpinner />}>
                <Header />
                <Hero />
                <Experience />
                <Certifications />
                <Projects />
                <Appreciations />
                <SkillsMatrix />
                <Contact />
                <Footer />
              </Suspense>
            </div>

            {/* Email Sidebar */}
            <div className="mail-container">
              <a 
                className="mail-anchor" 
                href="mailto:tejanammim1@gmail.com"
                aria-label="Send Email"
              >
                <p className="mail">nammiteja087@gmail.com</p>
              </a>
              <span className="v-line"></span>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;