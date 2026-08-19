import { PROFILE_KNOWLEDGE } from '../data/profileKnowledge.js';
import { SERVICES, contactEmail, whatsappNumber } from '../data/services.js';

const FOLLOW_UPS = {
  default: 'Would you like me to connect that to a specific role?',
  skills: 'Would you like examples that connect these skills to his work?',
  projects: 'Would you like a quick pitch for one of these projects?',
  contact: 'Would you like to ask about his strongest technical fit before reaching out?',
  experience: 'Would you like a shorter recruiter-style summary of this experience?',
};

const TECH_ALIASES = [
  { label: 'Java', aliases: ['java', 'core java'] },
  { label: 'JavaScript', aliases: ['javascript', 'js'] },
  { label: 'Spring Boot', aliases: ['spring boot', 'spring', 'springboot'] },
  { label: 'React', aliases: ['react', 'react js', 'reactjs'] },
  { label: 'Angular', aliases: ['angular'] },
  { label: 'Python', aliases: ['python'] },
  { label: 'SQL', aliases: ['sql', 'sql server'] },
  { label: 'AWS', aliases: ['aws', 'amazon web services'] },
  { label: 'Azure', aliases: ['azure', 'azure devops'] },
  { label: 'Oracle Cloud Infrastructure', aliases: ['oci', 'oracle cloud', 'oracle cloud infrastructure'] },
  { label: 'Docker', aliases: ['docker'] },
  { label: 'Kubernetes', aliases: ['kubernetes', 'k8s', 'eks', 'ecs'] },
  { label: 'Node.js', aliases: ['node', 'node js', 'node.js'] },
  { label: 'FastAPI', aliases: ['fastapi', 'fast api'] },
  { label: 'Helidon', aliases: ['helidon'] },
  { label: 'MongoDB', aliases: ['mongodb', 'mongo'] },
  { label: 'PostgreSQL', aliases: ['postgresql', 'postgres'] },
  { label: 'MySQL', aliases: ['mysql'] },
  { label: 'Jenkins', aliases: ['jenkins'] },
  { label: 'Terraform', aliases: ['terraform'] },
  { label: 'Prometheus', aliases: ['prometheus'] },
  { label: 'Grafana', aliases: ['grafana'] },
  { label: 'AI/LLM', aliases: ['ai', 'genai', 'generative ai', 'llm', 'openai', 'huggingface', 'langchain'] },
  { label: 'TensorFlow', aliases: ['tensorflow'] },
  { label: 'OpenCV', aliases: ['opencv'] },
  { label: 'REST/gRPC APIs', aliases: ['api', 'apis', 'rest', 'grpc', 'rest api', 'restful'] },
  { label: 'CI/CD', aliases: ['ci cd', 'ci/cd', 'cicd', 'devops'] },
  { label: 'MCP', aliases: ['mcp', 'model context protocol'] },
  { label: 'Codex skills', aliases: ['codex', 'codex skill', 'codex skills'] },
  { label: 'OpenTelemetry', aliases: ['opentelemetry', 'otel'] },
  { label: 'CloudWatch', aliases: ['cloudwatch', 'aws cloudwatch'] },
  { label: 'Redis', aliases: ['redis'] },
];

const COMPANY_ALIASES = [
  { company: 'Oracle', aliases: ['oracle', 'oci'] },
  { company: 'Quest Diagnostics', aliases: ['quest', 'quest diagnostics'] },
  { company: 'Optum - UnitedHealth Group', aliases: ['optum', 'unitedhealth', 'united health', 'uhg'] },
  { company: 'HDFC Bank Limited', aliases: ['hdfc', 'hdfc bank'] },
  { company: 'Paytm', aliases: ['paytm'] },
];

