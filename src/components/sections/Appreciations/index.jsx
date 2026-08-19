import { Quote, Users } from 'lucide-react';
import './index.css';

const APPRECIATIONS = [
  {
    id: 1,
    name: 'Katie Ruiz and Patrick Thomas',
    role: 'Senior Manager and Lead Engineer',
    company: 'Quest Diagnostics',
    feedback:
      'Surya’s dedication on the Elisa project has been outstanding. His prompt responses, self-motivation, and ability to stay on top of every detail have been a huge asset. Both Patrick and I truly value his contributions and appreciate the quality he brings to the team.',
    category: 'Reliability & Ownership',
  },
  {
    id: 2,
    name: 'Keith Chan',
    role: 'Director of IT',
    company: 'Optum Global Solutions',
    feedback:
      'Surya’s ability to understand business requirements and translate them into technical solutions is remarkable. He is proactive in learning new technologies, shares his knowledge generously, and brings strong AI/ML and full-stack engineering expertise to the team.',
    category: 'Technical Excellence',
  },
];

const Appreciations = () => {
  return (
    <section id="appreciations" className="appreciations-section">
      <div className="appreciations-container">
        <h2 className="section-heading">
          <span className="section-heading__line" />
          <Users size={24} className="section-heading__icon" aria-hidden="true" />
          Professional Feedback
          <span className="section-heading__line" />
        </h2>

        <div className="appreciations-grid">
          {APPRECIATIONS.map((appreciation) => (
            <article className="appreciation-card" key={appreciation.id}>
              <Quote className="quote-icon" size={32} aria-hidden="true" />

              <p className="feedback-text">&ldquo;{appreciation.feedback}&rdquo;</p>

              <div className="person-info">
                <div className="person-details">
                  <h3 className="person-name">{appreciation.name}</h3>
                  <p className="person-role">{appreciation.role}</p>
                  <p className="person-company">{appreciation.company}</p>
                </div>

                <div className="category-badge">
                  {appreciation.category}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Appreciations;
