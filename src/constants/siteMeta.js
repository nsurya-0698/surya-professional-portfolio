/**
 * Site metadata and configuration constants
 * Centralized location for all site-related data
 */

export const SITE_META = {
  title: 'Surya Teja Nammi - Full Stack Developer',
  description: 'AWS-Certified Full Stack Developer with 6+ years of experience in building enterprise-grade solutions for healthcare and fintech domains.',
  author: 'Surya Teja Nammi',
  email: 'nammiteja087@gmail.com',
  github: 'https://github.com/nsurya-0698',
  linkedin: 'https://www.linkedin.com/in/tejanammi/',
  resume: '/Surya.pdf',
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
  ]
};

export const SOCIAL_LINKS = {
  github: {
    url: 'https://github.com/nsurya-0698',
    label: 'GitHub Profile',
    icon: 'VscGithubAlt'
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/tejanammi/',
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
    id: 'home',
    label: 'Home',
    href: '#home',
    icon: 'FiHome'
  },
  {
    id: 'experience',
    label: 'Experience',
    href: '#exp',
    icon: 'FiBriefcase'
  },
  {
    id: 'certifications',
    label: 'Certifications',
    href: '#certifications',
    icon: 'FiAward'
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