const PROJECT_ALIASES = [
  { title: 'GenAI Chat Application', aliases: ['genai chat', 'chat application', 'llm chat', 'ai chat'] },
  { title: 'NxtTrendz E-Commerce', aliases: ['nxttrendz', 'e commerce', 'ecommerce', 'shopping', 'cart'] },
  { title: 'AI-Powered Yoga Instructor', aliases: ['yoga instructor', 'ai yoga', 'pose estimation', 'computer vision'] },
  { title: 'LLM-Based Health Q&A Bot', aliases: ['health bot', 'health q', 'health qa', 'q&a bot', 'wellness bot'] },
  { title: 'Personalized Yoga Plan Generator', aliases: ['yoga plan', 'plan generator', 'personalized yoga'] },
];

const SERVICE_ALIASES = [
  {
    id: 'website-development',
    aliases: ['website', 'web site', 'web development', 'website development', 'portfolio website', 'landing page'],
  },
  {
    id: 'career-coaching',
    aliases: [
      'career coaching',
      'career guidance',
      'resume review',
      'review my resume',
      'resume help',
      'improve my resume',
      'linkedin improvement',
      'linkedin optimization',
      'improve linkedin',
      'linkedin profile',
      'interview preparation',
      'prepare for interview',
      'job search',
      'help with job search',
      'career roadmap',
    ],
  },
];

const ROLE_FIT_ALIASES = [
  {
    label: 'Backend Engineer',
    aliases: ['backend engineer', 'backend developer', 'server side', 'java developer', 'spring boot developer'],
  },
  {
    label: 'Full Stack Engineer',
    aliases: ['full stack', 'fullstack', 'frontend and backend', 'react developer', 'angular developer'],
  },
  {
    label: 'Cloud Engineer',
    aliases: ['cloud engineer', 'cloud developer', 'aws role', 'azure role', 'oci role', 'cloud role'],
  },
  {
    label: 'AI Application Engineer',
    aliases: ['ai engineer', 'genai engineer', 'llm engineer', 'ai application', 'ml engineer'],
  },
  {
    label: 'DevOps-aware Software Engineer',
    aliases: ['devops', 'ci cd', 'ci/cd', 'terraform role', 'kubernetes role'],
  },
];

const TOPIC_KEYWORDS = {
  longestCompany: [
    'long worked',
    'longest worked',
    'worked longest',
    'longest company',
    'longest role',
    'longest job',
    'longest tenure',
    'most experience',
    'most time',
  ],
  currentRole: ['current role', 'current company', 'currently', 'present company', 'latest role', 'latest company'],
  years: ['how many years', 'years of experience', 'total experience', 'experience years'],
  contact: ['contact', 'email', 'linkedin', 'github', 'reach', 'connect', 'phone', 'call', 'number'],
  resume: ['resume', 'cv', 'download'],
  hire: ['why hire', 'hire him', 'good hire', 'why should', 'fit for', 'candidate', 'role fit', 'strong fit'],
  services: [
    'service',
    'services',
    'paid service',
    'paid services',
    'freelance',
    'consulting',
    'offer',
    'offers',
    'help me',
    'help with',
    'coaching',
    'guidance',
    'support',
    'website development',
  ],
  projects: ['project', 'projects', 'built', 'build', 'portfolio work', 'app', 'application'],
  skills: ['skill', 'skills', 'technology', 'technologies', 'tech stack', 'stack', 'strongest'],
  certifications: ['certification', 'certifications', 'certified', 'aws certified', 'certificate', 'score'],
  education: ['education', 'degree', 'college', 'university', 'masters', 'master', 'bachelor', 'school', 'gpa', 'umkc'],
  experience: ['experience', 'background', 'career', 'work history', 'worked', 'work', 'job', 'company', 'companies'],
  strengths: ['strength', 'strengths', 'best at', 'good at', 'expertise', 'specialize', 'specializes'],
  targetRoles: ['what roles', 'which roles', 'best roles', 'target role', 'job title', 'job titles', 'looking for'],
  achievements: ['achievement', 'achievements', 'impact', 'accomplishment', 'accomplishments', 'impressive', 'highlights'],
  weakness: ['weakness', 'weaknesses', 'gap', 'gaps', 'concern', 'concerns', 'risk', 'risks'],
  domain: ['domain', 'industry', 'healthcare', 'fintech', 'banking', 'cloud', 'ai work'],
  leadership: ['lead', 'leader', 'leadership', 'team', 'ownership', 'managed'],
  availability: ['available', 'availability', 'start date', 'notice period', 'visa', 'sponsorship', 'work authorization'],
  location: ['location', 'located', 'where is he', 'where does he', 'relocate', 'remote', 'onsite', 'hybrid'],
  salary: ['salary', 'compensation', 'pay expectation', 'rate'],
  personal: ['age', 'date of birth', 'married', 'family', 'address', 'personal'],
  identity: ['who are you', 'are you surya', 'is this chatgpt', 'are you ai', 'what are you'],
  summary: [
    'surya',
    'portfolio',
    'about',
    'summary',
    'yourself',
    'him',
    'intro',
    'introduce',
    'introduction',
    'tell me about',
    'recruiter summary',
    'elevator pitch',
  ],
};

