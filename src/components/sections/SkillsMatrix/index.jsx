import './index.css';

const SKILL_GROUPS = [
  { name: 'Languages', skills: ['Java', 'Python', 'SQL', 'JavaScript', 'Shell scripting'] },
  { name: 'AI & Agentic Engineering', skills: ['GenAI applications', 'LLM orchestration', 'RAG', 'MCP', 'Codex skills', 'Agent workflows', 'Prompt engineering', 'Tool integration'] },
  { name: 'Backend & Architecture', skills: ['FastAPI', 'Helidon', 'Spring Boot', 'REST APIs', 'Microservices', 'Event-driven systems'] },
  { name: 'Cloud & Platform', skills: ['OCI', 'AWS', 'Azure', 'Kubernetes', 'Docker', 'API Gateway', 'Infrastructure provisioning'] },
  { name: 'Delivery & Automation', skills: ['Jenkins', 'Terraform', 'GitHub/GitLab', 'CI/CD', 'Deployment automation', 'Integration testing', 'Canary testing'] },
  { name: 'Observability & Incident Response', skills: ['OpenTelemetry', 'Prometheus', 'Grafana', 'CloudWatch', 'Alarms', 'Log analysis', 'RCA automation', 'On-call readiness'] },
  { name: 'Data', skills: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'Redis'] },
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
