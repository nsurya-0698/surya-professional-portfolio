import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import resume from '../../../assets/documents/Surya.pdf';
import logo from '../../../assets/icons/logo.svg';
import { NAVIGATION_ITEMS } from '../../../constants/siteMeta';
import './index.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', isMenuOpen);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('nav-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  useEffect(() => {
    const sectionIds = ['home', ...NAVIGATION_ITEMS.map((item) => item.href.slice(1))];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: '-28% 0px -58%', threshold: [0.05, 0.25, 0.55] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`header-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <a className="site-logo-link" href="#home" aria-label="Go to home">
        <img className="site-logo hover-scale" src={logo} alt="Surya Teja Nammi — NST logo" />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
      >
        {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav
        id="primary-navigation"
        className={`header-nav ${isMenuOpen ? 'is-open' : ''}`}
        aria-label="Primary navigation"
      >
        <div className="nav-menu-ambient" aria-hidden="true"><span /><span /></div>
        <div className="nav-menu-intro">
          <span className="nav-menu-eyebrow">Navigate / Portfolio</span>
          <strong>AI Platform &amp; Backend Engineer</strong>
        </div>
        <ul className="header-list">
          {NAVIGATION_ITEMS.map((item, index) => (
            <li key={item.id} style={{ '--nav-order': index }}>
              <a
                className={`nav-things ${activeSection === item.href.slice(1) ? 'is-active' : ''}`}
                href={item.href}
                onClick={closeMenu}
              >
                <span className="nav-sequence" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="nav-label">{item.label}</span>
              </a>
            </li>
          ))}
          <li className="resume-list-item" style={{ '--nav-order': NAVIGATION_ITEMS.length }}>
            <a className="resume-link hover-lift" href={resume} target="_blank" rel="noreferrer">
              <span>View Resume</span><ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