const normalizeText = (text) =>
  String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const hasAny = (text, terms) => terms.some((term) => text.includes(term));

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const hasAlias = (text, alias) => {
  const normalizedText = normalizeText(text);
  const normalizedAlias = normalizeText(alias);
  const boundary = '[^a-z0-9+#.]';
  const pattern = new RegExp(`(^|${boundary})${escapeRegExp(normalizedAlias)}($|${boundary})`);

  return pattern.test(normalizedText);
};

const makeSkillLine = (skills) => skills.slice(0, 9).join(', ');

const formatList = (items) => items.map((item) => `- ${item}`).join('\n');

const getCurrentExperience = () =>
  PROFILE_KNOWLEDGE.experience.find((item) => item.date.toLowerCase().includes('present')) ||
  PROFILE_KNOWLEDGE.experience[0];

const parseWorkDate = (value) => {
  if (!value || value.toLowerCase() === 'present') {
    return new Date();
  }

  const [month, year] = value.split('/').map(Number);

  if (!month || !year) {
    return null;
  }

  return new Date(year, month - 1, 1);
};

const getExperienceDurationMonths = (dateRange) => {
  const [startValue, endValue] = dateRange.split(' - ');
  const startDate = parseWorkDate(startValue);
  const endDate = parseWorkDate(endValue);

  if (!startDate || !endDate) {
    return 0;
  }

  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1
  );
};

const formatDuration = (months) => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts = [];

  if (years) {
    parts.push(`${years} year${years > 1 ? 's' : ''}`);
  }

  if (remainingMonths) {
    parts.push(`${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`);
  }

  return parts.join(' and ') || 'less than a month';
};

const getLongestExperience = () =>
  PROFILE_KNOWLEDGE.experience
    .map((item) => ({
      ...item,
      durationMonths: getExperienceDurationMonths(item.date),
    }))
    .sort((a, b) => b.durationMonths - a.durationMonths)[0];

const findCompany = (text) => {
  const match = COMPANY_ALIASES.find((item) => item.aliases.some((alias) => text.includes(alias)));

  return match
    ? PROFILE_KNOWLEDGE.experience.find((item) => item.company === match.company)
    : null;
};

const findProject = (text) => {
  const match = PROJECT_ALIASES.find((item) => item.aliases.some((alias) => text.includes(alias)));

  return match ? PROFILE_KNOWLEDGE.projects.find((item) => item.title === match.title) : null;
};

const findService = (text) => {
  const match = SERVICE_ALIASES.find((item) => item.aliases.some((alias) => text.includes(alias)));

  return match ? SERVICES.find((service) => service.id === match.id) : null;
};

const findRelatedProjects = (text) => {
  if (!text.includes('yoga')) {
    return [];
  }

  return PROFILE_KNOWLEDGE.projects.filter((project) =>
    normalizeText(`${project.title} ${project.summary} ${project.technologies.join(' ')}`).includes('yoga')
  );
};

