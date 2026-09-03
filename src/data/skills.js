/**
 * Single source of truth for the skill bars and the grouped technology matrix.
 *
 * Consumed by BOTH the full About page and the homepage About teaser.
 * Do NOT re-declare a `skills` array inside a component body.
 *
 * SKILLS is the four proficiency bars, verbatim from About.jsx.
 * SKILL_GROUPS is a tokenised view of the SAME technologies, assembled only
 * from names that already appear elsewhere in this portfolio — About's skill
 * strings, Domain's sections, the project skill tags and the experience tech
 * arrays. Nothing here was invented; if a technology is not already claimed
 * somewhere else in the repo, it does not belong in this file.
 *
 * Icons are STRING names; resolve them with `getIcon()` from ./icons.
 */

export const SKILLS = [
  {
    id: "frontend-development",
    name: "Frontend Development",
    tech: "React.js, Next.js, TypeScript, MUI",
    percentage: 84,
    icon: "Code",
  },
  {
    id: "backend-development",
    name: "Backend Development",
    tech: "Node.js, Spring Boot, MySQL, MongoDB",
    percentage: 88,
    icon: "Database",
  },
  {
    id: "data-structures-algorithms",
    name: "Data Structures & Algorithms",
    tech: "Java",
    percentage: 85,
    icon: "Brain",
  },
  {
    id: "competitive-programming",
    name: "Competitive Programming",
    tech: "Java",
    percentage: 86,
    icon: "Trophy",
  },
];

export const SKILL_GROUPS = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "Code",
    items: [
      "React.js",
      "Next.js",
      "Redux",
      "Material UI",
      "Tailwind CSS",
      "Bootstrap",
      "HTML",
      "CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    items: [
      "Node.js",
      "Express.js",
      "Spring Boot",
      "JPA",
      "RESTful APIs",
      "Microservices Architecture",
      "Socket.IO",
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "Database",
    items: ["MySQL", "PostgreSQL", "MongoDB", "SQL", "Sequelize"],
  },
  {
    id: "languages-and-tools",
    title: "Languages & Tools",
    icon: "Wrench",
    items: [
      "Java",
      "JavaScript",
      "TypeScript",
      "Docker",
      "Azure",
      "GitLab",
      "Figma",
    ],
  },
];
