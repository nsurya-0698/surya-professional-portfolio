import { Award, CheckCircle, Github } from 'lucide-react';
import certificate from '../../../assets/documents/AWS_Certified_Solutions_Architect.pdf';
import genaiBadge from '../../../assets/icons/genai-badge.svg';
import './index.css';

const CERTIFICATIONS = [
  {
    id: 'aws-solutions-architect',
    title: 'AWS Certified Solutions Architect - Associate',
    detail: 'Score: 965/1000',
    description:
      'Validated expertise in designing secure, resilient, and distributed applications with AWS technologies and architectural best practices.',
    badge: 'https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    badgeAlt: 'AWS Solutions Architect badge',
    links: [
      {
        label: 'View Certificate',
        href: certificate,
        icon: Award,
      },
    ],
  },
  {
    id: 'genai-llms',
    title: 'Generative AI with Large Language Models',
    detail: 'DeepLearning.AI & AWS',
    description:
      'Completed practical coursework in transformer architecture, prompt engineering, model evaluation, fine-tuning, and deployment patterns for LLM applications.',
    badge: genaiBadge,
    badgeAlt: 'Generative AI with Large Language Models badge',
    links: [
      {
        label: 'View Certificate',
        href: 'https://www.coursera.org/account/accomplishments/verify/5G0I2YX1E2H4?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
        icon: Award,
      },
      {
        label: 'GitHub',
        href: 'https://github.com/nsurya-0698/genAI-with-Large-Language-Models',
        icon: Github,
      },
    ],
  },
];

function Certifications() {
  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-container">
        <h2 className="section-heading">
          <span className="section-heading__line" />
          Certifications
          <Award className="section-heading__icon" size={26} aria-hidden="true" />
        </h2>

        <div className="certificates-grid">
          {CERTIFICATIONS.map((certification) => (
            <article className="certificate-card" key={certification.id}>
              <div className="certificate-image">
                <img
                  src={certification.badge}
                  alt={certification.badgeAlt}
                  className="badge-image"
                  loading="lazy"
                />
              </div>

              <div className="certificate-details">
                <h3>{certification.title}</h3>
                <div className="score">
                  <CheckCircle className="score-icon" aria-hidden="true" />
                  <span>{certification.detail}</span>
                </div>
                <p>{certification.description}</p>

                <div className="certificate-buttons">
                  {certification.links.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="certificate-link"
                      >
                        <span>{link.label}</span>
                        <LinkIcon className="certificate-link-icon" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