const findRoleFit = (text) =>
  ROLE_FIT_ALIASES.find((role) => role.aliases.some((alias) => normalizeText(text).includes(alias)));

const findSkill = (text) => TECH_ALIASES.find((skill) => skill.aliases.some((alias) => hasAlias(text, alias)));

const findSkillEvidence = (skill) => {
  const aliases = skill.aliases;
  const matchesAlias = (value) => aliases.some((alias) => hasAlias(value, alias));
  const evidence = [];

  if (PROFILE_KNOWLEDGE.skills.some((item) => matchesAlias(item))) {
    evidence.push('listed in his core skills');
  }

  const experienceMatches = PROFILE_KNOWLEDGE.experience
    .filter((item) => matchesAlias(`${item.role} ${item.company} ${item.summary}`))
    .map((item) => item.company);

  if (experienceMatches.length) {
    evidence.push(`used across experience at ${experienceMatches.slice(0, 3).join(', ')}`);
  }

  const projectMatches = PROFILE_KNOWLEDGE.projects
    .filter((item) => matchesAlias(`${item.title} ${item.summary} ${item.technologies.join(' ')}`))
    .map((item) => item.title);

  if (projectMatches.length) {
    evidence.push(`visible in projects like ${projectMatches.slice(0, 2).join(' and ')}`);
  }

  return evidence;
};

const pickTopic = (text) => {
  const normalizedText = normalizeText(text);

  return Object.entries(TOPIC_KEYWORDS).find(([, terms]) => hasAny(normalizedText, terms))?.[0] || null;
};

const getPriorConversationText = (messages, currentText) => {
  const current = normalizeText(currentText);

  return normalizeText(
    messages
      .filter((message, index) => {
        const isCurrentUserMessage =
          index === messages.length - 1 &&
          message.role === 'user' &&
          normalizeText(message.content) === current;

        return !isCurrentUserMessage;
      })
      .map((message) => message.content)
      .join(' ')
  );
};

const isGreetingPrompt = (text) => {
  const normalizedText = normalizeText(text);
  const words = normalizedText.split(' ').filter(Boolean);
  const greetingWords = new Set(['hi', 'hello', 'hey', 'there']);

  if (!words.length || words.length > 4) {
    return false;
  }

  return (
    ['good morning', 'good afternoon', 'good evening'].includes(normalizedText) ||
    words.every((word) => greetingWords.has(word))
  );
};

const isHelpPrompt = (text) => {
  const normalizedText = normalizeText(text);

  return (
    normalizedText === 'help' ||
    hasAny(normalizedText, ['what can you do', 'how does this work', 'what should i ask'])
  );
};

const isThanksPrompt = (text) => /^(thanks|thank you|thx|appreciate it|cool|nice|great)\.?$/i.test(text.trim());

const isGoodbyePrompt = (text) => /^(bye|goodbye|see you|talk later)\.?$/i.test(text.trim());

const isVaguePrompt = (text) =>
  /^(what|why|how|who|more|tell me more|this|that|it|ok|okay|\?)\.?$/i.test(text.trim());

const createGreetingReply = () =>
  `Hi, I'm Surya's portfolio assistant. I can help you quickly understand his experience, projects, skills, education, certifications, contact details, and role fit.\n\nTry asking:\n- What does Surya do?\n- Is he a good backend engineer?\n- What are his top skills?\n- How can I contact him?`;

const createHelpReply = () =>
  `I can answer questions about Surya's portfolio and resume, including:\n- Experience and companies he worked with\n- Technical skills and tools\n- Projects and certifications\n- Education and contact details\n- Fit for a role or recruiter summary\n\nAsk naturally, like "What did he do at Oracle?", "Is he good for cloud roles?", or "Share his contact details."`;

const createIdentityReply = () =>
  `I'm Surya's portfolio assistant. I answer from the resume and portfolio content so visitors can quickly understand his background, projects, skills, and fit for roles. I keep answers professional and avoid guessing beyond what is listed.`;

