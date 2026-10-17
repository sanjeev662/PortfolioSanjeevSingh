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

/** The CV's "Technical Skills" table, category for category, in the CV's order. */
export const SKILL_GROUPS = [
  {
    id: "languages",
    title: "Languages",
    icon: "Code",
    // HTML and CSS aren't on the CV; kept because they were asked for here.
    items: ["Java", "JavaScript (ES6+)", "TypeScript", "HTML", "CSS", "SQL"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    items: [
      "Spring Boot",
      "Spring Security",
      "JPA",
      "Microservices",
      "REST APIs",
      "Node.js",
      "Express.js",
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
    id: "devops-monitoring",
    title: "DevOps & Monitoring",
    icon: "Wrench",
    items: [
      "Docker",
      "Hetzner Cloud",
      "Azure",
      "Coolify",
      "GitHub Actions (CI/CD)",
      "Prometheus",
      "Grafana",
      "Loki",
      "OpenTelemetry",
    ],
  },
  {
    id: "ai-orchestration",
    title: "AI & Orchestration",
    icon: "Sparkles",
    items: ["LLM Integration", "RAG", "Claude", "MCP", "OpenRouter", "Temporal"],
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
    ],
  },
];
