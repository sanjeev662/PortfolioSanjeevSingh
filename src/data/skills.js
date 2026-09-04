/**
 * Single source of truth for the skill bars and the grouped technology matrix.
 *
 * Consumed by BOTH the full About page and the homepage About teaser.
 * Do NOT re-declare a `skills` array inside a component body.
 *
 * SKILLS is the four proficiency bars shown beside the personal-information
 * grid. SKILL_GROUPS mirrors the "Technical Skills" table on the CV, using its
 * categories and its wording, so the two never disagree.
 *
 * Icons are STRING names; resolve them with `getIcon()` from ./icons.
 */

export const SKILLS = [
  {
    id: "backend-development",
    name: "Backend Development",
    tech: "Java, Spring Boot, Node.js, Microservices, REST APIs",
    percentage: 88,
    icon: "Server",
  },
  {
    id: "frontend-development",
    name: "Frontend Development",
    tech: "React.js, Next.js, TypeScript, Redux, Tailwind CSS",
    percentage: 84,
    icon: "Code",
  },
  {
    id: "databases-and-cloud",
    name: "Databases & Cloud",
    tech: "MySQL, PostgreSQL, MongoDB, Docker, CI/CD",
    percentage: 85,
    icon: "Database",
  },
  {
    id: "data-structures-algorithms",
    name: "Data Structures & Algorithms",
    tech: "Java — 800+ problems solved",
    percentage: 86,
    icon: "Brain",
  },
];

/** The CV's "Technical Skills" table, category for category. */
export const SKILL_GROUPS = [
  {
    id: "languages",
    title: "Languages",
    icon: "Code",
    items: ["Java", "JavaScript (ES6+)", "TypeScript", "HTML", "CSS", "SQL"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    items: [
      "Node.js",
      "Express.js",
      "Spring Boot",
      "Spring Security",
      "JPA",
      "Microservices",
      "RESTful APIs",
      "Kafka",
      "WebSockets",
      "SSE",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "Brain",
    items: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Material UI"],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "Database",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: "cloud-devops-monitoring",
    title: "Cloud, DevOps & Monitoring",
    icon: "Wrench",
    items: [
      "Docker",
      "Hetzner Cloud",
      "Azure",
      "GitHub Actions (CI/CD)",
      "Prometheus",
      "Grafana",
      "Loki",
    ],
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    icon: "Trophy",
    items: [
      "Data Structures & Algorithms",
      "OOP",
      "SOLID Principles",
      "Design Patterns",
      "LLM Integration & RAG",
    ],
  },
];