const createContactReply = () =>
  `You can contact Surya through:\n- Phone: ${PROFILE_KNOWLEDGE.contact.phone}\n- Email: ${PROFILE_KNOWLEDGE.contact.email}\n- LinkedIn: ${PROFILE_KNOWLEDGE.contact.linkedin}\n- GitHub: ${PROFILE_KNOWLEDGE.contact.github}\n- Contact section: #contact\n\n${FOLLOW_UPS.contact}`;

const createResumeReply = () =>
  `Surya's resume is available from the Resume button in the site header.\n\n${FOLLOW_UPS.default}`;

const createSummaryReply = () =>
  `${PROFILE_KNOWLEDGE.summary}\n\nHis strongest areas include AI platform engineering, cloud-native backend systems, agentic workflows, production reliability, and delivery automation.\n\n${FOLLOW_UPS.default}`;

const createStrengthsReply = () =>
  `Surya's strongest visible strengths are:\n${formatList(PROFILE_KNOWLEDGE.strengths.slice(0, 5))}\n\n${FOLLOW_UPS.default}`;

const createAchievementsReply = () =>
  `A few portfolio highlights stand out:\n- Built and operationalized Agent Gateway and Services at Oracle\n- Delivered WebSearch for Oracle's internal GenAI platform\n- Built Codex RCA automation that reduced on-call investigation time by approximately 70%\n- Automated local end-to-end integration testing across four dependent services\n- Built clinical instrument integrations at Quest Diagnostics and high-scale healthcare services at Optum\n\n${FOLLOW_UPS.default}`;

const createHireReply = () =>
  `Surya would be a strong fit for teams that need practical, reliable engineering across backend systems, cloud delivery, and full-stack applications. His portfolio shows experience in healthcare, fintech, cloud platforms, and GenAI applications, with strengths in ownership, debugging, APIs, and end-to-end implementation.\n\n${FOLLOW_UPS.default}`;

const createServicesReply = () =>
  `Surya can share informal guidance in these areas:\n${SERVICES.map((service) => `- ${service.title}: ${service.description}`).join('\n')}\n\nFor general questions, email ${contactEmail}, call ${PROFILE_KNOWLEDGE.contact.phone}, message on WhatsApp at +${whatsappNumber}, or use the Contact section: #contact.`;

const createServiceReply = (service) =>
  `${service.title}: ${service.description}\n\nHighlights:\n${service.highlights
    .map((highlight) => `- ${highlight}`)
    .join('\n')}\n\nFor general questions, email ${contactEmail}, call ${PROFILE_KNOWLEDGE.contact.phone}, message on WhatsApp at +${whatsappNumber}, or use the Contact section: #contact.`;

const createTargetRolesReply = () =>
  `Based on the portfolio, Surya appears strongest for roles such as:\n- AI Platform Engineer\n- Backend Software Engineer\n- Cloud-native Software Engineer across OCI, AWS, or Azure\n- AI Application Engineer working with LLM and agentic systems\n- Production-minded Software Engineer focused on delivery automation, observability, and reliability\n\n${FOLLOW_UPS.default}`;

const createRoleFitReply = (roleFit) => {
  const roleDetails = {
    'Backend Engineer':
      'Yes. His portfolio strongly supports backend roles through Java, Spring Boot, REST/gRPC APIs, JDBC, SQL, microservices, production debugging, and enterprise integrations.',
    'Full Stack Engineer':
      'Yes. His portfolio supports full-stack roles through React, Angular, Node.js, APIs, authentication, e-commerce workflows, and backend service experience.',
    'Cloud Engineer':
      'Yes, especially cloud-native software roles. His portfolio lists AWS, Azure, Oracle Cloud Infrastructure, Docker, Kubernetes, Terraform, CI/CD, and cloud application delivery.',
    'AI Application Engineer':
      'Yes, especially practical AI application roles. His portfolio includes GenAI chat work, OpenAI API usage, LLM-related projects, FastAPI, HuggingFace, LangChain, and AI-enabled product ideas.',
    'DevOps-aware Software Engineer':
      'Yes. His strongest fit is software engineering with DevOps ownership, using Docker, Kubernetes, Jenkins, Azure DevOps, Terraform, Prometheus, Grafana, and CI/CD workflows.',
  };

  return `${roleDetails[roleFit.label]}\n\n${FOLLOW_UPS.default}`;
};

