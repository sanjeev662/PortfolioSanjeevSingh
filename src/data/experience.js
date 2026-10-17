/**
 * Single source of truth for professional experience and education.
 *
 * Consumed by BOTH the full About page and the homepage About teaser.
 * Do NOT re-declare these arrays inside a component body.
 *
 * Bullets follow the CV. A role has either flat `achievements` + `tech`, or
 * (Namekart) `projects`, each with its own `name`, `tech` and `achievements`.
 * Every reader — About, the homepage teaser and api/chat.js — handles both.
 */

export const EXPERIENCE = [
  {
    id: "namekart-sde",
    period: "July 2024 – Present",
    title: "Software Development Engineer (SDE)",
    company: "Namekart Private Limited",
    location: "Noida, India",
    // The CV splits this role into three workstreams, each with its own stack,
    // so they're kept as separate groups rather than one long bullet list.
    projects: [
      {
        id: "namekart-dashboard",
        name: "Namekart Dashboard",
        tech: ["Java", "Spring Boot", "Spring Security", "JPA", "MySQL", "React.js", "Kafka"],
        achievements: [
          "Owned end-to-end technical delivery of the company's domain-name platform spanning 30+ modules across discovery, acquisition, pricing, and sales; translated business requirements into production-ready features and reviewed production code changes",
          "Optimized end-to-end performance using composite MySQL indexes and JPA Criteria for database-level filtering, sorting, and pagination; added frontend virtualization and lazy loading to enable responsive browsing of tables containing 1.06M rows",
          "Implemented event-driven and real-time communication using Kafka consumers for auction-change events with scheduled reconciliation for consistency, Server-Sent Events (SSE) for long-running job progress updates, and WebSockets for bidirectional AI chat",
          "Built an LLM-powered AI assistant using RAG and role-based access control (RBAC) to answer natural-language queries over platform data and surface operational insights, reducing manual analysis effort by 50%",
          "Integrated 10+ external services (domain registrars, valuation, email verification, etc.) using declarative Feign clients with configurable timeouts, retries, and centralized error handling",
        ],
      },
      {
        id: "seo-automation-platform",
        name: "AI-Powered SEO Automation Platform",
        tech: ["Node.js", "React.js", "Temporal", "OpenRouter", "PostgreSQL"],
        achievements: [
          "Built an AI-driven SEO automation platform in React.js and Node.js that automates site audits, keyword research, content-brief generation, and scheduled client reporting through a Telegram bot",
          "Orchestrated crawl and LLM pipelines with Temporal across 15 isolated worker queues (durable execution, retries, crash recovery)",
          "Designed a hybrid crawler (HTTP by default, headless Playwright for JS-rendered sites) that keeps crawls fast and resource-efficient",
          "Integrated OpenRouter to orchestrate multiple LLMs for structured content generation; implemented a hallucination guard to validate AI-generated content briefs against live search results, improving content accuracy and reliability",
        ],
      },
      {
        id: "domain-intelligence-microservice",
        name: "Domain Intelligence Microservice",
        tech: ["Spring Boot", "PostgreSQL"],
        achievements: [
          "Built a Spring Boot microservice ingesting 250K rows/day into a partitioned PostgreSQL database containing 22M+ rows",
          "Achieved 2–40 ms filtered search using composite and trigram indexes, cursor-based pagination, and caching",
          "Ensured reliable data ingestion from rate-limited APIs using request throttling and exponential backoff to recover from transient failures",
          "Deployed with Docker/Coolify on Hetzner Cloud via GitHub Actions CI/CD; monitored with Prometheus, Grafana, Loki, and OpenTelemetry",
        ],
      },
    ],
  },
  {
    id: "rydeu-backend-intern",
    period: "November 2023 – June 2024",
    title: "Backend Developer Intern",
    company: "Rydeu Logistics India Pvt. Ltd.",
    location: "Bengaluru, India (Remote)",
    achievements: [
      "Optimized critical APIs, reducing average response time from 2 seconds to 1.2 seconds and improving performance by 40%",
      "Implemented Keycloak-based authentication and authorization to secure platform access",
      "Developed an automated vendor-offer feature, reducing manual effort by 70% and increasing participation by 35%",
      "Integrated Freshworks CRM for customer engagement and email marketing, increasing lead conversions by 30%",
    ],
    tech: [
      "Node.js",
      "React.js",
      "Next.js",
      "Redux",
      "TypeScript",
      "Material UI",
      "PostgreSQL",
      "GitLab",
    ],
  },
  {
    id: "multigrad-fullstack-intern",
    period: "July 2023 - September 2023",
    title: "Full Stack Development Intern",
    company: "Fightage Pvt Ltd (Multigrad)",
    location: "Remote",
    certificate:
      "https://drive.google.com/file/d/1pnetigvEpF4VFIMCwEWomPMKii3Y8rxS/view?usp=drive_link",
    achievements: [
      "Contributed to full stack web development as a proactive intern",
      "Took charge of Node.js and React.js projects, showcasing skills in both frontend and backend technologies",
      "Collaborated within a team to build and enhance web applications using Figma",
    ],
    tech: ["Node.js", "React.js", "Figma"],
  },
  {
    id: "rise-fullstack-intern",
    period: "April 2023 - June 2023",
    title: "Full Stack Development Intern",
    company: "Rise Higher Education Inc",
    location: "Remote",
    certificate:
      "https://drive.google.com/file/d/11-jxusAkYH0Laxa4OXAXfuSmHCXtVNJU/view",
    achievements: [
      "Collaborated with cross-functional teams to design, develop and deploy applications from end-to-end using MERN",
      "Managed database implementation and optimized RESTful API development for seamless integration",
      "Deployed cloud applications using strategic deployment and efficient techniques",
    ],
    tech: ["MERN Stack", "RESTful APIs", "Cloud Deployment"],
  },
];

export const EDUCATION = [
  {
    id: "btech-csjmu",
    period: "July 2020 – July 2024",
    title: "Bachelor of Technology in Information Technology",
    institution: "Chhatrapati Shahu Ji Maharaj University, Kanpur",
    link: "http://csjmu.ac.in/school-of-engineering-and-technology",
    description:
      "Graduated with strong foundation in Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks.",
  },
  {
    id: "schooling-nagaji",
    period: "2012 - 2019",
    title: "Primary and Secondary Education",
    institution:
      "Naga Ji Saraswati Vidya Mandir Senior Secondary School, Maldepur - Ballia",
    link: "https://nagajimaldepur.in/",
    description:
      "Completed higher and secondary education through CBSE Board with subjects P.C.M & Sanskrit.",
  },
];

/**
 * The two most recent roles — what the homepage About teaser showed before this
 * module existed. Derived so it can never drift from EXPERIENCE.
 */
export const RECENT_EXPERIENCE = EXPERIENCE.slice(0, 2);
