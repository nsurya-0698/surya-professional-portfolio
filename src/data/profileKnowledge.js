import { SITE_META, SOCIAL_LINKS } from '../constants/siteMeta.js';

// Keep this curated profile context in sync with the visible portfolio sections.
// Add new jobs, projects, skills, or certifications here when the portfolio grows.
export const ASSISTANT_SYSTEM_PROMPT = `You are the AI assistant on Surya's personal portfolio website. Your job is to help recruiters, hiring managers, and visitors understand Surya's professional background using only the provided portfolio and resume context. Answer in a polished, concise, confident, and professional tone. Focus on Surya's skills, experience, projects, strengths, and fit for roles. Do not invent facts. If something is not in the context, say that it is not listed in the portfolio and suggest a relevant follow-up. Keep answers easy to scan. When useful, use short bullets. Always invite one helpful follow-up question at the end. Do not discuss unrelated topics.`;

export const SUGGESTED_QUESTIONS = [
  'Tell me about Surya',
  'Top skills',
  'Projects',
  'Why hire him?',
  'Contact',
];

export const PROFILE_KNOWLEDGE = {
  name: SITE_META.author,
  title: 'AWS-Certified Full Stack Developer',
  summary:
    'Surya Teja Nammi is an AWS-Certified Full Stack Developer with 5+ years of experience building enterprise-grade software for healthcare, fintech, cloud, and AI-enabled applications. He specializes in Spring Boot microservices, React and Angular applications, backend APIs, cloud-native systems, and practical GenAI application development.',
  strengths: [
    'Backend engineering with Java, Spring Boot, REST, gRPC, JDBC, SQL, and production debugging.',
    'Cloud-native delivery across AWS, Azure, and Oracle Cloud Infrastructure.',
    'Full-stack product delivery with React, Angular, Node.js, APIs, authentication, and clean UI workflows.',
    'AI and GenAI application work involving OpenAI APIs, LLMs, FastAPI, prompt engineering, and evaluation concepts.',
    'Healthcare and fintech domain experience with reliability, security, and high-quality production support.',
  ],
  skills: [
    'Java',
    'JavaScript',
    'Spring Boot',
    'React',
    'Python',
    'SQL',
    'AWS',
    'Docker',
    'Node.js',
    'Kubernetes',
    'AI/LLM Research',
    'FastAPI',
    'Helidon',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Azure DevOps',
    'Jenkins',
    'Terraform',
    'Prometheus',
    'Grafana',
  ],
  experience: [
    {
      company: 'Oracle - OCI',
      role: 'Senior Member of Technical Staff',
      date: '11/2025 - Present',
      location: 'Nashville, Tennessee, United States',
      summary:
        'Designing and developing a large-scale enterprise chat application for Generative AI experiences across Oracle. Building backend systems in Python, migration paths to Java, APIs with FastAPI, Helidon, and modern Java frameworks, and reliable services on Oracle Cloud Infrastructure.',
    },
    {
      company: 'Quest Diagnostics',
      role: 'Senior Software Engineer',
      date: '01/2024 - 10/2025',
      location: 'Virginia, United States',
      summary:
        'Developed Java, JDBC, and SQL Server lab instrument integration modules. Supported reliable data capture, bidirectional communication, WildFly deployments, ASTM and HL7 parsing, and clinical workflow production issues.',
    },
    {
      company: 'Optum Global Solutions (UnitedHealth Group)',
      role: 'Full Stack Developer',
      date: '01/2023 - 12/2024',
      location: 'Minnesota, United States',
      summary:
        'Led claim amount calculation microservices using Java Spring Boot, PostgreSQL, TensorFlow, Golang, REST/gRPC APIs, AWS, Docker, Kubernetes, EKS, ECS, CI/CD, and a team of five developers.',
    },
    {
      company: 'HDFC Bank Limited',
      role: 'Software Development Engineer 2',
      date: '05/2019 - 08/2021',
      location: 'Hyderabad, India',
      summary:
        'Built Java APIs with Spring Boot and MongoDB, deployed through Azure DevOps, implemented JWT access control with Spring Security, and supported CI/CD with Jenkins, Terraform, Prometheus, Grafana, and database optimization.',
    },
    {
      company: 'Paytm',
      role: 'Software Engineer',
      date: '02/2018 - 04/2019',
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
      detail: 'Score: 965/1000',
    },
    {
      title: 'Generative AI with Large Language Models',
      detail: 'DeepLearning.AI and AWS',
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
- GitHub: ${PROFILE_KNOWLEDGE.contact.github}
- LinkedIn: ${PROFILE_KNOWLEDGE.contact.linkedin}
- Resume: ${PROFILE_KNOWLEDGE.contact.resume}
`.trim();
