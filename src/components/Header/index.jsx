import React, { Component } from 'react';
import resume from './Surya.pdf'; // Import resume PDF
import logo from './logo.svg'; // Import logo SVG
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
                    <img className="site-logo" src={logo} alt="logo" />
                </a>
                <div className={`overlay ${hamburgerClicked ? "" : "burger-data"} ${makeBlur ? "" : "hider"}`}>
                    <span className="closing" onClick={this.closeHam}>&times;</span>
                    <ul className="header-list overlay-content">
                        {/* <a href="#about" className="nav-things">
                            <li className="header-content about">About</li>
                        </a> */}
                        {/* <a href="#Education" className="nav-things">
                            <li className="header-content exp">Education</li>
                        </a> */}
                        <a href="#exp" className="nav-things">
                            <li className="header-content exp">Experience</li>
                        </a>
                        <a href="#certifications" className="nav-things">
                            <li className="header-content work">Certifications</li>
                        </a>
                        <a href="#contact" className="nav-things">
                            <li className="header-content contact">Contact</li>
                        </a>
                        <li>
                            <a href={resume} target="_blank" rel="noreferrer">
                                <button className="btn resume">Resume</button>
                            </a>
                        </li>
                    </ul>
                </div>
                <span className={`burger ${hideHam ? "hamhider" : ""}`} onClick={this.hamClicked}>&#9776;</span>
            </div>
        );
    }
}

export default Header;
