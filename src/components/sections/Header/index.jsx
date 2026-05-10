import { useCallback, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import resume from '../../../assets/documents/Surya.pdf';
import logo from '../../../assets/icons/logo.svg';
import { NAVIGATION_ITEMS } from '../../../constants/siteMeta';
import './index.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className={`header-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <a className="site-logo-link" href="#home" aria-label="Go to home">
        <img className="site-logo animate-float hover-scale" src={logo} alt="Surya Teja Nammi logo" />
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
        <ul className="header-list">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.id}>
              <a className="nav-things" href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a className="resume-link hover-lift" href={resume} target="_blank" rel="noreferrer">
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
