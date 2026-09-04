/**
 * Single source of truth for professional experience and education.
 *
 * Consumed by BOTH the full About page and the homepage About teaser.
 * Do NOT re-declare these arrays inside a component body.
 *
 * Every date range, company, location, achievement bullet and certificate link
 * is copied verbatim from About.jsx. The `tech` comma-string that the components
 * used to `.split(", ")` on every render is already a real array here — render
 * `role.tech.map(...)` directly.
 */

export const EXPERIENCE = [
  {
    id: "namekart-sde",
    period: "July 2024 – Present",
    title: "Software Development Engineer (SDE)",
    company: "Namekart Private Limited",
    location: "Noida, India",
    achievements: [
      "Drove end-to-end technical ownership of the company's domain-name platform across 30+ modules, covering discovery, acquisition, pricing, and sales while authoring and reviewing production changes",
      "Built a domain-intelligence microservice using Spring Boot ingesting 280K rows/day into a partitioned 4M-row PostgreSQL store, using composite indexing and cursor-based pagination for 15–30 ms filtered search and streaming CSV export",
      "Developed an AI-powered SEO automation platform that automates the end-to-end consulting workflow — site audits, keyword research, content briefs, rank tracking, and client reporting — using independent multi-agent microservices orchestrated with Temporal for durable workflows and automatic retries; scheduled workflows generate and deliver reports to clients via Telegram bot",
      "Engineered an LLM-powered AI assistant with retrieval-augmented context and role-based access control that enabled natural language queries over platform data, generating real-time reports and operational insights, reducing manual analysis effort by 50%",
      "Delivered a scalable HR portal covering attendance, leave management, work logs, and automated stipend calculation with location-based office punch-ins across multiple cities, reducing manual HR processing by 70%",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "JPA",
      "MySQL",
      "PostgreSQL",
      "React.js",
      "Next.js",
      "Node.js",
      "Docker",
      "Hetzner Cloud",
    ],
  },
  {
    id: "rydeu-backend-intern",
    period: "November 2023 – June 2024",
    title: "Backend Developer Intern",
    company: "Rydeu Logistics India Pvt. Ltd.",
    location: "Bengaluru, India (Remote)",
    achievements: [
      "Optimized critical APIs, reducing average response time from 2s to 1.2s, improving performance by 40%",
      "Engineered Keycloak-based authentication and authorization, securing platform access for users and reducing unauthorized access",
      "Developed an automated vendor offer feature, reducing manual effort by 70% and increasing participation by 35%",
      "Integrated third-party Freshwork CRM to improve customer interaction and email marketing, resulting in a 30% increase in lead conversions and more effective booking management",
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
