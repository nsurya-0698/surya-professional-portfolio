import { PROFILE_KNOWLEDGE } from '../data/profileKnowledge.js';

const PROFESSIONAL_TERMS = [
  'surya',
  'resume',
  'portfolio',
  'experience',
  'work',
  'job',
  'role',
  'hire',
  'fit',
  'candidate',
  'skill',
  'project',
  'education',
  'degree',
  'certification',
  'contact',
  'email',
  'linkedin',
  'github',
  'java',
  'spring',
  'react',
  'angular',
  'python',
  'sql',
  'aws',
  'azure',
  'oci',
  'cloud',
  'docker',
  'kubernetes',
  'api',
  'backend',
  'frontend',
  'full stack',
  'microservice',
  'ai',
  'genai',
  'llm',
  'oracle',
  'quest',
  'optum',
  'hdfc',
  'paytm',
  'umkc',
];

const FOLLOW_UPS = {
  default: 'Would you like me to connect that to a specific role?',
  skills: 'Would you like examples that connect these skills to his work?',
  projects: 'Would you like a quick pitch for one of these projects?',
  contact: 'Would you like to ask about his strongest technical fit before reaching out?',
  experience: 'Would you like a shorter recruiter-style summary of this experience?',
};

const makeSkillLine = (skills) => skills.slice(0, 8).join(', ');

const isRelevantQuestion = (text) => {
  const normalizedText = text.toLowerCase();
  const greetingOnly = /^(hi|hello|hey|good morning|good afternoon|good evening)[!. ]*$/i.test(text.trim());

  return greetingOnly || PROFESSIONAL_TERMS.some((term) => normalizedText.includes(term));
};

const findCompany = (text) => {
  const normalizedText = text.toLowerCase();

  return PROFILE_KNOWLEDGE.experience.find((item) =>
    normalizedText.includes(item.company.toLowerCase().split(' ')[0])
  );
};

const hasAny = (text, terms) => terms.some((term) => text.includes(term));

const formatProjectBullets = () =>
  PROFILE_KNOWLEDGE.projects
    .slice(0, 4)
    .map((project) => `- ${project.title}: ${project.summary}`)
    .join('\n');

const formatExperienceBullets = () =>
  PROFILE_KNOWLEDGE.experience
    .slice(0, 4)
    .map((item) => `- ${item.role}, ${item.company}: ${item.summary}`)
    .join('\n');

export const createLocalAssistantReply = (message) => {
  const text = message.trim();
  const normalizedText = text.toLowerCase();

  if (!text) {
    return 'Ask me about Surya\'s experience, projects, skills, certifications, or contact details.';
  }

  if (!isRelevantQuestion(text)) {
    return 'I\'m focused on Surya\'s professional background, portfolio, projects, and skills. You can ask me about his experience, technical strengths, or fit for a role.';
  }

  if (hasAny(normalizedText, ['contact', 'email', 'linkedin', 'github', 'reach', 'connect'])) {
    return `You can contact Surya through:\n- Email: ${PROFILE_KNOWLEDGE.contact.email}\n- LinkedIn: ${PROFILE_KNOWLEDGE.contact.linkedin}\n- GitHub: ${PROFILE_KNOWLEDGE.contact.github}\n\n${FOLLOW_UPS.contact}`;
  }

  if (hasAny(normalizedText, ['resume', 'cv', 'download'])) {
    return `Surya's resume is available from the Resume button in the site header.\n\n${FOLLOW_UPS.default}`;
  }

  if (hasAny(normalizedText, ['why', 'hire', 'fit', 'candidate', 'good hire', 'role-specific', 'role specific'])) {
    return `Surya would be a strong fit for teams that need practical, reliable engineering across backend systems, cloud delivery, and full-stack applications. His portfolio shows production experience in healthcare, fintech, cloud platforms, and GenAI applications, with strengths in ownership, debugging, APIs, and end-to-end implementation.\n\n${FOLLOW_UPS.default}`;
  }

  if (hasAny(normalizedText, ['project', 'built', 'build', 'portfolio work'])) {
    return `Surya's highlighted projects include:\n${formatProjectBullets()}\n\n${FOLLOW_UPS.projects}`;
  }

  if (hasAny(normalizedText, ['skill', 'technology', 'tech stack', 'stack', 'strongest'])) {
    return `Based on the portfolio, Surya's strongest technical areas are ${makeSkillLine(PROFILE_KNOWLEDGE.skills)}. He applies these across Spring Boot microservices, React applications, cloud deployments, APIs, and AI-enabled tools.\n\n${FOLLOW_UPS.skills}`;
  }

  if (hasAny(normalizedText, ['certification', 'certified', 'aws certified', 'certificate'])) {
    return `Surya lists these certifications:\n- AWS Certified Solutions Architect - Associate, score 965/1000\n- Generative AI with Large Language Models from DeepLearning.AI and AWS\n\n${FOLLOW_UPS.default}`;
  }

  if (hasAny(normalizedText, ['education', 'degree', 'college', 'university', 'masters', 'bachelor', 'umkc'])) {
    return `Surya has a Master of Science in Computer Science from the University of Missouri - Kansas City and a Bachelor of Technology in Electrical and Electronics Engineering from Aditya Engineering University. His academic background includes cloud computing, AI/ML, algorithms, software engineering, electronics, and introductory computer science fundamentals.\n\n${FOLLOW_UPS.default}`;
  }

  const company = findCompany(normalizedText);

  if (company) {
    return `${company.role} at ${company.company} (${company.date}, ${company.location}). ${company.summary}\n\n${FOLLOW_UPS.experience}`;
  }

  if (hasAny(normalizedText, ['experience', 'background', 'career', 'work history', 'worked'])) {
    return `Surya's experience spans enterprise GenAI at Oracle OCI, clinical systems at Quest Diagnostics, healthcare microservices at Optum, fintech APIs at HDFC Bank, and payment systems at Paytm.\n${formatExperienceBullets()}\n\n${FOLLOW_UPS.experience}`;
  }

  if (hasAny(normalizedText, ['tell me', 'about', 'summary', 'yourself', 'him'])) {
    return `${PROFILE_KNOWLEDGE.summary} His strongest areas include backend engineering, cloud-native systems, full-stack product work, and practical AI application development.\n\n${FOLLOW_UPS.default}`;
  }

  return 'I do not see that listed in Surya\'s portfolio or resume, so I do not want to guess. You could ask about his projects, skills, experience, education, certifications, or contact details.';
};
