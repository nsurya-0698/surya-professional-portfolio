// Add future experience, education, project, or certification entries here.
// The tree path, stop positions, platforms, and character reactions are generated from this array.
// Supported reactions: confidentPoint, presenting, thumbsUp, waving, curiousProud, proudCelebrate, surprised.
const timelineElements = [
  {
    id: 'experience-oracle-oci',
    type: 'experience',
    icon: 'work',
    title: 'Oracle',
    role: 'Software Developer 3 - Generative AI',
    location: 'United States',
    description:
      'Building and operationalizing Agent Gateway and Services, a greenfield AI platform spanning OCI deployment workflows, environment provisioning, integration and canary testing, observability, security, and on-call readiness. Delivered WebSearch for Oracle\'s internal GenAI platform and strengthened production reliability through metrics, alarms, dashboards, service probes, and cross-team release execution.',
    highlights: ['Agent Gateway and Services', 'WebSearch and GenAI delivery', 'Production reliability'],
    date: '11/2025 - Present',
    characterReaction: 'confidentPoint',
    guide: {
      kicker: 'Now building',
      message: 'AI platform engineering, safe delivery, and production reliability come together here.',
    },
  },
  {
    id: 'experience-quest-diagnostics',
    type: 'experience',
    icon: 'work',
    title: 'Quest Diagnostics',
    role: 'Senior Software Engineer',
    location: 'Virginia, United States',
    description:
      'Built Java interfaces for clinical laboratory instruments, parsing ASTM and HL7 messages and persisting validated results to SQL Server. Developed 20+ decoupled WildFly modules for asynchronous instrument communication, configured environment-specific deployments, and resolved production failures affecting diagnostic workflows.',
    highlights: ['ASTM and HL7 parsing', 'WildFly deployments', 'Clinical workflow support'],
    date: '01/2025 - 10/2025',
    characterReaction: 'presenting',
    guide: {
      kicker: 'Clinical systems',
      message: 'Production discipline shows up through lab instruments, ASTM, HL7, and workflow support.',
    },
  },
  {
    id: 'experience-optum',
    type: 'experience',
    icon: 'work',
    title: 'Optum Global Solutions (UnitedHealth Group)',
    role: 'Software Development Engineer II',
    location: 'Minnesota, United States',
    description:
      'Led development of a cloud-native healthcare SaaS platform processing 10,000+ daily transactions with sub-500 ms latency and 99.9% availability. Architected Spring Boot services on AWS EKS, automated deployment workflows, built TensorFlow claim prioritization, and unified telemetry to improve scalability and incident response.',
    highlights: ['10,000+ daily transactions', 'AWS EKS and CI/CD', 'AI-assisted claims workflows'],
    date: '01/2023 - 12/2024',
    characterReaction: 'thumbsUp',
    guide: {
      kicker: 'Scale moment',
      message: 'Healthcare scale, AWS delivery, and measurable reliability define this chapter.',
    },
  },
  {
    id: 'education-umkc',
    type: 'education',
    icon: 'school',
    title: 'University of Missouri - Kansas City',
    role: 'Master of Science in Computer Science',
    location: 'Kansas City, Missouri',
    description:
      'Completed graduate coursework in cloud computing, artificial intelligence, machine learning, data structures, algorithms, and advanced software engineering with a 3.5/4.0 GPA.',
    highlights: ['Cloud computing', 'AI and machine learning', 'Advanced software engineering'],
    date: '08/2021 - 12/2022',
    characterReaction: 'curiousProud',
    guide: {
      kicker: 'Academic base',
      message: 'Cloud, AI, algorithms, and advanced engineering practice form the foundation.',
    },
    link: {
      label: 'View GitHub',
      href: 'https://github.com/nsurya-0698',
    },
  },
  {
    id: 'experience-hdfc',
    type: 'experience',
    icon: 'work',
    title: 'HDFC Bank Limited',
    role: 'Software Development Engineer',
    location: 'Jodhpur, India',
    description:
      'Designed Java and Spring Boot APIs backed by MongoDB, implemented Spring Security and JWT access controls, and automated delivery with Azure DevOps, Jenkins, and Terraform. Improved deployment safety with rollback workflows, Prometheus monitoring, Grafana dashboards, and structured root-cause analysis.',
    highlights: ['Spring Security and JWT', 'Jenkins and Terraform', 'Prometheus and Grafana'],
    date: '05/2019 - 08/2021',
    characterReaction: 'confidentPoint',
    guide: {
      kicker: 'Fintech craft',
      message: 'Security, CI/CD, monitoring, and API quality take focus in banking systems.',
    },
  },
  {
    id: 'experience-paytm',
    type: 'experience',
    icon: 'work',
    title: 'Paytm',
    role: 'Associate Software Engineer',
    location: 'Hyderabad, India',
    description:
      'Designed, tested, and debugged Java-based applications using MySQL, Spring Boot, Kubernetes, Docker, and Gradle. Improved transaction-processing reliability, supported Agile delivery, and developed optimized data pipelines that reduced processing time for large datasets.',
    highlights: ['Transaction reliability', 'Docker and Kubernetes', 'Data pipeline optimization'],
    date: '02/2018 - 04/2019',
    characterReaction: 'waving',
    guide: {
      kicker: 'Payment flow',
      message: 'Transaction reliability, containers, and faster data pipelines enter the path.',
    },
  },
  {
    id: 'education-aditya',
    type: 'education',
    icon: 'school',
    title: 'Aditya Engineering University',
    role: 'Bachelor of Technology in Electrical and Electronics Engineering',
    location: 'Andhra Pradesh, India',
    description:
      'Completed undergraduate studies in electrical and electronics engineering, building foundations in circuits, electronics, control systems, and electrical machines, with introductory computer science coursework in C programming, data structures, and software fundamentals.',
    highlights: ['Electrical and electronics engineering', 'C programming basics', 'Computer science fundamentals'],
    date: '05/2015 - 06/2019',
    characterReaction: 'proudCelebrate',
    guide: {
      kicker: 'Origin story',
      message: 'Electrical and electronics fundamentals came first, with basic computer science as the bridge into software.',
    },
    link: {
      label: 'View GitHub',
      href: 'https://github.com/nsurya-0698',
    },
  },
];

export default timelineElements;
