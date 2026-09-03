/**
 * Single source of truth for the three "Technical Domains" cards.
 *
 * Consumed by BOTH the full Domain page and the homepage Domain teaser.
 * Do NOT re-declare a `domains` array inside a component body.
 *
 * Copy comes from Maincontaint/Domain/Domain.jsx, which is the richer of the
 * two old copies (it carries the per-link icons and the "View Projects" button
 * that the homepage version had dropped).
 *
 * Icons are STRING names; resolve them with `getIcon()` from ./icons.
 * `sections[].tech` stays a display string on purpose — it renders as one
 * paragraph. The tokenised version lives in ./skills.js as SKILL_GROUPS.
 */

import icpcImg from "../Components/Assets/Certificates/icpc.webp";

export const DOMAINS = [
  {
    id: "full-stack-development",
    icon: "Code",
    title: "Full Stack Development",
    sections: [
      {
        id: "backend",
        title: "Backend Development",
        tech: "Node.js, Express.js, Spring Boot, Spring Security, JPA, Microservices, RESTful APIs, Kafka, WebSockets, SSE",
      },
      {
        id: "frontend",
        title: "Frontend Development",
        tech: "React.js, Next.js, Redux, TypeScript, Tailwind CSS, Material UI",
      },
      {
        id: "databases",
        title: "Databases",
        tech: "MySQL, PostgreSQL, MongoDB, SQL",
      },
      {
        id: "cloud-devops",
        title: "Cloud, DevOps & Monitoring",
        tech: "Docker, Hetzner Cloud, Azure, GitHub Actions (CI/CD), Prometheus, Grafana, Loki",
      },
    ],
    projectLink: {
      url: "https://github.com/sanjeev662",
      text: "View Projects",
    },
  },
  {
    id: "data-structures-and-algorithms",
    icon: "Brain",
    title: "Data Structure and Algorithms",
    links: [
      {
        id: "college-dsa-repo",
        label: "College-DSA Repo",
        url: "https://github.com/sanjeev662/DS-JAVA",
        text: "My Codes",
        icon: "Github",
      },
      {
        id: "college-oops-repo",
        label: "College-OOPS Repo",
        url: "https://github.com/sanjeev662/OOPS-JAVA",
        text: "My Codes",
        icon: "Github",
      },
      {
        id: "geeksforgeeks-dsa",
        label: "GeeksforGeeks DSA",
        url: "https://auth.geeksforgeeks.org/user/sanjeev662",
        text: "My Profile",
        icon: "BookOpen",
      },
    ],
  },
  {
    id: "competitive-programming",
    icon: "Trophy",
    title: "Competitive Programming",
    links: [
      {
        id: "codechef",
        label: "CodeChef",
        url: "https://www.codechef.com/users/sanjeev662",
        text: "sanjeev662",
        icon: "Target",
      },
      {
        id: "codeforces",
        label: "CodeForces",
        url: "https://codeforces.com/profile/sanjeev662",
        text: "sanjeev662",
        icon: "Target",
      },
      {
        id: "hackerrank",
        label: "HackerRank",
        url: "https://www.hackerrank.com/sanjeev662",
        text: "5★ Rating",
        icon: "Star",
      },
    ],
    achievement: {
      text: "ICPC Mathura–Kanpur Regionals 2022 Qualifier — Top 10% of 5000+ participants",
      image: icpcImg,
    },
  },
];
