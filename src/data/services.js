import { SITE_META } from '../constants/siteMeta.js';

export const contactEmail = SITE_META.email || 'your-email@example.com';
export const whatsappNumber = '15854664111';
export const whatsappMessage =
  'Hi Surya, I visited your portfolio and I’m interested in your services. Can we discuss?';

// Add future services by appending a new object with the same shape.
export const SERVICES = [
  {
    id: 'website-development',
    title: 'Website Development',
    icon: 'code',
    cta: 'Start a Website Project',
    description:
      'I help individuals, students, professionals, and small businesses build clean, modern, responsive websites for portfolios, landing pages, personal brands, and simple service pages.',
    highlights: [
      'Personal portfolio websites',
      'Business landing pages',
      'Responsive UI design',
      'Modern frontend development',
      'Clean animations and interactions',
      'Deployment support',
    ],
  },
  {
    id: 'career-coaching',
    title: 'IT Career Coaching',
    icon: 'career',
    cta: 'Book Career Guidance',
    description:
      'I help students and early-career IT professionals with practical career guidance, resume improvements, LinkedIn positioning, interview preparation, and job search strategy.',
    highlights: [
      'Resume review',
      'LinkedIn profile improvement',
      'Interview preparation',
      'Career roadmap guidance',
      'Project ideas and portfolio guidance',
      'Job search strategy',
    ],
  },
];
