// This text is the server-owned grounding source for Byte's resume mode.
// Keep it synchronized with src/assets/documents/Surya.pdf. The hash is
// verified by workers/resume-knowledge.test.js.
export const RESUME_PDF_SHA256 =
  '09ef399b3c15ff4e6158370a0b0b2f1723f49389a296faca0a65a1912266e60b';

export const RESUME_CONTEXT = `
SURYA TEJA NAMMI
+1-816-715-6330 | nammiteja087@gmail.com | LinkedIn | Portfolio

PROFESSIONAL SUMMARY
Senior software engineer with 6+ years of experience building AI applications, cloud-native backend services, and enterprise platforms across OCI, AWS, and Azure. Brings end-to-end ownership spanning system development, deployment automation, integration and canary testing, observability, security, and production reliability. Known for disciplined ownership, adaptability, clear cross-functional communication, and dependable execution in ambiguous, fast-moving environments. Builds trust across teams by translating complex issues into practical action while maintaining a security- and compliance-conscious approach.

TECHNICAL SKILLS
Languages: Java, Python, SQL, JavaScript, Shell scripting
AI & Agentic Engineering: GenAI applications, LLM orchestration, RAG, MCP, Codex skills, agent workflows, prompt engineering, tool integration
Backend & Architecture: FastAPI, Helidon, Spring Boot, REST APIs, microservices, event-driven systems
Cloud & Platform: OCI, AWS, Azure, Kubernetes, Docker, API Gateway, infrastructure provisioning
Delivery & Automation: Jenkins, Terraform, GitHub/GitLab, CI/CD, deployment automation, integration and canary testing
Observability & Incident Response: OpenTelemetry, Prometheus, Grafana, CloudWatch, alarms, log analysis, RCA automation, on-call readiness
Data: PostgreSQL, SQL Server, MySQL, MongoDB, Redis

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate - designed resilient cloud architectures using EC2, VPC, S3, RDS, IAM, Lambda, API Gateway, CloudFormation, and CloudWatch.
- Generative AI with Large Language Models - applied transformer architecture, prompt engineering, and model fine-tuning with Hugging Face FLAN-T5 and OpenAI APIs.

PROFESSIONAL EXPERIENCE

Software Developer 3 - Generative AI | Oracle | Tennessee, USA | Nov 2025 - Present
- Built and operationalized Agent Gateway and Services (AGS), a new AI platform developed from the ground up, contributing across deployment workflows, OCI tenancy setup, environment provisioning, operational-readiness engineering, and early service stabilization.
- Instrumented AGS with metrics, API Gateway alarms, Grafana dashboards, on-call integrations, and paging, improving service-health visibility and accelerating production diagnosis and response.
- Created a reusable service-probe foundation and supported authentication for AGS integration testing, expanding end-to-end validation and increasing confidence in service interactions and release readiness.
- Established the initial reusable canary framework for service-flow validation, mapping dependent service interactions and creating a foundation for detecting unhealthy behavior before user-facing impact.
- Delivered and deployed WebSearch for Oracle's internal GenAI Chat platform within a two-week timeline, implementing search behavior, routing, feature flags, streaming flows, Response API handling, and error-path validation across a new codebase.
- Strengthened GenAI Chat quality through unit and load testing, backend integration setup, deployment support, and production follow-up while partnering with GenAI, Console, platform, and operations teams.
- Resolved security and compliance work spanning credential-exposure remediation, operational-readiness items, and platform security tickets, coordinating across services to improve production readiness and maintainability.
- Built Codex skills that correlate logs, alarm timelines, tickets, and code context to generate root-cause hypotheses and fix sizing, reducing on-call investigation time by approximately 70%. Also automated local end-to-end integration testing across four dependent services, saving developers 1–2 hours per setup.

Senior Software Engineer | Quest Diagnostics | Virginia, USA | Jan 2025 - Oct 2025
- Built Java interfaces for clinical laboratory instruments, parsing ASTM/HL7 messages, interpreting results, and persisting validated data to SQL Server for downstream diagnostic workflows.
- Developed 20+ decoupled WildFly modules for asynchronous communication between instruments and backend services across UAT, test, and production environments.
- Designed protocol-aware parsing and two-way integration flows, translating vendor specifications into internal data structures while preserving data integrity across heterogeneous instruments.
- Optimized JDBC queries and stored procedures for real-time result processing and performed production root-cause analysis using server logs to resolve instrument-to-service communication failures.
- Configured WildFly deployments and environment-specific JNDI resources across UAT, test, and production, supporting consistent releases and reliable instrument connectivity.
- Prototyped AI-assisted automation for interpreting laboratory data and generating diagnostic reports, targeting faster analysis and reduced manual effort.

Software Development Engineer II | Optum - UnitedHealth Group | Minnesota, USA | Jan 2023 - Dec 2024
- Led development of a cloud-native healthcare SaaS platform processing 10,000+ daily transactions with sub-500 ms latency and 99.9% availability.
- Architected four Spring Boot microservices on AWS EKS, integrating external APIs and automating workflows from data ingestion through compliance-ready response generation.
- Designed event-driven services with Kubernetes, Docker, and AWS, improving scalability by 35% for high-traffic workloads.
- Built TensorFlow claim prioritization that achieved 92% accuracy and reduced urgent-claim turnaround by 40%.
- Automated Jenkins, Docker, Kubernetes, and ECR deployment workflows with rolling updates, reducing deployment time by 40% across multiple environments.
- Unified OpenTelemetry, Prometheus, CloudWatch, X-Ray, and Grafana telemetry into actionable dashboards and alerts, reducing incident-resolution time by 30%.
- Implemented IAM, KMS encryption, and VPC isolation across 50+ microservices and 15+ AWS environments to support HIPAA-aligned security controls.
- Built a React operations portal with Cognito-based JWT authentication and embedded Grafana dashboards, providing real-time visibility into SLAs, transactions, and system health.

Software Development Engineer | HDFC Bank Limited | Jodhpur, India | May 2019 - Aug 2021
- Designed and deployed Java/Spring Boot REST APIs and MongoDB-backed services through Azure DevOps pipelines and resource groups, accelerating repeatable application releases.
- Implemented Spring Security, RBAC, HTTP Basic authentication, and JWT-based access controls to protect API sessions and support data-protection requirements.
- Built Jenkins and Terraform delivery pipelines with automated rollback, Prometheus monitoring, and Grafana visualization to improve deployment safety and service availability.
- Improved scalability and load distribution through database sharding and reduced critical system defects by 15% through structured root-cause analysis.
- Automated operational workflows by integrating Python scripts with machine-learning models to improve workflow management and reduce repetitive processing.
- Resolved Angular UI defects using Chrome DevTools and browser-based performance diagnostics, improving front-end stability and usability.

Associate Software Engineer | Paytm | Hyderabad, India | Feb 2019 - May 2020
- Developed Java and Spring Boot transaction-processing services backed by MySQL and deployed containerized workloads using Docker and Kubernetes.
- Engineered data pipelines for high-volume datasets, reducing processing time by 30%, and improved production stability through systematic testing and debugging.
- Diagnosed and resolved production application defects, improving service stability and minimizing downtime in transaction-processing workflows.
- Contributed to Agile planning, backlog refinement, and retrospectives supporting reliable, iterative delivery and continuous improvement.
- Reduced critical transaction-processing defects by 20% through comprehensive application testing and debugging.

EDUCATION
Master of Science, Computer Science | University of Missouri | Kansas City, MO, USA | 2022 | GPA 3.5/4.0
Bachelor of Technology, Electrical and Electronics Engineering | Aditya Engineering College | India | 2019 | GPA 3.0/4.0
`.trim();