const createProjectsReply = () =>
  `Surya's highlighted projects include:\n${PROFILE_KNOWLEDGE.projects
    .slice(0, 5)
    .map((project) => `- ${project.title}: ${project.summary}`)
    .join('\n')}\n\n${FOLLOW_UPS.projects}`;

const createProjectReply = (project) =>
  `${project.title}: ${project.summary}\n\nTechnologies: ${project.technologies.join(', ')}${project.status ? `\nStatus: ${project.status}` : ''}${project.link ? `\nLink: ${project.link}` : ''}\n\n${FOLLOW_UPS.projects}`;

const createRelatedProjectsReply = (projects) =>
  `These related projects match that area:\n${projects
    .map((project) => `- ${project.title}: ${project.summary}`)
    .join('\n')}\n\n${FOLLOW_UPS.projects}`;

const createSkillsReply = () =>
  `Based on the portfolio, Surya's strongest technical areas are ${makeSkillLine(PROFILE_KNOWLEDGE.skills)}. He applies these across GenAI applications, backend services, cloud platforms, agent workflows, deployment automation, observability, and incident response.\n\n${FOLLOW_UPS.skills}`;

const createSkillReply = (skill) => {
  const evidence = findSkillEvidence(skill);

  if (!evidence.length) {
    return `I see ${skill.label} related wording in the question, but I do not see strong supporting details for it in the portfolio. The safest visible stack is ${makeSkillLine(PROFILE_KNOWLEDGE.skills)}.\n\n${FOLLOW_UPS.skills}`;
  }

  return `Yes. ${skill.label} is ${evidence.join(' and ')}. That makes it part of Surya's visible portfolio/resume background.\n\n${FOLLOW_UPS.skills}`;
};

const createUnknownSkillReply = () =>
  `I do not see that exact technology listed in Surya's portfolio, so I do not want to claim it. The visible stack includes ${makeSkillLine(PROFILE_KNOWLEDGE.skills)}.\n\n${FOLLOW_UPS.skills}`;

const createCertificationsReply = () =>
  `Surya lists these certifications:\n- AWS Certified Solutions Architect - Associate, score 965/1000\n- Generative AI with Large Language Models from DeepLearning.AI and AWS\n\n${FOLLOW_UPS.default}`;

const createEducationReply = () =>
  `Surya has a Master of Science in Computer Science from the University of Missouri - Kansas City and a Bachelor of Technology in Electrical and Electronics Engineering from Aditya Engineering University. His academic background includes cloud computing, AI/ML, algorithms, software engineering, electronics, and introductory computer science fundamentals. His listed graduate GPA is 3.5/4.0.\n\n${FOLLOW_UPS.default}`;

const createExperienceReply = () =>
  `Surya's experience spans enterprise GenAI at Oracle OCI, clinical systems at Quest Diagnostics, healthcare microservices at Optum, fintech APIs at HDFC Bank, and payment systems at Paytm.\n${PROFILE_KNOWLEDGE.experience
    .slice(0, 5)
    .map((item) => `- ${item.role}, ${item.company}: ${item.summary}`)
    .join('\n')}\n\n${FOLLOW_UPS.experience}`;

const createCompanyReply = (company) =>
  `${company.role} at ${company.company} (${company.date}, ${company.location}). ${company.summary}\n\n${FOLLOW_UPS.experience}`;

const createCurrentRoleReply = () => {
  const current = getCurrentExperience();

  return `Surya's current listed role is ${current.role} at ${current.company} (${current.date}, ${current.location}). ${current.summary}\n\n${FOLLOW_UPS.experience}`;
};

