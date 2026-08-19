import { SITE_META, SOCIAL_LINKS } from '../constants/siteMeta.js';

// Keep this curated profile context in sync with the visible portfolio sections.
// Add new jobs, projects, skills, or certifications here when the portfolio grows.
export const ASSISTANT_SYSTEM_PROMPT = `You are the AI assistant on Surya's personal portfolio website. Your job is to help recruiters, hiring managers, and visitors understand Surya's professional background using only the provided portfolio and resume context. Answer in a polished, concise, confident, and professional tone. Focus on Surya's skills, experience, projects, strengths, and fit for roles. Do not invent facts. If something is not in the context, say that it is not listed in the portfolio and suggest a relevant follow-up. Keep answers easy to scan. When useful, use short bullets. Always invite one helpful follow-up question at the end. Do not discuss unrelated topics.`;

export const SUGGESTED_QUESTIONS = [
  'What does Surya do?',
  'Top skills',
  'Is he a good hire?',
  'Projects',
  'Contact Surya',
];

export const PROFILE_KNOWLEDGE = {
  name: SITE_META.author,
  title: 'AI Platform & Backend Software Engineer',
  summary:
    'Surya Teja Nammi is a senior software engineer with 6+ years of experience building AI applications, cloud-native backend services, and enterprise platforms across OCI, AWS, and Azure. He brings end-to-end ownership spanning system development, deployment automation, integration and canary testing, observability, security, and production reliability.',
  strengths: [
    'Backend engineering with Java, Spring Boot, REST, gRPC, JDBC, SQL, and production debugging.',
    'Cloud-native delivery across AWS, Azure, and Oracle Cloud Infrastructure.',
    'Agentic engineering with LLM orchestration, RAG, MCP, Codex skills, agent workflows, prompt engineering, and tool integration.',
    'Backend platform delivery with Java, Python, FastAPI, Helidon, Spring Boot, REST APIs, microservices, and event-driven systems.',
    'Healthcare and fintech domain experience with reliability, security, and high-quality production support.',
  ],
  skills: [
    'Java',
    'Python',
    'SQL',
    'JavaScript',
    'Shell scripting',
    'GenAI applications',
    'LLM orchestration',
    'RAG',
    'MCP',
    'Codex skills',
    'Agent workflows',
    'Prompt engineering',
    'Tool integration',
    'FastAPI',
    'Helidon',
    'Spring Boot',
    'REST APIs',
    'Microservices',
    'Event-driven systems',
    'OCI',
    'AWS',
    'Azure',
    'Kubernetes',
    'Docker',
    'API Gateway',
    'Infrastructure provisioning',
    'Jenkins',
    'Terraform',
    'GitHub/GitLab',
    'CI/CD',
    'Deployment automation',
    'Integration testing',
    'Canary testing',
    'OpenTelemetry',
    'Prometheus',
    'Grafana',
    'CloudWatch',
    'Alarms',
    'Log analysis',
    'RCA automation',
    'On-call readiness',
    'PostgreSQL',
    'SQL Server',
    'MySQL',
    'MongoDB',
    'Redis',
  ],
  experience: [
    {
      company: 'Oracle',
      role: 'Software Developer 3 - Generative AI',
      date: '11/2025 - Present',
      location: 'Tennessee, United States',
      summary:
        'Building and operationalizing Agent Gateway and Services, delivering WebSearch for Oracle\'s internal GenAI platform, and strengthening production reliability through metrics, alarms, dashboards, service probes, and release execution. Built Codex skills that correlate logs, alarm timelines, tickets, and code context to reduce on-call investigation time by approximately 70%, and automated local end-to-end integration testing across four dependent services.',
    },
    {
      company: 'Quest Diagnostics',
      role: 'Senior Software Engineer',
      date: '01/2025 - 10/2025',
      location: 'Virginia, United States',
      summary:
        'Developed Java, JDBC, and SQL Server lab instrument integration modules. Supported reliable data capture, bidirectional communication, WildFly deployments, ASTM and HL7 parsing, and clinical workflow production issues.',
    },
    {
      company: 'Optum - UnitedHealth Group',
      role: 'Software Development Engineer II',
      date: '01/2023 - 12/2024',
      location: 'Minnesota, United States',
      summary:
        'Led claim amount calculation microservices using Java Spring Boot, PostgreSQL, TensorFlow, Golang, REST/gRPC APIs, AWS, Docker, Kubernetes, EKS, ECS, CI/CD, and a team of five developers.',
    },
    {
      company: 'HDFC Bank Limited',
      role: 'Software Development Engineer',
      date: '05/2019 - 08/2021',
      location: 'Jodhpur, India',
      summary:
        'Built Java APIs with Spring Boot and MongoDB, deployed through Azure DevOps, implemented JWT access control with Spring Security, and supported CI/CD with Jenkins, Terraform, Prometheus, Grafana, and database optimization.',
    },
    {
      company: 'Paytm',
      role: 'Associate Software Engineer',
      date: '02/2019 - 05/2020',
      location: 'Hyderabad, India',
      summary:
        'Designed, tested, and debugged Java applications using MySQL, Spring Boot, Kubernetes, Docker, and Gradle. Improved transaction reliability, supported Agile delivery, and optimized data pipelines.',
    },
  ],
  education: [
    {
      school: 'University of Missouri - Kansas City',
      degree: 'Master of Science in Computer Science',
      date: '08/2021 - 12/2022',
      details:
        'Graduate coursework in cloud computing, artificial intelligence, machine learning, data structures, algorithms, and advanced software engineering. GPA: 3.5/4.0.',
    },
    {
      school: 'Aditya Engineering University',
      degree: 'Bachelor of Technology in Electrical and Electronics Engineering',
      date: '05/2015 - 06/2019',
      details:
        'Undergraduate foundation in circuits, electronics, control systems, and electrical machines, with introductory computer science coursework in C programming, data structures, and software fundamentals.',
    },
  ],
  certifications: [
    {
      title: 'AWS Certified Solutions Architect - Associate',
      detail: 'Designed resilient cloud architectures using EC2, VPC, S3, RDS, IAM, Lambda, API Gateway, CloudFormation, and CloudWatch.',
    },
    {
      title: 'Generative AI with Large Language Models',
      detail: 'Applied transformer architecture, prompt engineering, and model fine-tuning with Hugging Face FLAN-T5 and OpenAI APIs.',
    },
  ],
  projects: [
    {
      title: 'GenAI Chat Application',
      summary:
        'LLM-powered chat application with real-time conversations and context-aware responses.',
      technologies: ['Python', 'OpenAI API', 'React.js', 'WebSocket', 'AI/ML'],
      link: 'https://github.com/nsurya-0698/genAI-with-Large-Language-Models',
    },
    {
      title: 'NxtTrendz E-Commerce',
      summary:
        'Full-stack e-commerce platform with authentication, product browsing, cart workflows, and checkout-oriented patterns.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
      link: 'https://nxttrendz.ccbp.tech/',
    },
    {
      title: 'AI-Powered Yoga Instructor',
      summary:
        'AI and computer vision concept for posture feedback and personalized routines.',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'React.js', 'Pose Estimation'],
      status: 'In progress',
    },
    {
      title: 'LLM-Based Health Q&A Bot',
      summary:
        'Health and wellness Q&A assistant concept using language models, FastAPI, and retrieval workflows.',
      technologies: ['Python', 'HuggingFace', 'FastAPI', 'React.js', 'LangChain'],
      status: 'In progress',
    },
    {
      title: 'Personalized Yoga Plan Generator',
      summary:
        'Routine planning concept that adapts yoga plans based on user goals, preferences, and feedback.',
      technologies: ['Python', 'OpenAI API', 'React.js', 'Node.js'],
      status: 'In progress',
    },
  ],
  contact: {
    email: SITE_META.email,
    phone: SITE_META.phone,
    github: SOCIAL_LINKS.github.url,
    linkedin: SOCIAL_LINKS.linkedin.url,
    resume: 'Resume button in the portfolio header',
  },
};

