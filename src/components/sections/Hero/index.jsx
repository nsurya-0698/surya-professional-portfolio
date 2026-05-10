import proPic from './Image.png';
import './index.css';

const Hero = () => {
  return (
    <section className="opening-container" id="home">
      <div className="opening-content">
        <p className="intro animate-fade-up">Hi, my name is</p>
        <h1 className="name-header animate-slide-left">Surya Teja Nammi</h1>
        <h2 className="passion-header animate-slide-right">Architecting Scalable Cloud & Full-Stack Solutions</h2>
        <div className="main-content-wrapper">
          <div className="text-content animate-fade-up">
            <p className="statement">
              AWS-Certified Full Stack Developer with 5+ years of experience building enterprise-grade solutions for healthcare and fintech domains.
              I specialize in Spring Boot microservices, Angular and React applications, and cloud-native architectures on AWS, Azure, and OCI.
            </p>
            <a href="#contact" className="get-in-touch hover-lift animate-glow">
              Let&apos;s Talk
            </a>
          </div>
          <div className="personal-image-container animate-fade-up">
            <img className="personalpic hover-scale animate-float" src={proPic} alt="Professional Headshot" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
