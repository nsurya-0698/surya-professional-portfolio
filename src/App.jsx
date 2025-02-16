import React from 'react';
import { VscGithubAlt } from 'react-icons/vsc';
import { FiLinkedin } from 'react-icons/fi';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Certifications from './components/Certifications';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <div className="social-icons-container">
          <a href="https://github.com/nsurya-0698" target="_blank" rel="noopener noreferrer">
            <VscGithubAlt className="social-icons git" />
          </a>
          <a href="https://www.linkedin.com/in/tejanammi/" target="_blank" rel="noopener noreferrer">
            <FiLinkedin className="social-icons linkedin" />
          </a>
          <span className="v-line"></span>
        </div>
        <div className="content-container">
          <Header />
          <Main />
          <Experience />
          <Certifications />
          <Contact />
          <Footer />
        </div>
        <div className="mail-container">
          <a className="mail-anchor" href="mailto:tejanammim1@gmail.com">
            <p className="mail">nammiteja087@gmai.com</p>
          </a>
          <span className="v-line"></span>
        </div>
      </div>
    </div>
  );
}

export default App