const formatList = (items) => items.map((item) => `- ${item}`).join('\n');

export const PROFILE_CONTEXT = `
Name: ${PROFILE_KNOWLEDGE.name}
Title: ${PROFILE_KNOWLEDGE.title}
Summary: ${PROFILE_KNOWLEDGE.summary}

Strengths:
${formatList(PROFILE_KNOWLEDGE.strengths)}

Skills:
${formatList(PROFILE_KNOWLEDGE.skills)}

Experience:
${PROFILE_KNOWLEDGE.experience
  .map((item) => `- ${item.role}, ${item.company} (${item.date}, ${item.location}): ${item.summary}`)
  .join('\n')}

Education:
${PROFILE_KNOWLEDGE.education
  .map((item) => `- ${item.degree}, ${item.school} (${item.date}): ${item.details}`)
  .join('\n')}

Certifications:
${PROFILE_KNOWLEDGE.certifications
  .map((item) => `- ${item.title}: ${item.detail}`)
  .join('\n')}

Projects:
${PROFILE_KNOWLEDGE.projects
  .map((item) => `- ${item.title}: ${item.summary} Technologies: ${item.technologies.join(', ')}${item.status ? `. Status: ${item.status}` : ''}${item.link ? `. Link: ${item.link}` : ''}`)
  .join('\n')}

Contact:
- Email: ${PROFILE_KNOWLEDGE.contact.email}
- Phone: ${PROFILE_KNOWLEDGE.contact.phone}
- GitHub: ${PROFILE_KNOWLEDGE.contact.github}
- LinkedIn: ${PROFILE_KNOWLEDGE.contact.linkedin}
- Resume: ${PROFILE_KNOWLEDGE.contact.resume}
`.trim();
