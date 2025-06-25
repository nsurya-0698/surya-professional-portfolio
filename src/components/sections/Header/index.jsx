import React, { Component } from 'react';
import resume from '../../../assets/documents/Surya.pdf'; // Import resume PDF
import logo from '../../../assets/icons/logo.svg'; // Import logo SVG
import './index.css';

class Header extends Component {
    state = {
        hamburgerClicked: false,
        makeBlur: true,
        hideHam: false,
        prevPos: window.pageYOffset,
        topVal: 0
    };

    hamClicked = () => {
        this.setState({ hamburgerClicked: true, makeBlur: false, hideHam: true });
    };

    closeHam = () => {
        this.setState({ hamburgerClicked: false, makeBlur: true, hideHam: false });
    };

    scrolled = event => {
        console.log('scrolled');
    };

    render() {
        const { hamburgerClicked, makeBlur, hideHam, topVal } = this.state;

        return (
            <div className={`header-container ${topVal !== 0 ? 'updatetop' : ''}`} onScroll={this.scrolled}>
                <a href="https://nsurya-0698.github.io/surya-professional-portfolio/">
                    <img className="site-logo animate-float hover-scale" src={logo} alt="logo" />
                </a>
                <div className={`overlay ${hamburgerClicked ? "" : "burger-data"} ${makeBlur ? "" : "hider"}`}>
                    <span className="closing animate-fade-up" onClick={this.closeHam}>&times;</span>
                    <ul className="header-list overlay-content">
                        {/* <a href="#about" className="nav-things">
                            <li className="header-content about">About</li>
                        </a> */}
                        {/* <a href="#Education" className="nav-things">
                            <li className="header-content exp">Education</li>
                        </a> */}
                        <a href="#exp" className="nav-things">
                            <li className="header-content exp animate-slide-left hover-glow">Experience</li>
                        </a>
                        <a href="#certifications" className="nav-things">
                            <li className="header-content work animate-slide-left hover-glow">Certifications</li>
                        </a>
                        <a href="#projects" className="nav-things">
                            <li className="header-content projects animate-slide-left hover-glow">Projects</li>
                        </a>
                        <a href="#contact" className="nav-things">
                            <li className="header-content contact animate-slide-left hover-glow">Contact</li>
                        </a>
                        <li>
                            <a href={resume} target="_blank" rel="noreferrer">
                                <button className="btn resume animate-slide-right hover-lift animate-glow">Resume</button>
                            </a>
                        </li>
                    </ul>
                </div>
                <span className={`burger ${hideHam ? "hamhider" : ""} animate-pulse`} onClick={this.hamClicked}>&#9776;</span>
            </div>
        );
    }
}

export default Header;
