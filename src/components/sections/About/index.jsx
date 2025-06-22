import React from 'react';
import proPic from './ProffPic.jpeg';
import './index.css';

const About = () => {
    return (
        <div className="about-container" id="about">
            <h1 className="about-header">About Me</h1>
            <div className="about-content-wrapper">
                <div className="about-content">
                    <p className="about-content-one">
                        My expertise in technology stems from a deep-rooted passion for innovation and problem-solving. I've extensively explored programming languages, cloud platforms, and software development methodologies, forging a solid understanding of the tech landscape.                    
                    </p>
                    <p className="about-content-two">
                        Throughout my career, I've refined my skills across various technologies, from developing robust J2EE web services to deploying RESTful services. Hands-on experience at Optum - UHG and iB Hubs - NxtWave has equipped me with the adaptability and expertise to thrive in dynamic environments, consistently delivering impactful solutions.
                    </p>
                </div>
                <div className="personal-image-container">
                    <img className="personalpic" src={proPic} alt="PersonalPic" />
                </div>
            </div>
        </div>
    );
}

export default About;
