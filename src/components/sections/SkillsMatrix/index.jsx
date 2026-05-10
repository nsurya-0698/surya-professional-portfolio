import './index.css';

const SKILLS = [
  { name: 'Java', confidence: 95 },
  { name: 'JavaScript', confidence: 94 },
  { name: 'Spring Boot', confidence: 93 },
  { name: 'React', confidence: 92 },
  { name: 'Python', confidence: 90 },
  { name: 'SQL', confidence: 89 },
  { name: 'AWS', confidence: 88 },
  { name: 'Docker', confidence: 87 },
  { name: 'Node.js', confidence: 85 },
  { name: 'Kubernetes', confidence: 80 },
  { name: 'AI/LLM Research', confidence: 70 },
];

const SkillsMatrix = () => {
  return (
    <section id="skills" className="skills-matrix-section">
      <h2 className="section-heading">
        <span className="section-heading__line" />
        Top Skills
        <span className="section-heading__line" />
      </h2>

      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <article className="skill-card" key={skill.name}>
            <div className="skill-card-header">
              <h3>{skill.name}</h3>
              <span>{skill.confidence}%</span>
            </div>
            <div className="skill-meter" aria-hidden="true">
              <span style={{ width: `${skill.confidence}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SkillsMatrix;
