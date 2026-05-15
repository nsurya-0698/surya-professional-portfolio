import { ArrowRight, CheckCircle2, Code2, GraduationCap, Mail, MessageCircle } from 'lucide-react';
import { SERVICES, contactEmail, whatsappMessage, whatsappNumber } from '../../../data/services.js';
import './index.css';

const serviceIcons = {
  code: Code2,
  career: GraduationCap,
};

const emailSubject = encodeURIComponent('Guidance Inquiry from Portfolio');
const encodedWhatsappMessage = encodeURIComponent(whatsappMessage);
const emailHref = `mailto:${contactEmail}?subject=${emailSubject}`;
const whatsappAppHref = `whatsapp://send?phone=${whatsappNumber}&text=${encodedWhatsappMessage}`;
const whatsappWebHref = `https://wa.me/${whatsappNumber}?text=${encodedWhatsappMessage}`;

const ServiceCard = ({ service, index }) => {
  const Icon = serviceIcons[service.icon] || Code2;

  return (
    <article className="service-card animate-fade-up" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="service-card__topline">
        <span className="service-card__icon" aria-hidden="true">
          <Icon size={24} />
        </span>
        <span className="service-card__number">0{index + 1}</span>
      </div>

      <h3>{service.title}</h3>
      <p>{service.description}</p>

      <ul className="service-highlights" aria-label={`${service.title} highlights`}>
        {service.highlights.map((highlight) => (
          <li key={highlight}>
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <a className="service-card__cta" href="#contact" aria-label={`${service.cta} through contact section`}>
        {service.cta}
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
};

const ServicesSection = () => {
  const handleWhatsAppClick = (event) => {
    event.preventDefault();

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );

    if (isMobileDevice) {
      window.location.assign(whatsappAppHref);
      return;
    }

    const whatsappWindow = window.open(whatsappWebHref, '_blank');

    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }
  };

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div className="services-heading-block animate-fade-up">
          <h2 className="section-heading">
            <span className="section-heading__line" />
            Ways I Can Help
            <span className="section-heading__line" />
          </h2>
          <p>
            I occasionally share guidance and feedback to help people improve their digital presence and grow
            with more clarity in tech.
          </p>
          <p className="services-note">
            This section is for informal, non-commercial guidance only. It is not a paid service offering,
            freelance business, or consulting solicitation.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="services-cta animate-fade-up">
          <div>
            <span className="services-cta__eyebrow">Informal support</span>
            <h3>Have a question or need direction?</h3>
            <p>
              If you are looking for general feedback on a portfolio, website idea, resume, or IT career path,
              feel free to reach out. This is informal and non-commercial.
            </p>
          </div>

          <div className="services-cta__actions">
            <a className="services-action services-action--email" href={emailHref}>
              <Mail size={18} aria-hidden="true" />
              Email Me
            </a>
            <a
              className="services-action services-action--whatsapp"
              href={whatsappWebHref}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Surya on WhatsApp at 585-466-4111"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
