import React from 'react';
import proPic from '../../../assets/images/ProffPic.jpeg';
import './index.css';

const Hero = () => {
    return (
        <div className="opening-container" id="home">
            <div className="opening-content">
                <p className="intro animate-fade-up">Hi, my name is</p>
                <h1 className="name-header animate-slide-left">Surya Teja Nammi</h1>
                <h1 className="passion-header animate-slide-right">Architecting Scalable Cloud & Full-Stack Solutions</h1>
                <div className="main-content-wrapper">
                    <div className="text-content animate-fade-up">
                        <p className="statement">
                        AWS-Certified Full Stack Developer with 6+ years of experience in building enterprise-grade solutions for healthcare and fintech domains. 
                        Specialized in Spring Boot microservices, Angular applications, and cloud-native architectures deployed on AWS/Azure. 
                        Proven success in optimizing system performance by 40%, reducing deployment times by 25% through CI/CD pipelines, 
                        and implementing real-time processing with Kafka/WebSockets. Certified AWS Solutions Architect with expertise in 
                        serverless computing (Lambda), containerization (Docker/Kubernetes), and event-driven architectures.
                        </p>
                        <a href="#contact" className="nav-things">
                            <button className="get-in-touch hover-lift animate-glow">Let's Talk</button>
                        </a>
                    </div>
                    <div className="personal-image-container animate-fade-up">
                        <img className="personalpic hover-scale animate-float" src={proPic} alt="Professional Headshot" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;