const createLongestCompanyReply = () => {
  const longestExperience = getLongestExperience();

  return `Based on the portfolio timeline, Surya's longest listed company tenure is ${longestExperience.company}, where he worked as ${longestExperience.role} for about ${formatDuration(longestExperience.durationMonths)} (${longestExperience.date}).\n\n${FOLLOW_UPS.experience}`;
};

const createYearsReply = () =>
  `The portfolio summarizes Surya as having 6+ years of software engineering experience across AI applications, backend platforms, cloud systems, healthcare, fintech, and production engineering.\n\n${FOLLOW_UPS.experience}`;

const createDomainReply = () =>
  `Surya's visible domain experience includes:\n- Healthcare and clinical systems through Quest Diagnostics and Optum\n- Fintech and banking through HDFC Bank and Paytm\n- Cloud and GenAI platform work through Oracle OCI\n- Portfolio projects involving AI, e-commerce, health Q&A, and yoga planning\n\n${FOLLOW_UPS.default}`;

const createLeadershipReply = () =>
  `The clearest leadership signal in the portfolio is at Optum, where Surya led claim amount calculation microservices and a team of five developers. His experience also shows ownership across APIs, production debugging, cloud deployments, and cross-system integrations.\n\n${FOLLOW_UPS.experience}`;

const createWeaknessReply = () =>
  `I can only answer from the portfolio, so I would frame this carefully: the portfolio shows strong backend, cloud, full-stack, and AI application experience, but it does not list every detail a recruiter might ask for, such as exact availability, visa status, salary expectations, or detailed system-design metrics. Those should be confirmed directly with Surya.\n\n${FOLLOW_UPS.contact}`;

const createAvailabilityReply = () =>
  `I do not see availability, notice period, visa status, or work authorization details listed in the portfolio. The safest next step is to email Surya at ${PROFILE_KNOWLEDGE.contact.email}, call ${PROFILE_KNOWLEDGE.contact.phone}, or use the Contact section: #contact.\n\n${FOLLOW_UPS.contact}`;

const createLocationReply = () => {
  const current = getCurrentExperience();

  return `The current listed role is in ${current.location}. The portfolio does not clearly state relocation, remote, hybrid, or onsite preferences, so that should be confirmed directly with Surya.\n\n${FOLLOW_UPS.contact}`;
};

const createSalaryReply = () =>
  `I do not see salary, compensation, or rate expectations listed in the portfolio. Please email Surya at ${PROFILE_KNOWLEDGE.contact.email}, call ${PROFILE_KNOWLEDGE.contact.phone}, or use the Contact section: #contact.\n\n${FOLLOW_UPS.contact}`;

const createPersonalReply = () =>
  `I do not have private personal details like age, family information, home address, or private background. For professional contact, you can email Surya at ${PROFILE_KNOWLEDGE.contact.email}, call ${PROFILE_KNOWLEDGE.contact.phone}, or use the Contact section: #contact.`;

const createStaticAgentReply = () =>
  `This is a lightweight portfolio assistant designed for Surya's static website. It answers from curated portfolio and resume content rather than making unsupported claims. For best results, ask about Surya's experience, projects, skills, education, certifications, contact details, or fit for a role.`;

const createOffTopicReply = () =>
  `I am focused on Surya's professional portfolio, so I may not be helpful for unrelated topics. I can still help you evaluate his background, technical strengths, projects, work history, education, certifications, and contact details.`;

const createUnknownReply = () =>
  `I do not see that specific detail in Surya's portfolio, so I do not want to guess. The best next step is to email Surya at ${PROFILE_KNOWLEDGE.contact.email}, call ${PROFILE_KNOWLEDGE.contact.phone}, or use the Contact section: #contact.\n\nYou can also ask me about his experience, projects, skills, education, certifications, contact details, or fit for a role.`;

