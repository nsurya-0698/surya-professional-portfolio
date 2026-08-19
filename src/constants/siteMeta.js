/**
 * Site metadata and configuration constants
 * Centralized location for all site-related data
 */

export const SITE_META = {
  title: 'Surya Teja Nammi - AI Platform & Backend Engineer',
  description: 'Software engineer building AI applications, cloud-native backend services, and reliable production platforms across OCI, AWS, and Azure.',
  author: 'Surya Teja Nammi',
  email: 'nammiteja087@gmail.com',
  phone: '+1 8167156330',
  github: 'https://github.com/nsurya-0698',
  linkedin: 'https://www.linkedin.com/in/suryanst/',
  resume: '/Surya.pdf',
  keywords: [
    'AI Platform Engineer',
    'Backend Software Engineer',
    'Generative AI',
    'Oracle Cloud Infrastructure',
    'AWS Certified',
    'Spring Boot',
    'Microservices',
    'Cloud Architecture',
    'Production Reliability',
    'Observability',
    'Healthcare',
    'Fintech'
  ]
};

export const SOCIAL_LINKS = {
  github: {
    url: 'https://github.com/nsurya-0698',
    label: 'GitHub Profile',
    icon: 'VscGithubAlt'
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/suryanst/',
    label: 'LinkedIn Profile',
    icon: 'FiLinkedin'
  },
  email: {
    url: 'mailto:nammiteja087@gmail.com',
    label: 'Send Email',
    icon: 'FiMail'
  }
};

export const NAVIGATION_ITEMS = [
  {
    id: 'projects',
    label: 'Projects',
    href: '#projects',
    icon: 'FiCode'
  },
  {
    id: 'experience',
    label: 'Experience',
    href: '#exp',
    icon: 'FiBriefcase'
  },
  {
    id: 'skills',
    label: 'Skills',
    href: '#skills',
    icon: 'FiTool'
  },
  {
    id: 'appreciations',
    label: 'Feedback',
    href: '#appreciations',
    icon: 'FiStar'
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact',
    icon: 'FiMail'
  }
];

export const ANIMATION_CONFIG = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  slideLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  slideRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};
