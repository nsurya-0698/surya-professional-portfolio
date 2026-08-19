import './index.css';

const SKILL_GROUPS = [
  { name: 'AI & Application Engineering', skills: ['GenAI applications', 'LLM orchestration', 'WebSearch', 'RAG', 'Prompt engineering'] },
  { name: 'Backend & APIs', skills: ['Java', 'Python', 'Spring Boot', 'FastAPI', 'Helidon', 'REST APIs', 'Microservices'] },
  { name: 'Cloud & Infrastructure', skills: ['OCI', 'AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform'] },
  { name: 'Reliability & Delivery', skills: ['CI/CD', 'Canary testing', 'Integration testing', 'Load testing', 'On-call readiness'] },
  { name: 'Observability & Data', skills: ['OpenTelemetry', 'Prometheus', 'Grafana', 'CloudWatch', 'SQL Server', 'PostgreSQL', 'MongoDB'] },
  { name: 'Security & Engineering Practice', skills: ['IAM', 'JWT', 'KMS', 'Security remediation', 'Compliance', 'Cross-functional delivery'] },
];

const SkillsMatrix = () => (
  <section id="skills" className="skills-matrix-section">
    <h2 className="section-heading">
      <span className="section-heading__line" />
      Technical Expertise
      <span className="section-heading__line" />
    </h2>
    <div className="skills-grid">
      {SKILL_GROUPS.map((group) => (
        <article className="skill-card" key={group.name}>
          <h3>{group.name}</h3>
          <div className="skill-tags" aria-label={`${group.name} skills`}>
            {group.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default SkillsMatrix;
