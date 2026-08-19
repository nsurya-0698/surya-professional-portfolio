import { Suspense, lazy, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import { SOCIAL_LINKS, SITE_META } from './constants/siteMeta';

import './styles/variables.css';
import './App.css';

const Header = lazy(() => import('./components/sections/Header'));
const Hero = lazy(() => import('./components/sections/Hero'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Appreciations = lazy(() => import('./components/sections/Appreciations'));
const PersonalAssistantChat = lazy(() => import('./components/interactive/PersonalAssistantChat'));
const SkillsMatrix = lazy(() => import('./components/sections/SkillsMatrix'));

const RevealShell = ({ children }) => <div className="reveal-shell">{children}</div>;

const LoadingSpinner = () => (
  <div className="loading-spinner" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true" />
    <p>Loading portfolio...</p>
  </div>
);

const HashScroller = () => {
  useEffect(() => {
    let observer;
    let timeoutId;
    const previousScrollRestoration = window.history.scrollRestoration;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const clearPendingScroll = () => {
      observer?.disconnect();
      observer = undefined;

      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const scrollToHash = (behavior = 'auto') => {
      clearPendingScroll();

      const targetId = window.location.hash.slice(1);

      if (!targetId) {
        return;
      }

      const keepTargetAnchored = (targetElement) => {
        targetElement.scrollIntoView({ behavior, block: 'start' });

        window.requestAnimationFrame(() => {
          targetElement.scrollIntoView({ behavior, block: 'start' });
        });

        timeoutId = window.setTimeout(() => {
          targetElement.scrollIntoView({ behavior, block: 'start' });
          timeoutId = undefined;
        }, 250);
      };

      const scrollWhenReady = () => {
        const targetElement = document.getElementById(decodeURIComponent(targetId));

        if (targetElement) {
          if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = undefined;
          }

          keepTargetAnchored(targetElement);
          return true;
        }

        return false;
      };

      if (scrollWhenReady()) {
        return;
      }

      observer = new MutationObserver(() => {
        if (scrollWhenReady()) {
          observer?.disconnect();
          observer = undefined;
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
      timeoutId = window.setTimeout(clearPendingScroll, 4000);
    };

    scrollToHash();

    const handleHashChange = () => scrollToHash('smooth');
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearPendingScroll();
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
};

function App() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { rootMargin: '0px 0px -12%', threshold: 0.08 }
    );

    const observeRevealElements = () => {
      document.querySelectorAll('.reveal-shell:not([data-reveal-ready])').forEach((element) => {
        element.dataset.revealReady = 'true';
        revealObserver.observe(element);
      });
    };

    observeRevealElements();
    const revealMutationObserver = new MutationObserver(observeRevealElements);
    revealMutationObserver.observe(document.body, { childList: true, subtree: true });

    const updateScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty('--page-progress', progress);
    };
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    return () => {
      revealObserver.disconnect();
      revealMutationObserver.disconnect();
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="App">
          <div className="page-progress" aria-hidden="true" />
          <div className="cinematic-backdrop" aria-hidden="true"><span /><span /><span /></div>
          <div className="main-container">
            <div className="social-icons-container">
              <a 
                href={SOCIAL_LINKS.github.url}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.github.label}
              >
                <Github className="social-icons git" aria-hidden="true" />
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.linkedin.label}
              >
                <Linkedin className="social-icons linkedin" aria-hidden="true" />
              </a>
              <span className="v-line" aria-hidden="true" />
            </div>

            <div className="content-container">
              <Suspense fallback={<LoadingSpinner />}>
                <Header />
                <Hero />
                <RevealShell><Projects /></RevealShell>
                <RevealShell><Experience /></RevealShell>
                <RevealShell><SkillsMatrix /></RevealShell>
                <RevealShell><Certifications /></RevealShell>
                <RevealShell><Appreciations /></RevealShell>
                <RevealShell><Contact /></RevealShell>
                <Footer />
                <PersonalAssistantChat />
                <HashScroller />
              </Suspense>
            </div>

            <div className="mail-container">
              <a 
                className="mail-anchor" 
                href={SOCIAL_LINKS.email.url}
                aria-label={SOCIAL_LINKS.email.label}
              >
                <p className="mail">{SITE_META.email}</p>
              </a>
              <span className="v-line" aria-hidden="true" />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
