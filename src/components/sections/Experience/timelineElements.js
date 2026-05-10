// Add future experience, education, project, or certification entries here.
// The tree path, stop positions, platforms, and character reactions are generated from this array.
// Supported reactions: confidentPoint, presenting, thumbsUp, waving, curiousProud, proudCelebrate, surprised.
const timelineElements = [
  {
    id: 'experience-oracle-oci',
    type: 'experience',
    icon: 'work',
    title: 'Oracle - OCI',
    role: 'Senior Member of Technical Staff',
    location: 'Nashville, Tennessee, United States',
    description:
      'Designing and developing a large-scale enterprise chat application that powers Generative AI experiences across Oracle. Building backend systems in Python with active migration paths to Java for scale, designing APIs with FastAPI, Helidon, and modern Java frameworks, and deploying reliable services on Oracle Cloud Infrastructure.',
    highlights: ['Enterprise GenAI chat', 'FastAPI and Helidon APIs', 'OCI reliability practices'],
    date: '11/2025 - Present',
    characterReaction: 'confidentPoint',
    guide: {
      kicker: 'Now building',
      message: 'Enterprise GenAI, backend APIs, and OCI reliability all come together here.',
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
      'Developed and maintained lab instrument integration modules using Java, JDBC, and SQL Server, enabling reliable data capture and bidirectional communication between instruments and backend systems. Built decoupled modules on WildFly across UAT, PROD, and TEST environments, implemented ASTM and HL7 message parsing, and resolved production issues affecting clinical workflows.',
    highlights: ['ASTM and HL7 parsing', 'WildFly deployments', 'Clinical workflow support'],
    date: '01/2024 - 10/2025',
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
    role: 'Full Stack Developer',
    location: 'Minnesota, United States',
    description:
      'Led development of claim amount calculation microservices using Java Spring Boot, PostgreSQL, TensorFlow, Golang, and REST/gRPC APIs. Deployed containerized services to AWS with Docker, Kubernetes, EKS, and ECS, built CI/CD pipelines, and led a team of five developers through delivery and production support.',
    highlights: ['Spring Boot microservices', 'AWS EKS and ECS', 'Team leadership'],
    date: '01/2023 - 12/2024',
    characterReaction: 'thumbsUp',
    guide: {
      kicker: 'Scale moment',
      message: 'Healthcare microservices, AWS delivery, and team leadership become the story.',
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
    role: 'Software Development Engineer 2',
    location: 'Hyderabad, India',
    description:
      'Built Java APIs with Spring Boot and MongoDB, deployed services through Azure DevOps, implemented JWT-based access control with Spring Security, and supported CI/CD workflows with Jenkins and Terraform. Improved application quality through code reviews, troubleshooting, monitoring with Prometheus and Grafana, and database optimization.',
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
    role: 'Software Engineer',
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
