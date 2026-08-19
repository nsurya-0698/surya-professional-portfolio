import proPic from './Image.png';
import './index.css';

const Hero = () => {
  return (
    <section className="opening-container" id="home">
      <div className="opening-content">
        <p className="intro animate-fade-up">Hi, my name is</p>
        <h1 className="name-header animate-slide-left">Surya Teja Nammi</h1>
        <h2 className="passion-header animate-slide-right">Building Reliable AI & Cloud Platforms</h2>
        <div className="main-content-wrapper">
          <div className="text-content animate-fade-up">
            <p className="statement">
              Software engineer building AI applications, cloud-native backend services, and production platforms across OCI, AWS, and Azure.
              I focus on dependable delivery spanning APIs, deployment automation, testing, observability, security, and operational readiness.
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