const createReplyByTopic = (topic) => {
  switch (topic) {
    case 'contact':
      return createContactReply();
    case 'resume':
      return createResumeReply();
    case 'hire':
      return createHireReply();
    case 'services':
      return createServicesReply();
    case 'projects':
      return createProjectsReply();
    case 'skills':
      return createSkillsReply();
    case 'certifications':
      return createCertificationsReply();
    case 'education':
      return createEducationReply();
    case 'experience':
      return createExperienceReply();
    case 'strengths':
      return createStrengthsReply();
    case 'targetRoles':
      return createTargetRolesReply();
    case 'achievements':
      return createAchievementsReply();
    case 'weakness':
      return createWeaknessReply();
    case 'domain':
      return createDomainReply();
    case 'leadership':
      return createLeadershipReply();
    case 'availability':
      return createAvailabilityReply();
    case 'location':
      return createLocationReply();
    case 'salary':
      return createSalaryReply();
    case 'personal':
      return createPersonalReply();
    case 'identity':
      return createIdentityReply();
    case 'currentRole':
      return createCurrentRoleReply();
    case 'longestCompany':
      return createLongestCompanyReply();
    case 'years':
      return createYearsReply();
    case 'summary':
    default:
      return createSummaryReply();
  }
};

export const createLocalAssistantReply = (message, messages = []) => {
  const text = String(message || '').trim();
  const normalizedText = normalizeText(text);

  if (!text) {
    return 'Ask me about Surya\'s experience, projects, skills, certifications, or contact details.';
  }

  if (isGreetingPrompt(text)) {
    return createGreetingReply();
  }

  if (isThanksPrompt(text)) {
    return 'You are welcome. Ask me anything about Surya\'s experience, projects, skills, or fit for a role.';
  }

  if (isGoodbyePrompt(text)) {
    return 'Thanks for visiting Surya\'s portfolio. You can use the contact links whenever you are ready to connect.';
  }

  if (isHelpPrompt(text)) {
    return createHelpReply();
  }

  if (hasAny(normalizedText, ['llm', 'chatgpt', 'openai', 'predefined', 'static assistant', 'how are you built'])) {
    return createStaticAgentReply();
  }

  const historyTopic = pickTopic(getPriorConversationText(messages, text));

  if (isVaguePrompt(text)) {
    return historyTopic ? createReplyByTopic(historyTopic) : createHelpReply();
  }

  const project = findProject(normalizedText);

  if (project) {
    return createProjectReply(project);
  }

  const service = findService(normalizedText);

  if (service) {
    return createServiceReply(service);
  }

  const relatedProjects = findRelatedProjects(normalizedText);

  if (relatedProjects.length > 1) {
    return createRelatedProjectsReply(relatedProjects);
  }

  const company = findCompany(normalizedText);

  if (company) {
    return createCompanyReply(company);
  }

  const roleFit = findRoleFit(normalizedText);

  if (roleFit) {
    return createRoleFitReply(roleFit);
  }

  const currentTopic = pickTopic(normalizedText);
  const priorityTopics = new Set([
    'contact',
    'resume',
    'certifications',
    'education',
    'currentRole',
    'longestCompany',
    'years',
    'targetRoles',
    'achievements',
    'weakness',
    'domain',
    'leadership',
    'availability',
    'location',
    'salary',
    'personal',
    'identity',
  ]);

  if (priorityTopics.has(currentTopic)) {
    return createReplyByTopic(currentTopic);
  }

  const skill = findSkill(normalizedText);

  if (skill) {
    return createSkillReply(skill);
  }

  if (hasAny(normalizedText, ['does he know', 'has he used', 'can he use', 'experience with', 'familiar with'])) {
    return createUnknownSkillReply();
  }

  if (currentTopic) {
    return createReplyByTopic(currentTopic);
  }

  if (hasAny(normalizedText, ['weather', 'recipe', 'cook', 'movie', 'music', 'sports', 'politics', 'medical', 'legal'])) {
    return createOffTopicReply();
  }

  return createUnknownReply();
};
