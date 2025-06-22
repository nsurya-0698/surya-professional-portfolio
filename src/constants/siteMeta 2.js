/**
 * Site metadata and configuration constants
 */

export const SITE_META = {
  title: 'Surya Teja Nammi - Full Stack Developer',
  description: 'AWS-Certified Full Stack Developer with 6+ years of experience in building enterprise-grade solutions for healthcare and fintech domains.',
  keywords: [
    'Full Stack Developer',
    'AWS Certified',
    'React',
    'Spring Boot',
    'Angular',
    'Microservices',
    'Cloud Architecture',
    'Healthcare',
    'Fintech'
  ],
  author: 'Surya Teja Nammi',
  url: 'https://nsurya-0698.github.io/surya-professional-portfolio/',
  image: '/og-image.jpg',
  type: 'website'
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/nsurya-0698',
  linkedin: 'https://www.linkedin.com/in/tejanammi/',
  email: 'tejanammim1@gmail.com'
};

export const NAVIGATION = [
  {
    id: 'home',
    label: 'Home',
    href: '#home'
  },
  {
    id: 'experience',
    label: 'Experience',
    href: '#exp'
  },
  {
    id: 'certifications',
    label: 'Certifications',
    href: '#certifications'
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact'
  }
];

export const SKILLS = {
  frontend: [
    'React',
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Sass/SCSS',
    'Tailwind CSS'
  ],
  backend: [
    'Spring Boot',
    'Java',
    'Node.js',
    'Express.js',
    'REST APIs',
    'GraphQL',
    'Microservices'
  ],
  cloud: [
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'Lambda',
    'EC2',
    'S3',
    'RDS'
  ],
  tools: [
    'Git',
    'Jenkins',
    'Maven',
    'Gradle',
    'Postman',
    'JUnit',
    'Mockito'
  ]
};

export const EXPERIENCE_DATA = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    role: 'Lead Developer',
    company: 'Optum - UHG',
    location: 'Hyderabad, India',
    date: '2022 - Present',
    description: 'Leading development of healthcare applications using Spring Boot microservices and Angular. Optimized system performance by 40% and reduced deployment times by 25%.',
    technologies: ['Spring Boot', 'Angular', 'AWS', 'Docker', 'Kafka'],
    icon: 'work'
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    role: 'Software Engineer',
    company: 'iB Hubs - NxtWave',
    location: 'Hyderabad, India',
    date: '2020 - 2022',
    description: 'Developed educational platforms and e-commerce solutions. Implemented real-time features with WebSockets and optimized database queries.',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'Redis'],
    icon: 'work'
  }
];

export const CERTIFICATIONS_DATA = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    score: '965/1000',
    date: '2023',
    description: 'Validated expertise in designing distributed systems and applications using AWS technologies.',
    certificateUrl: '/AWS_Certified_Solutions_Architect.pdf',
    badge: 'aws'
  },
  {
    id: 2,
    title: 'Generative AI with Large Language Models',
    issuer: 'DeepLearning.AI & AWS',
    score: 'Completed',
    date: '2024',
    description: 'Mastered the fundamentals of generative AI and LLMs, including transformer architecture and fine-tuning techniques.',
    certificateUrl: 'https://github.com/nsurya-0698/genAI-with-Large-Language-Models',
    badge: 'genai'
  }
];

export const ANIMATION_CONFIG = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
  stagger: 0.1
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}; 