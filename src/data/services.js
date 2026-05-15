import { SITE_META } from '../constants/siteMeta.js';

export const contactEmail = SITE_META.email || 'your-email@example.com';
export const whatsappNumber = '15854664111';
export const whatsappMessage =
  'Hi Surya, I visited your portfolio and wanted to ask for informal guidance. Can we connect?';

// Add future support areas by appending a new object with the same shape.
export const SERVICES = [
  {
    id: 'website-development',
    title: 'Website & Portfolio Guidance',
    icon: 'code',
    cta: 'Ask for Website Guidance',
    description:
      'I can share informal feedback, examples, and direction for clean, modern, responsive portfolios, personal branding pages, and simple website ideas.',
    highlights: [
      'Portfolio structure feedback',
      'Personal branding suggestions',
      'Responsive UI guidance',
      'Frontend best-practice tips',
      'Animation and interaction ideas',
      'Deployment pointers',
    ],
  },
  {
    id: 'career-coaching',
    title: 'IT Career Guidance',
    icon: 'career',
    cta: 'Ask for Career Guidance',
    description:
      'I can share informal guidance for students and early-career IT professionals around resumes, LinkedIn, interviews, projects, and job search direction.',
    highlights: [
      'Resume feedback',
      'LinkedIn profile suggestions',
      'Interview preparation tips',
      'Career roadmap discussion',
      'Project and portfolio ideas',
      'Job search direction',
    ],
  },
];
